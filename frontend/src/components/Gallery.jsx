import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ChevronLeft, ChevronRight } from "lucide-react";
import DishImage from "@/components/DishImage";
import { GALLERY } from "@/lib/menuData";

export default function Gallery() {
  const [active, setActive] = useState(null); // index or null

  const close = () => setActive(null);
  const prev = () =>
    setActive((i) => (i === null ? null : (i - 1 + GALLERY.length) % GALLERY.length));
  const next = () =>
    setActive((i) => (i === null ? null : (i + 1) % GALLERY.length));

  useEffect(() => {
    if (active === null) return;
    const onKey = (e) => {
      if (e.key === "Escape") close();
      if (e.key === "ArrowLeft") prev();
      if (e.key === "ArrowRight") next();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [active]);

  return (
    <section id="gallery" className="relative py-16 sm:py-24">
      <div className="container">
        <div className="mx-auto max-w-2xl text-center">
          <span className="font-script text-2xl text-chili sm:text-3xl">
            From our kitchen
          </span>
          <h2 className="mt-1 font-display text-3xl font-black text-masala sm:text-4xl lg:text-5xl">
            Our dishes
          </h2>
        </div>

        <div className="mt-10 grid grid-cols-2 gap-3 sm:mt-12 sm:grid-cols-3 sm:gap-4 lg:grid-cols-4">
          {GALLERY.map((g, i) => (
            <motion.button
              key={g.id}
              initial={{ opacity: 0, scale: 0.92 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.4, delay: (i % 4) * 0.06 }}
              onClick={() => setActive(i)}
              className={`group relative overflow-hidden rounded-2xl shadow-soft ${
                i % 5 === 0 ? "col-span-2 row-span-2" : ""
              }`}
            >
              <DishImage
                id={g.id}
                name={g.name}
                emoji={g.emoji}
                img={g.img}
                className={`w-full ${i % 5 === 0 ? "h-full min-h-[12rem]" : "h-32 sm:h-44"}`}
              />
              <div className="absolute inset-0 flex items-end bg-gradient-to-t from-black/55 via-transparent to-transparent opacity-0 transition-opacity group-hover:opacity-100">
                <span className="p-3 text-sm font-bold text-white">{g.name}</span>
              </div>
            </motion.button>
          ))}
        </div>
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {active !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[90] grid place-items-center bg-black/80 p-4 backdrop-blur-sm"
            onClick={close}
          >
            <button
              onClick={close}
              aria-label="Close"
              className="absolute right-4 top-4 grid h-11 w-11 place-items-center rounded-full bg-white/15 text-white hover:bg-white/25"
            >
              <X className="h-6 w-6" />
            </button>

            <button
              onClick={(e) => {
                e.stopPropagation();
                prev();
              }}
              aria-label="Previous"
              className="absolute left-3 grid h-11 w-11 place-items-center rounded-full bg-white/15 text-white hover:bg-white/25 sm:left-6"
            >
              <ChevronLeft className="h-6 w-6" />
            </button>
            <button
              onClick={(e) => {
                e.stopPropagation();
                next();
              }}
              aria-label="Next"
              className="absolute right-3 grid h-11 w-11 place-items-center rounded-full bg-white/15 text-white hover:bg-white/25 sm:right-6"
            >
              <ChevronRight className="h-6 w-6" />
            </button>

            <motion.div
              key={active}
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.25 }}
              onClick={(e) => e.stopPropagation()}
              className="w-full max-w-2xl overflow-hidden rounded-3xl bg-cream"
            >
              <DishImage
                id={GALLERY[active].id}
                name={GALLERY[active].name}
                emoji={GALLERY[active].emoji}
                img={GALLERY[active].img}
                className="h-[60vh] max-h-[480px] w-full"
              />
              <div className="p-4 text-center">
                <p className="font-display text-xl font-black text-masala">
                  {GALLERY[active].name}
                </p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
