from fastapi import APIRouter
from pathlib import Path
import json


router = APIRouter()


@router.get("/schemes")
def get_schemes():
    """Return all government schemes from the local dataset JSON."""

    # Use an absolute path so this works regardless of where uvicorn is started from.
    dataset_path = Path(__file__).resolve().parents[1] / "dataset" / "schemes.json"
    with dataset_path.open("r", encoding="utf-8") as f:
        return json.load(f)

