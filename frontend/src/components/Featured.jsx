import { motion } from "framer-motion";
import { Badge } from "@/components/ui/index";
import DishImage from "@/components/DishImage";
import { SIGNATURE } from "@/lib/menuData";

export default function Featured() {
  return (
    <section id="signature" className="bg-spice grain relative py-16 sm:py-24">
      <div className="container">
        <div className="mx-auto max-w-2xl text-center">
          <span className="font-script text-3xl text-chili">
            Crowd favourites
          </span>
          <h2 className="mt-1 font-display text-4xl font-black text-masala lg:text-5xl">
            Famous for our chaat
          </h2>
          <p className="mt-4 text-lg text-masala/70">
            The dishes that keep Abu Dhabi coming back for more. Tap any to
            order it straight to WhatsApp.
          </p>
        </div>

        <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {SIGNATURE.map((d, i) => (
            <motion.div
              key={d.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.5, delay: (i % 4) * 0.08 }}
              whileHover={{ y: -8 }}
              className="group overflow-hidden rounded-3xl border border-border bg-card shadow-soft"
            >
              <div className="relative">
                <DishImage
                  id={d.id}
                  name={d.name}
                  emoji={d.emoji}
                  img={d.img}
                  className="h-44 w-full"
                />
                <Badge className="absolute left-3 top-3 bg-white/90 text-chili backdrop-blur">
                  {d.tag}
                </Badge>
              </div>
              <div className="p-5">
                <div className="flex items-start justify-between gap-2">
                  <h3 className="font-display text-xl font-bold text-masala">
                    {d.name}
                  </h3>
                </div>
                <p className="mt-1.5 text-sm leading-relaxed text-masala/60">
                  {d.desc}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
