const WORDS = [
  "Pani Puri",
  "Bhel Puri",
  "Sev Puri",
  "Masala Dosa",
  "Pav Bhaji",
  "Chole Bhatura",
  "Dahi Puri",
  "Vada Pav",
  "Samosa Chaat",
  "Falooda",
  "Aloo Tikki",
  "Jalebi",
];

export default function Marquee() {
  return (
    <div className="relative overflow-hidden border-y-2 border-masala bg-masala py-4">
      <div className="flex w-max animate-marquee gap-8 whitespace-nowrap">
        {[...WORDS, ...WORDS].map((w, i) => (
          <span
            key={i}
            className="flex items-center gap-8 font-display text-2xl font-bold text-cream/90"
          >
            {w}
            <span className="text-saffron">✦</span>
          </span>
        ))}
      </div>
    </div>
  );
}
