import { useEffect, useState } from "react";
import { motion } from "framer-motion";

/**
 * Landing intro: a full-screen dark-brown "door" with the bg image in the
 * centre. After loading, the door splits from the exact middle — the two
 * halves slide apart to reveal the site.
 */
export default function DoorLoader() {
  const [phase, setPhase] = useState("loading"); // loading | opening | done
  const [imgError, setImgError] = useState(false);

  // Kick off the opening after a short load.
  useEffect(() => {
    const t = setTimeout(() => setPhase("opening"), 1600);
    return () => clearTimeout(t);
  }, []);

  // Lock page scroll while the intro is on screen.
  useEffect(() => {
    document.body.style.overflow = phase === "done" ? "" : "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, [phase]);

  if (phase === "done") return null;

  const opening = phase === "opening";
  const doorTransition = {
    duration: 1.05,
    ease: [0.76, 0, 0.24, 1],
    delay: opening ? 0.4 : 0,
  };

  // Carved wood look for each door half.
  const doorBase =
    "absolute inset-y-0 w-1/2 bg-[#3d0e07] bg-[radial-gradient(circle_at_50%_30%,rgba(244,144,12,0.10),transparent_55%)]";

  return (
    <div
      className="fixed inset-0 z-[100] overflow-hidden"
      aria-hidden="true"
    >
      {/* Left door */}
      <motion.div
        initial={{ x: 0 }}
        animate={{ x: opening ? "-101%" : 0 }}
        transition={doorTransition}
        className={`${doorBase} left-0 border-r border-saffron/30`}
      >
        <div className="absolute right-0 top-0 h-full w-1.5 bg-gradient-to-b from-saffron/40 via-chili/30 to-transparent" />
        {/* handle */}
        <div className="absolute right-4 top-1/2 h-12 w-2 -translate-y-1/2 rounded-full bg-saffron/70 shadow-[0_0_18px_rgba(244,144,12,0.6)]" />
        {/* faint frame */}
        <div className="absolute inset-6 rounded-l-[2rem] border border-saffron/10" />
      </motion.div>

      {/* Right door */}
      <motion.div
        initial={{ x: 0 }}
        animate={{ x: opening ? "101%" : 0 }}
        transition={doorTransition}
        onAnimationComplete={() => {
          if (opening) setPhase("done");
        }}
        className={`${doorBase} right-0 border-l border-saffron/30`}
      >
        <div className="absolute left-0 top-0 h-full w-1.5 bg-gradient-to-b from-saffron/40 via-chili/30 to-transparent" />
        <div className="absolute left-4 top-1/2 h-12 w-2 -translate-y-1/2 rounded-full bg-saffron/70 shadow-[0_0_18px_rgba(244,144,12,0.6)]" />
        <div className="absolute inset-6 rounded-r-[2rem] border border-saffron/10" />
      </motion.div>

      {/* Centre medallion — bg image + brand, fades out as doors open */}
      <motion.div
        animate={{ opacity: opening ? 0 : 1, scale: opening ? 0.88 : 1 }}
        transition={{ duration: 0.45, ease: "easeIn" }}
        className="pointer-events-none absolute inset-0 z-10 grid place-items-center px-6"
      >
        <div className="flex flex-col items-center gap-5">
          {!imgError ? (
            <motion.img
              src="/images/bg.jpg"
              alt="Chaat Chaska"
              onError={() => setImgError(true)}
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="max-h-[40vh] w-auto rounded-3xl object-contain shadow-[0_20px_60px_-15px_rgba(0,0,0,0.6)] ring-2 ring-saffron/40"
            />
          ) : (
            <div className="grid h-32 w-32 place-items-center rounded-3xl bg-cream/10 ring-2 ring-saffron/40">
              <svg viewBox="0 0 100 100" className="h-20 w-20">
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
          )}

          <div className="text-center">
            <p className="font-script text-3xl font-bold text-saffron sm:text-4xl">
              Chaat Chaska
            </p>
            <p className="mt-1 text-[10px] font-bold uppercase tracking-[0.3em] text-cream/70 sm:text-xs">
              Indian Street Food
            </p>
          </div>

          {/* loading shimmer bar */}
          <div className="relative mt-1 h-1 w-40 overflow-hidden rounded-full bg-cream/15">
            <motion.div
              className="absolute inset-y-0 left-0 w-1/2 rounded-full bg-gradient-to-r from-saffron to-chili"
              animate={{ x: ["-100%", "200%"] }}
              transition={{ duration: 1.2, repeat: Infinity, ease: "easeInOut" }}
            />
          </div>
        </div>
      </motion.div>
    </div>
  );
}
