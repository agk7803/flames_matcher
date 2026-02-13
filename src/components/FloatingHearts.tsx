import { useEffect, useState } from "react";
import { Heart } from "lucide-react";

interface FloatingHeart {
  id: number;
  left: number;
  delay: number;
  duration: number;
  size: number;
  opacity: number;
}

const FloatingHearts = () => {
  const [hearts, setHearts] = useState<FloatingHeart[]>([]);

  useEffect(() => {
    const generated: FloatingHeart[] = Array.from({ length: 15 }, (_, i) => ({
      id: i,
      left: Math.random() * 100,
      delay: Math.random() * 8,
      duration: 6 + Math.random() * 6,
      size: 12 + Math.random() * 20,
      opacity: 0.15 + Math.random() * 0.25,
    }));
    setHearts(generated);
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
      {hearts.map((h) => (
        <div
          key={h.id}
          className="absolute"
          style={{
            left: `${h.left}%`,
            bottom: "-20px",
            animation: `float-up ${h.duration}s linear ${h.delay}s infinite`,
            opacity: h.opacity,
          }}
        >
          <Heart
            size={h.size}
            className="text-primary fill-primary/30"
          />
        </div>
      ))}
    </div>
  );
};

export default FloatingHearts;
