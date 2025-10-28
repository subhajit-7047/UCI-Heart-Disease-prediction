import { PredictionInput, PredictionResult } from "@/types/prediction";

// Mock prediction function - simulates ML model behavior
// In production, this would call your FastAPI backend
export function predictHeartDisease(input: PredictionInput): PredictionResult {
  // Simple risk scoring based on key factors
  let riskScore = 0;
  
  // Age factor (higher age = higher risk)
  if (input.age > 60) riskScore += 0.2;
  else if (input.age > 50) riskScore += 0.15;
  else if (input.age > 40) riskScore += 0.1;
  
  // Chest pain type (3 = highest risk)
  if (input.cp === 3) riskScore += 0.2;
  else if (input.cp === 2) riskScore += 0.15;
  else if (input.cp === 1) riskScore += 0.1;
  
  // Blood pressure
  if (input.trestbps > 140) riskScore += 0.15;
  else if (input.trestbps > 120) riskScore += 0.1;
  
  // Cholesterol
  if (input.chol > 240) riskScore += 0.15;
  else if (input.chol > 200) riskScore += 0.1;
  
  // Fasting blood sugar
  if (input.fbs === 1) riskScore += 0.1;
  
  // Max heart rate (lower = higher risk)
  if (input.thalach < 120) riskScore += 0.15;
  else if (input.thalach < 140) riskScore += 0.1;
  
  // Exercise induced angina
  if (input.exang === 1) riskScore += 0.15;
  
  // ST depression
  if (input.oldpeak > 2) riskScore += 0.2;
  else if (input.oldpeak > 1) riskScore += 0.15;
  
  // Number of major vessels
  if (input.ca > 0) riskScore += input.ca * 0.1;
  
  // Thalassemia
  if (input.thal === 2) riskScore += 0.15;
  else if (input.thal === 1) riskScore += 0.1;
  
  // Normalize to 0-1 range
  const probability = Math.min(Math.max(riskScore, 0), 1);
  
  let risk: "Low" | "Moderate" | "High";
  if (probability < 0.4) {
    risk = "Low";
  } else if (probability < 0.7) {
    risk = "Moderate";
  } else {
    risk = "High";
  }
  
  return {
    probability: Math.round(probability * 100) / 100,
    risk,
  };
}

// Function to call FastAPI backend (for production use)
export async function predictHeartDiseaseAPI(input: PredictionInput): Promise<PredictionResult> {
  try {
    const response = await fetch(`${import.meta.env.VITE_API_URL || 'http://localhost:8000'}/predict`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(input),
    });
    
    if (!response.ok) {
      throw new Error('Prediction failed');
    }
    
    return await response.json();
  } catch (error) {
    console.error('API call failed, using mock prediction:', error);
    return predictHeartDisease(input);
  }
}
