import { Navbar } from "@/components/Navbar";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Wind, Brain, TrendingUp } from "lucide-react";

const About = () => {
  return (
    <div className="min-h-screen">
      <Navbar />
      
      <main className="max-w-4xl mx-auto px-4 py-24">
        <div className="text-center mb-12 animate-fade-in">
          <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
            About AirSense
          </h1>
          <p className="text-lg text-muted-foreground">
            Understanding Air Quality Index Prediction
          </p>
        </div>

        <div className="space-y-6">
          <Card className="glass-card border-border/50 shadow-glass animate-fade-in">
            <CardHeader>
              <CardTitle className="text-2xl flex items-center gap-2">
                <Brain className="w-6 h-6 text-primary" />
                How It Works
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 text-muted-foreground">
              <p>
                AirSense uses advanced machine learning algorithms to predict Air Quality Index (AQI) 
                based on real-time pollutant measurements. Our model analyzes six key air pollutants 
                to provide accurate predictions.
              </p>
              <p>
                The system processes measurements of PM2.5, PM10, NO₂, SO₂, CO, and Ozone through 
                a Random Forest regression model trained on extensive air quality datasets.
              </p>
            </CardContent>
          </Card>

          <Card className="glass-card border-border/50 shadow-glass animate-fade-in">
            <CardHeader>
              <CardTitle className="text-2xl flex items-center gap-2">
                <TrendingUp className="w-6 h-6 text-primary" />
                AQI Categories
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {[
                { 
                  range: "0-50", 
                  category: "Good", 
                  color: "#16a34a",
                  desc: "Air quality is satisfactory, and air pollution poses little or no risk"
                },
                { 
                  range: "51-100", 
                  category: "Moderate", 
                  color: "#facc15",
                  desc: "Air quality is acceptable for most, but sensitive individuals may experience minor concerns"
                },
                { 
                  range: "101-200", 
                  category: "Poor", 
                  color: "#fb923c",
                  desc: "Members of sensitive groups may experience health effects"
                },
                { 
                  range: "201-300", 
                  category: "Very Poor", 
                  color: "#ef4444",
                  desc: "Health alert: everyone may experience more serious health effects"
                },
                { 
                  range: "300+", 
                  category: "Severe", 
                  color: "#7c2d12",
                  desc: "Health warnings of emergency conditions. The entire population is more likely to be affected"
                },
              ].map((item) => (
                <div 
                  key={item.category}
                  className="glass-input p-4 rounded-lg border-l-4 transition-all hover:scale-[1.01]"
                  style={{ borderLeftColor: item.color }}
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-semibold text-foreground">{item.range}</span>
                    <span className="font-bold" style={{ color: item.color }}>
                      {item.category}
                    </span>
                  </div>
                  <p className="text-sm text-muted-foreground">{item.desc}</p>
                </div>
              ))}
            </CardContent>
          </Card>

          <Card className="glass-card border-border/50 shadow-glass animate-fade-in">
            <CardHeader>
              <CardTitle className="text-2xl flex items-center gap-2">
                <Wind className="w-6 h-6 text-primary" />
                Measured Pollutants
              </CardTitle>
            </CardHeader>
            <CardContent className="grid md:grid-cols-2 gap-4">
              {[
                { name: "PM2.5", desc: "Fine particulate matter (≤2.5 micrometers)" },
                { name: "PM10", desc: "Coarse particulate matter (≤10 micrometers)" },
                { name: "NO₂", desc: "Nitrogen Dioxide" },
                { name: "SO₂", desc: "Sulfur Dioxide" },
                { name: "CO", desc: "Carbon Monoxide" },
                { name: "Ozone", desc: "Ground-level ozone (O₃)" },
              ].map((pollutant) => (
                <div 
                  key={pollutant.name}
                  className="glass-input p-3 rounded-lg border-border/30"
                >
                  <div className="font-semibold text-primary">{pollutant.name}</div>
                  <div className="text-sm text-muted-foreground">{pollutant.desc}</div>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
};

export default About;
