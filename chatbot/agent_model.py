<<<<<<< HEAD
 
=======
import os
import re
import json
from typing import Dict, List, Any, Optional, Tuple, Union

from dotenv import load_dotenv
from langchain_openai import ChatOpenAI
from langchain_core.agents import AgentAction
from langchain.agents import AgentExecutor, create_openai_functions_agent
from langchain.memory import ConversationBufferMemory
from langchain.prompts import MessagesPlaceholder, ChatPromptTemplate
from langchain.schema import Document
from langchain.schema.runnable import Runnable
from langchain.tools import StructuredTool
from pydantic import BaseModel, Field
from langchain.chains import LLMChain

from astra_db import AstraDB

# Load environment variables
load_dotenv()

# Define tool input schemas
class TranslateInput(BaseModel):
    """Input for translation."""
    text: str = Field(..., description="Text to translate")
    target_language: str = Field(..., description="Target language (e.g., 'Korean', 'Vietnamese', 'English')")

class EmergencyCallInput(BaseModel):
    """Input for emergency calling."""
    emergency_type: str = Field(..., description="Type of emergency (e.g., 'medical', 'fire', 'police')")

class NavigateInput(BaseModel):
    """Input for navigation within the app."""
    destination: str = Field(..., description="Destination page (e.g., 'emergency', 'healthcare', 'symptoms', 'home', 'profile', 'translation', 'hospital', 'banking', 'education')")

class RetrieveMedicalInfoInput(BaseModel):
    """Input for medical information retrieval."""
    query: str = Field(..., description="The user's specific medical question or symptom to search for information, e.g., 'information on back pain', 'symptoms of flu'")

