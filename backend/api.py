from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from recommender.engine import predict_recommendation

app = FastAPI(title="Academic Orientation API")

# CORS for React (dev)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class StudentInput(BaseModel):
    java: float
    python: float
    database: float
    web_dev: float
    networks: float
    machine_learning: float
    cybersecurity: float
    mobile_dev: float

@app.get("/")
def root():
    return {"status": "API running"}

@app.post("/predict")
def predict(student: StudentInput):
    domain, confidence, probabilities, explanations = predict_recommendation(student.dict())
    return {
        "recommended_domain": domain,
        "confidence": confidence,
        "explanations": explanations,
        "probabilities": probabilities.to_dict(orient="records") if probabilities is not None else []
    }
