import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Wind, Droplet, Cloud, AlertCircle, Sparkles } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface PredictionResult {
  aqi: number;
  category: string;
  color: string;
  emoji: string;
}

interface FormData {
  pm25: string;
  pm10: string;
  no2: string;
  so2: string;
  co: string;
  ozone: string;
}

const getAQICategory = (aqi: number): PredictionResult => {
  if (aqi <= 50) {
    return { aqi, category: "Good", color: "#16a34a", emoji: "😄" };
  } else if (aqi <= 100) {
    return { aqi, category: "Moderate", color: "#facc15", emoji: "🙂" };
  } else if (aqi <= 200) {
    return { aqi, category: "Poor", color: "#fb923c", emoji: "😷" };
  } else if (aqi <= 300) {
    return { aqi, category: "Very Poor", color: "#ef4444", emoji: "🤒" };
  } else {
    return { aqi, category: "Severe", color: "#7c2d12", emoji: "☠️" };
  }
};

const simulateAQIPrediction = (data: FormData): number => {
  // Simplified AQI calculation for demo purposes
  const pm25 = parseFloat(data.pm25);
  const pm10 = parseFloat(data.pm10);
  const no2 = parseFloat(data.no2);
  const so2 = parseFloat(data.so2);
  const co = parseFloat(data.co);
  const ozone = parseFloat(data.ozone);

  // Weighted average simulation (actual model would be more complex)
  const aqi = (pm25 * 2.5 + pm10 * 1.5 + no2 * 1.2 + so2 * 1.0 + co * 0.8 + ozone * 1.3) / 8.3;
  
  return Math.round(aqi * 10) / 10;
};

