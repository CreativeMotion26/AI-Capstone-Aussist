"""
Vector store operations using AstraDB.
"""

import os
from typing import Optional, List
from dotenv import load_dotenv
from langchain.schema import Document
from langchain_astradb import AstraDBVectorStore
from langchain_huggingface import HuggingFaceEmbeddings

class AstraVectorStore:
    """Handle vector store operations with AstraDB."""
    
    def __init__(
        self,
        collection_name: str,
        embedding_model_name: str = "all-MiniLM-L6-v2",
        astra_db_token: Optional[str] = None,
        astra_db_endpoint: Optional[str] = None,
        device: str = "cpu"
    ):
        """
        Initialize AstraDB vector store.
        
        Args:
            collection_name (str): Name of the collection in AstraDB
            embedding_model_name (str): Name of the embedding model to use
            astra_db_token (str, optional): AstraDB token. If None, will try to get from env
            astra_db_endpoint (str, optional): AstraDB endpoint. If None, will try to get from env
            device (str): Device to run embeddings on ('cpu' or 'cuda')
        """
        # Load credentials from environment if not provided
        if astra_db_token is None or astra_db_endpoint is None:
            load_dotenv()
            astra_db_token = astra_db_token or os.getenv("ASTRA_DB_APP_TOKEN")
            astra_db_endpoint = astra_db_endpoint or os.getenv("ASTRA_DB_API_ENDPOINT")
            
        if not astra_db_token or not astra_db_endpoint:
            raise ValueError("AstraDB token and endpoint must be provided either as parameters or in .env file")
        
        # Initialize embedding model
        self.embeddings = HuggingFaceEmbeddings(
            model_name=embedding_model_name,
            model_kwargs={'device': device},
            encode_kwargs={'normalize_embeddings': True}
        )
        
        # Initialize vector store
        self.store = AstraDBVectorStore(
            embedding=self.embeddings,
            collection_name=collection_name,
            api_endpoint=astra_db_endpoint,
            token=astra_db_token
        )
        
        self.collection_name = collection_name
    
    def add_documents(self, documents: List[Document]) -> None:
        """
        Add documents to the vector store.
        
        Args:
            documents (List[Document]): List of documents to add
        """
        if not documents:
            raise ValueError("No documents provided")
            
        self.store.add_documents(documents)
    
    def similarity_search(
        self,
        query: str,
        k: int = 4,
        filter: Optional[dict] = None
    ) -> List[Document]:
        """
        Perform similarity search.
        
        Args:
            query (str): Query text
            k (int): Number of documents to return
            filter (dict, optional): Filter to apply to the search
            
        Returns:
            List[Document]: List of similar documents
        """
        return self.store.similarity_search(
            query,
            k=k,
            filter=filter
        )
    
    def delete_collection(self) -> None:
        """Delete the entire collection."""
        self.store.delete_collection()
    
    def as_retriever(self, **kwargs):
        """
        Get the vector store as a retriever.
        
        Args:
            **kwargs: Additional arguments to pass to the retriever
            
        Returns:
            Retriever: The vector store as a retriever
        """
        return self.store.as_retriever(**kwargs) 