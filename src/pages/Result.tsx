import { useEffect, useState, useCallback, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  Heart,
  Download,
  Copy,
  RotateCcw,
  Check,
  ArrowLeft,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import FloatingHearts from "@/components/FloatingHearts";
import TypewriterText from "@/components/TypewriterText";
import { supabase } from "@/integrations/supabase/client";

interface MatchData {
  name1: string;
  name2: string;
  score: number;
  message: string;
  quote: string;
  created_at: string;
}

const Result = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const [match, setMatch] = useState<MatchData | null>(null);
  const [loading, setLoading] = useState(true);
  const [showScore, setShowScore] = useState(false);
  const [animatedScore, setAnimatedScore] = useState(0);
  const [copied, setCopied] = useState(false);
  const [messageComplete, setMessageComplete] = useState(false);

  const canvasRef = useRef<HTMLCanvasElement>(null);

  // Fetch match data
  useEffect(() => {
    const fetchMatch = async () => {
      const { data, error } = await supabase
        .from("matches")
        .select("*")
        .eq("share_id", id)
        .maybeSingle();

      if (error || !data) {
        console.error("Fetch error:", error);
        setLoading(false);
        return;
      }

      setMatch(data);
      setLoading(false);
    };

    fetchMatch();
  }, [id]);

  // Animate score
  useEffect(() => {
    if (!showScore || !match) return;

    let current = 0;
    const target = match.score;
    const step = Math.ceil(target / 60);

    const interval = setInterval(() => {
      current += step;

      if (current >= target) {
        current = target;
        clearInterval(interval);
      }

      setAnimatedScore(current);
    }, 25);

    return () => clearInterval(interval);
  }, [showScore, match]);

  // After typewriter finishes
  const handleMessageComplete = useCallback(() => {
    setMessageComplete(true);
    setTimeout(() => setShowScore(true), 400);
  }, []);

  // Copy link
  const handleCopy = () => {
    navigator.clipboard.writeText(window.location.href);

    setCopied(true);

    setTimeout(() => {
      setCopied(false);
    }, 2000);
  };

  // Download image
  const handleDownload = () => {
    if (!match) return;

    const canvas = document.createElement("canvas");
    canvas.width = 800;
    canvas.height = 1000;

    const ctx = canvas.getContext("2d")!;

    // Background
    const grad = ctx.createLinearGradient(0, 0, 0, 1000);
    grad.addColorStop(0, "#FFF5F5");
    grad.addColorStop(0.5, "#FDE8E8");
    grad.addColorStop(1, "#F8E0E6");

    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, 800, 1000);

    // Borders
    ctx.strokeStyle = "#8B2252";
    ctx.lineWidth = 3;
    ctx.strokeRect(30, 30, 740, 940);

    ctx.strokeStyle = "#D4A0A0";
    ctx.lineWidth = 1;
    ctx.strokeRect(40, 40, 720, 920);

    // Heart drawing
    const drawHeart = (x: number, y: number, size: number) => {
      ctx.save();

      ctx.translate(x, y);

      ctx.beginPath();
      ctx.moveTo(0, size * 0.3);

      ctx.bezierCurveTo(
        -size * 0.5,
        -size * 0.3,
        -size,
        size * 0.1,
        0,
        size
      );

      ctx.bezierCurveTo(
        size,
        size * 0.1,
        size * 0.5,
        -size * 0.3,
        0,
        size * 0.3
      );

      ctx.fillStyle = "#C4446B";
      ctx.fill();

      ctx.restore();
    };

    drawHeart(80, 60, 18);
    drawHeart(720, 60, 18);
    drawHeart(80, 900, 18);
    drawHeart(720, 900, 18);

    // Title
    ctx.fillStyle = "#6B1839";
    ctx.font = "italic 24px Georgia, serif";
    ctx.textAlign = "center";
    ctx.fillText("Our Love Story", 400, 120);

    // Line
    ctx.strokeStyle = "#D4A0A0";
    ctx.beginPath();
    ctx.moveTo(200, 145);
    ctx.lineTo(600, 145);
    ctx.stroke();

    // Names
    ctx.fillStyle = "#8B2252";
    ctx.font = "bold 44px Georgia, serif";

    ctx.fillText(match.name1, 400, 240);

    drawHeart(400, 270, 22);

    ctx.fillText(match.name2, 400, 340);

    // Score circle
    ctx.beginPath();
    ctx.arc(400, 480, 80, 0, Math.PI * 2);

    ctx.fillStyle = "#F5E0E5";
    ctx.fill();

    ctx.strokeStyle = "#C4446B";
    ctx.lineWidth = 4;
    ctx.stroke();

    ctx.fillStyle = "#8B2252";
    ctx.font = "bold 52px Georgia, serif";

    ctx.fillText(`${match.score}%`, 400, 500);

    ctx.font = "16px Georgia, serif";
    ctx.fillStyle = "#A05070";

    ctx.fillText("compatibility", 400, 530);

    // Quote
    ctx.fillStyle = "#8B2252";
    ctx.font = "italic 28px Georgia, serif";

    const quoteClean = match.quote
      .replace(/[✨💫💕🌙🔥🌹💘🦋🌸💭]/g, "")
      .trim();

    ctx.fillText(`"${quoteClean}"`, 400, 640);

    // Message
    ctx.fillStyle = "#6B4050";
    ctx.font = "16px Georgia, serif";

    const words = match.message.split(" ");
    let line = "";
    let y = 720;

    for (const word of words) {
      const test = line + word + " ";

      if (ctx.measureText(test).width > 600) {
        ctx.fillText(line.trim(), 400, y);
        line = word + " ";
        y += 26;
      } else {
        line = test;
      }
    }

    ctx.fillText(line.trim(), 400, y);

    // Date
    ctx.fillStyle = "#A08090";
    ctx.font = "italic 14px Georgia, serif";

    const date = new Date(match.created_at).toLocaleDateString(
      "en-US",
      {
        year: "numeric",
        month: "long",
        day: "numeric",
      }
    );

    ctx.fillText(date, 400, 920);

    // Download
    const link = document.createElement("a");

    link.download = `${match.name1}-${match.name2}-love-story.png`;
    link.href = canvas.toDataURL("image/png");

    link.click();
  };

  // Loading
  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-background">
        <Heart
          size={40}
          className="text-primary animate-pulse-heart fill-primary/20"
        />
      </div>
    );
  }

  // Not found
  if (!match) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-background">
        <div className="text-center">

          <h1 className="text-2xl font-serif text-foreground mb-4">
            Match not found
          </h1>

          <Button
            onClick={() => navigate("/match")}
            variant="outline"
            className="rounded-full font-sans"
          >
            Try Again
          </Button>

        </div>
      </div>
    );
  }

  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden py-12">

      {/* Back Button */}
      <button
        data-sound="back"
        onClick={() => navigate("/match")}
        className="fixed top-6 left-6 z-20 flex items-center gap-1
                   text-muted-foreground hover:text-foreground
                   transition-colors font-sans"
      >
        <ArrowLeft size={18} />
        Back
      </button>

      <FloatingHearts />
      <canvas ref={canvasRef} className="hidden" />

      <div className="relative z-10 w-full max-w-lg mx-auto px-6">

        <div className="bg-card/80 backdrop-blur-sm border border-border rounded-2xl p-8 shadow-xl text-center">

          <Heart
            size={32}
            className="mx-auto mb-4 text-primary fill-primary/20 animate-pulse-heart"
          />

          {/* Names */}
          <div className="mb-6 animate-fade-in-up">
            <h2 className="text-2xl font-serif font-bold text-foreground">
              {match.name1}
            </h2>

            <span className="font-script text-2xl text-primary mx-2">
              &
            </span>

            <h2 className="text-2xl font-serif font-bold text-foreground">
              {match.name2}
            </h2>
          </div>

          {/* Message */}
          <div className="min-h-[80px] mb-6">
            <TypewriterText
              text={match.message}
              speed={35}
              className="font-serif-body text-muted-foreground text-base leading-relaxed"
              onComplete={handleMessageComplete}
            />
          </div>

          {/* Score */}
          {showScore && (
            <div className="mb-6 animate-fade-in-up">

              <div className="relative w-36 h-36 mx-auto mb-3">

                <svg
                  className="w-full h-full -rotate-90"
                  viewBox="0 0 120 120"
                >
                  <circle
                    cx="60"
                    cy="60"
                    r="52"
                    fill="none"
                    stroke="hsl(var(--muted))"
                    strokeWidth="8"
                  />

                  <circle
                    cx="60"
                    cy="60"
                    r="52"
                    fill="none"
                    stroke="hsl(var(--primary))"
                    strokeWidth="8"
                    strokeLinecap="round"
                    strokeDasharray={`${(animatedScore / 100) * 327} 327`}
                    className="transition-all duration-100"
                  />
                </svg>

                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-4xl font-serif font-bold text-foreground">
                    {animatedScore}%
                  </span>
                </div>

              </div>
            </div>
          )}

          {/* Quote */}
          {messageComplete && (
            <p
              className="font-script text-2xl text-primary mb-8 animate-fade-in-up"
              style={{ animationDelay: "1.2s", opacity: 0 }}
            >
              "{match.quote}"
            </p>
          )}

          {/* Actions */}
          {messageComplete && (
            <div
              className="flex flex-col gap-3 animate-fade-in-up"
              style={{ animationDelay: "1.5s", opacity: 0 }}
            >

              <Button
                onClick={handleDownload}
                className="rounded-full font-sans font-semibold bg-primary text-primary-foreground hover:bg-primary/90 shadow-md hover:scale-[1.02] transition-all"
              >
                <Download size={18} className="mr-2" />
                Save Our Story 💕
              </Button>

              <div className="flex gap-3">

                <Button
                  onClick={handleCopy}
                  variant="outline"
                  className="flex-1 rounded-full font-sans border-border"
                >
                  {copied ? (
                    <Check size={16} className="mr-1" />
                  ) : (
                    <Copy size={16} className="mr-1" />
                  )}

                  {copied ? "Copied!" : "Share Link"}
                </Button>

                <Button
                  onClick={() => navigate("/match")}
                  variant="outline"
                  className="flex-1 rounded-full font-sans border-border"
                >
                  <RotateCcw size={16} className="mr-1" />
                  Try Again
                </Button>

              </div>
            </div>
          )}

        </div>
      </div>
    </div>
  );
};

export default Result;