# backend/check_model.py
import joblib, os
MODEL_PATH = os.path.join("model", "heart_best_model.pkl")
SCALER_PATH = os.path.join("model", "scaler.pkl")
print("Model exists:", os.path.exists(MODEL_PATH))
print("Scaler exists:", os.path.exists(SCALER_PATH))
if os.path.exists(MODEL_PATH):
    m = joblib.load(MODEL_PATH)
    print("Model type:", type(m))
    print("Has predict:", hasattr(m, "predict"))
    print("Has predict_proba:", hasattr(m, "predict_proba"))
if os.path.exists(SCALER_PATH):
    s = joblib.load(SCALER_PATH)
    print("Scaler type:", type(s))
    print("Has transform:", hasattr(s, "transform"))
