from fastapi import FastAPI
from pydantic import BaseModel
from openai import OpenAI
from dotenv import load_dotenv
from pathlib import Path
import os

_env_dir = Path(__file__).resolve().parent
# Standard .env, then key.env (this repo uses key.env for local secrets)
load_dotenv(_env_dir / ".env")
load_dotenv(_env_dir / "key.env")

# === READ ENV VARIABLES ===
GROQ_API_KEY = os.environ.get("GROQ_API_KEY")
if not GROQ_API_KEY:
    raise RuntimeError("GROQ_API_KEY is not set in environment or .env file.")

# If model is not set, use default Groq free model
GROQ_MODEL = os.environ.get("GROQ_MODEL", "groq/compound-mini")

# === INIT CLIENT ===
client = OpenAI(
    api_key=GROQ_API_KEY,
    base_url="https://api.groq.com/openai/v1"
)

# === APP ===
app = FastAPI()

PROMPT_TEMPLATE = """
Given a list of ingredients, suggest 3 different recipes that can be made with them.

Format using Markdown.

For each recipe include:

### Recipe Name
Description

Key Steps:
1. step
2. step
3. step

Approximate Time
Optional Substitutions

Ingredients:
{ingredients}
"""

# === Pydantic Request Model ===
class IngredientRequest(BaseModel):
    ingredients: str

# === Generate Recipes Function ===
def generate_recipes(ingredients: str):
    prompt = PROMPT_TEMPLATE.format(ingredients=ingredients)
    response = client.chat.completions.create(
        model=GROQ_MODEL,
        messages=[
            {"role": "system", "content": "You are a helpful cooking assistant."},
            {"role": "user", "content": prompt}
        ],
        temperature=0.8,
        max_tokens=650
    )
    return response.choices[0].message.content

# === Routes ===
@app.get("/")
def home():
    return {"message": "Recipe AI API running"}

@app.post("/recipes")
def get_recipes(request: IngredientRequest):
    try:
        recipes = generate_recipes(request.ingredients)
        return {
            "ingredients": request.ingredients,
            "recipes": recipes
        }
    except Exception as e:
        return {"error": str(e)}