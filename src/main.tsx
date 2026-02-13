import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";

// Sounds
const clickSound = new Audio("/awa.mp3");
const backSound = new Audio("/back.mp3");

clickSound.preload = "auto";
backSound.preload = "auto";

// Volume (optional)
clickSound.volume = 0.5;
backSound.volume = 0.5;

// Global click handler
document.addEventListener("click", (e) => {
    const target = e.target as HTMLElement;

    const button = target.closest("button");

    if (!button) return;

    // Check if back button
    const isBack = button.dataset.sound === "back";

    const sound = isBack ? backSound : clickSound;

    sound.currentTime = 0;
    sound.play().catch(() => { });
});

createRoot(document.getElementById("root")!).render(<App />);