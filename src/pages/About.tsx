import { Navbar } from "@/components/Navbar";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { AlertCircle, Heart, Leaf, Shield } from "lucide-react";

const About = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <main className="max-w-6xl mx-auto px-4 py-12">
        <div className="text-center mb-12 animate-fade-in">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
            About AirSense
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Your intelligent companion for understanding and predicting air quality
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6 mb-12">
          <Card className="shadow-lg hover:shadow-xl transition-shadow">
            <CardHeader>
              <div className="bg-primary/10 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
                <Leaf className="w-6 h-6 text-primary" />
              </div>
              <CardTitle>Our Mission</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                AirSense is dedicated to making air quality data accessible and understandable for everyone. 
                We use advanced machine learning models to predict Air Quality Index (AQI) based on various 
                pollutant measurements, helping communities make informed decisions about their health and environment.
              </p>
            </CardContent>
          </Card>

          <Card className="shadow-lg hover:shadow-xl transition-shadow">
            <CardHeader>
              <div className="bg-secondary/10 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
                <Shield className="w-6 h-6 text-secondary" />
              </div>
              <CardTitle>How It Works</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                Our predictive model analyzes six key air quality parameters: PM2.5, PM10, NO₂, SO₂, CO, and Ozone. 
                Using a Random Forest Regressor trained on extensive air quality datasets, we provide accurate 
                AQI predictions that help you understand the air you breathe.
              </p>
            </CardContent>
          </Card>
        </div>

        <Card className="shadow-xl mb-12">
          <CardHeader>
            <CardTitle className="text-2xl">Understanding AQI Categories</CardTitle>
            <CardDescription>What the different Air Quality Index levels mean</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {[
              {
                range: "0-50",
                category: "Good",
                icon: "😄",
                color: "#16a34a",
                description: "Air quality is satisfactory, and air pollution poses little or no risk.",
              },
              {
                range: "51-100",
                category: "Moderate",
                icon: "🙂",
                color: "#facc15",
                description: "Air quality is acceptable. However, there may be a risk for some people, particularly those who are unusually sensitive to air pollution.",
              },
              {
                range: "101-200",
                category: "Poor",
                icon: "😷",
                color: "#fb923c",
                description: "Members of sensitive groups may experience health effects. The general public is less likely to be affected.",
              },
              {
                range: "201-300",
                category: "Very Poor",
                icon: "🤒",
                color: "#ef4444",
                description: "Health alert: The risk of health effects is increased for everyone. Active children and adults, and people with respiratory disease should avoid prolonged outdoor exertion.",
              },
              {
                range: "300+",
                category: "Severe",
                icon: "☠️",
                color: "#7c2d12",
                description: "Health warning of emergency conditions: everyone is more likely to be affected. Everyone should avoid all outdoor exertion.",
              },
            ].map((item) => (
              <div
                key={item.category}
                className="border rounded-lg p-6 hover:shadow-md transition-shadow"
                style={{ borderLeftWidth: "6px", borderLeftColor: item.color }}
              >
                <div className="flex items-start gap-4">
                  <span className="text-4xl">{item.icon}</span>
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="text-xl font-bold" style={{ color: item.color }}>
                        {item.category}
                      </h3>
                      <span className="text-sm bg-muted px-2 py-1 rounded">
                        AQI {item.range}
                      </span>
                    </div>
                    <p className="text-muted-foreground">{item.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        <Card className="shadow-lg bg-gradient-to-br from-primary/5 to-secondary/5 border-primary/20">
          <CardHeader>
            <div className="flex items-center gap-2">
              <Heart className="w-6 h-6 text-primary" />
              <CardTitle>Why Air Quality Matters</CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground leading-relaxed">
              Poor air quality can have serious health impacts, affecting your respiratory system, 
              cardiovascular health, and overall wellbeing. By monitoring and predicting AQI, 
              we empower you to make informed decisions about outdoor activities, plan your day effectively, 
              and take necessary precautions to protect yourself and your loved ones. Understanding air quality 
              is the first step toward breathing easier and living healthier.
            </p>
          </CardContent>
        </Card>
      </main>
    </div>
  );
};

export default About;
