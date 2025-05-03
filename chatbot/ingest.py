import os
import argparse
import warnings
from typing import List, Optional
from dotenv import load_dotenv
from langchain.text_splitter import RecursiveCharacterTextSplitter
from langchain_huggingface import HuggingFaceEmbeddings
from langchain.schema import Document
from langchain_astradb import AstraDBVectorStore
from unstructured.partition.pdf import partition_pdf
from unstructured.documents.elements import (
    Text, Title, NarrativeText, ListItem, 
    Table, Image
)

# Suppress specific warnings
warnings.filterwarnings('ignore', category=UserWarning, message='.*gray.*color.*')
warnings.filterwarnings('ignore', message='Xet Storage is enabled.*')

class DataIngestor:
    def __init__(
        self,
        astra_db_token: Optional[str] = None,
        astra_db_endpoint: Optional[str] = None,
        collection_name: str = "medical_documents",
        embedding_model_name: str = "all-MiniLM-L6-v2",
        chunk_size: int = 1000,
        chunk_overlap: int = 200,
        device: str = "cpu",
        include_images: bool = False,
        include_tables: bool = True,
        strategy: str = "fast",
        verbose: bool = False
    ):
        """
        Initialize the data ingestor
        
        Args:
            astra_db_token (str): AstraDB token. If None, will try to get from env
            astra_db_endpoint (str): AstraDB endpoint. If None, will try to get from env
            collection_name (str): Name of the collection to store documents
            embedding_model_name (str): Name of the HuggingFace embedding model
            chunk_size (int): Size of text chunks
            chunk_overlap (int): Overlap between chunks
            device (str): Device to run embeddings on ('cpu' or 'cuda')
            include_images (bool): Whether to include image descriptions
            include_tables (bool): Whether to include table content
            strategy (str): PDF processing strategy ('fast' or 'ocr_only' or 'hi_res')
            verbose (bool): Whether to print detailed processing information
        """
        self.verbose = verbose
        
        # Load environment variables if needed
        if astra_db_token is None or astra_db_endpoint is None:
            load_dotenv()
            astra_db_token = astra_db_token or os.getenv("ASTRA_DB_APP_TOKEN")
            astra_db_endpoint = astra_db_endpoint or os.getenv("ASTRA_DB_API_ENDPOINT")
            
        if not astra_db_token or not astra_db_endpoint:
            raise ValueError("AstraDB token and endpoint must be provided either as parameters or in .env file")
        
        try:
            # Initialize embedding model
            self.embeddings = HuggingFaceEmbeddings(
                model_name=embedding_model_name,
                model_kwargs={'device': device},
                encode_kwargs={'normalize_embeddings': True}
            )
            
            # Initialize vector store
            self.vectorstore = AstraDBVectorStore(
                embedding=self.embeddings,
                collection_name=collection_name,
                api_endpoint=astra_db_endpoint,
                token=astra_db_token
            )
            
        except Exception as e:
            raise RuntimeError(f"Error initializing components: {str(e)}")
        
        # Initialize text splitter
        self.text_splitter = RecursiveCharacterTextSplitter(
            chunk_size=chunk_size,
            chunk_overlap=chunk_overlap,
            length_function=len
        )
        
        self.collection_name = collection_name
        self.include_images = include_images
        self.include_tables = include_tables
        self.strategy = strategy

    def process_pdf(self, pdf_path: str) -> List[Document]:
        """Process a single PDF file with advanced parsing"""
        if not os.path.exists(pdf_path):
            raise FileNotFoundError(f"PDF file not found: {pdf_path}")
        
        try:
            # Extract elements from PDF using unstructured
            with warnings.catch_warnings():
                warnings.simplefilter("ignore")
                elements = partition_pdf(
                    pdf_path,
                    strategy=self.strategy,
                    extract_images_in_pdf=self.include_images,
                    extract_tables=self.include_tables,
                    use_ocr=True if self.strategy in ['ocr_only', 'hi_res'] else False
                )
            
            if not elements:
                if self.verbose:
                    print(f"Warning: No elements extracted from {pdf_path}")
                return []
            
            # Combine elements into structured text
            combined_text = []
            for element in elements:
                try:
                    if isinstance(element, (Text, NarrativeText, Title, ListItem)):
                        if element.text.strip():  # Only add non-empty text
                            combined_text.append(element.text)
                    elif isinstance(element, Table) and self.include_tables:
                        table_text = element.text.strip()
                        if table_text:
                            combined_text.append(f"Table content: {table_text}")
                    elif isinstance(element, Image) and self.include_images:
                        if hasattr(element, 'caption') and element.caption:
                            combined_text.append(f"Image caption: {element.caption}")
                except Exception as e:
                    if self.verbose:
                        print(f"Warning: Error processing element in {pdf_path}: {str(e)}")
                    continue
            
            if not combined_text:
                if self.verbose:
                    print(f"Warning: No text content extracted from {pdf_path}")
                return []
            
            # Join all text elements
            full_text = "\n".join(combined_text)
            
            # Split text into chunks
            texts = self.text_splitter.split_text(full_text)
            
            # Create documents with metadata
            documents = []
            for i, text_chunk in enumerate(texts):
                if text_chunk.strip():  # Only add non-empty chunks
                    doc = Document(
                        page_content=text_chunk,
                        metadata={
                            "source": pdf_path,
                            "chunk_id": i,
                            "file_type": "pdf",
                            "processing_strategy": self.strategy
                        }
                    )
                    documents.append(doc)
            
            return documents
            
        except Exception as e:
            if self.verbose:
                print(f"Error processing {pdf_path}: {str(e)}")
            return []

    def process_folder(self, folder_path: str) -> None:
        """Process all PDF files in a folder"""
        if not os.path.exists(folder_path):
            raise ValueError(f"Folder path does not exist: {folder_path}")
            
        # Get all PDF files
        pdf_files = []
        for file in os.listdir(folder_path):
            if file.lower().endswith('.pdf'):
                pdf_files.append(os.path.join(folder_path, file))
        
        if not pdf_files:
            raise ValueError(f"No PDF files found in folder: {folder_path}")
            
        # Process each PDF
        all_documents = []
        for pdf_path in pdf_files:
            try:
                print(f"Processing {pdf_path}...")
                documents = self.process_pdf(pdf_path)
                all_documents.extend(documents)
                print(f"Extracted {len(documents)} chunks from {pdf_path}")
            except Exception as e:
                print(f"Error processing {pdf_path}: {str(e)}")
                continue
        
        # Store all documents
        if all_documents:
            print(f"\nStoring {len(all_documents)} documents in collection '{self.collection_name}'...")
            self.vectorstore.add_documents(all_documents)
            print("Upload completed successfully!")
        else:
            print("No documents to store!")

