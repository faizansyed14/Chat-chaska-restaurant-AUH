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

            <div className="grid grid-cols-2 gap-4">
              <a
                href={RESTAURANT.instagram}
                target="_blank"
                rel="noreferrer"
                className="group"
              >
                <Button variant="outline" className="w-full gap-2 transition-all group-hover:border-chili/50 group-hover:bg-chili/5">
                  <Instagram className="h-4 w-4" /> Instagram
                </Button>
              </a>
              <a
                href={RESTAURANT.tiktok}
                target="_blank"
                rel="noreferrer"
                className="group"
              >
                <Button variant="outline" className="w-full gap-2 transition-all group-hover:border-masala group-hover:bg-masala/5">
                  <svg 
                    viewBox="0 0 24 24" 
                    className="h-4 w-4 fill-current"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.06-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.03 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.9-.32-1.9-.39-2.82-.12-1.07.3-1.95 1.17-2.32 2.22-.39 1.02-.14 2.24.63 3.05.62.72 1.51 1.2 2.45 1.32 1.02.16 2.1-.14 2.93-.79.75-.54 1.18-1.42 1.23-2.35.03-3.53.01-7.06.02-10.59.02-1.02.01-2.04.01-3.06z"/>
                  </svg>
                  TikTok
                </Button>
              </a>
            </div>
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
