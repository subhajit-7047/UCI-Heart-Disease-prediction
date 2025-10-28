from fastapi import FastAPI
from pydantic import BaseModel
from fastapi.middleware.cors import CORSMiddleware
import pickle
import numpy as np

# Initialize FastAPI app
app = FastAPI()

# Allow frontend (React) access
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # for dev, allow all
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Load trained model
with open("model/heart_best_model.pkl", "rb") as f:
    model = pickle.load(f)

# Input schema
class HeartInput(BaseModel):
    age: float
    sex: int
    cp: int
    trestbps: float
    chol: float
    fbs: int
    restecg: int
    thalach: float
    exang: int
    oldpeak: float
    slope: int
    ca: int
    thal: int

@app.get("/")
def home():
    return {"message": "Heart Disease Prediction API Running ✅"}

@app.post("/predict")
def predict(data: HeartInput):
    arr = np.array([[data.age, data.sex, data.cp, data.trestbps, data.chol,
                     data.fbs, data.restecg, data.thalach, data.exang,
                     data.oldpeak, data.slope, data.ca, data.thal]])
    
    prob = model.predict_proba(arr)[0][1]
    risk = "High" if prob > 0.5 else "Low"
    return {"probability": round(float(prob), 2), "risk": risk}
