import { useNavigate } from "react-router-dom";

export default function GlassHeroCard() {
    const navigate = useNavigate();

    return (
        <div className="relative">

            {/* Glow Effect */}
            <div className="absolute -inset-10 bg-pink-400/40 blur-3xl rounded-full"></div>

            {/* Glass Card */}
            <div
                className="
          relative
          backdrop-blur-xl
          bg-white/20
          border border-white/30
          shadow-2xl
          rounded-3xl
          p-12
          text-center
          max-w-xl
        "
            >
                <h1 className="text-5xl font-serif text-rose-800 mb-4">
                    Cupid's Matchmaker 💘
                </h1>

                <p className="text-rose-700 text-lg mb-6">
                    Discover your romantic compatibility with a touch of magic.
                </p>

                <p className="italic text-rose-900 text-md mb-8">
                    “Love is chosen randomly… but magically.” 💖
                </p>

                <button
                    onClick={() => navigate("/match")}
                    className="
            px-8 py-3
            bg-rose-500
            text-white
            rounded-full
            shadow-lg
            hover:scale-105
            hover:bg-rose-600
            transition
          "
                >
                    Find Your Match
                </button>
            </div>
        </div>
    );
}