def main():
    parser = argparse.ArgumentParser(description="Ingest documents to AstraDB")
    parser.add_argument("--folder", type=str, required=True, help="Path to folder containing documents")
    parser.add_argument("--collection", type=str, default="medical_documents", help="Name of AstraDB collection")
    parser.add_argument("--chunk-size", type=int, default=1000, help="Size of text chunks")
    parser.add_argument("--chunk-overlap", type=int, default=200, help="Overlap between chunks")
    parser.add_argument("--device", type=str, default="cpu", choices=["cpu", "cuda"], help="Device for embeddings")
    parser.add_argument("--model", type=str, default="all-MiniLM-L6-v2", help="Embedding model name")
    parser.add_argument("--strategy", type=str, default="fast", choices=["fast", "ocr_only", "hi_res"], 
                      help="PDF processing strategy")
    parser.add_argument("--include-images", action="store_true", help="Include image captions")
    parser.add_argument("--include-tables", action="store_true", help="Include table content")
    
    args = parser.parse_args()
    
    try:
        ingestor = DataIngestor(
            collection_name=args.collection,
            embedding_model_name=args.model,
            chunk_size=args.chunk_size,
            chunk_overlap=args.chunk_overlap,
            device=args.device,
            include_images=args.include_images,
            include_tables=args.include_tables,
            strategy=args.strategy
        )
        
        ingestor.process_folder(args.folder)
        
    except Exception as e:
        print(f"Error: {str(e)}")

if __name__ == "__main__":
    main() 