from fastapi import APIRouter
from backend.models.user import UserProfile
from pathlib import Path
import json

router = APIRouter()


def _normalize_schemes(payload):
    if isinstance(payload, list):
        return payload
    if isinstance(payload, dict) and isinstance(payload.get("schemes"), list):
        return payload["schemes"]
    return []


def _generate_ai_explanation(user: UserProfile, scheme: dict) -> str:
    # Best-effort explanation based on available user + scheme fields.
    age = getattr(user, "age", None)
    income = getattr(user, "income", None)
    occupation = getattr(user, "occupation", None)
    category = getattr(user, "category", None)

    parts = []
    if age is not None:
        parts.append(f"your age ({age})")
    if income is not None:
        parts.append(f"your income ({income})")
    if occupation:
        parts.append(f"your occupation ({occupation})")
    if category:
        parts.append(f"your category ({category})")

    base = ", ".join(parts)
    scheme_name = scheme.get("name") or scheme.get("scheme_name") or scheme.get("scheme")
    if scheme_name:
        return f"Based on {base}, this scheme may be suitable for you: {scheme_name}."
    return f"Based on {base}, this scheme is suitable for you."


def _generate_application_steps(scheme: dict) -> list[str]:
    # Best-effort steps; prefer dataset hints if present.
    steps = []
    for key in ["application_steps", "steps", "how_to_apply", "procedure"]:
        val = scheme.get(key)
        if isinstance(val, list) and all(isinstance(x, str) for x in val):
            steps = val
            break
        if isinstance(val, str) and val.strip():
            # Split long string into a few steps.
            steps = [x.strip() for x in val.split(".") if x.strip()]
            break

    if len(steps) >= 3:
        return steps[:3]

    return [
        "Check eligibility criteria for the scheme.",
        "Collect the required documents and supporting proofs.",
        "Submit the application via the official website/portal.",
    ]


def _scheme_score(scheme: dict, user: UserProfile) -> int:
    score = 0

    # Age range (optional in dataset)
    scheme_age_min = scheme.get("ageMin")
    scheme_age_max = scheme.get("ageMax")
    if scheme_age_min is not None and scheme_age_max is not None:
        try:
            if int(scheme_age_min) <= int(user.age) <= int(scheme_age_max):
                score += 3
        except Exception:
            pass

    # Income limit
    income_limit = scheme.get("incomeLimit")
    try:
        if income_limit is not None:
            if int(income_limit) == 0:
                score += 1
            elif int(user.income) <= int(income_limit):
                score += 3
    except Exception:
        pass

    # Category match (case-insensitive)
    scheme_cat = scheme.get("category")
    if scheme_cat and str(scheme_cat).lower() == str(user.category).lower():
        score += 3

    # State match (All India treated as partial match)
    scheme_state = scheme.get("state")
    if scheme_state:
        if str(scheme_state).lower() == str(user.state).lower():
            score += 2
        elif str(scheme_state).lower() == "all india":
            score += 1

    # Occupation match (optional in dataset)
    scheme_occ = scheme.get("occupation")
    if scheme_occ and str(scheme_occ).lower() == str(user.occupation).lower():
        score += 2

    return score


@router.post("/recommend")
def recommend(user: UserProfile):
    # 1) Load schemes.json (local dataset)
    dataset_path = Path(__file__).resolve().parents[1] / "dataset" / "schemes.json"
    with dataset_path.open("r", encoding="utf-8") as f:
        raw = json.load(f)

    schemes = _normalize_schemes(raw)

    # 2) Score schemes against user profile
    scored = [(s, _scheme_score(s, user)) for s in schemes]
    scored.sort(key=lambda x: x[1], reverse=True)

    # 3) Exact match threshold; otherwise pick closest top results
    exact = [s for (s, sc) in scored if sc >= 7]
    chosen = exact if exact else [s for (s, sc) in scored[:5]]

    # 4) Map to response format
    recommendations = []
    for s in chosen:
        recommendations.append(
            {
                "scheme_name": s.get("name"),
                "description": s.get("description", ""),
                "benefits": s.get("benefits", ""),
                "eligibility": s.get("eligibility", ""),
                "documents": s.get("documents", []),
                "application_steps": _generate_application_steps(s),
                "official_website": s.get("official_website") or s.get("website") or "Visit the official state portal",
                "last_date": s.get("last_date") or s.get("deadline") or "Visit the official state portal",
                "eligibility_status": "Eligible",
                "ai_explanation": _generate_ai_explanation(user, s),
            }
        )

    return {"success": True, "recommendations": recommendations}

