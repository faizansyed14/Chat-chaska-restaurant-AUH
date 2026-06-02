import { forwardRef, useRef, useState, useEffect } from "react";
import HTMLFlipBook from "react-pageflip";
import { ChevronLeft, ChevronRight, Utensils } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Logo } from "@/components/Navbar";

const ACCENTS = {
  chili: "#E23A1E",
  saffron: "#F4900C",
  leaf: "#3E7C4A",
  turmeric: "#E58300",
};

// A single page of the book. Must forward ref for react-pageflip.
const Page = forwardRef(({ children, side }, ref) => (
  <div
    ref={ref}
    className={`menu-page ${
      side === "left" ? "menu-page-left" : "menu-page-right"
    } h-full overflow-hidden p-5 sm:p-8`}
  >
    {children}
  </div>
));
Page.displayName = "Page";

function CategoryPage({ cat, side }) {
  const accent = ACCENTS[cat.accent] || ACCENTS.saffron;
  return (
    <div className="flex h-full flex-col">
      <div className="border-b-2 border-dashed border-masala/20 pb-3">
        <span className="font-script text-2xl" style={{ color: accent }}>
          {cat.subtitle}
        </span>
        <h3 className="font-display text-2xl font-black leading-tight text-masala sm:text-3xl">
          {cat.title}
        </h3>
      </div>
      <ul className="mt-4 flex-1 space-y-2 overflow-y-auto pr-1">
        {cat.items.map((it, i) => (
          <li key={i} className="flex items-baseline text-[13px] sm:text-sm">
            <span className="font-semibold text-masala/90">{it.name}</span>
            <span className="dotted-rule" />
            <span className="font-display font-bold" style={{ color: accent }}>
              {Number(it.price).toFixed(2)}
            </span>
          </li>
        ))}
      </ul>
      <p className="mt-3 text-center text-[10px] font-bold uppercase tracking-widest text-masala/40">
        All prices in AED · Pure Vegetarian
      </p>
    </div>
  );
}

export default function BookMenu({ categories }) {
  const book = useRef(null);
  const [page, setPage] = useState(0);
  const [dims, setDims] = useState({ w: 360, h: 490, mode: "mobile" });
  const wrapRef = useRef(null);

  // total pages = cover + categories + back cover
  const total = categories.length + 2;

  useEffect(() => {
    const resize = () => {
      const vw = window.innerWidth;
      const cw = wrapRef.current?.offsetWidth || vw;
      let w, mode;
      if (vw < 768) {
        // Phones / small tablets: single page fitted to the screen.
        mode = "mobile";
        w = Math.max(260, Math.min(cw, 420));
      } else {
        // Desktop: two-page spread, each page clamped.
        mode = "desktop";
        w = Math.max(300, Math.min(440, Math.floor((cw - 24) / 2)));
      }
      const h = Math.round(w * 1.36);
      setDims((prev) =>
        prev.w === w && prev.mode === mode ? prev : { w, h, mode }
      );
    };
    resize();
    window.addEventListener("resize", resize);
    window.addEventListener("orientationchange", resize);
    return () => {
      window.removeEventListener("resize", resize);
      window.removeEventListener("orientationchange", resize);
    };
  }, []);

  // The flip-book remounts when its size changes, so reset to the cover.
  useEffect(() => {
    setPage(0);
  }, [dims.w, dims.mode]);

  const flipPrev = () => book.current?.pageFlip()?.flipPrev();
  const flipNext = () => book.current?.pageFlip()?.flipNext();

  return (
    <section id="menu" className="relative py-16 sm:py-24">
      <div className="container">
        <div className="mx-auto max-w-2xl text-center">
          <span className="font-script text-2xl text-chili sm:text-3xl">
            Turn the pages
          </span>
          <h2 className="mt-1 font-display text-3xl font-black text-masala sm:text-4xl lg:text-5xl">
            Our full menu
          </h2>
          <p className="mt-3 text-base text-masala/70 sm:mt-4 sm:text-lg">
            Flip through our menu just like a real book — use the arrows or drag
            the page corner.
          </p>
        </div>

        <div
          ref={wrapRef}
          className="mx-auto mt-10 flex w-full max-w-4xl flex-col items-center sm:mt-12"
        >
          <div className="book-shadow w-full max-w-full px-1">
            <div className="mx-auto w-max max-w-full">
              <HTMLFlipBook
                key={`${dims.mode}-${dims.w}`}
                ref={book}
                width={dims.w}
                height={dims.h}
                size="fixed"
                usePortrait={true}
                showCover={true}
                mobileScrollSupport={true}
                maxShadowOpacity={0.4}
                drawShadow={true}
                flippingTime={700}
                useMouseEvents={true}
                onFlip={(e) => setPage(e.data)}
                className="mx-auto"
              >
              {/* Front cover */}
              <Page side="right">
                <div className="flex h-full flex-col items-center justify-center rounded-2xl bg-gradient-to-br from-masala to-[#5e1209] p-8 text-center text-cream">
                  <Logo light />
                  <div className="my-6 h-px w-24 bg-saffron/60" />
                  <Utensils className="h-10 w-10 text-saffron" />
                  <h3 className="mt-4 font-display text-3xl font-black">
                    The Menu
                  </h3>
                  <p className="mt-2 font-script text-2xl text-saffron">
                    Nasha · Chaska · Zaika
                  </p>
                  <p className="mt-8 text-xs uppercase tracking-[0.3em] text-cream/60">
                    Tap the corner to begin
                  </p>
                </div>
              </Page>

              {/* Category pages */}
              {categories.map((cat, i) => (
                <Page key={cat.id} side={i % 2 === 0 ? "left" : "right"}>
                  <CategoryPage cat={cat} side={i % 2 === 0 ? "left" : "right"} />
                </Page>
              ))}

              {/* Back cover */}
              <Page side="left">
                <div className="flex h-full flex-col items-center justify-center rounded-2xl bg-gradient-to-br from-saffron to-chili p-8 text-center text-white">
                  <h3 className="font-display text-3xl font-black">
                    Thank you!
                  </h3>
                  <p className="mt-3 max-w-[18rem] text-sm leading-relaxed text-white/90">
                    We serve street food with pride — from our heart to your
                    plate. We hope to see you again soon for another round of
                    delicious chaat!
                  </p>
                  <p className="mt-6 font-script text-2xl">Chaat Chaska ✦</p>
                </div>
              </Page>
              </HTMLFlipBook>
            </div>
          </div>

          {/* Controls */}
          <div className="mt-7 flex items-center gap-4 sm:mt-8">
            <Button
              variant="white"
              size="icon"
              onClick={flipPrev}
              disabled={page === 0}
              aria-label="Previous page"
            >
              <ChevronLeft />
            </Button>
            <span className="min-w-[7rem] text-center text-sm font-bold text-masala sm:text-base">
              Page {page + 1} / {total}
            </span>
            <Button
              variant="white"
              size="icon"
              onClick={flipNext}
              disabled={page >= total - 1}
              aria-label="Next page"
            >
              <ChevronRight />
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
