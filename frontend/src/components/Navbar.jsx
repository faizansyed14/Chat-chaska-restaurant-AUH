import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Menu, X, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { waLink } from "@/lib/utils";

const LINKS = [
  { label: "Home", href: "#home" },
  { label: "Story", href: "#about" },
  { label: "Specials", href: "#signature" },
  { label: "Menu", href: "#menu" },
  { label: "Reviews", href: "#reviews" },
  { label: "Visit", href: "#contact" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 bg-white transition-all duration-300 ${scrolled ? "shadow-soft py-1" : "py-1.5"
        }`}
    >
      <nav className="container flex items-center justify-between gap-2">
        <a href="#home" className="flex shrink-0 items-center gap-2 sm:gap-3">
          <Logo />
          <AnimatedWordmark />
        </a>

        <div className="hidden items-center gap-1 lg:flex">
          {LINKS.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="rounded-full px-4 py-2 text-sm font-bold text-masala/80 transition-colors hover:bg-masala/5 hover:text-masala"
            >
              {l.label}
            </a>
          ))}
        </div>

        <div className="hidden items-center gap-3 lg:flex">
          <a href="tel:+97126500101">
            <Button variant="outline" size="sm" className="gap-2">
              <Phone className="h-4 w-4" /> Call
            </Button>
          </a>
          <a href={waLink()} target="_blank" rel="noreferrer">
            <Button variant="whatsapp">Order on WhatsApp</Button>
          </a>
        </div>

        <button
          className="shrink-0 rounded-full p-2 text-masala lg:hidden"
          onClick={() => setOpen((v) => !v)}
          aria-label="Toggle menu"
        >
          {open ? <X /> : <Menu />}
        </button>
      </nav>

      {open && (
        <div className="container mt-2 lg:hidden">
          <div className="rounded-3xl border border-border bg-cream p-4 shadow-warm">
            {LINKS.map((l) => (
              <a
                key={l.href}
                href={l.href}
                onClick={() => setOpen(false)}
                className="block rounded-xl px-4 py-3 font-bold text-masala hover:bg-masala/5"
              >
                {l.label}
              </a>
            ))}
            <a
              href={waLink()}
              target="_blank"
              rel="noreferrer"
              onClick={() => setOpen(false)}
            >
              <Button variant="whatsapp" className="mt-2 w-full">
                Order on WhatsApp
              </Button>
            </a>
          </div>
        </div>
      )}
    </header>
  );
}

/**
 * Animated wordmark beside the logo.
 * - "Chaat" fades up into place, then "Chaska" glides in from the left.
 * - Loops forever, replaying every 5 seconds.
 * - Lives inside a FIXED-WIDTH box so the animation NEVER shifts the
 *   surrounding navbar elements. Transforms/opacity don't affect layout.
 * - Shown on every screen size (between the logo and the hamburger on mobile).
 */
function AnimatedWordmark() {
  const [cycle, setCycle] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => setCycle((c) => c + 1), 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <span
      aria-label="Chaat Chaska"
      className="relative inline-flex w-[124px] shrink-0 items-baseline overflow-visible whitespace-nowrap font-script text-2xl font-bold leading-none sm:w-[168px] sm:text-3xl"
    >
      <motion.span
        key={`a-${cycle}`}
        initial={{ opacity: 0, y: 6 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.45, ease: "easeOut" }}
        className="bg-gradient-to-r from-saffron to-chili bg-clip-text text-transparent"
      >
        Chaat
      </motion.span>
      <motion.span
        key={`b-${cycle}`}
        initial={{ opacity: 0, x: -26 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1], delay: 0.55 }}
        className="ml-1.5 bg-gradient-to-r from-chili to-masala bg-clip-text text-transparent"
      >
        Chaska
      </motion.span>
    </span>
  );
}

export function Logo({ light = false, className = "" }) {
  // Uses your real logo at /public/images/logo.jpg.
  // If the file isn't present yet, it gracefully falls back to a drawn mark.
  const [errored, setErrored] = useState(false);

  if (!errored) {
    return (
      <img
        src="/images/logo.jpg"
        alt="Chaat Chaska — Indian Street Food"
        onError={() => setErrored(true)}
        className={`h-9 w-auto shrink-0 object-contain sm:h-11 ${light ? "rounded-xl bg-white p-1.5" : ""
          } ${className}`}
      />
    );
  }

  // Fallback mark
  return (
    <div className={`flex shrink-0 items-center ${className}`}>
      <svg viewBox="0 0 100 100" className="h-9 w-9 sm:h-11 sm:w-11">
        <path
          d="M70 22 A30 30 0 1 0 70 78 L70 64 A16 16 0 1 1 70 36 Z"
          fill="#E23A1E"
        />
        <path
          d="M62 34 A18 18 0 1 0 62 66 L62 56 A8 8 0 1 1 62 44 Z"
          fill="#F4900C"
        />
        <rect x="64" y="30" width="14" height="14" rx="3" fill="#E23A1E" />
      </svg>
    </div>
  );
}