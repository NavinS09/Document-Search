import os
from dotenv import load_dotenv

# Load environment variables
load_dotenv()

def test_env_variables():
    # Test Qdrant variables
    print("\n Qdrant Configuration")
    print(f"QDRANT_URL: {os.getenv('QDRANT_URL')}")
    print(f"QDRANT_API_KEY: {'Set' if os.getenv('QDRANT_API_KEY') else 'Not Set'}")

    # Test OpenAI variables
    print("\n OpenAI/DeepSeek Configuration")
    print(f"OPENAI_API_KEY: {'Set' if os.getenv('OPENAI_API_KEY') else 'Not Set'}")
    print(f"OPENAI_API_BASE: {os.getenv('OPENAI_API_BASE')}")

    # Test Groq variables
    print("\n Groq Configuration")
    print(f"GROQ_API_KEY: {'Set' if os.getenv('GROQ_API_KEY') else 'Not Set'}")
    print(f"GROQ_API_BASE: {os.getenv('GROQ_API_BASE')}")

if __name__ == "__main__":
    test_env_variables() 