# ─── app.py ──────────────────────────────────────────────────────────────
from dotenv import load_dotenv
import os
#from googletrans import Translator
import asyncio
from pathlib import Path
from fastapi import HTTPException

# Third-party imports
from PyPDF2 import PdfReader
from langchain.text_splitter import CharacterTextSplitter
from langchain_openai import OpenAIEmbeddings, ChatOpenAI
from langchain_community.vectorstores import FAISS
from langchain.memory import ConversationBufferMemory
from langchain.chains import ConversationalRetrievalChain
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel


from fastapi import FastAPI
# … the same imports you already have …

app = FastAPI()
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["POST"],
    allow_headers=["*"],
)

# ------------------------------------------------------------------------
VECTOR_PATH = Path("data/vectorstore")          # persistent cache
conversation_chain: ConversationalRetrievalChain | None = None
OUTPUT_KEY = "answer"
# ------------------------------------------------------------------------

@app.on_event("startup")
async def build_vectorstore() -> None:
    """
    Build (or reload) the FAISS-vectorstore exactly once when the server
    starts so each request can reuse it in <20 ms.
    """
    global conversation_chain

    pdf_files = list(Path("data").glob("*.pdf"))
    if not pdf_files:
        print("⚠️  No PDFs in /data – the bot will only echo.")
        return

    print(f"📚  Loading {len(pdf_files)} PDFs …")
    text = get_pdf_text(pdf_files)
    chunks = get_text_chunks(text)

    if VECTOR_PATH.exists():
        print("🔁  Re-using cached vectorstore")
        vectorstore = FAISS.load_local(VECTOR_PATH, OpenAIEmbeddings())
    else:
        vectorstore = get_vectorstore(chunks)
        vectorstore.save_local(VECTOR_PATH)

    conversation_chain = get_conversation_chain(vectorstore)
    print("✅  Vectorstore ready")
    

async def _warm_up() -> None:
    """Fire one dummy request so the first real user query is faster."""
    try:
        await conversation_chain.ainvoke({"question": "ping"})
        print("🚀  Warm-up finished")
    except Exception as e:
        print("⚠️  Warm-up failed:", e)

asyncio.create_task(_warm_up()) 

# ─────────────────────────────────────────────────────────────────────────

class Msg(BaseModel):
    role: str
    content: str

class ChatRequest(BaseModel):
    messages: list[Msg]

class ChatResponse(BaseModel):
    reply: str

@app.post("/chat", response_model=ChatResponse)
async def chat(req: ChatRequest):
    """
    Take the last user message, run it through the RAG chain and return
    the answer.  Falls back to an echo while the store is still loading.
    """
    user_msg = req.messages[-1].content

    if conversation_chain is None:
        # first 2-3 s after server start or no PDFs at all
        return {"reply": f"(echo) You said: {user_msg}"}

    try:
        res = await asyncio.wait_for(
        conversation_chain.ainvoke({"question": user_msg}),
        timeout=55                     # must be < client timeout
    )
        return {"reply": res[OUTPUT_KEY]}
    except asyncio.TimeoutError:
        raise HTTPException(504, detail="LLM timed-out, please retry")

def get_pdf_text(pdf_files):
    text = ""
    for pdf in pdf_files:
        with open(pdf, "rb") as f:
            reader = PdfReader(f)
            for page in reader.pages:
                text += page.extract_text() or ""
    return text

def get_text_chunks(text, chunk_size=1000, chunk_overlap=200):
    splitter = CharacterTextSplitter(
        separator="\n",
        chunk_size=chunk_size,
        chunk_overlap=chunk_overlap,
        length_function=len
    )
    return splitter.split_text(text)

def get_vectorstore(chunks):
    embeddings = OpenAIEmbeddings()
    return FAISS.from_texts(chunks, embeddings)

def get_conversation_chain(vectorstore):
    memory = ConversationBufferMemory(
        memory_key="chat_history",
        output_key="answer",
        return_messages=True
    )
    llm = ChatOpenAI()
    return ConversationalRetrievalChain.from_llm(
        llm=llm,
        retriever=vectorstore.as_retriever(),
        memory=memory,
        return_source_documents=True
    )