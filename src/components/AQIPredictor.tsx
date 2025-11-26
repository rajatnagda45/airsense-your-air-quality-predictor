import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Wind, Droplet, Cloud, AlertCircle } from "lucide-react";
import { toast } from "@/hooks/use-toast";

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

  return (
    <div className="w-full max-w-6xl mx-auto px-4 py-8">
      <div className="grid md:grid-cols-2 gap-8">
        {/* Input Form */}
        <Card className="shadow-lg">
          <CardHeader>
            <CardTitle className="text-2xl">Air Quality Parameters</CardTitle>
            <CardDescription>Enter the air quality measurements</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              {inputFields.map((field) => {
                const Icon = field.icon;
                return (
                  <div key={field.name} className="space-y-2">
                    <Label htmlFor={field.name} className="flex items-center gap-2">
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
                      className="transition-all focus:ring-2 focus:ring-primary"
                    />
                  </div>
                );
              })}
              
              <Button 
                type="submit" 
                className="w-full mt-6 bg-gradient-to-r from-primary to-secondary hover:opacity-90 transition-opacity"
                disabled={isLoading}
              >
                {isLoading ? "Calculating..." : "Predict AQI"}
              </Button>
            </form>
          </CardContent>
        </Card>

        {/* Results Display */}
        <div className="space-y-6">
          {prediction ? (
            <Card 
              className="shadow-xl animate-fade-in"
              style={{ 
                borderLeft: `6px solid ${prediction.color}`,
                background: `linear-gradient(145deg, rgba(255,255,255,0.95), rgba(255,255,255,0.85))`
              }}
            >
              <CardHeader className="text-center pb-4">
                <div className="text-6xl mb-4 animate-scale-in">{prediction.emoji}</div>
                <CardTitle className="text-4xl font-bold" style={{ color: prediction.color }}>
                  {prediction.category}
                </CardTitle>
                <CardDescription className="text-lg mt-2">Air Quality Index</CardDescription>
              </CardHeader>
              <CardContent className="text-center">
                <div className="bg-muted/50 rounded-lg p-8 mb-6">
                  <div className="text-6xl font-bold" style={{ color: prediction.color }}>
                    {prediction.aqi}
                  </div>
                  <div className="text-sm text-muted-foreground mt-2">AQI Value</div>
                </div>
                
                <div className="space-y-3 text-left">
                  <h3 className="font-semibold text-lg mb-3">Your Input Values:</h3>
                  <div className="grid grid-cols-2 gap-2 text-sm">
                    <div className="bg-muted/30 p-2 rounded">PM2.5: {formData.pm25} μg/m³</div>
                    <div className="bg-muted/30 p-2 rounded">PM10: {formData.pm10} μg/m³</div>
                    <div className="bg-muted/30 p-2 rounded">NO₂: {formData.no2} ppb</div>
                    <div className="bg-muted/30 p-2 rounded">SO₂: {formData.so2} ppb</div>
                    <div className="bg-muted/30 p-2 rounded">CO: {formData.co} ppm</div>
                    <div className="bg-muted/30 p-2 rounded">Ozone: {formData.ozone} ppb</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ) : (
            <Card className="shadow-lg border-dashed border-2">
              <CardContent className="flex flex-col items-center justify-center py-16 text-center">
                <Wind className="w-16 h-16 text-muted-foreground mb-4" />
                <h3 className="text-xl font-semibold mb-2">Ready to Predict</h3>
                <p className="text-muted-foreground">
                  Fill in the air quality parameters and click "Predict AQI" to see results
                </p>
              </CardContent>
            </Card>
          )}

          {/* AQI Reference Guide */}
          <Card className="shadow-lg">
            <CardHeader>
              <CardTitle className="text-lg">AQI Categories</CardTitle>
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
                  className="flex items-center justify-between p-3 rounded-lg"
                  style={{ borderLeft: `4px solid ${item.color}`, backgroundColor: `${item.color}10` }}
                >
                  <span className="font-medium">{item.range}</span>
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
