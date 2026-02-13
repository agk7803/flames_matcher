import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Heart, Loader2, ArrowLeft } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import FloatingHearts from "@/components/FloatingHearts";
import { supabase } from "@/integrations/supabase/client";

const Match = () => {
  const navigate = useNavigate();

  // States
  const [name1, setName1] = useState("");
  const [name2, setName2] = useState("");

  const [loading, setLoading] = useState(false);

  // Submit Handler
  const handleMatch = async () => {
    if (!name1.trim() || !name2.trim()) {
      return;
    }

    setLoading(true);

    try {
      const { data, error } = await supabase.functions.invoke(
        "calculate-match",
        {
          body: {
            name1: name1.trim(),
            name2: name2.trim(),
          },
        }
      );

      if (error) throw error;

      if (!data?.shareId) {
        throw new Error("Invalid response from server");
      }

      navigate(`/result/${data.shareId}`);
    } catch (err) {
      console.error("Match error:", err);
      alert("Something went wrong. Try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative min-h-screen overflow-hidden">

      {/* Floating Background */}
      <FloatingHearts />

      {/* Back Button (Top Left Fixed) */}
      <button
        data-sound="back"
        onClick={() => navigate("/")}
        className="fixed top-6 left-6 z-20 flex items-center gap-1 
                   text-muted-foreground hover:text-foreground 
                   transition-colors font-sans"
      >
        <ArrowLeft size={18} />
        Back
      </button>

      {/* Center Card */}
      <div className="flex min-h-screen items-center justify-center">

        <div className="relative z-10 w-full max-w-md mx-auto px-6">

          <div className="bg-card/80 backdrop-blur-sm border border-border 
                          rounded-2xl p-8 shadow-xl animate-fade-in-up">

            {/* Header */}
            <div className="text-center mb-8">

              <Heart
                size={36}
                className="mx-auto mb-3 text-primary 
                           fill-primary/20 animate-pulse-heart"
              />

              <h1 className="text-3xl font-serif font-bold text-foreground mb-1">
                Match Your Hearts
              </h1>

              <p className="font-script text-xl text-primary">
                Enter your details below
              </p>

            </div>

            {/* Form */}
            <div className="space-y-5">

              {/* Your Name */}
              <div>
                <label className="block text-sm font-sans font-medium 
                                   text-muted-foreground mb-1.5">
                  💕 Your Name
                </label>

                <Input
                  value={name1}
                  onChange={(e) => setName1(e.target.value)}
                  placeholder="Enter your name"
                  className="rounded-xl bg-background/60 
                             border-border/60 font-sans 
                             text-base py-5 focus:border-primary"
                />
              </div>

              {/* Divider */}
              <div className="flex justify-center">
                <Heart
                  size={20}
                  className="text-primary/40 fill-primary/10"
                />
              </div>

              {/* Their Name */}
              <div>
                <label className="block text-sm font-sans font-medium 
                                   text-muted-foreground mb-1.5">
                  💕 Their Name
                </label>

                <Input
                  value={name2}
                  onChange={(e) => setName2(e.target.value)}
                  placeholder="Enter their name"
                  className="rounded-xl bg-background/60 
                             border-border/60 font-sans 
                             text-base py-5 focus:border-primary"
                  onKeyDown={(e) =>
                    e.key === "Enter" && handleMatch()
                  }
                />
              </div>

              {/* Submit Button */}
              <Button
                onClick={handleMatch}
                disabled={
                  !name1.trim() ||
                  !name2.trim() ||
                  loading
                }
                className="w-full rounded-xl py-6 text-lg 
                           font-sans font-semibold 
                           bg-primary text-primary-foreground 
                           hover:bg-primary/90 shadow-md 
                           hover:shadow-lg transition-all 
                           duration-300 hover:scale-[1.02] mt-4"
              >
                {loading ? (
                  <Loader2
                    className="animate-spin mr-2"
                    size={20}
                  />
                ) : (
                  <Heart
                    size={20}
                    className="mr-2 fill-current"
                  />
                )}

                {loading
                  ? "Reading the stars..."
                  : "Reveal Your Match ✨"}
              </Button>

            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Match;