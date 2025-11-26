import { NavLink } from "@/components/NavLink";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { Button } from "./ui/button";
import { useEffect, useState } from "react";

export const Navbar = () => {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 glass-card border-b">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <NavLink to="/" className="flex items-center hover:opacity-80 transition-opacity">
            <h1 className="text-2xl font-bold text-foreground">
              AirSense<span className="text-primary">.</span>
            </h1>
          </NavLink>
          
          <div className="flex items-center gap-6">
            <div className="hidden sm:flex items-center space-x-6">
              <NavLink
                to="/"
                className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
                activeClassName="text-foreground font-semibold"
              >
                Home
              </NavLink>
              <NavLink
                to="/about"
                className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
                activeClassName="text-foreground font-semibold"
              >
                About
              </NavLink>
              <NavLink
                to="/contact"
                className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
                activeClassName="text-foreground font-semibold"
              >
                Contact
              </NavLink>
            </div>
            
            {mounted && (
              <Button
                variant="outline"
                size="icon"
                onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                className="glass-input border-border/50 hover:border-primary transition-all"
              >
                {theme === "dark" ? (
                  <Sun className="h-5 w-5 text-primary" />
                ) : (
                  <Moon className="h-5 w-5 text-primary" />
                )}
              </Button>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};
