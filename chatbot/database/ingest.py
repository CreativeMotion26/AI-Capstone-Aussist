"""
Data ingestion operations for processing and storing documents.
"""

import os
import warnings
from typing import List, Optional
from langchain.text_splitter import RecursiveCharacterTextSplitter
from langchain.schema import Document
from unstructured.partition.pdf import partition_pdf
from unstructured.documents.elements import (
    Text, Title, NarrativeText, ListItem, 
    Table, Image
)

from .vector_store import AstraVectorStore

class DataIngestor:
    """Handle document processing and ingestion operations."""
    
    def __init__(
        self,
        vector_store: AstraVectorStore,
        chunk_size: int = 1000,
        chunk_overlap: int = 200,
        include_images: bool = False,
        include_tables: bool = True,
        strategy: str = "fast",
        verbose: bool = False
    ):
        """
        Initialize the data ingestor.
        
        Args:
            vector_store (AstraVectorStore): Vector store instance
            chunk_size (int): Size of text chunks
            chunk_overlap (int): Overlap between chunks
            include_images (bool): Whether to include image descriptions
            include_tables (bool): Whether to include table content
            strategy (str): PDF processing strategy ('fast' or 'ocr_only' or 'hi_res')
            verbose (bool): Whether to print detailed processing information
        """
        self.vector_store = vector_store
        self.verbose = verbose
        
        # Initialize text splitter
        self.text_splitter = RecursiveCharacterTextSplitter(
            chunk_size=chunk_size,
            chunk_overlap=chunk_overlap,
            length_function=len
        )
        
        self.include_images = include_images
        self.include_tables = include_tables
        self.strategy = strategy
        
        # Suppress specific warnings
        warnings.filterwarnings('ignore', category=UserWarning, message='.*gray.*color.*')
        warnings.filterwarnings('ignore', message='Xet Storage is enabled.*')

    def process_pdf(self, pdf_path: str) -> List[Document]:
        """
        Process a single PDF file.
        
        Args:
            pdf_path (str): Path to the PDF file
            
        Returns:
            List[Document]: List of processed documents
        """
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
        """
        Process all PDF files in a folder and store them in the vector store.
        
        Args:
            folder_path (str): Path to the folder containing PDF files
        """
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
            print(f"\nStoring {len(all_documents)} documents in collection '{self.vector_store.collection_name}'...")
            self.vector_store.add_documents(all_documents)
            print("Upload completed successfully!")
        else:
            print("No documents to store!") 