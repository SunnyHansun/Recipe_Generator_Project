# AI Recipe Suggester (Groq API)

Web API and React frontend that suggest recipes from ingredients using Groq’s OpenAI-compatible API.

## Features

- Enter or arrange ingredients (frontend)
- AI suggests multiple recipes with Markdown formatting (name, description, steps, time, substitutions)
- FastAPI backend with `POST /recipes`

## Requirements

- Python 3.8+
- Node.js (for the `frontend/` app)
- Groq API key
- Python packages in `requirements.txt`

## Backend setup

1. Clone or download the project.

2. Install Python dependencies:

    pip install -r requirements.txt

3. Get a free API key from [Groq Console](https://console.groq.com).

4. Set environment variables in a `.env` or `key.env` file next to `backend.py`:

    export GROQ_API_KEY=""

    Optional:

    GROQ_MODEL=groq/compound-mini

5. From the project root, run the API:

    uvicorn backend:app --reload

- `GET /` — health message  
- `POST /recipes` — JSON body `{"ingredients": "eggs, milk, flour"}` → `ingredients` + `recipes` (Markdown string)

## Frontend

From `frontend/`:

    npm install
    npm run dev

## Project structure

    Recipe_Project/
    ├── backend.py
    ├── requirements.txt
    ├── README.md
    └── frontend/
        └── ...

## License

This project is for personal usage
