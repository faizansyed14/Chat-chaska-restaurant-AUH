import { Phone, Mail, MapPin } from "lucide-react";
import { Logo } from "@/components/Navbar";
import { RESTAURANT } from "@/lib/utils";

export default function Footer() {
  return (
    <footer className="bg-[#3d0e07] py-12 text-cream/80 sm:py-14">
      <div className="container">
        <div className="grid gap-10 md:grid-cols-[1.4fr_1fr_1fr]">
          <div>
            <Logo light />
            <p className="mt-4 max-w-sm text-sm leading-relaxed text-cream/60">
              Authentic Indian street food, freshly prepared with love and
              flavour - in the heart of Abu Dhabi. Thanks for making us a part
              of your day.
            </p>
          </div>

          <div>
            <h4 className="font-display text-lg font-bold text-saffron">
              Our Branches
            </h4>
            <ul className="mt-4 space-y-4 text-sm">
              {RESTAURANT.branches.map((b) => (
                <li key={b.name}>
                  {b.comingSoon ? (
                    <div className="block">
                      <p className="font-bold text-saffron italic">
                        {b.name}
                      </p>
                      <p className="flex items-start gap-2 text-cream/40">
                        <MapPin className="mt-0.5 h-3.5 w-3.5 shrink-0" />
                        {b.address}
                      </p>
                    </div>
                  ) : (
                    <a
                      href={b.mapUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="group block transition-colors hover:text-saffron"
                    >
                      <p className="font-bold text-cream group-hover:text-saffron">
                        {b.name}
                      </p>
                      <p className="flex items-start gap-2 text-cream/60 group-hover:text-cream/80">
                        <MapPin className="mt-0.5 h-3.5 w-3.5 shrink-0" />
                        {b.address}
                      </p>
                    </a>
                  )}
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-display text-lg font-bold text-saffron">
              Get in touch
            </h4>
            <ul className="mt-4 space-y-3 text-sm">
              {RESTAURANT.phones.map((p) => (
                <li key={p} className="flex items-center gap-2">
                  <Phone className="h-4 w-4 text-saffron" /> {p}
                </li>
              ))}
              <li className="flex items-center gap-2">
                <Mail className="h-4 w-4 text-saffron" /> {RESTAURANT.email}
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-3 border-t border-cream/10 pt-6 text-xs text-cream/50 sm:flex-row">
          <p className="order-1">
            © {new Date().getFullYear()} Chaat Chaska Restaurant. All rights reserved.
          </p>
          <p className="order-3 sm:order-2">
            Designed by -{" "}
            <a
              href="https://faizan-portfolio-qka3.onrender.com/"
              target="_blank"
              rel="noreferrer"
              className="font-semibold text-saffron transition-colors hover:text-cream"
            >
              Faizan
            </a>
          </p>
          <p className="order-2 sm:order-3">
            We serve street food with pride - from our heart to your plate. ✦
          </p>
        </div>
      </div>
    </footer>
  );
}
