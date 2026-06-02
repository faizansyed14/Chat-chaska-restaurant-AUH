import { useState } from "react";

// Brand gradient palettes keyed by dish id for the fallback art.
const PALETTES = {
  "pani-puri": ["#F4900C", "#E23A1E"],
  "bhel-puri": ["#5DBB63", "#3E7C4A"],
  "sev-puri": ["#F6C445", "#F4900C"],
  samosa: ["#E2862A", "#7A1E12"],
  "pav-bhaji": ["#E23A1E", "#7A1E12"],
  dosa: ["#F6C445", "#E58300"],
  "dahi-puri": ["#7BC4D4", "#3E7C4A"],
  falooda: ["#E84393", "#7A1E12"],
};

export default function DishImage({ id, name, emoji, img, className = "" }) {
  const [errored, setErrored] = useState(false);
  const [grad1, grad2] = PALETTES[id] || ["#F4900C", "#E23A1E"];

  // Try a real photo first (drop files into /public/images). If missing,
  // fall back to a branded illustrated tile so the UI never looks broken.
  if (img && !errored) {
    return (
      <div className={`relative overflow-hidden ${className}`}>
        <img
          src={`/images/${img}`}
          alt={name}
          loading="lazy"
          onError={() => setErrored(true)}
          className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
        />
      </div>
    );
  }

  return (
    <div
      className={`relative flex items-center justify-center overflow-hidden ${className}`}
      style={{
        background: `radial-gradient(circle at 30% 20%, ${grad1}, ${grad2})`,
      }}
    >
      <div className="absolute inset-0 opacity-20 [background-image:radial-gradient(circle,_white_1.5px,_transparent_1.6px)] [background-size:18px_18px]" />
      <span className="relative z-10 text-6xl drop-shadow-lg transition-transform duration-700 group-hover:scale-125 group-hover:-rotate-6">
        {emoji || "🍽️"}
      </span>
    </div>
  );
}
