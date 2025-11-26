import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Home, Wind } from "lucide-react";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error("404 Error: User attempted to access non-existent route:", location.pathname);
  }, [location.pathname]);

  return (
    <div className="flex min-h-screen items-center justify-center">
      <div className="text-center animate-fade-in">
        <div className="glass-input w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-6 border-border/30">
          <Wind className="w-12 h-12 text-primary" />
        </div>
        <h1 className="mb-4 text-6xl font-bold text-foreground">404</h1>
        <p className="mb-8 text-xl text-muted-foreground">
          Oops! This page seems to have drifted away
        </p>
        <Button 
          asChild
          className="bg-gradient-to-r from-primary to-accent hover:opacity-90"
        >
          <a href="/">
            <Home className="w-4 h-4 mr-2" />
            Return to Home
          </a>
        </Button>
      </div>
    </div>
  );
};

export default NotFound;
