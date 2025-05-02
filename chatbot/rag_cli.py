import os
# Set tokenizers parallelism to false before importing any HuggingFace components
os.environ["TOKENIZERS_PARALLELISM"] = "false"

from typing import List, Optional
from dotenv import load_dotenv
from PyPDF2 import PdfReader
from langchain.text_splitter import RecursiveCharacterTextSplitter
from langchain_huggingface import HuggingFaceEmbeddings
from langchain_community.vectorstores import FAISS
from langchain_openai import ChatOpenAI
from langchain.chains import ConversationalRetrievalChain
from langchain.memory import ConversationBufferMemory
from langchain.prompts import PromptTemplate
import argparse

# Constants
CHUNK_SIZE = 1000
CHUNK_OVERLAP = 200
MEMORY_KEY = "chat_history"
MODEL_NAME = "intfloat/multilingual-e5-large"
DEVICE = "cpu"

# Define the prompt template
PROMPT_TEMPLATE = """You are a multilingual assistant capable of understanding and responding in English, Vietnamese, and Korean.
Always respond in the same language as the user's question.

Context: {context}
Chat History: {chat_history}
Question: {question}

Please provide a helpful answer based on the context above:"""

class MultilingualRAGBot:
    def __init__(self, model_name: str = "gpt-3.5-turbo-0125"):
        """Initialize the RAG bot with specified components."""
        # Load environment variables
        load_dotenv()
        
        # Initialize embedding model
        self.embeddings = HuggingFaceEmbeddings(
            model_name=MODEL_NAME,
            model_kwargs={'device': DEVICE},
            encode_kwargs={'normalize_embeddings': True}
        )
        
        # Initialize LLM
        self.llm = ChatOpenAI(
            model_name=model_name,
            temperature=0.7
        )
        
        self.memory = ConversationBufferMemory(
            memory_key=MEMORY_KEY,
            output_key="answer",
            return_messages=True
        )
        
        self.vectorstore = None
        self.chain = None

    def process_pdf(self, pdf_paths: List[str]) -> None:
        """Process PDF files and create vector store."""
        text = ""
        for pdf_path in pdf_paths:
            if not os.path.exists(pdf_path):
                print(f"Warning: File {pdf_path} does not exist.")
                continue
                
            with open(pdf_path, 'rb') as file:
                pdf = PdfReader(file)
                for page in pdf.pages:
                    text += page.extract_text()

        # Split text into chunks
        text_splitter = RecursiveCharacterTextSplitter(
            chunk_size=CHUNK_SIZE,
            chunk_overlap=CHUNK_OVERLAP,
            length_function=len
        )
        chunks = text_splitter.split_text(text)

        # Create vector store
        self.vectorstore = FAISS.from_texts(
            texts=chunks,
            embedding=self.embeddings
        )

        # Create prompt template
        prompt = PromptTemplate(
            template=PROMPT_TEMPLATE,
            input_variables=['context', 'chat_history', 'question']
        )

        # Initialize conversation chain
        self.chain = ConversationalRetrievalChain.from_llm(
            llm=self.llm,
            retriever=self.vectorstore.as_retriever(),
            memory=self.memory,
            return_source_documents=True,
            combine_docs_chain_kwargs={'prompt': prompt}
        )

        print("PDF processing completed. Bot is ready for questions.")

    def ask(self, question: str) -> str:
        """Ask a question to the bot."""
        if not self.chain:
            return "Please process PDF documents first."

        try:
            response = self.chain.invoke({
                "question": question
            })
            return response['answer']
        except Exception as e:
            return f"Error processing question: {str(e)}"

def get_pdf_files_from_folder(folder_path: str) -> List[str]:
    """
    Get all PDF files from a folder.
    
    Args:
        folder_path (str): Path to the folder containing PDF files
        
    Returns:
        List[str]: List of paths to PDF files
    """
    if not os.path.exists(folder_path):
        raise ValueError(f"Folder path does not exist: {folder_path}")
        
    pdf_files = []
    for file in os.listdir(folder_path):
        if file.lower().endswith('.pdf'):
            pdf_files.append(os.path.join(folder_path, file))
    
    if not pdf_files:
        raise ValueError(f"No PDF files found in folder: {folder_path}")
        
    return pdf_files

def main():
    parser = argparse.ArgumentParser(description="Multilingual RAG CLI Bot")
    parser.add_argument(
        "--folder", 
        type=str,
        help="Path to folder containing PDF files",
        required=True
    )
    args = parser.parse_args()

    try:
        # Get all PDF files from folder
        pdf_files = get_pdf_files_from_folder(args.folder)
        print(f"Found {len(pdf_files)} PDF files in folder.")
        
        # Initialize bot
        bot = MultilingualRAGBot()
        
        # Process PDFs
        print("Processing PDF files...")
        bot.process_pdf(pdf_files)

        # Interactive loop
        print("\nBot is ready! Type 'quit' to exit.")
        while True:
            question = input("\nYour question (in any language): ")
            if question.lower() == 'quit':
                break
                
            response = bot.ask(question)
            print("\nBot:", response)
            
    except Exception as e:
        print(f"Error: {str(e)}")
        return

if __name__ == "__main__":
    main() 