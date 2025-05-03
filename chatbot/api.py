from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
from typing import List, Optional, Union
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from chatbot.rag_astradb import MultilingualMedicalBot

app = FastAPI(
    title="Chatbot API",
    description="API for chatbot",
    version="0.1.0",
)

# Khởi tạo bot (có thể load 1 lần, dùng lại cho mọi request)
bot = MultilingualMedicalBot()

# Cho phép CORS để frontend/mobile app gọi API
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Hoặc chỉ domain app của bạn
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class ChatRequest(BaseModel):
    question: str

class SourceDocument(BaseModel):
    content: str
    source: str
    chunk_id: Union[int, str]

class ChatResponse(BaseModel):
    answer: str
    sources: List[SourceDocument]

@app.get("/")
async def root():
    return {
        "message": "Welcome to the Chatbot API",
        "documentation": "Hello",
        "endpoints":{
            "/chat": "POST - Send a question to the bot",
            "/health": "GET - Check the health of the API",
            "/docs": "GET - Documentation of the API"
        }
    }

@app.post("/chat", response_model=ChatResponse)
async def chat(req: ChatRequest):
    try:
        response = bot.ask(req.question)
        return ChatResponse(
            answer=response['answer'],
            sources=[SourceDocument(**source) for source in response['sources']]
        )
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.get("/health")
async def health():
    return {"status": "ok"}
