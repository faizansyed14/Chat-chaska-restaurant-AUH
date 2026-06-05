import { useState } from "react";
import { motion } from "framer-motion";
import { MapPin, Phone, Clock, Mail, MessageCircle, Instagram } from "lucide-react";
import { Button } from "@/components/ui/button";
import { RESTAURANT, waLink } from "@/lib/utils";
import OpenStatus from "@/components/OpenStatus";

export default function Contact() {
  const [activeMap, setActiveMap] = useState(
    RESTAURANT.branches.find((b) => !b.comingSoon)?.mapsEmbed
  );

  return (
    <section id="contact" className="bg-spice grain relative py-16 sm:py-24">
      <div className="container">
        <div className="mx-auto max-w-2xl text-center">
          <span className="font-script text-3xl text-chili">Come say hi</span>
          <h2 className="mt-1 font-display text-4xl font-black text-masala lg:text-5xl">
            Visit us in Abu Dhabi
          </h2>
          <p className="mt-4 text-lg text-masala/70">
            Dine in, take away, or order on WhatsApp - we'd love to feed you.
          </p>
        </div>

        <div className="mt-14 grid gap-8 lg:grid-cols-[1fr_1.1fr]">
          {/* Info column */}
          <motion.div
            initial={{ opacity: 0, x: -24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="space-y-5"
          >
            <a
              href={waLink()}
              target="_blank"
              rel="noreferrer"
              className="block"
            >
              <div className="flex items-center gap-4 rounded-3xl bg-[#25D366] p-6 text-white shadow-warm transition-transform hover:-translate-y-1">
                <div className="grid h-14 w-14 shrink-0 place-items-center rounded-2xl bg-white/20">
                  <MessageCircle className="h-7 w-7" />
                </div>
                <div>
                  <p className="text-sm font-bold uppercase tracking-wider text-white/80">
                    Order now
                  </p>
                  <p className="font-display text-lg font-black leading-tight sm:text-xl">
                    WhatsApp +971&nbsp;56&nbsp;217&nbsp;0524
                  </p>
                </div>
              </div>
            </a>

            {RESTAURANT.branches.map((b) => (
              <motion.div
                key={b.name}
                onClick={() => {
                  if (b.mapsEmbed) setActiveMap(b.mapsEmbed);
                }}
                initial={b.comingSoon ? { scale: 0.98, opacity: 0.8 } : {}}
                animate={
                  b.comingSoon
                    ? {
                        scale: [1, 1.02, 1],
                        opacity: [0.8, 1, 0.8],
                        transition: { duration: 2, repeat: Infinity },
                      }
                    : {}
                }
                className={`cursor-pointer rounded-3xl border-2 p-6 transition-all shadow-soft ${
                  activeMap === b.mapsEmbed 
                    ? "border-chili bg-white ring-4 ring-chili/5" 
                    : "border-border bg-card hover:border-chili/30"
                } ${
                  b.comingSoon ? "border-saffron/30 bg-saffron/5 cursor-default" : ""
                }`}
              >
                <div className="flex items-start justify-between">
                  <h3 className="font-display text-xl font-bold text-masala">
                    {b.name}
                  </h3>
                  {activeMap === b.mapsEmbed && (
                    <span className="rounded-full bg-chili px-2 py-0.5 text-[10px] font-bold uppercase text-white">
                      Showing Map
                    </span>
                  )}
                </div>
                <p className="mt-2 flex items-start gap-2 text-sm text-masala/70">
                  <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-chili" />
                  {b.address}
                </p>
                {!b.comingSoon && (
                  <p className="mt-2 flex items-center gap-2 text-sm font-bold text-masala">
                    <Phone className="h-4 w-4 text-chili" />
                    {b.phones.join("  ·  ")}
                  </p>
                )}
                {b.comingSoon && (
                  <p className="mt-2 text-xs font-bold uppercase tracking-widest text-saffron">
                    Expanding soon to serve you better! ✦
                  </p>
                )}
              </motion.div>
            ))}

            <div className="grid grid-cols-2 gap-4">
              <div className="rounded-3xl border border-border bg-card p-5 shadow-soft">
                <Clock className="h-5 w-5 text-chili" />
                <p className="mt-2 text-sm font-bold text-masala">Open daily</p>
                <p className="text-sm text-masala/65">8:00 AM – 12:00 AM</p>
                <OpenStatus className="mt-2" />
              </div>
              <a
                href={`mailto:${RESTAURANT.email}`}
                className="rounded-3xl border border-border bg-card p-5 shadow-soft transition-transform hover:-translate-y-1"
              >
                <Mail className="h-5 w-5 text-chili" />
                <p className="mt-2 text-sm font-bold text-masala">Email us</p>
                <p className="truncate text-sm text-masala/65">
                  {RESTAURANT.email}
                </p>
                <p className="truncate text-[11px] text-masala/40">
                  {RESTAURANT.secondaryEmail}
                </p>
              </a>
            </div>

            <a
              href={`https://instagram.com/${RESTAURANT.instagram}`}
              target="_blank"
              rel="noreferrer"
            >
              <Button variant="outline" className="w-full gap-2">
                <Instagram className="h-4 w-4" /> Follow @{RESTAURANT.instagram}
              </Button>
            </a>
          </motion.div>

          {/* Map column */}
          <motion.div
            key={activeMap}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="overflow-hidden rounded-3xl border-4 border-white shadow-warm h-full"
          >
            <iframe
              title="Chaat Chaska location"
              src={activeMap}
              className="h-full min-h-[500px] w-full"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
