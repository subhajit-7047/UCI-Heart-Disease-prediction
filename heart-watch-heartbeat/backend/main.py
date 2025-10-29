
# backend/main.py
from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
from fastapi.middleware.cors import CORSMiddleware
import joblib
import json
import numpy as np

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Load model and scaler
try:
    model = joblib.load("model/heart_best_model.pkl")
    scaler = joblib.load("model/scaler.pkl")
    selected_features = json.load(open("model/selected_features.json"))
    print("✅ Model, scaler, and features loaded successfully")
except Exception as e:
    print("❌ Error loading model artifacts:", str(e))
    raise

print("✅ Model & Scaler Loaded Successfully")

class HeartInput(BaseModel):
    age: float
    sex: int
    cp: int  # 1: typical angina, 2: atypical angina, 3: non-anginal, 4: asymptomatic
    trestbps: float
    chol: float
    fbs: int
    restecg: int  # 0: normal, 1: st-t abnormality, 2: lv hypertrophy
    thalach: float
    exang: int
    oldpeak: float
    slope: int  # 1: upsloping, 2: flat, 3: downsloping
    ca: int
    thal: int  # 3: normal, 6: fixed defect, 7: reversable defect

@app.get("/")
def home():
    return {"message": "Heart Disease Prediction API Running ✅"}

@app.post("/predict")
def predict(data: HeartInput):
    try:
        # Create feature dictionary with one-hot encoding
        features_dict = {
            'dataset_VA Long Beach': 1,  # Assuming this is always 1
            'cp_atypical angina': 1 if data.cp == 2 else 0,
            'cp_non-anginal': 1 if data.cp == 3 else 0,
            'cp_typical angina': 1 if data.cp == 1 else 0,
            'restecg_normal': 1 if data.restecg == 0 else 0,
            'restecg_st-t abnormality': 1 if data.restecg == 1 else 0,
            'slope_flat': 1 if data.slope == 2 else 0,
            'slope_upsloping': 1 if data.slope == 1 else 0,
            'thal_normal': 1 if data.thal == 3 else 0,
            'thal_reversable defect': 1 if data.thal == 7 else 0,
        }

        # Create feature array in same order as training
        features = np.array([[features_dict[col] for col in selected_features]])

        # Predict (no scaling needed since these are binary features)
        prob = model.predict_proba(features)[0][1]
        pred = int(prob > 0.5)
        risk = "High" if pred == 1 else "Low"

        return {"probability": round(float(prob), 3), "prediction": pred, "risk": risk}
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Prediction error: {str(e)}")
