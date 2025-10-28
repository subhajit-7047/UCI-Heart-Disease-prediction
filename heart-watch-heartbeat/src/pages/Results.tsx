import { useLocation, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { ArrowLeft, Home, AlertTriangle, CheckCircle2, AlertCircle } from "lucide-react";
import { PredictionResult } from "@/types/prediction";
import { useEffect } from "react";

const Results = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { result } = location.state as { result: PredictionResult } || {};

  useEffect(() => {
    if (!result) {
      navigate("/");
    }
  }, [result, navigate]);

  if (!result) {
    return null;
  }

  const percentage = Math.round(result.probability * 100);
  const isHighRisk = result.risk === "High";
  const isModerateRisk = result.risk === "Moderate";
  const isLowRisk = result.risk === "Low";

  const getRiskColor = () => {
    if (isHighRisk) return "text-destructive";
    if (isModerateRisk) return "text-warning";
    return "text-success";
  };

  const getRiskBgColor = () => {
    if (isHighRisk) return "bg-gradient-danger";
    if (isModerateRisk) return "bg-warning/10";
    return "bg-gradient-success";
  };

  const getRiskIcon = () => {
    if (isHighRisk) return <AlertTriangle className="w-16 h-16" />;
    if (isModerateRisk) return <AlertCircle className="w-16 h-16" />;
    return <CheckCircle2 className="w-16 h-16" />;
  };

  const getRecommendations = () => {
    if (isHighRisk) {
      return [
        "Consult with a cardiologist immediately",
        "Monitor blood pressure and cholesterol regularly",
        "Adopt a heart-healthy diet low in saturated fats",
        "Engage in regular physical activity as advised by your doctor",
        "Consider stress management techniques",
        "Quit smoking if applicable",
      ];
    }
    if (isModerateRisk) {
      return [
        "Schedule a check-up with your healthcare provider",
        "Monitor your heart health regularly",
        "Maintain a balanced, heart-healthy diet",
        "Exercise regularly (30 minutes daily)",
        "Manage stress through relaxation techniques",
        "Keep blood pressure and cholesterol in check",
      ];
    }
    return [
      "Continue maintaining a healthy lifestyle",
      "Regular exercise and balanced diet",
      "Annual health check-ups recommended",
      "Stay active and manage stress",
      "Monitor blood pressure occasionally",
    ];
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-accent to-background py-12">
      <div className="container mx-auto px-4 max-w-4xl">
        <Button
          variant="ghost"
          onClick={() => navigate("/")}
          className="mb-6"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Home
        </Button>

        <div className="space-y-6 animate-fade-in">
          {/* Main Result Card */}
          <Card className={`p-8 shadow-strong ${getRiskBgColor()} ${isLowRisk ? 'text-white' : ''}`}>
            <div className="text-center space-y-6">
              <div className={`inline-flex p-6 rounded-full ${isLowRisk ? 'bg-white/20' : 'bg-white'} ${getRiskColor()}`}>
                {getRiskIcon()}
              </div>
              
              <div>
                <h1 className={`text-4xl font-bold mb-2 ${isLowRisk ? 'text-white' : ''}`}>
                  {result.risk} Risk
                </h1>
                <p className={`text-xl ${isLowRisk ? 'text-white/90' : 'text-muted-foreground'}`}>
                  Heart Disease Probability
                </p>
              </div>

              <div className="max-w-md mx-auto space-y-4">
                <div className={`text-6xl font-bold ${isLowRisk ? 'text-white' : getRiskColor()}`}>
                  {percentage}%
                </div>
                <Progress 
                  value={percentage} 
                  className={`h-3 ${isLowRisk ? 'bg-white/20' : ''}`}
                />
              </div>

              {isHighRisk && (
                <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 text-white">
                  <p className="font-semibold">⚠️ Important Notice</p>
                  <p className="text-sm mt-2">
                    This result indicates an elevated risk. Please consult with a healthcare professional immediately.
                  </p>
                </div>
              )}
            </div>
          </Card>

          {/* Recommendations Card */}
          <Card className="p-8 shadow-medium">
            <h2 className="text-2xl font-bold mb-6">Recommendations</h2>
            <div className="space-y-3">
              {getRecommendations().map((recommendation, index) => (
                <div key={index} className="flex items-start gap-3">
                  <div className={`w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5 ${
                    isHighRisk ? 'bg-destructive/10' : isModerateRisk ? 'bg-warning/10' : 'bg-success/10'
                  }`}>
                    <span className={`text-xs font-semibold ${getRiskColor()}`}>
                      {index + 1}
                    </span>
                  </div>
                  <p className="text-muted-foreground">{recommendation}</p>
                </div>
              ))}
            </div>
          </Card>

          {/* Disclaimer Card */}
          <Card className="p-6 bg-muted">
            <p className="text-sm text-muted-foreground text-center">
              <strong>Medical Disclaimer:</strong> This prediction is based on statistical models and should not replace professional medical advice. 
              Always consult with qualified healthcare providers for proper diagnosis and treatment.
            </p>
          </Card>

          {/* Action Buttons */}
          <div className="flex flex-wrap gap-4 justify-center">
            <Button 
              size="lg"
              onClick={() => navigate("/predict")}
              className="bg-gradient-medical hover:opacity-90"
            >
              New Prediction
            </Button>
            <Button 
              size="lg"
              variant="outline"
              onClick={() => navigate("/")}
            >
              <Home className="mr-2 h-5 w-5" />
              Back to Home
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Results;
