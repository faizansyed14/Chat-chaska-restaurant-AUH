import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Logo } from "@/components/Navbar";

/**
 * Landing intro: a full-screen dark-brown "door" with the bg image in the
 * centre. After loading, the door splits from the exact middle - the two
 * halves slide apart to reveal the site.
 */
export default function DoorLoader() {
  const [phase, setPhase] = useState("loading"); // loading | opening | done

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
        <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 sm:gap-4">
          <Logo light className="!h-14 !w-auto sm:!h-20 md:!h-24" />
          <p className="font-display text-4xl font-black tracking-tight text-saffron sm:text-5xl md:text-6xl">
            chaat
          </p>
        </div>
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
        <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 sm:gap-4">
          <Logo light className="!h-14 !w-auto sm:!h-20 md:!h-24" />
          <p className="font-display text-4xl font-black tracking-tight text-saffron sm:text-5xl md:text-6xl">
            chaska
          </p>
        </div>
      </motion.div>

      {/* Loading bar — fades out as doors open */}
      <motion.div
        animate={{ opacity: opening ? 0 : 1, scale: opening ? 0.88 : 1 }}
        transition={{ duration: 0.45, ease: "easeIn" }}
        className="pointer-events-none absolute inset-0 z-10 grid place-items-center px-6"
      >
        <div className="relative h-1 w-40 overflow-hidden rounded-full bg-cream/15">
          <motion.div
            className="absolute inset-y-0 left-0 w-1/2 rounded-full bg-gradient-to-r from-saffron to-chili"
            animate={{ x: ["-100%", "200%"] }}
            transition={{ duration: 1.2, repeat: Infinity, ease: "easeInOut" }}
          />
        </div>
      </motion.div>
    </div>
  );
}
