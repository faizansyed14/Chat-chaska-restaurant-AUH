import { forwardRef, useRef, useState, useEffect, useMemo } from "react";
import HTMLFlipBook from "react-pageflip";
import { ChevronLeft, ChevronRight, Utensils, Search, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Logo } from "@/components/Navbar";

const ACCENTS = {
  chili: "#E23A1E",
  saffron: "#F4900C",
  leaf: "#3E7C4A",
  turmeric: "#E58300",
};

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

function CategoryPage({ cat, side, highlight }) {
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
        {cat.items.map((it, i) => {
          const isMatch =
            highlight &&
            it.name.toLowerCase().includes(highlight.toLowerCase());
          return (
            <li
              key={i}
              className={`flex items-baseline rounded-lg px-1 text-[13px] transition-colors sm:text-sm ${
                isMatch ? "bg-saffron/20" : ""
              }`}
            >
              <span className="font-semibold text-masala/90">{it.name}</span>
              <span className="dotted-rule" />
              <span
                className="font-display font-bold"
                style={{ color: accent }}
              >
                {Number(it.price).toFixed(2)}
              </span>
            </li>
          );
        })}
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
  const [query, setQuery] = useState("");
  const [searchMsg, setSearchMsg] = useState("");

  const total = categories.length + 2;

  useEffect(() => {
    const resize = () => {
      const vw = window.innerWidth;
      const cw = wrapRef.current?.offsetWidth || vw;
      let w, mode;
      if (vw < 768) {
        mode = "mobile";
        w = Math.max(260, Math.min(cw, 420));
      } else {
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

  useEffect(() => {
    setPage(0);
  }, [dims.w, dims.mode]);

  const flipPrev = () => book.current?.pageFlip()?.flipPrev();
  const flipNext = () => book.current?.pageFlip()?.flipNext();

  // When the user searches, jump to the first category page that has a match.
  // Page index: 0 = front cover, 1..N = categories, N+1 = back cover.
  const handleSearch = (q) => {
    setQuery(q);
    setSearchMsg("");
    if (!q.trim()) return;

    const lq = q.toLowerCase();
    const nq = q.toLowerCase().replace(/[^a-z0-9]/g, ""); // Normalized search query (no spaces/punctuation)

    let bestIdx = -1;
    let bestScore = -1;

    categories.forEach((cat, idx) => {
      let score = 0;

      const title = cat.title.toLowerCase();
      const nTitle = title.replace(/[^a-z0-9]/g, "");
      const sub = cat.subtitle.toLowerCase();

      // Category matches
      if (title === lq || nTitle === nq) score = 100;
      else if (title.startsWith(lq) || nTitle.startsWith(nq)) score = 90;
      else if (title.includes(lq) || nTitle.includes(nq)) score = 60;
      else if (sub.includes(lq)) score = 40;

      // Item matches
      cat.items.forEach((it) => {
        const name = it.name.toLowerCase();
        const nName = name.replace(/[^a-z0-9]/g, "");
        let itemScore = 0;

        if (name === lq || nName === nq) itemScore = 95;
        else if (name.startsWith(lq) || nName.startsWith(nq)) itemScore = 85;
        else if (name.includes(lq) || nName.includes(nq)) itemScore = 50;

        if (itemScore > score) score = itemScore;
      });

      if (score > bestScore) {
        bestScore = score;
        bestIdx = idx;
      }
    });

    if (bestIdx !== -1 && bestScore > 20) {
      book.current?.pageFlip()?.flip(bestIdx + 1);
      setSearchMsg(`Found in "${categories[bestIdx].title}" — page ${bestIdx + 2}`);
    } else {
      setSearchMsg("No dishes found.");
    }
  };

  return (
    <div className="relative pb-4">
      <div className="container">
        {/* ── Compact search bar above the book ── */}
        <div className="mx-auto mt-6 max-w-sm sm:mt-8">
          <div className="relative">
            <Search className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-masala/40" />
            <input
              value={query}
              onChange={(e) => handleSearch(e.target.value)}
              placeholder="Search menu… e.g. paneer, dosa"
              className="w-full rounded-full border-2 border-input bg-white py-2.5 pl-10 pr-10 text-sm font-medium shadow-soft outline-none focus:border-saffron"
            />
            {query && (
              <button
                onClick={() => {
                  setQuery("");
                  setSearchMsg("");
                }}
                className="absolute right-3 top-1/2 grid h-6 w-6 -translate-y-1/2 place-items-center rounded-full bg-masala/8 text-masala/60 hover:bg-masala/15"
              >
                <X className="h-3.5 w-3.5" />
              </button>
            )}
          </div>
          {searchMsg && (
            <p className="mt-2 text-center text-xs font-bold text-chili">
              {searchMsg}
            </p>
          )}
        </div>

        {/* ── Flip-book ── */}
        <div
          ref={wrapRef}
          className="mx-auto mt-6 flex w-full max-w-4xl flex-col items-center sm:mt-8"
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
                    <CategoryPage
                      cat={cat}
                      side={i % 2 === 0 ? "left" : "right"}
                      highlight={query}
                    />
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
                      plate. We hope to see you again soon!
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
    </div>
  );
}
