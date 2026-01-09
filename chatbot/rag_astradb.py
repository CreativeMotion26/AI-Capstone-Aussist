import os
import re
import time
from typing import Dict, List, Any, Optional
from dotenv import load_dotenv
from langchain_openai import ChatOpenAI
from langchain.chains import ConversationalRetrievalChain
from langchain.memory import ConversationBufferMemory
from langchain.prompts import PromptTemplate
from astra_db import AstraDB

# Constants
MEMORY_KEY = "chat_history"

# Define the prompt template
PROMPT_TEMPLATE = """You are a multilingual medical assistant capable of understanding and responding in English, Vietnamese, and Korean.
Always respond in the same language as the user's question.
You should provide accurate and helpful medical information based on the context provided.

Context: {context}
Chat History: {chat_history}
Question: {question}

Please provide a helpful answer based on the context above:"""


class MultilingualMedicalBot:
    def __init__(self, model_name: str = "gpt-3.5-turbo-0125"):
        
        # Load environment variables
        load_dotenv()
        
        # Get AstraDB credentials
        astra_token = os.getenv("ASTRA_DB_APP_TOKEN")
        astra_endpoint = os.getenv("ASTRA_DB_API_ENDPOINT")
        
        if not astra_token or not astra_endpoint:
            raise ValueError("Please set ASTRA_DB_APP_TOKEN and ASTRA_DB_API_ENDPOINT in .env file")
        
        # Initialize AstraDB connection
        self.data_processor = AstraDB(
            astra_db_app_token=astra_token,
            astra_db_api_endpoint=astra_endpoint,
            collection_name="medical_documents"
        )
        
        # Initialize LLM
        self.llm = ChatOpenAI(
            model_name=model_name,
            temperature=0.7
        )
        
        # Initialize memory
        self.memory = ConversationBufferMemory(
            memory_key=MEMORY_KEY,
            output_key="answer",
            return_messages=True
        )
        
        # Create prompt template
        prompt = PromptTemplate(
            template=PROMPT_TEMPLATE,
            input_variables=['context', 'chat_history', 'question']
        )

        # Initialize conversation chain
        self.chain = ConversationalRetrievalChain.from_llm(
            llm=self.llm,
            retriever=self.data_processor.vectorstore.as_retriever(),
            memory=self.memory,
            return_source_documents=True,
            combine_docs_chain_kwargs={'prompt': prompt}
        )
        
        print("Medical bot initialized and connected to AstraDB.")

    # Ask a question to the medical bot
    def ask(self, question: str) -> dict:

        try:
            response = self.chain.invoke({
                "question": question
            })
            
            # Extract source documents information
            sources = []
            for doc in response.get('source_documents', []):
                sources.append({
                    'content': doc.page_content[:200] + "...",
                    'source': doc.metadata.get('source', 'Unknown'),
                    'chunk_id': doc.metadata.get('chunk_id', 'Unknown')
                })
            
            return {
                'answer': response['answer'],
                'sources': sources
            }
            
        except Exception as e:
            return {
                'answer': f"Error processing question: {str(e)}",
                'sources': []
            }

def main():
    # Initialize bot
    print("Initializing medical bot...")
    bot = MultilingualMedicalBot()
    
    try:
        # Interactive chat loop
        print("\nBot is ready! Type 'quit' to exit.")
        print("You can ask medical questions in English, Vietnamese, or Korean.")
        
        while True:
            question = input("\nYour question: ")
            if question.lower() == 'quit':
                break
                
            response = bot.ask(question)
            
            # Print the answer
            print("\nBot:", response['answer'])
            
            # Print sources if available
            if response['sources']:
                print("\nSources used:")
                for i, source in enumerate(response['sources'], 1):
                    print(f"\n{i}. From document: {source['source']}")
                    print(f"Content snippet: {source['content']}")
            
    except Exception as e:
        print(f"\nError: {str(e)}")

if __name__ == "__main__":
    main()