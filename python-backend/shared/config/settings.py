import os
from dotenv import load_dotenv

load_dotenv()

def get_settings() -> dict:
    return {
        "service_name": os.getenv("SERVICE_NAME", "AI Book Reader Python API"),
        "port": int(os.getenv("PORT", "8000")),
        "uploads_path": os.getenv("UPLOADS_PATH", "/app/uploads"),
        "node_backend_url": os.getenv("NODE_BACKEND_URL", "http://backend:5000"),
        "openrouter_api_key": os.getenv("OPEN_ROUTER_API_KEY"),
        "gemini_api_key": os.getenv("GEMINI_API_KEY"),
        "groq_api_key": os.getenv("GROQ_API_KEY"),
        "llm_model": os.getenv("LLM_MODEL", "google/gemma-4-26b-a4b-it:free"),
        "jwt_expires_in": os.getenv("JWT_EXPIRES_IN", "7d"),
        "google_client_id": os.getenv("GOOGLE_CLIENT_ID"),
        "google_client_secret": os.getenv("GOOGLE_CLIENT_SECRET"),
        "google_callback_url": os.getenv("GOOGLE_CALLBACK_URL"),
        "mobile_auth_success_url": os.getenv("MOBILE_AUTH_SUCCESS_URL"),
    }
