import { useState, useEffect, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ChevronLeft, ChevronRight } from "lucide-react";
import DishImage from "@/components/DishImage";
import { GALLERY } from "@/lib/menuData";

const SWIPE_MIN = 48;

export default function Gallery() {
  const [active, setActive] = useState(null);
  const touchStart = useRef(null);

  const close = () => setActive(null);
  const prev = useCallback(
    () =>
      setActive((i) =>
        i === null ? null : (i - 1 + GALLERY.length) % GALLERY.length
      ),
    []
  );
  const next = useCallback(
    () =>
      setActive((i) => (i === null ? null : (i + 1) % GALLERY.length)),
    []
  );

  useEffect(() => {
    if (active === null) return;
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (e) => {
      if (e.key === "Escape") close();
      if (e.key === "ArrowLeft") prev();
      if (e.key === "ArrowRight") next();
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prevOverflow;
      window.removeEventListener("keydown", onKey);
    };
  }, [active, prev, next]);

  const onTouchStart = (e) => {
    touchStart.current = e.touches[0].clientX;
  };

  const onTouchEnd = (e) => {
    if (touchStart.current === null) return;
    const dx = e.changedTouches[0].clientX - touchStart.current;
    touchStart.current = null;
    if (dx > SWIPE_MIN) prev();
    else if (dx < -SWIPE_MIN) next();
  };

  const navBtn =
    "grid h-12 w-12 shrink-0 place-items-center rounded-full bg-white/90 text-masala shadow-lg transition-transform active:scale-95 sm:h-11 sm:w-11 sm:bg-white/15 sm:text-white sm:shadow-none sm:hover:bg-white/25";

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
              <div className="absolute inset-0 flex items-end bg-gradient-to-t from-black/55 via-transparent to-transparent opacity-100 sm:opacity-0 sm:transition-opacity sm:group-hover:opacity-100">
                <span className="p-3 text-sm font-bold text-white">{g.name}</span>
              </div>
            </motion.button>
          ))}
        </div>
      </div>

      <AnimatePresence>
        {active !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[90] flex flex-col bg-black/90"
            onClick={close}
            onTouchStart={onTouchStart}
            onTouchEnd={onTouchEnd}
          >
            <div
              className="flex shrink-0 items-center justify-between px-3 pb-2 pt-[max(0.75rem,env(safe-area-inset-top))]"
              onClick={(e) => e.stopPropagation()}
            >
              <p className="text-sm font-bold text-white/90">
                {active + 1} / {GALLERY.length}
              </p>
              <button
                onClick={close}
                aria-label="Close"
                className="grid h-11 w-11 place-items-center rounded-full bg-white/15 text-white hover:bg-white/25"
              >
                <X className="h-6 w-6" />
              </button>
            </div>

            <div
              className="flex min-h-0 flex-1 items-center justify-center gap-2 px-2 sm:gap-4 sm:px-6"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                type="button"
                onClick={prev}
                aria-label="Previous dish"
                className={navBtn}
              >
                <ChevronLeft className="h-7 w-7" />
              </button>

              <motion.div
                key={active}
                initial={{ scale: 0.94, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.25 }}
                className="min-h-0 w-full max-w-2xl overflow-hidden rounded-2xl bg-cream sm:rounded-3xl"
              >
                <DishImage
                  id={GALLERY[active].id}
                  name={GALLERY[active].name}
                  emoji={GALLERY[active].emoji}
                  img={GALLERY[active].img}
                  className="h-[min(52vh,420px)] w-full sm:h-[min(60vh,480px)]"
                />
                <div className="p-4 text-center">
                  <p className="font-display text-lg font-black text-masala sm:text-xl">
                    {GALLERY[active].name}
                  </p>
                </div>
              </motion.div>

              <button
                type="button"
                onClick={next}
                aria-label="Next dish"
                className={navBtn}
              >
                <ChevronRight className="h-7 w-7" />
              </button>
            </div>

            <div
              className="flex shrink-0 items-center justify-center gap-3 border-t border-white/10 px-4 py-3 pb-[max(0.75rem,env(safe-area-inset-bottom))] sm:hidden"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                type="button"
                onClick={prev}
                className="flex flex-1 items-center justify-center gap-2 rounded-full bg-white/15 py-3 text-sm font-bold text-white"
              >
                <ChevronLeft className="h-5 w-5" /> Previous
              </button>
              <button
                type="button"
                onClick={next}
                className="flex flex-1 items-center justify-center gap-2 rounded-full bg-white/15 py-3 text-sm font-bold text-white"
              >
                Next <ChevronRight className="h-5 w-5" />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
