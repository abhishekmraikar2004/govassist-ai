from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from backend.routes.schemes import router as schemes_router
from backend.routes.recommend import router as recommend_router
from backend.routes.report import router as report_router


app = FastAPI()





# basic check endpoint for load balancers / health checks
@app.get("/health")
def health():
    return {"status": "ok"}

# CORS: allow local frontend dev server to call this API.
# NOTE: For production, lock this down to your deployed frontend origin.
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173", "http://127.0.0.1:5173", "http://localhost:8000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# API routes
app.include_router(schemes_router)
app.include_router(recommend_router)
app.include_router(report_router)











@app.get("/")
def home():
    """Root endpoint to verify backend is running."""
    return {"message": "GovAssist AI Backend Running"}



