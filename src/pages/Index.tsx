import { useNavigate } from "react-router-dom";
import { Heart } from "lucide-react";
import { Button } from "@/components/ui/button";
import FloatingHearts from "@/components/FloatingHearts";
import ClawMachine from "@/components/ClawMachine";
import GlassHeroCard from "@/components/GlassHeroCard";



const Index = () => {
  const navigate = useNavigate();

  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden">
      <FloatingHearts />

      <div className="relative z-10 text-center px-6 max-w-2xl mx-auto">
        <div className="animate-fade-in-up">
          <Heart
            size={56}
            className="mx-auto mb-6 text-primary fill-primary/20 animate-pulse-heart"
          />
        </div>

        <h1
          className="text-5xl md:text-7xl font-serif font-bold text-foreground mb-4 animate-fade-in-up"
          style={{ animationDelay: "0.2s", opacity: 0 }}
        >
          Discover Your Love Story
        </h1>

        <p
          className="font-script text-2xl md:text-3xl text-primary mb-2 animate-fade-in-up"
          style={{ animationDelay: "0.5s", opacity: 0 }}
        >
          Where hearts find their match
        </p>

        <p
          className="font-serif-body text-muted-foreground text-lg mb-10 animate-fade-in-up"
          style={{ animationDelay: "0.7s", opacity: 0 }}
        >
          Enter two names and let the stars reveal your compatibility
        </p>

        <div
          className="animate-fade-in-up"
          style={{ animationDelay: "1s", opacity: 0 }}
        >
          <Button
            size="lg"
            onClick={() => navigate("/match")}
            className="rounded-full px-10 py-6 text-lg font-sans font-semibold bg-primary text-primary-foreground hover:bg-primary/90 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
          >
            <Heart size={20} className="mr-2 fill-current" />
            Match Your Hearts 💕
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Index;
