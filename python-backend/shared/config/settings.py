import os
from dotenv import load_dotenv

load_dotenv()


def get_settings() -> dict:
    return {
        "service_name": os.getenv("SERVICE_NAME", "AI Book Reader Python API"),
        "port": int(os.getenv("PORT", "8000")),
        "uploads_path": os.getenv("UPLOADS_PATH", "/app/uploads"),
    }
