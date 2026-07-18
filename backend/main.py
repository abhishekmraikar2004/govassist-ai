from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from routes.schemes import router as schemes_router
from routes.recommend import router as recommend_router
from routes.report import router as report_router

app = FastAPI(
    title="GovAssist AI",
    version="0.1.0",
)

# Allowed frontend origins
origins = [
    "http://localhost:5173",
    "http://127.0.0.1:5173",
    "http://localhost:8000",

    # Vercel frontend
    "https://govassist-hefeurkp9-abhishek-m-raikers-projects.vercel.app",

    # Optional: your custom Vercel production URL
    "https://govassist-ai-opal.vercel.app",
]

# Enable CORS
from fastapi.middleware.cors import CORSMiddleware

app.add_middleware(
    CORSMiddleware,
    allow_origin_regex="https://.*\.vercel\.app",
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Health check
@app.get("/health")
def health():
    return {"status": "ok"}

# Root endpoint
@app.get("/")
def home():
    return {"message": "GovAssist AI Backend Running"}

# Register API routes
app.include_router(schemes_router)
app.include_router(recommend_router)
app.include_router(report_router)