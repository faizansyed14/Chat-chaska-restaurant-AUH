import { motion } from "framer-motion";
import { Star, Quote } from "lucide-react";
import { TESTIMONIALS } from "@/lib/menuData";
import { useCountUp } from "@/lib/useCountUp";
import { RESTAURANT } from "@/lib/utils";

function GoogleG({ className = "" }) {
  return (
    <svg viewBox="0 0 48 48" className={className}>
      <path fill="#FFC107" d="M43.6 20.5h-1.9V20H24v8h11.3C33.7 32.9 29.3 36 24 36c-6.6 0-12-5.4-12-12s5.4-12 12-12c3.1 0 5.9 1.2 8 3.1l5.7-5.7C34.3 6.1 29.4 4 24 4 12.9 4 4 12.9 4 24s8.9 20 20 20 20-8.9 20-20c0-1.3-.1-2.3-.4-3.5z" />
      <path fill="#FF3D00" d="M6.3 14.7l6.6 4.8C14.7 16 19 12 24 12c3.1 0 5.9 1.2 8 3.1l5.7-5.7C34.3 6.1 29.4 4 24 4 16.3 4 9.7 8.3 6.3 14.7z" />
      <path fill="#4CAF50" d="M24 44c5.2 0 10-2 13.6-5.2l-6.3-5.3C29.2 35 26.7 36 24 36c-5.3 0-9.7-3.1-11.3-7.6l-6.5 5C9.5 39.6 16.2 44 24 44z" />
      <path fill="#1976D2" d="M43.6 20.5H24v8h11.3c-.8 2.2-2.2 4.1-4 5.5l6.3 5.3C41.4 36.1 44 30.6 44 24c0-1.3-.1-2.3-.4-3.5z" />
    </svg>
  );
}

export default function Testimonials() {
  const count = useCountUp(1000);

  return (
    <section id="reviews" className="bg-masala relative overflow-hidden py-16 text-cream sm:py-24">
      <div className="pointer-events-none absolute -left-32 -top-32 h-80 w-80 rounded-full bg-saffron/10 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-32 -right-32 h-80 w-80 rounded-full bg-chili/20 blur-3xl" />

      <div className="container relative">
        {/* Google rating banner */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mx-auto flex max-w-3xl flex-col items-center gap-6 rounded-3xl bg-cream/5 p-8 text-center ring-1 ring-cream/10 sm:flex-row sm:justify-between sm:text-left"
        >
          <div className="flex items-center gap-4">
            <GoogleG className="h-12 w-12" />
            <div>
              <div className="flex items-center gap-2">
                <span className="font-display text-4xl font-black text-saffron">
                  4.8
                </span>
                <div className="flex">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-5 w-5 fill-saffron text-saffron" />
                  ))}
                </div>
              </div>
              <p className="text-sm font-bold text-cream/80">
                Rated on Google Reviews
              </p>
            </div>
          </div>
          <div className="h-12 w-px bg-cream/15 hidden sm:block" />
          <div ref={count.ref}>
            <span className="font-display text-4xl font-black text-cream">
              {count.value.toLocaleString()}+
            </span>
            <p className="text-sm font-bold text-cream/80">
              Happy customers & counting
            </p>
          </div>
        </motion.div>

        <div className="mt-12 text-center">
          <span className="font-script text-3xl text-saffron">
            Loved by locals
          </span>
          <h2 className="mt-1 font-display text-4xl font-black lg:text-5xl">
            What our guests say
          </h2>
          <a
            href={RESTAURANT.reviewUrl}
            target="_blank"
            rel="noreferrer"
            className="mt-5 inline-flex items-center gap-2 rounded-full bg-cream px-5 py-2.5 text-sm font-bold text-masala shadow-warm transition-transform hover:-translate-y-0.5"
          >
            <Star className="h-4 w-4 fill-saffron text-saffron" />
            Loved it? Leave us a Google review
          </a>
        </div>
      </div>

      {/* Continuous right-to-left marquee (full-bleed, single row) */}
      <div className="group relative mt-12 overflow-hidden">
        {/* edge fades */}
        <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-16 bg-gradient-to-r from-masala to-transparent sm:w-28" />
        <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-16 bg-gradient-to-l from-masala to-transparent sm:w-28" />

        <div className="flex w-max animate-marquee gap-6 group-hover:[animation-play-state:paused]">
          {[...TESTIMONIALS, ...TESTIMONIALS].map((t, i) => (
            <article
              key={i}
              className="relative w-[240px] shrink-0 rounded-3xl bg-cream p-5 text-masala shadow-warm sm:w-[360px] sm:p-7"
            >
              <Quote className="absolute right-4 top-4 h-5 w-5 text-saffron/25 sm:right-6 sm:top-6 sm:h-7 sm:w-7" />
              <div className="flex">
                {[...Array(t.rating)].map((_, s) => (
                  <Star key={s} className="h-3.5 w-3.5 fill-saffron text-saffron sm:h-4 sm:w-4" />
                ))}
              </div>
              <p className="mt-3 text-sm leading-relaxed text-masala/80 sm:mt-4 sm:text-base">
                "{t.text}"
              </p>
              <div className="mt-4 flex items-center gap-3 sm:mt-5">
                <div className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-gradient-to-br from-saffron to-chili font-display text-sm font-black text-white sm:h-10 sm:w-10 sm:text-base">
                  {t.name.charAt(0)}
                </div>
                <div>
                  <p className="text-sm font-bold leading-tight sm:text-base">
                    {t.name}
                  </p>
                  <p className="text-xs text-masala/55">{t.role}</p>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
