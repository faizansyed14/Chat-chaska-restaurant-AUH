import { useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Star, ArrowRight, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { waLink } from "@/lib/utils";

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12, delayChildren: 0.1 } },
};
const item = {
  hidden: { opacity: 0, y: 28 },
  show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] } },
};

export default function Hero() {
  const [imgError, setImgError] = useState(false);
  const { scrollY } = useScroll();
  const yImg = useTransform(scrollY, [0, 600], [0, -60]);

  return (
    <section
      id="home"
      className="bg-spice grain relative flex min-h-[100svh] items-center overflow-hidden pb-16 pt-24 sm:pt-28"
    >
      {/* Decorative rotating mandala */}
      <div className="pointer-events-none absolute -right-40 top-10 h-[34rem] w-[34rem] opacity-[0.07]">
        <div className="h-full w-full animate-spin-slow rounded-full border-[3px] border-dashed border-masala" />
      </div>

      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        className="container relative z-10 grid items-center gap-10 lg:grid-cols-[1.05fr_0.95fr]"
      >
        <div className="text-center lg:text-left">
          <motion.div variants={item} className="flex justify-center lg:justify-start">
            <span className="inline-flex items-center gap-2 rounded-full bg-white px-3 py-1.5 text-[10px] font-bold uppercase tracking-widest text-chili shadow-soft sm:px-4 sm:py-2 sm:text-xs">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-2 w-2 animate-ping rounded-full bg-chili opacity-60" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-chili" />
              </span>
              Madinat Zayed · Musaffah · Abu Dhabi
            </span>
          </motion.div>

          <motion.h1
            variants={item}
            className="mt-6 font-display text-4xl font-black leading-[1.02] tracking-tight text-masala text-balance sm:text-5xl md:text-6xl lg:text-7xl"
          >
            Real{" "}
            <span className="relative inline-block text-chili">
              Indian
              <svg
                viewBox="0 0 200 20"
                className="absolute -bottom-2 left-0 w-full"
                preserveAspectRatio="none"
              >
                <path
                  d="M2 14 Q 60 4 120 12 T 198 8"
                  fill="none"
                  stroke="#F4900C"
                  strokeWidth="5"
                  strokeLinecap="round"
                />
              </svg>
            </span>{" "}
            street food, <span className="font-script text-saffron">made with love.</span>
          </motion.h1>

          <motion.p
            variants={item}
            className="mx-auto mt-5 max-w-xl text-base leading-relaxed text-masala/70 sm:mt-6 sm:text-lg lg:mx-0"
          >
            From the first crunch of pani puri to the last spoon of falooda -
            Chaat Chaska brings the vibrant flavours of India's bazaars to the
            heart of Abu Dhabi. Freshly made, every single bite.
          </motion.p>

          <motion.div
            variants={item}
            className="mt-7 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:justify-center lg:justify-start"
          >
            <a href="#menu" className="w-full sm:w-auto">
              <Button size="lg" className="group w-full sm:w-auto">
                Explore the Menu
                <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
              </Button>
            </a>
            <a
              href={waLink()}
              target="_blank"
              rel="noreferrer"
              className="w-full sm:w-auto"
            >
              <Button size="lg" variant="whatsapp" className="w-full sm:w-auto">
                Order on WhatsApp
              </Button>
            </a>
          </motion.div>

          <motion.div
            variants={item}
            className="mt-9 flex items-center justify-center gap-3 lg:justify-start"
          >
            <div className="flex -space-x-3">
              {["#F4900C", "#E23A1E", "#3E7C4A", "#F6C445"].map((c) => (
                <div
                  key={c}
                  className="h-9 w-9 rounded-full border-2 border-cream"
                  style={{ background: c }}
                />
              ))}
            </div>
            <div className="text-left">
              <div className="flex items-center gap-1">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="h-4 w-4 fill-saffron text-saffron" />
                ))}
              </div>
              <p className="text-sm font-bold text-masala">
                4.8 · 1,000+ Google reviews
              </p>
            </div>
          </motion.div>
        </div>

        {/* Hero visual - your bg.jpg, full image, just shorter */}
        <motion.div variants={item} style={{ y: yImg }} className="relative mx-auto w-fit">
          <div className="absolute -inset-3 -z-10 rounded-[2.5rem] bg-gradient-to-br from-saffron/30 to-chili/20 blur-2xl" />
          <div className="relative animate-float rounded-[2rem] bg-gradient-to-br from-saffron to-chili p-1.5 shadow-warm sm:rounded-[2.5rem]">
            {!imgError ? (
              <div className="overflow-hidden rounded-[1.7rem] bg-cream sm:rounded-[2.2rem]">
                <img
                  src="/images/bg.jpg"
                  alt="Chaat Chaska Indian street food"
                  onError={() => setImgError(true)}
                  className="block max-h-[360px] w-auto object-contain sm:max-h-[440px] lg:max-h-[500px]"
                />
              </div>
            ) : (
              <div className="rounded-[1.7rem] bg-cream p-5 sm:rounded-[2.2rem] sm:p-8">
                <div className="grid grid-cols-2 gap-3 sm:gap-4">
                  {[
                    { e: "🫗", n: "Pani Puri", p: "7" },
                    { e: "🥗", n: "Bhel Puri", p: "8" },
                    { e: "🌯", n: "Masala Dosa", p: "10" },
                    { e: "🍛", n: "Pav Bhaji", p: "12" },
                  ].map((d, i) => (
                    <motion.div
                      key={d.n}
                      whileHover={{ y: -6, rotate: i % 2 ? 2 : -2 }}
                      className="rounded-2xl bg-white p-4 text-center shadow-soft"
                    >
                      <div className="text-4xl">{d.e}</div>
                      <p className="mt-2 font-bold text-masala">{d.n}</p>
                      <p className="text-sm font-bold text-chili">{d.p} AED</p>
                    </motion.div>
                  ))}
                </div>
                <a href="#contact">
                  <div className="mt-4 flex items-center justify-center gap-2 rounded-2xl bg-masala px-4 py-3 text-sm font-bold text-cream transition-colors hover:bg-[#5e1209]">
                    <MapPin className="h-4 w-4" /> Find us in Abu Dhabi
                  </div>
                </a>
              </div>
            )}
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
}