class AgenticMedicalBot:
    def __init__(self, model_name: str = "gpt-3.5-turbo"):
        # Load environment variables
        load_dotenv()
        
        # Get AstraDB credentials
        astra_token = os.getenv("ASTRA_DB_APP_TOKEN")
        astra_endpoint = os.getenv("ASTRA_DB_API_ENDPOINT")
        
        if not astra_token or not astra_endpoint:
            raise ValueError("Please set ASTRA_DB_APP_TOKEN and ASTRA_DB_API_ENDPOINT in .env file")
        
        # Initialize AstraDB connection for knowledge retrieval
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
        
        # Initialize memory with new format
        self.memory = ConversationBufferMemory(
            memory_key="chat_history",
            return_messages=True,
            output_key="output"
        )
        
        # Define tools using StructuredTool.from_function and lambdas
        self.translate_tool = StructuredTool.from_function(
            func=lambda text, target_language: self.translate(text, target_language),
            name="translate",
            description="Use to translate text for the user. Identify the 'text' to translate and the 'target_language'.",
            args_schema=TranslateInput
        )
        
        self.emergency_call_tool = StructuredTool.from_function(
            func=lambda emergency_type: self.emergency_call(emergency_type),
            name="emergency_call",
            description="Use to initiate an emergency call. Determine the 'emergency_type' (e.g., 'medical', 'fire', 'police') from the user's request. If not specified, ask or default to 'medical' for general emergencies.",
            args_schema=EmergencyCallInput
        )
        
        self.navigate_tool = StructuredTool.from_function(
            func=lambda destination: self.navigate_to_page(destination),
            name="navigate_to_page",
            description="Use to navigate to a specific page within the app. Identify the 'destination' page from the user's request (e.g., 'home', 'symptoms', 'hospital').",
            args_schema=NavigateInput
        )
        
        self.retrieve_info_tool = StructuredTool.from_function(
            func=lambda query: self.retrieve_medical_info(query),
            name="retrieve_medical_info",
            description="Use to retrieve medical information. The user's specific medical question, symptom, or topic (e.g. 'back pain', 'flu symptoms') should be used as the 'query' argument.",
            args_schema=RetrieveMedicalInfoInput
        )
        
        # Create tools list with bound tools
        self.tools = [
            self.translate_tool,
            self.emergency_call_tool,
            self.navigate_tool,
            self.retrieve_info_tool
        ]
        
        # Create agent prompt
        system_prompt = (
            "You are Aussist, a friendly and helpful AI assistant for the Aussist app. "
            "Your primary goal is to assist international users navigating healthcare and services in Australia. "
            "You can provide medical information, translations, help with emergency services, and navigate within the app. "
            "Always respond in the same language as the user's question. Be empathetic and clear in your responses."
            "\n\n TOOL USAGE GUIDELINES: \n"
            "- **retrieve_medical_info**: When a user asks for medical information (e.g., 'What about back pain?', 'Tell me about flu symptoms'), use their specific question or stated symptom as the 'query' argument. Do not invent queries. "
            "Example: User says 'I have a headache', use 'headache' as the query. "
            "Do not use this tool if the user is asking to call someone or navigate."
            "- **emergency_call**: When a user explicitly asks to call for an emergency or expresses an urgent need that requires emergency services (e.g., 'call an ambulance', 'I need help, it's a fire'). "
            "Determine the 'emergency_type' ('medical', 'fire', 'police') from the context. If the type isn't clear but it's an emergency, you can default to 'medical' or ask for clarification if appropriate. "
            "Example: User says 'Call for help, I think I broke my leg', infer 'medical' as emergency_type. "
            "- **navigate_to_page**: When a user asks to go to a section of the app (e.g., 'take me to symptoms page', 'show me emergency contacts', 'go to hospital finder'). "
            "Extract the 'destination' (e.g., 'symptoms', 'emergency', 'hospital') for the tool. "
            "- **translate**: When a user asks for translation (e.g., 'translate this to Korean', 'how to say hello in Vietnamese'). "
            "Identify the 'text' to be translated and the 'target_language'. "
            "\nIf you are unsure about any argument, ask the user for clarification before using a tool. "
            "After a tool is used that results in an [ACTION:...], this action will be performed by the app. Your response should confirm this or provide related information."
        )

        prompt = ChatPromptTemplate.from_messages([
            ("system", system_prompt),
            MessagesPlaceholder(variable_name="chat_history"),
            ("human", "{input}"),
            MessagesPlaceholder(variable_name="agent_scratchpad"),
        ])
        
        # Create agent
        self.agent = create_openai_functions_agent(
            llm=self.llm,
            tools=self.tools,
            prompt=prompt
        )
        
        # Create agent executor
        self.agent_executor = AgentExecutor(
            agent=self.agent,
            tools=self.tools,
            memory=self.memory,
            verbose=True,
            return_intermediate_steps=True,
            handle_parsing_errors=True
        )
        
        print("Agentic Medical Bot initialized with enhanced prompt and tool definitions.")

    def translate(self, text: str, target_language: str) -> str:
        """Translates text from one language to another."""
        return f"[ACTION:TRANSLATE] Translating the text: '{text}' to {target_language}"

    def emergency_call(self, emergency_type: str) -> str:
        """Initiates an emergency call based on the type of emergency."""
        emergency_numbers = {
            "medical": "000",
            "fire": "000",
            "police": "000",
            "general": "000",
            "non-urgent police": "131 444",
            "poisons": "13 11 26",
            "mental health": "13 11 14",
        }
        
        number = emergency_numbers.get(emergency_type.lower(), "000")
        return f"[ACTION:CALL] Initiating call to emergency service: {number} for {emergency_type} emergency"

    def navigate_to_page(self, destination: str) -> str:
        """Navigates to a different page within the app."""
        valid_destinations = {
            "emergency": "/(tabs)/emergency",
            "healthcare": "/(tabs)/healthcare",
            "symptoms": "/symptoms/index",
            "home": "/(tabs)",
            "profile": "/(tabs)/profile",
            "translation": "/(tabs)/translation",
            "hospital": "/symptoms/hospital",
            "banking": "/(tabs)/banking",
            "education": "/(tabs)/education"
        }
        
        dest_lower = destination.lower()
        if dest_lower in valid_destinations:
            return f"[ACTION:NAVIGATE] Navigating to {destination} page"
        else:
            return f"Could not directly navigate to {destination}. Please specify a valid page like {', '.join(valid_destinations.keys())}."

    def retrieve_medical_info(self, query: str) -> str:
        """Retrieves medical information based on the query."""
        try:
            docs = self.data_processor.similarity_search(query, k=3)
            
            if not docs:
                return "No specific medical information found for your query."
            
            # Combine the content from the documents
            context = "\n\n".join([doc.page_content for doc in docs])
            
            # Get sources for citation
            sources = list(set(doc.metadata.get('source', 'Unknown') for doc in docs))
            
            source_str = ", ".join(sources)
            return f"Based on the medical information: {context}\n\nSources: {source_str}"
            
        except Exception as e:
            return f"Error retrieving medical information: {str(e)}"

    def process_response(self, response: Dict[str, Any]) -> Dict[str, Any]:
        """Process the agent response, extracting actions from intermediate tool outputs."""
        processed_actions = []
        
        # Extract actions from the direct output of specific tools in intermediate_steps
        if "intermediate_steps" in response:
            for step in response.get("intermediate_steps", []):
                if isinstance(step, tuple) and len(step) == 2:
                    action_obj, observation = step # action_obj is AgentAction, observation is str
                    if isinstance(action_obj, AgentAction) and \
                       action_obj.tool in ["translate", "emergency_call", "navigate_to_page"]:
                        if isinstance(observation, str):
                            # Parse the observation string from these tools for [ACTION:...]
                            action_matches = re.finditer(r'\[ACTION:(\w+)\]\s+([^\[]+)', observation)
                            for match in action_matches:
                                processed_actions.append({
                                    "type": match.group(1),
                                    "content": match.group(2).strip()
                                })
        
        final_answer = response.get("output", "I'm sorry, I encountered an issue. Could you please rephrase?")
        if not final_answer and processed_actions: # If no text output but actions exist
            final_answer = f"Okay, I will perform the requested action: {processed_actions[0]['type']}."

        return {
            "answer": final_answer,
            "actions": processed_actions,
            "intermediate_steps": response.get("intermediate_steps", []), # For debugging or other uses
            "sources": self._extract_sources(response) # Sources from retrieve_medical_info
        }

    def _extract_sources(self, response: Dict[str, Any]) -> List[Dict[str, str]]:
        """Extract sources from the response."""
        sources = []
        
        # First, check if the direct output already contains pre-formatted sources 
        # (e.g. if the agent itself summarized them and put them in 'output')
        if "output" in response and isinstance(response["output"], str):
            text = response["output"]
            # This regex might need adjustment depending on how sources are formatted in the final output
            # For now, let's assume they are clearly marked.
            # Example: "Sources: source1.pdf, http://source2.com"
            source_block_match = re.search(r'Sources?: ([^\n]+)', text, re.IGNORECASE)
            if source_block_match:
                sources_list_str = source_block_match.group(1)
                sources_from_output = [s.strip() for s in sources_list_str.split(",")]
                for src in sources_from_output:
                    if src and not any(s_obj["source"] == src for s_obj in sources):
                        sources.append({"content": "Referenced document", "source": src, "url": src if src.startswith("http") else None})

        # Then, specifically check intermediate steps for output from retrieve_medical_info tool
        if "intermediate_steps" in response:
            for step in response.get("intermediate_steps", []):
                if isinstance(step, tuple) and len(step) == 2:
                    action_obj, observation = step
                    if isinstance(action_obj, AgentAction) and action_obj.tool == "retrieve_medical_info":
                        if isinstance(observation, str):
                            # The observation from retrieve_medical_info tool itself contains "Sources: ..."
                            obs_source_match = re.search(r'Sources?: ([^\n]+)', observation, re.IGNORECASE)
                            if obs_source_match:
                                obs_sources_list_str = obs_source_match.group(1)
                                obs_sources = [s.strip() for s in obs_sources_list_str.split(",")]
                                for src_item in obs_sources:
                                    if src_item and not any(s_obj["source"] == src_item for s_obj in sources):
                                        sources.append({
                                            "content": f"Medical information from {src_item}", 
                                            "source": src_item, 
                                            "url": src_item if src_item.startswith("http") else None
                                        })
        return sources

    async def aask(self, question: str) -> Dict[str, Any]:
        """Asynchronous version of ask for API usage."""
        try:
            # Run the agent
            response = await self.agent_executor.ainvoke({"input": question})
            
            # Process the response
            processed_response = self.process_response(response)
            
            return processed_response
        except Exception as e:
            # Log the full error for debugging
            print(f"Error in aask: {e}")
            import traceback
            traceback.print_exc()
            return {"answer": f"Error processing question: {str(e)}", "actions": [], "sources": []}

    def ask(self, question: str) -> Dict[str, Any]:
        """Ask a question to the agentic medical bot."""
        try:
            # Run the agent
            response = self.agent_executor.invoke({"input": question})
            
            # Process the response
            processed_response = self.process_response(response)
            
            return processed_response
        except Exception as e:
            print(f"Error in ask: {e}")
            import traceback
            traceback.print_exc()
            return {"answer": f"Error processing question: {str(e)}", "actions": [], "sources": []}

def main():
    # Initialize bot
    print("Initializing agentic medical bot...")
    bot = AgenticMedicalBot()
    
    try:
        # Interactive chat loop
        print("\nBot is ready! Type 'quit' to exit.")
        print("You can ask medical questions, request translation, emergency help, or navigation.")
        
        while True:
            question = input("\nYour question: ")
            if question.lower() == 'quit':
                break
                
            response = bot.ask(question)
            
            # Print the answer
            print("\nBot:", response['answer'])
            
            # Print actions if available
            if response['actions']:
                print("\nActions to be taken:")
                for action_item in response['actions']:
                    print(f"- {action_item['type']}: {action_item['content']}")
            
            # Print sources if available
            if response.get('sources'):
                print("\nSources used:")
                for i, source_item in enumerate(response['sources'], 1):
                    print(f"\n{i}. From: {source_item['source']}")
                    print(f"Content: {source_item['content']}{f' (URL: {source_item["url"]})' if source_item.get('url') else ''}")
            
    except Exception as e:
        print(f"\nError: {str(e)}")

if __name__ == "__main__":
    main() 
>>>>>>> ade7c50 (update)
