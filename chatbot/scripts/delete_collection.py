#!/usr/bin/env python3
"""
Script to delete a collection from AstraDB vector store.
"""

import argparse
from database import AstraVectorStore

def main():
    parser = argparse.ArgumentParser(description="Delete a collection from AstraDB vector store")
    
    # Vector store arguments
    parser.add_argument("--collection", type=str, required=True,
                      help="Name of the collection to delete")
    parser.add_argument("--model", type=str, default="all-MiniLM-L6-v2",
                      help="Name of the embedding model (needed for store initialization)")
    parser.add_argument("--device", type=str, default="cpu",
                      choices=["cpu", "cuda"],
                      help="Device to run embeddings on")
    parser.add_argument("--force", action="store_true",
                      help="Skip confirmation prompt")
    
    args = parser.parse_args()
    
    try:
        if not args.force:
            confirmation = input(f"Are you sure you want to delete collection '{args.collection}'? This action cannot be undone. [y/N]: ")
            if confirmation.lower() != 'y':
                print("Operation cancelled.")
                return
        
        # Initialize vector store
        vector_store = AstraVectorStore(
            collection_name=args.collection,
            embedding_model_name=args.model,
            device=args.device
        )
        
        # Delete collection
        print(f"Deleting collection '{args.collection}'...")
        vector_store.delete_collection()
        print("Collection deleted successfully!")
        
    except Exception as e:
        print(f"Error: {str(e)}")

if __name__ == "__main__":
    main() 