# Standard library imports
from dotenv import load_dotenv
import os
import asyncio

# Third-party imports
from PyPDF2 import PdfReader
from langchain.text_splitter import CharacterTextSplitter
from langchain_openai import OpenAIEmbeddings, ChatOpenAI
from langchain_community.vectorstores import FAISS
from langchain.memory import ConversationBufferMemory
from langchain.chains import ConversationalRetrievalChain

# Local imports

# Constants
CHUNK_SIZE = 1000
CHUNK_OVERLAP = 200
MEMORY_KEY = 'chat_history'
OUTPUT_KEY = 'answer'

def get_pdf_text(pdf_docs) -> str:
    """
    Extract text from PDF documents.
    
    Args:
        pdf_docs: List of uploaded PDF files or file paths
        
    Returns:
        str: Concatenated text from all PDFs
    """
    text = ""
    for pdf in pdf_docs:
        if isinstance(pdf, str):  # If it's a file path
            with open(pdf, 'rb') as file:
                pdf_reader = PdfReader(file)
                for page in pdf_reader.pages:
                    text += page.extract_text()
        else:  # If it's an uploaded file
            pdf_reader = PdfReader(pdf)
            for page in pdf_reader.pages:
                text += page.extract_text()
    return text


def get_text_chunks(text: str) -> list:
    """
    Split text into smaller chunks for processing.
    
    Args:
        text (str): Input text to be split
        
    Returns:
        list: List of text chunks
    """
    text_splitter = CharacterTextSplitter(
        separator="\n",
        chunk_size=CHUNK_SIZE,
        chunk_overlap=CHUNK_OVERLAP,
        length_function=len
    )
    return text_splitter.split_text(text)


def get_vectorstore(text_chunks: list) -> FAISS:
    """
    Create a vector store from text chunks using embeddings.
    
    Args:
        text_chunks (list): List of text chunks to be embedded
        
    Returns:
        FAISS: Vector store containing embedded text chunks
    """
    embeddings = OpenAIEmbeddings()
    # Alternative embedding model:
    # embeddings = HuggingFaceInstructEmbeddings(model_name="hkunlp/instructor-xl")
    return FAISS.from_texts(texts=text_chunks, embedding=embeddings)


def get_conversation_chain(vectorstore: FAISS) -> ConversationalRetrievalChain:
    """
    Create a conversation chain for handling Q&A.
    
    Args:
        vectorstore (FAISS): Vector store containing document embeddings
        
    Returns:
        ConversationalRetrievalChain: Chain for conversational Q&A
    """
    llm = ChatOpenAI()

    memory = ConversationBufferMemory(
        memory_key=MEMORY_KEY,
        return_messages=True,
        output_key=OUTPUT_KEY
    )
    
    conversation_chain = ConversationalRetrievalChain.from_llm(
        llm=llm,
        retriever=vectorstore.as_retriever(),
        memory=memory,
        return_source_documents=True
    )
    return conversation_chain


async def translate_text(text: str, dest_lang: str = 'en') -> str:
    """
    Translate text to the specified language using Google Translate API.
    
    Args:
        text (str): Text to translate
        dest_lang (str): Destination language code (default: 'en' for English)
        
    Returns:
        str: Translated text
    """
    async with Translator() as translator:
        try:
            translator = Translator()
            translation = translator.translate(text, dest=dest_lang)
            return translation.text  # Return only the translated text
        except Exception as e:
            st.error(f"Translation error: {str(e)}")
            return text

async def translate_text(text, target_language):
    async with Translator() as translator:
        return await translator.translate(text, dest=target_language)
    

def handle_userinput(user_question: str) -> None:
    """
    Process user input and display the conversation.
    
    Args:
        user_question (str): User's input question
    """
    # Translate user question to English if needed
    translated_question = asyncio.run(translate_text(user_question, 'en')).text
    
    response = st.session_state.conversation.invoke({'question': translated_question})
    st.session_state.chat_history = response['chat_history']

    for i, message in enumerate(st.session_state.chat_history):
        # Translate bot's response back to original language
        if i % 2 == 1:  # Bot's message
            translated_message = asyncio.run(translate_text(message.content, 'vi')).text
            template = bot_template
            msg = translated_message
        else:  # User's message
            template = user_template
            msg = user_question  # Show original question
            
        st.write(template.replace("{{MSG}}", msg), 
                unsafe_allow_html=True)


def initialize_session_state() -> None:
    """Initialize Streamlit session state variables."""
    if "conversation" not in st.session_state:
        st.session_state.conversation = None
    if "chat_history" not in st.session_state:
        st.session_state.chat_history = None
    if "vectorstore" not in st.session_state:
        st.session_state.vectorstore = None


def get_pdf_files_from_data() -> list:
    """
    Get all PDF files from the data directory.
    
    Returns:
        list: List of PDF file paths
    """
    pdf_files = []
    data_dir = "data"
    if os.path.exists(data_dir):
        for file in os.listdir(data_dir):
            if file.endswith(".pdf"):
                pdf_files.append(os.path.join(data_dir, file))
    return pdf_files


def main():
    """Main application function."""
    # Load environment variables
    load_dotenv()
    
    # Configure Streamlit page
    st.set_page_config(
        page_title="Aussist Bot",
        page_icon="🤖"
    )
    st.write(css, unsafe_allow_html=True)
    
    # Initialize session state
    initialize_session_state()
    if "question" not in st.session_state:
        st.session_state.question = ""
    
    # Main header
    st.header("Aussist Chatbot 🤖 ready to help you!")
    
    # Get PDF files from data directory
    pdf_files = get_pdf_files_from_data()
    
    # Process PDF files if they exist and vectorstore is not initialized
    if pdf_files and st.session_state.vectorstore is None:
        with st.spinner("Processing documents..."):
            raw_text = get_pdf_text(pdf_files)
            text_chunks = get_text_chunks(raw_text)
            st.session_state.vectorstore = get_vectorstore(text_chunks)
            st.session_state.conversation = get_conversation_chain(st.session_state.vectorstore)
            st.success("Bot is ready! You can start chatting now.")
    elif not pdf_files and st.session_state.vectorstore is None:
        st.warning("No PDF files found in the data directory. Please add PDF files to the data folder.")
    
    # Create a form for user input
    with st.form(key="message_form", clear_on_submit=True):
        user_question = st.text_input(
            "Ask a question to the bot:",
            key="question_input"
        )
        submit_button = st.form_submit_button("Send")
        
        if submit_button and user_question:
            if st.session_state.conversation:
                handle_userinput(user_question)
            else:
                st.error("Bot is not ready yet. Please add PDF files to the data folder.")
    
    # Sidebar for additional document upload
    with st.sidebar:
        st.subheader("Additional Documents")
        pdf_docs = st.file_uploader(
            "Upload additional documents if needed",
            accept_multiple_files=True
        )
        
        if st.button("Process Additional Documents"):
            if pdf_docs:
                with st.spinner("Processing additional documents..."):
                    raw_text = get_pdf_text(pdf_docs)
                    text_chunks = get_text_chunks(raw_text)
                    new_vectorstore = get_vectorstore(text_chunks)
                    
                    # Merge with existing vectorstore if it exists
                    if st.session_state.vectorstore:
                        st.session_state.vectorstore.merge_from(new_vectorstore)
                    else:
                        st.session_state.vectorstore = new_vectorstore
                    
                    st.session_state.conversation = get_conversation_chain(st.session_state.vectorstore)
                    st.success("Additional documents processed successfully!")
            else:
                st.warning("Please upload at least one document.")


if __name__ == '__main__':
    main()