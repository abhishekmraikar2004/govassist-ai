import os
import google.generativeai as genai
from dotenv import load_dotenv

# Load environment variables
load_dotenv()

# Configure Gemini
genai.configure(api_key=os.getenv("GEMINI_API_KEY"))

# Create model
model = genai.GenerativeModel("gemini-2.5-flash")


def ask_gemini(prompt: str):
    """
    Send prompt to Gemini and return response.
    """
    try:
        response = model.generate_content(prompt)
        return response.text

    except Exception as e:
        return f"Error: {str(e)}"
    


def build_prompt(user, schemes):

    return f"""
You are an Indian Government Scheme Expert.

Citizen Details

Age : {user.age}

Gender : {user.gender}

State : {user.state}

Occupation : {user.occupation}

Income : {user.income}

Category : {user.category}

Education : {user.education}

Available Schemes

{schemes}

Return

1. Eligible Schemes

2. Why Eligible

3. Benefits

4. Documents Required

5. Timeline

6. Official Website

Return JSON only.
"""