import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Heart, Activity, TrendingUp, Shield } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { HeartAnimation } from "@/components/HeartAnimation";

const Index = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-accent to-background">
      {/* Hero Section */}
      <section className="container mx-auto px-4 py-20">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div className="space-y-8 animate-fade-in">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 rounded-full text-sm font-medium text-primary">
              <Shield className="w-4 h-4" />
              AI-Powered Heart Health Assessment
            </div>
            
            <h1 className="text-5xl md:text-6xl font-bold leading-tight">
              Heart Disease{" "}
              <span className="bg-gradient-medical bg-clip-text text-transparent">
                Risk Predictor
              </span>
            </h1>
            
            <p className="text-xl text-muted-foreground max-w-xl">
              Predict your heart disease risk using advanced machine learning algorithms. 
              Get instant insights based on your medical parameters.
            </p>
            
            <div className="flex flex-wrap gap-4">
              <Button 
                size="lg" 
                className="bg-gradient-medical hover:opacity-90 transition-opacity shadow-medium"
                onClick={() => navigate("/predict")}
              >
                <Activity className="mr-2 h-5 w-5" />
                Start Prediction
              </Button>
              <Button 
                size="lg" 
                variant="outline"
                className="border-2 hover:bg-accent"
              >
                Learn More
              </Button>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-6 pt-8">
              <div className="space-y-1">
                <div className="text-3xl font-bold text-primary">87%</div>
                <div className="text-sm text-muted-foreground">Accuracy</div>
              </div>
              <div className="space-y-1">
                <div className="text-3xl font-bold text-primary">10</div>
                <div className="text-sm text-muted-foreground">Predictions</div>
              </div>
              <div className="space-y-1">
                <div className="text-3xl font-bold text-primary">Fast</div>
                <div className="text-sm text-muted-foreground">Results</div>
              </div>
            </div>
          </div>

          {/* Right Animation */}
          <div className="relative h-[500px] animate-slide-up">
            <HeartAnimation />
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="container mx-auto px-4 py-20">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Why Choose Our Predictor?
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Advanced machine learning meets medical expertise to provide accurate risk assessments
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          <Card className="p-8 hover:shadow-strong transition-shadow">
            <div className="w-14 h-14 bg-gradient-medical rounded-2xl flex items-center justify-center mb-6">
              <Heart className="w-7 h-7 text-white" />
            </div>
            <h3 className="text-xl font-semibold mb-3">AI-Powered Analysis</h3>
            <p className="text-muted-foreground">
              Leveraging state-of-the-art machine learning models trained on thousands of medical records
            </p>
          </Card>

          <Card className="p-8 hover:shadow-strong transition-shadow">
            <div className="w-14 h-14 bg-gradient-success rounded-2xl flex items-center justify-center mb-6">
              <Activity className="w-7 h-7 text-white" />
            </div>
            <h3 className="text-xl font-semibold mb-3">Instant Results</h3>
            <p className="text-muted-foreground">
              Get your heart disease risk assessment in seconds with detailed probability scores
            </p>
          </Card>

          <Card className="p-8 hover:shadow-strong transition-shadow">
            <div className="w-14 h-14 bg-primary/20 rounded-2xl flex items-center justify-center mb-6">
              <TrendingUp className="w-7 h-7 text-primary" />
            </div>
            <h3 className="text-xl font-semibold mb-3">Comprehensive Metrics</h3>
            <p className="text-muted-foreground">
              Analysis based on 13 key medical parameters including ECG results and blood tests
            </p>
          </Card>
        </div>
      </section>

      {/* CTA Section */}
      <section className="container mx-auto px-4 py-20">
        <Card className="bg-gradient-medical p-12 text-center shadow-strong">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Ready to Check Your Heart Health?
          </h2>
          <p className="text-lg text-white/90 mb-8 max-w-2xl mx-auto">
            Take the first step towards understanding your cardiovascular risk. 
            Our quick assessment takes less than 2 minutes.
          </p>
          <Button 
            size="lg" 
            variant="secondary"
            className="bg-white text-primary hover:bg-white/90 shadow-lg"
            onClick={() => navigate("/predict")}
          >
            <Heart className="mr-2 h-5 w-5" />
            Get Started Now
          </Button>
        </Card>
      </section>
    </div>
  );
};

export default Index;
