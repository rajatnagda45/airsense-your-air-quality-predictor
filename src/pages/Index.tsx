import { Navbar } from "@/components/Navbar";
import { AQIPredictor } from "@/components/AQIPredictor";
import { Wind } from "lucide-react";

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-primary/5 to-secondary/5">
      <Navbar />
      
      <main>
        {/* Hero Section */}
        <section className="text-center py-12 px-4">
          <div className="max-w-4xl mx-auto animate-fade-in">
            <div className="flex items-center justify-center gap-3 mb-6">
              <div className="bg-gradient-to-r from-primary to-secondary p-3 rounded-2xl">
                <Wind className="w-10 h-10 text-primary-foreground" />
              </div>
              <h1 className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                AirSense
              </h1>
            </div>
            <p className="text-xl md:text-2xl text-muted-foreground mb-4">
              Predictive Model for Air Quality
            </p>
            <p className="text-base text-muted-foreground max-w-2xl mx-auto">
              Monitor and predict air quality using advanced machine learning. 
              Get real-time AQI predictions based on pollutant measurements.
            </p>
          </div>
        </section>

        {/* Predictor Section */}
        <section className="pb-12">
          <AQIPredictor />
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-card/50 backdrop-blur-sm border-t border-border py-8 mt-12">
        <div className="max-w-6xl mx-auto px-4 text-center text-muted-foreground">
          <p>© 2024 AirSense. Breathe Easy, Stay Informed.</p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
