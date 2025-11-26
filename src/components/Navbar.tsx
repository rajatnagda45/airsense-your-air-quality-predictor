import { NavLink } from "@/components/NavLink";
import { Wind } from "lucide-react";

export const Navbar = () => {
  return (
    <nav className="bg-card/80 backdrop-blur-md border-b border-border sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <NavLink to="/" className="flex items-center gap-2 hover:opacity-80 transition-opacity">
            <div className="bg-gradient-to-r from-primary to-secondary p-2 rounded-lg">
              <Wind className="w-6 h-6 text-primary-foreground" />
            </div>
            <span className="text-xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              AirSense
            </span>
          </NavLink>
          
          <div className="flex items-center gap-6">
            <NavLink
              to="/"
              className="text-sm font-medium text-foreground/70 hover:text-foreground transition-colors"
              activeClassName="text-primary font-semibold"
            >
              Home
            </NavLink>
            <NavLink
              to="/about"
              className="text-sm font-medium text-foreground/70 hover:text-foreground transition-colors"
              activeClassName="text-primary font-semibold"
            >
              About
            </NavLink>
            <NavLink
              to="/contact"
              className="text-sm font-medium text-foreground/70 hover:text-foreground transition-colors"
              activeClassName="text-primary font-semibold"
            >
              Contact
            </NavLink>
          </div>
        </div>
      </div>
    </nav>
  );
};
