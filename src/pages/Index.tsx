import { Navbar } from "@/components/Navbar";
import { AQIPredictor } from "@/components/AQIPredictor";
import { Wind } from "lucide-react";

const Index = () => {
  return (
    <div className="min-h-screen">
      <Navbar />
      
      <main className="pt-24">
        {/* Hero Section */}
        <section className="text-center py-16 px-4">
          <div className="max-w-4xl mx-auto animate-fade-in">
            <h1 className="text-5xl md:text-6xl font-bold mb-4 bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent">
              AI Air Quality Predictor
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto">
              Enter pollutant levels and get an instant AQI estimate with category & recommendation.
            </p>
          </div>
        </section>

        {/* Predictor Section */}
        <section className="pb-20">
          <AQIPredictor />
        </section>
      </main>

      {/* Footer */}
      <footer className="glass-card border-t py-6 mt-12">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <p className="text-sm text-muted-foreground">
            Made with <span className="text-red-500">♥</span> — AI • ML • Flask • Data
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