export const AQIPredictor = () => {
  const { toast } = useToast();
  const [formData, setFormData] = useState<FormData>({
    pm25: "",
    pm10: "",
    no2: "",
    so2: "",
    co: "",
    ozone: "",
  });
  
  const [prediction, setPrediction] = useState<PredictionResult | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate inputs
    const values = Object.values(formData);
    if (values.some(v => v === "" || isNaN(parseFloat(v)))) {
      toast({
        title: "Invalid Input",
        description: "Please fill in all fields with valid numbers.",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);
    
    // Simulate API call delay
    setTimeout(() => {
      const aqiValue = simulateAQIPrediction(formData);
      const result = getAQICategory(aqiValue);
      setPrediction(result);
      setIsLoading(false);
      
      toast({
        title: "Prediction Complete",
        description: `AQI calculated: ${result.aqi} (${result.category})`,
      });
    }, 1000);
  };

  const inputFields = [
    { name: "pm25", label: "PM2.5 (μg/m³)", icon: Cloud, placeholder: "e.g., 35.5" },
    { name: "pm10", label: "PM10 (μg/m³)", icon: Cloud, placeholder: "e.g., 50.2" },
    { name: "no2", label: "NO₂ (ppb)", icon: Wind, placeholder: "e.g., 40.0" },
    { name: "so2", label: "SO₂ (ppb)", icon: Droplet, placeholder: "e.g., 10.0" },
    { name: "co", label: "CO (ppm)", icon: AlertCircle, placeholder: "e.g., 0.5" },
    { name: "ozone", label: "Ozone (ppb)", icon: Wind, placeholder: "e.g., 60.0" },
  ];

  const fillSampleData = () => {
    setFormData({
      pm25: "35.5",
      pm10: "50.2",
      no2: "40.0",
      so2: "10.0",
      co: "0.5",
      ozone: "60.0",
    });
    toast({
      title: "Sample data loaded",
      description: "Click 'Predict AQI' to see results",
    });
  };

  return (
    <div className="w-full max-w-6xl mx-auto px-4">
      <div className="grid lg:grid-cols-2 gap-6">
        {/* Input Form */}
        <Card className="glass-card border-border/50 shadow-glass">
          <CardHeader>
            <CardTitle className="text-2xl flex items-center gap-2">
              <Cloud className="w-6 h-6 text-primary" />
              Air Quality Parameters
            </CardTitle>
            <CardDescription className="text-muted-foreground">
              Enter pollutant measurements to predict AQI
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                {inputFields.map((field) => {
                  const Icon = field.icon;
                  return (
                    <div key={field.name} className="space-y-2">
                      <Label 
                        htmlFor={field.name} 
                        className="flex items-center gap-2 text-sm font-medium"
                      >
                        <Icon className="w-4 h-4 text-primary" />
                        {field.label}
                      </Label>
                      <Input
                        id={field.name}
                        name={field.name}
                        type="number"
                        step="0.1"
                        placeholder={field.placeholder}
                        value={formData[field.name as keyof FormData]}
                        onChange={handleInputChange}
                        className="glass-input text-foreground placeholder:text-muted-foreground/50"
                      />
                    </div>
                  );
                })}
              </div>
              
              <div className="flex gap-3 pt-4">
                <Button 
                  type="submit" 
                  className="flex-1 bg-gradient-to-r from-primary to-accent hover:opacity-90 transition-all shadow-lg"
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <>
                      <Sparkles className="w-4 h-4 mr-2 animate-spin" />
                      Calculating...
                    </>
                  ) : (
                    "Predict AQI"
                  )}
                </Button>
                <Button 
                  type="button"
                  variant="outline"
                  onClick={fillSampleData}
                  className="glass-input border-border/50 hover:border-primary"
                >
                  Try sample
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>

        {/* Results Display */}
        <div className="space-y-6">
          {prediction ? (
            <Card 
              className="glass-card border-border/50 shadow-glass animate-fade-in relative overflow-hidden"
            >
              <div 
                className="absolute inset-0 opacity-10"
                style={{ 
                  background: `linear-gradient(135deg, ${prediction.color}22, transparent)` 
                }}
              />
              <CardHeader className="text-center pb-4 relative z-10">
                <div className="text-7xl mb-4 animate-scale-in drop-shadow-lg">
                  {prediction.emoji}
                </div>
                <CardTitle 
                  className="text-4xl font-bold"
                  style={{ color: prediction.color }}
                >
                  {prediction.category}
                </CardTitle>
                <CardDescription className="text-base mt-2 text-muted-foreground">
                  Air Quality Index
                </CardDescription>
              </CardHeader>
              <CardContent className="text-center relative z-10">
                <div className="glass-input rounded-2xl p-8 mb-6 border-border/50">
                  <div 
                    className="text-7xl font-bold mb-2"
                    style={{ color: prediction.color }}
                  >
                    {prediction.aqi}
                  </div>
                  <div className="text-sm text-muted-foreground">AQI Value</div>
                </div>
                
                <div className="space-y-3 text-left">
                  <h3 className="font-semibold text-base mb-3 text-foreground">
                    Input Values:
                  </h3>
                  <div className="grid grid-cols-2 gap-2 text-sm">
                    {[
                      { label: "PM2.5", value: formData.pm25, unit: "μg/m³" },
                      { label: "PM10", value: formData.pm10, unit: "μg/m³" },
                      { label: "NO₂", value: formData.no2, unit: "ppb" },
                      { label: "SO₂", value: formData.so2, unit: "ppb" },
                      { label: "CO", value: formData.co, unit: "ppm" },
                      { label: "Ozone", value: formData.ozone, unit: "ppb" },
                    ].map((item) => (
                      <div 
                        key={item.label}
                        className="glass-input p-3 rounded-lg border-border/30"
                      >
                        <span className="font-medium text-foreground">{item.label}:</span>{" "}
                        <span className="text-muted-foreground">
                          {item.value} {item.unit}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          ) : (
            <Card className="glass-card border-dashed border-2 border-border/30 shadow-glass">
              <CardContent className="flex flex-col items-center justify-center py-20 text-center">
                <div className="glass-input p-6 rounded-full mb-4 border-border/30">
                  <Wind className="w-12 h-12 text-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-2 text-foreground">
                  Ready to Predict
                </h3>
                <p className="text-muted-foreground max-w-sm">
                  Fill in the parameters and click "Predict AQI" to see results
                </p>
              </CardContent>
            </Card>
          )}

          {/* AQI Reference Guide */}
          <Card className="glass-card border-border/50 shadow-glass">
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2 text-foreground">
                <AlertCircle className="w-5 h-5 text-primary" />
                AQI Categories
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              {[
                { range: "0-50", category: "Good", color: "#16a34a" },
                { range: "51-100", category: "Moderate", color: "#facc15" },
                { range: "101-200", category: "Poor", color: "#fb923c" },
                { range: "201-300", category: "Very Poor", color: "#ef4444" },
                { range: "300+", category: "Severe", color: "#7c2d12" },
              ].map((item) => (
                <div 
                  key={item.category}
                  className="flex items-center justify-between p-3 rounded-lg glass-input border-l-4 transition-all hover:scale-[1.02]"
                  style={{ borderLeftColor: item.color }}
                >
                  <span className="font-medium text-foreground">{item.range}</span>
                  <span className="font-semibold" style={{ color: item.color }}>
                    {item.category}
                  </span>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};
