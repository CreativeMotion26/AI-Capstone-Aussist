import time
from datetime import datetime
from typing import Dict, List, Optional, Union

import uvicorn
from fastapi import FastAPI, HTTPException, Request, status
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse
from pydantic import BaseModel, Field

from agent_model import AgenticMedicalBot

# Initialize FastAPI app with metadata
app = FastAPI(
    title="Agentic Medical Chatbot API",
    description="API for Agentic Medical Chatbot with tool capabilities",
    version="1.1.0",
    docs_url="/docs",
    redoc_url="/redoc",
    openapi_url="/openapi.json"
)

# Add CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Rate limiting configuration
RATE_LIMIT = 100  # requests per minute
RATE_LIMIT_WINDOW = 60  # seconds

# Store request counts
request_counts: Dict[str, List[float]] = {}

# Initialize the bot
bot = AgenticMedicalBot()

class ChatRequest(BaseModel):
    question: str = Field(..., min_length=1, max_length=500, description="The question to ask the chatbot")

class ActionItem(BaseModel):
    type: str = Field(..., description="Type of action to take (e.g., 'CALL', 'NAVIGATE', 'TRANSLATE')")
    content: str = Field(..., description="Content of the action")

class SourceDocument(BaseModel):
    content: str = Field(..., description="Content snippet from the source document")
    source: str = Field(..., description="Source of the document")
    url: Optional[str] = Field(None, description="URL to the source document")
    chunk_id: Optional[Union[str, int]] = Field(None, description="Unique identifier for the document chunk")
    relevance_score: Optional[float] = Field(None, description="Relevance score of the document")

class ChatResponse(BaseModel):
    answer: str = Field(..., description="The chatbot's response")
    actions: List[ActionItem] = Field(default=[], description="List of actions to take")
    sources: List[SourceDocument] = Field(default=[], description="List of source documents used")
    processing_time: float = Field(..., description="Time taken to process the request in seconds")
    timestamp: datetime = Field(..., description="Timestamp of the response")

class ErrorResponse(BaseModel):
    detail: str = Field(..., description="Error message")
    code: str = Field(..., description="Error code")
    timestamp: datetime = Field(..., description="Timestamp of the error")

# Rate limiting middleware
def check_rate_limit(client_ip: str) -> None:
    current_time = time.time()
    
    # Initialize or clean up old requests
    if client_ip not in request_counts:
        request_counts[client_ip] = []
    request_counts[client_ip] = [t for t in request_counts[client_ip] 
                               if current_time - t < RATE_LIMIT_WINDOW]
    
    # Check rate limit
    if len(request_counts[client_ip]) >= RATE_LIMIT:
        raise HTTPException(
            status_code=status.HTTP_429_TOO_MANY_REQUESTS,
            detail="Rate limit exceeded. Please try again later."
        )
    
    # Add current request
    request_counts[client_ip].append(current_time)

# Root endpoint with API information
@app.get("/", tags=["Root"])
async def root():
    return {
        "message": "Welcome to Agentic Medical Chatbot API",
        "version": app.version,
        "documentation": {
            "swagger": "/docs",
            "redoc": "/redoc",
            "openapi": "/openapi.json"
        },
        "endpoints": {
            "/chat": "POST - Send questions to the chatbot",
            "/health": "GET - Check API health status",
            "/metrics": "GET - API usage metrics"
        }
    }

# Send a question to the chatbot and get a response
@app.post("/chat", 
         response_model=ChatResponse,
         responses={
             400: {"model": ErrorResponse, "description": "Bad Request"},
             429: {"model": ErrorResponse, "description": "Rate Limit Exceeded"},
             500: {"model": ErrorResponse, "description": "Internal Server Error"}
         },
         tags=["Chat"])
async def chat(request: ChatRequest, req: Request):
    """Send a question to the chatbot and get a response with actions"""
    # Check rate limit
    client_ip = req.client.host
    check_rate_limit(client_ip)
    
    start_time = time.time()
    try:
        response = await bot.aask(request.question)
        
        # Process sources into the expected format
        sources = []
        for source in response.get('sources', []):
            source_doc = {
                "content": source.get("content", ""),
                "source": source.get("source", "Unknown"),
                "url": source.get("url", None)
            }
            
            # Add chunk_id if available
            if "chunk_id" in source:
                source_doc["chunk_id"] = source["chunk_id"]
                
            sources.append(source_doc)
        
        return ChatResponse(
            answer=response['answer'],
            actions=response.get('actions', []),
            sources=sources,
            processing_time=time.time() - start_time,
            timestamp=datetime.now()
        )
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=str(e)
        )

# Health check endpoint
@app.get("/health", 
         tags=["System"],
         response_model=Dict[str, str])
async def health_check():
    return {
        "status": "healthy",
        "timestamp": datetime.now().isoformat(),
        "version": app.version
    }

# Get API usage metrics
@app.get("/metrics", 
         tags=["System"],
         response_model=Dict[str, Union[int, Dict[str, int]]])
async def get_metrics():
    return {
        "total_requests": sum(len(requests) for requests in request_counts.values()),
        "active_clients": len(request_counts),
        "requests_per_client": {
            ip: len(requests) for ip, requests in request_counts.items()
        }
    }

# Global exception handler for HTTP exceptions
@app.exception_handler(HTTPException)
async def http_exception_handler(request: Request, exc: HTTPException):
    return JSONResponse(
        status_code=exc.status_code,
        content=ErrorResponse(
            detail=exc.detail,
            code=f"HTTP_{exc.status_code}",
            timestamp=datetime.now()
        ).model_dump()
    )

# Global exception handler for unhandled exceptions
@app.exception_handler(Exception)
async def general_exception_handler(request: Request, exc: Exception):
    return JSONResponse(
        status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
        content=ErrorResponse(
            detail="Internal server error",
            code="INTERNAL_ERROR",
            timestamp=datetime.now()
        ).model_dump()
    )

if __name__ == "__main__":
    uvicorn.run(
        "api:app",
        host="0.0.0.0",
<<<<<<< Updated upstream
        port=8001,
=======
        port=8000,
>>>>>>> Stashed changes
        reload=True,
        workers=4,
        log_level="info"
    )