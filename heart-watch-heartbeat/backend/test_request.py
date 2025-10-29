# backend/test_request.py
import requests, json

url = "http://127.0.0.1:8000/predict"
data = {
    "age": 63,          # Age in years
    "sex": 1,           # 1: male, 0: female
    "cp": 1,            # Chest pain type (1: typical angina)
    "trestbps": 145,    # Resting blood pressure
    "chol": 233,        # Serum cholesterol in mg/dl
    "fbs": 1,           # Fasting blood sugar > 120 mg/dl (1: true)
    "restecg": 0,       # Resting ECG (0: normal)
    "thalach": 150,     # Maximum heart rate achieved
    "exang": 0,         # Exercise induced angina (0: no)
    "oldpeak": 2.3,     # ST depression induced by exercise relative to rest
    "slope": 2,         # Slope of peak exercise ST segment (2: flat)
    "ca": 0,            # Number of major vessels colored by fluoroscopy
    "thal": 3           # 3: normal, 6: fixed defect, 7: reversable defect
}
try:
    res = requests.post(url, json=data, timeout=10)
    print("STATUS:", res.status_code)
    print("RAW:", res.text)
    try:
        print("JSON:", json.dumps(res.json(), indent=2))
    except Exception as e:
        print("Could not decode JSON:", e)
except Exception as e:
    print("Request failed:", e)
