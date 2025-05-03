import os
from dotenv import load_dotenv
from astra_db import AstraDB

def get_pdf_files_from_folder(folder_path: str) -> list:
    """Get all PDF files from a folder"""
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
    # Load environment variables
    load_dotenv()
    
    # Get AstraDB credentials from environment variables
    astra_token = os.getenv("ASTRA_DB_APP_TOKEN")
    astra_endpoint = os.getenv("ASTRA_DB_API_ENDPOINT")
    
    if not astra_token or not astra_endpoint:
        raise ValueError("Please set ASTRA_DB_APP_TOKEN and ASTRA_DB_API_ENDPOINT in .env file")
    
    # Initialize AstraDB processor
    processor = AstraDB(
        astra_db_app_token=astra_token,
        astra_db_api_endpoint=astra_endpoint,
        collection_name="test_medical_docs"  # Using a test collection
    )
    
    try:
        # Get folder path from user
        folder_path = input("Enter the path to your PDF folder: ")
        pdf_files = get_pdf_files_from_folder(folder_path)
        
        print(f"\nFound {len(pdf_files)} PDF files:")
        for file in pdf_files:
            print(f"- {file}")
            
        # Process and store PDFs
        print("\nProcessing and storing documents...")
        processor.process_and_store_pdfs(pdf_files)
        
        # Get collection stats
        stats = processor.get_collection_stats()
        print("\nCollection Statistics:")
        for key, value in stats.items():
            print(f"{key}: {value}")
        
        # Test similarity search
        print("\nTesting similarity search...")
        test_query = input("Enter a test query (or press Enter to skip): ")
        if test_query:
            results = processor.similarity_search(test_query)
            print(f"\nFound {len(results)} relevant documents:")
            for i, doc in enumerate(results, 1):
                print(f"\nDocument {i}:")
                print(f"Content: {doc.page_content[:200]}...")  # Show first 200 chars
                print(f"Source: {doc.metadata.get('source')}")
                print(f"Chunk ID: {doc.metadata.get('chunk_id')}")
        
        # Ask if user wants to delete the test collection
        delete = input("\nDo you want to delete the test collection? (yes/no): ")
        if delete.lower() == 'yes':
            processor.delete_collection()
            
    except Exception as e:
        print(f"\nError: {str(e)}")

if __name__ == "__main__":
    # Load environment variables
    load_dotenv()
    
    # Get AstraDB credentials from environment variables
    astra_token = os.getenv("ASTRA_DB_APP_TOKEN")
    astra_endpoint = os.getenv("ASTRA_DB_API_ENDPOINT")
    
    # Initialize AstraDB processor
    processor = AstraDB(
        astra_db_app_token=astra_token,
        astra_db_api_endpoint=astra_endpoint,
        collection_name="test_medical_docs"  # Using a test collection
    )
    
    stats = processor.get_collection_stats()
    print("\nCollection Statistics:")
    for key, value in stats.items():
        print(f"{key}: {value}")

    # Test similarity search
    print("\nTesting similarity search...")
    test_query = input("Enter a test query (or press Enter to skip): ")
    if test_query:
        results = processor.similarity_search(test_query)
        print(f"\nFound {len(results)} relevant documents:")
        for i, doc in enumerate(results, 1):
            print(f"\nDocument {i}:")
            print(f"Content: {doc.page_content[:200]}...")  # Show first 200 chars
            print(f"Source: {doc.metadata.get('source')}")
            print(f"Chunk ID: {doc.metadata.get('chunk_id')}")
    
    # Ask if user wants to delete the test collection
    delete = input("\nDo you want to delete the test collection? (yes/no): ")
    if delete.lower() == 'yes':
        processor.delete_collection()
    