import { motion } from "framer-motion";
import { Utensils } from "lucide-react";
import { getTodaysThali, waLink } from "@/lib/utils";

export default function TodaysThali() {
  const thali = getTodaysThali();

  return (
    <section className="relative -mt-px bg-cream py-8">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-masala to-[#5e1209] p-6 text-cream shadow-warm sm:p-8"
        >
          <div className="pointer-events-none absolute -right-10 -top-10 h-40 w-40 rounded-full bg-saffron/15 blur-2xl" />
          <div className="relative flex flex-col items-start gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-center gap-4">
              <div className="grid h-14 w-14 shrink-0 place-items-center rounded-2xl bg-saffron/20">
                <Utensils className="h-7 w-7 text-saffron" />
              </div>
              <div>
                <p className="font-script text-2xl text-saffron">
                  Today&apos;s Thali · {thali.day}
                </p>
                <p className="font-display text-xl font-black sm:text-2xl">
                  {thali.dish}
                </p>
                <p className="text-sm text-cream/70">
                  Served with papad, sweet, salad & pickle
                </p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <span className="font-display text-3xl font-black text-saffron">
                {thali.price} AED
              </span>
              <a
                href={waLink(`Hi Chaat Chaska! I'd like today's thali (${thali.dish}).`)}
                target="_blank"
                rel="noreferrer"
                className="rounded-full bg-[#25D366] px-5 py-2.5 text-sm font-bold text-white transition-transform hover:-translate-y-0.5"
              >
                Order
              </a>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
