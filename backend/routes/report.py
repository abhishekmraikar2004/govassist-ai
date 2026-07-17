from datetime import datetime
import uuid
from typing import Any

from fastapi import APIRouter, HTTPException
from pydantic import BaseModel


from backend.database.db import get_db

router = APIRouter()


class ReportPayload(BaseModel):
    name: str = ""
    email: str

    phone: str
    state: str
    district: str
    scheme_name: str
    issue_type: str
    description: str


def _collection():
    db = get_db()
    if db is None:
        raise HTTPException(
            status_code=500,
            detail="MongoDB is not configured. Set MONGO_URI in environment.",
        )
    return db["reports"]


@router.post("/report")
def create_report(payload: ReportPayload) -> dict[str, Any]:
    col = _collection()

    report_id = str(uuid.uuid4())
    created_at = datetime.utcnow()

    doc = {
        "report_id": report_id,
        "name": payload.name,
        "email": payload.email,
        "phone": payload.phone,
        "state": payload.state,
        "district": payload.district,
        "scheme_name": payload.scheme_name,
        "issue_type": payload.issue_type,
        "description": payload.description,
        "created_at": created_at,
        "status": "Pending",
    }

    col.insert_one(doc)

    return {
        "success": True,
        "report_id": report_id,
        "status": "Pending",
        "created_at": created_at,
    }


@router.get("/reports")
def list_reports() -> list[dict[str, Any]]:
    col = _collection()
    docs = list(col.find({}).sort("created_at", -1))

    output: list[dict[str, Any]] = []
    for d in docs:
        d.pop("_id", None)
        output.append(d)
    return output

