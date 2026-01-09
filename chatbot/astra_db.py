from typing import List, Dict, Any
from langchain_astradb import AstraDBVectorStore
from langchain.schema import Document
from langchain.text_splitter import RecursiveCharacterTextSplitter
from langchain_huggingface import HuggingFaceEmbeddings
from PyPDF2 import PdfReader
import os

class AstraDB:
    def __init__(
        self,
        astra_db_app_token: str,
        astra_db_api_endpoint: str,
        collection_name: str = "medical_documents",
        embedding_model_name: str = "intfloat/multilingual-e5-large",
        device: str = "cpu"
    ):
        # Initialize embedding model
        self.embeddings = HuggingFaceEmbeddings(
            model_name=embedding_model_name,
            model_kwargs={'device': device},
            encode_kwargs={'normalize_embeddings': True}
        )
        
        # Initialize AstraDB vector store
        self.vectorstore = AstraDBVectorStore(
            embedding=self.embeddings,
            collection_name=collection_name,
            api_endpoint=astra_db_api_endpoint,
            token=astra_db_app_token
        )
        
        # Initialize text splitter
        self.text_splitter = RecursiveCharacterTextSplitter(
            chunk_size=1000,
            chunk_overlap=200,
            length_function=len
        )

    # Process a single PDF file and convert it to documents
    def process_pdf(self, pdf_path: str) -> List[Document]:
        if not os.path.exists(pdf_path):
            raise FileNotFoundError(f"PDF file not found: {pdf_path}")
            
        # Extract text from PDF
        with open(pdf_path, 'rb') as file:
            pdf = PdfReader(file)
            text = ""
            for page in pdf.pages:
                text += page.extract_text()
                
        # Split text into chunks
        texts = self.text_splitter.split_text(text)
        
        # Create documents with metadata
        documents = []
        for i, text_chunk in enumerate(texts):
            doc = Document(
                page_content=text_chunk,
                metadata={
                    "source": pdf_path,
                    "chunk_id": i,
                    "file_type": "pdf"
                }
            )
            documents.append(doc)
            
        return documents

    # Process multiple PDF files and store them in AstraDB
    def process_and_store_pdfs(self, pdf_paths: List[str]) -> None:
        all_documents = []
        for pdf_path in pdf_paths:
            try:
                documents = self.process_pdf(pdf_path)
                all_documents.extend(documents)
            except Exception as e:
                print(f"Error processing {pdf_path}: {str(e)}")
                continue
        
        # Store documents in AstraDB
        self.vectorstore.add_documents(all_documents)
        print(f"Successfully processed and stored {len(all_documents)} documents")

    # Perform similarity search in AstraDB
    def similarity_search(self, query: str, k: int = 4) -> List[Document]:
        return self.vectorstore.similarity_search(query, k=k)

    # Delete the entire collection from AstraDB
    def delete_collection(self) -> None:
        self.vectorstore.delete_collection()
        print("Collection deleted successfully")

    # Get statistics about the collection
    def get_collection_stats(self) -> Dict[str, Any]:
        # Get a sample embedding to determine dimension
        sample_embedding = self.embeddings.embed_query("sample text")
        
        return {
            "collection_name": self.vectorstore.collection_name,
            "embedding_dimension": len(sample_embedding),
            "model_name": self.embeddings.model_name
        }
    