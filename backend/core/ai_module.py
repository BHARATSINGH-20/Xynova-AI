import os
from groq import Groq
from dotenv import load_dotenv
from pathlib import Path

# Load .env from root
env_path = Path(__file__).resolve().parent.parent / ".env"
load_dotenv(dotenv_path=env_path)

api_key = os.getenv("GROQ_API_KEY")

print("Loaded API KEY:", api_key)

client = Groq(api_key=api_key)


def ask_groq(prompt: str) -> str:
    try:
        response = client.chat.completions.create(
          model="llama-3.1-8b-instant",
            messages=[
                {"role": "system", "content": "You are XYNOVA, an intelligent AI assistant."},
                {"role": "user", "content": prompt}
            ],
        )

        return response.choices[0].message.content

    except Exception as e:
        print("Groq Error:", e)
        return f"Error: {str(e)}"