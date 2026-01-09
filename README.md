# Aussist App

Aussist is a mobile application designed to help **immigrants in Australia** access essential services and information quickly and easily. Built AI Agent App with **Expo (React Native) & LLMs **, the app features useful tools such as emergency contacts, healthcare services, translation support, and more — all in one place.
## File Structure

This project combines:
-  **React Native (Expo)** for the mobile UI
-  A **Python AI Chatbot backend** (agent + API)
- **RAG pipeline** with a vector database (Astra DB) to retrieve relevant knowledge before generating answers

---

## Key Features

### 🤖 AI Agent Chatbot (Backend)
- **Agent-driven conversation flow** (tool-like logic / orchestration via `agent_model.py`)
- **RAG-based answering**: retrieves relevant information from a vector database first, then responds
- API-ready design to connect with the mobile app UI

### 📚 RAG (Retrieval-Augmented Generation)
- Document ingestion pipeline for building a knowledge base
- Vector search retrieval to reduce hallucination and improve factual grounding
- Astra DB integration for storing embeddings + retrieval

### 📱 Mobile App (Frontend)
- Clean Expo app structure (tabs + screens)
- Built to integrate chatbot responses into the UX
- Designed for real-world immigrant support use cases

---

## High-Level Architecture

1) User asks a question in the app  
2) Mobile app calls the **Python API**  
3) API triggers the **AI Agent**  
4) Agent uses **RAG retrieval** (Astra DB vector search)  
5) Agent generates an answer using retrieved context  
6) App displays the response and action based on Agent's Answers

---

```
aussist/
├── app/                      # Main application code (Expo Router)
│   ├── (tabs)/               # Tab-based navigation screens
│   │   ├── _layout.tsx       # Tab navigation configuration
│   │   ├── index.tsx         # Home screen
│   │   ├── emergency.tsx     # Emergency services screen
│   │   ├── healthcare.tsx    # Healthcare services screen
│   │   ├── translation.tsx   # Translation services screen
│   │   └── profile.tsx       # User profile screen
│   ├── components/           # Reusable components
│   │   ├── ui/               # UI component library (Shadcn-inspired)
│   │   │   ├── Button.tsx    # Button component
│   │   │   └── Card.tsx      # Card component
│   │   ├── Header.tsx        # App header component
│   │   └── OnboardingPage.tsx # Onboarding screen component
│   ├── lib/                  # Shared utilities and helpers
│   │   ├── utils.ts          # Utility functions
│   │   └── theme.ts          # Theme configuration
│   ├── index.tsx             # Entry point / Splash screen
│   ├── onboarding.tsx        # Onboarding flow
│   ├── _layout.tsx           # Root navigation layout
│   └── +not-found.tsx        # 404 page
├── chatbot/ # Python AI Agent + RAG backend
│ ├── agent_model.py # AI Agent logic (orchestration + response generation)
│ ├── api.py # API routes / handlers (backend entrypoints)
│ ├── app.py # Backend app runner (server start)
│ ├── astra_db.py # Astra DB connector / DB utilities
│ ├── ingest.py # Data ingestion pipeline → embeddings → Astra DB
│ ├── rag_astradb.py # RAG retrieval logic (query → retrieve context)
│ ├── requirements.txt # Python backend dependencies
│ └── pycache/ # Python cache files
├── .env.example # Environment variable template
├── package.json # Frontend dependencies
├── assets/                   # Static assets (images, fonts)
│   └── images/               # Image assets
├── babel.config.js           # Babel configuration
└── tailwind.config.js        # Tailwind CSS configuration
```

## UI Components

The app uses a library of reusable UI components inspired by Shadcn UI:

- **Button**: Versatile button component with variants (default, destructive, outline, etc.) and sizes
- **Card**: Flexible card component with header, content, title, description, and footer sections

## Screens

- **Home**: Main landing page with language selection and service categories
- **Emergency**: Quick access to emergency contacts and symptom checker
- **Healthcare**: Find nearby hospitals and healthcare facilities
- **Translation**: Translation tools and services
- **Profile**: User profile management and settings

## Getting Started

1. Install dependencies:

   ```
   npm install
   ```

2. Start the development server:
   ```
   npx expo start
   ```
3. Backend (Python Chatbot)
  ```
   cd chatbot
   python -m venv venv
   source venv/bin/activate     # macOS / Linux
   venv\Scripts\activate        # Windows
   pip install -r requirements.txt
   ```
---

### RAG Pipeline Explained (What the chatbot folder does)
#### ingest.py — Build the knowledge base

Takes documents / knowledge sources

Converts them into embeddings

Stores them in Astra DB as vectors for retrieval

#### rag_astradb.py — Retrieve context for a question

Accepts a user query

Searches Astra DB vectors to find the most relevant chunks

Returns contextual passages to ground the AI response

#### agent_model.py — AI Agent orchestration

Receives the user message

Calls the retrieval module (RAG)

Builds a final answer using both:

user question

retrieved context

#### api.py / app.py — API layer

Exposes chatbot endpoints

Connects frontend ↔ agent ↔ database

---

## Styling

Access this link for viewing the demo and guide since the size of demo video is too big!
https://drive.google.com/drive/folders/1RgBwmBP6o3-1CpreVCB5JIAxL_rSoNit?usp=sharing
