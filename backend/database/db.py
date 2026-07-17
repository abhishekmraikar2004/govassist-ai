from pathlib import Path
from pymongo import MongoClient
from dotenv import load_dotenv
import os
from typing import Optional

BASE_DIR = Path(__file__).resolve().parent.parent
load_dotenv(BASE_DIR / ".env")

MONGO_URI = os.getenv("MONGO_URI")

_client: Optional[MongoClient] = None

def get_db():
    global _client

    if not MONGO_URI:
        return None

    if _client is None:
        _client = MongoClient(MONGO_URI, serverSelectionTimeoutMS=3000)

    return _client["govassist_ai"]