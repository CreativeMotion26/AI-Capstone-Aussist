#!/usr/bin/env python3
"""
Script to ingest documents into AstraDB vector store.
"""

import argparse
from database import AstraVectorStore, DataIngestor

def main():
    parser = argparse.ArgumentParser(description="Ingest documents to AstraDB vector store")
    
    # Vector store arguments
    parser.add_argument("--collection", type=str, default="medical_documents",
                      help="Name of AstraDB collection")
    parser.add_argument("--model", type=str, default="all-MiniLM-L6-v2",
                      help="Name of the embedding model")
    parser.add_argument("--device", type=str, default="cpu",
                      choices=["cpu", "cuda"],
                      help="Device to run embeddings on")
    
    # Data ingestion arguments
    parser.add_argument("--folder", type=str, required=True,
                      help="Path to folder containing documents")
    parser.add_argument("--chunk-size", type=int, default=1000,
                      help="Size of text chunks")
    parser.add_argument("--chunk-overlap", type=int, default=200,
                      help="Overlap between chunks")
    parser.add_argument("--strategy", type=str, default="fast",
                      choices=["fast", "ocr_only", "hi_res"],
                      help="PDF processing strategy")
    parser.add_argument("--include-images", action="store_true",
                      help="Include image captions")
    parser.add_argument("--include-tables", action="store_true",
                      help="Include table content")
    parser.add_argument("--verbose", action="store_true",
                      help="Print detailed processing information")
    
    args = parser.parse_args()
    
    try:
        # Initialize vector store
        vector_store = AstraVectorStore(
            collection_name=args.collection,
            embedding_model_name=args.model,
            device=args.device
        )
        
        # Initialize data ingestor
        ingestor = DataIngestor(
            vector_store=vector_store,
            chunk_size=args.chunk_size,
            chunk_overlap=args.chunk_overlap,
            include_images=args.include_images,
            include_tables=args.include_tables,
            strategy=args.strategy,
            verbose=args.verbose
        )
        
        # Process documents
        ingestor.process_folder(args.folder)
        
    except Exception as e:
        print(f"Error: {str(e)}")

if __name__ == "__main__":
    main() 