import { forwardRef, useRef, useState, useEffect } from "react";
import HTMLFlipBook from "react-pageflip";
import { ChevronLeft, ChevronRight, Utensils, Search, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Logo } from "@/components/Navbar";

// ─── Shared constants ─────────────────────────────────────────────────────────
const ACCENTS = {
  chili:    "#E23A1E",
  saffron:  "#F4900C",
  leaf:     "#3E7C4A",
  turmeric: "#E58300",
};

// ─── Page wrapper (react-pageflip needs forwardRef) ───────────────────────────
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

// ─── Shared page content components ──────────────────────────────────────────
function CoverContent() {
  return (
    <div className="flex h-full flex-col items-center justify-center rounded-2xl bg-gradient-to-br from-masala to-[#5e1209] p-8 text-center text-cream">
      <Logo light />
      <div className="my-6 h-px w-24 bg-saffron/60" />
      <Utensils className="h-10 w-10 text-saffron" />
      <h3 className="mt-4 font-display text-3xl font-black">The Menu</h3>
      <p className="mt-2 font-script text-2xl text-saffron">Nasha · Chaska · Zaika</p>
      <p className="mt-8 text-xs uppercase tracking-[0.3em] text-cream/60">
        Tap the corner to begin
      </p>
    </div>
  );
}

function BackCoverContent() {
  return (
    <div className="flex h-full flex-col items-center justify-center rounded-2xl bg-gradient-to-br from-saffron to-chili p-8 text-center text-white">
      <h3 className="font-display text-3xl font-black">Thank you!</h3>
      <p className="mt-3 max-w-[18rem] text-sm leading-relaxed text-white/90">
        We serve street food with pride — from our heart to your plate. Hope to
        see you again soon!
      </p>
      <p className="mt-6 font-script text-2xl">Chaat Chaska ✦</p>
    </div>
  );
}

function CategoryContent({ cat, highlight }) {
  const accent = ACCENTS[cat.accent] || ACCENTS.saffron;
  return (
    <div className="flex h-full flex-col">
      <div className="border-b-2 border-dashed border-masala/20 pb-3">
        <span className="font-script text-xl" style={{ color: accent }}>
          {cat.subtitle}
        </span>
        <h3 className="font-display text-xl font-black leading-tight text-masala sm:text-2xl">
          {cat.title}
        </h3>
      </div>
      <ul className="mt-3 flex-1 space-y-1.5 overflow-y-auto pr-1 menu-page-list">
        {cat.items.map((it, i) => {
          const isMatch =
            highlight &&
            it.name.toLowerCase().includes(highlight.toLowerCase());
          return (
            <li
              key={i}
              className={`flex items-baseline rounded-lg px-1 text-[12px] sm:text-[13px] transition-colors ${
                isMatch ? "bg-saffron/20" : ""
              }`}
            >
              <span className="font-semibold text-masala/90">{it.name}</span>
              <span className="dotted-rule" />
              <span
                className="font-display font-bold shrink-0"
                style={{ color: accent }}
              >
                {Number(it.price).toFixed(2)}
              </span>
            </li>
          );
        })}
      </ul>
      <p className="mt-2 text-center text-[9px] font-bold uppercase tracking-widest text-masala/40">
        All prices in AED · Pure Vegetarian
      </p>
    </div>
  );
}

// ─── Helper ───────────────────────────────────────────────────────────────────
function measureDesktop(containerWidth) {
  const w = Math.max(300, Math.min(440, Math.floor((containerWidth - 24) / 2)));
  return { w, h: Math.round(w * 1.2) };
}

// ─── MOBILE BOOK ──────────────────────────────────────────────────────────────
// react-pageflip in single-page portrait mode → real paper-turning animation.
// Fixed width/height (no maxWidth shrink) + mobileScrollSupport off + no remount
// during a flip keeps it from the zoom/shudder jank.
// Sizes from the ACTUAL available width (not window) so the book never
// overflows its slot — that overflow was what pushed it off-centre.
function measureMobile(availWidth) {
  const w = Math.max(240, Math.min(availWidth - 8, 380));
  return { w, h: Math.round(w * 1.3) };
}

function MobileBook({ categories, query }) {
  const book = useRef(null);
  const wrapRef = useRef(null);
  const total = categories.length + 2; // cover + categories + back cover
  const [page, setPage] = useState(0);
  const [dims, setDims] = useState(() =>
    measureMobile(
      typeof window !== "undefined" ? window.innerWidth - 48 : 320
    )
  );
  const flippingRef = useRef(false);
  const resizeTimer = useRef(null);

  useEffect(() => {
    const measure = () => {
      if (flippingRef.current) return;
      const avail = wrapRef.current?.offsetWidth || window.innerWidth - 48;
      const next = measureMobile(avail);
      setDims((prev) =>
        prev.w === next.w && prev.h === next.h ? prev : next
      );
    };
    const handler = () => {
      clearTimeout(resizeTimer.current);
      resizeTimer.current = setTimeout(measure, 150);
    };
    measure();
    window.addEventListener("orientationchange", measure);
    window.addEventListener("resize", handler);
    return () => {
      clearTimeout(resizeTimer.current);
      window.removeEventListener("orientationchange", measure);
      window.removeEventListener("resize", handler);
    };
  }, []);

  // Jump to first category that matches the search query
  useEffect(() => {
    if (!query.trim()) return;
    const lq = query.toLowerCase();
    const idx = categories.findIndex((cat) =>
      cat.items.some((it) => it.name.toLowerCase().includes(lq))
    );
    if (idx !== -1) book.current?.pageFlip()?.flip(idx + 1);
  }, [query, categories]);

  return (
    <div ref={wrapRef} className="w-full">
      <div
        className="book-shadow"
        style={{ width: dims.w, margin: "0 auto", touchAction: "manipulation" }}
      >
        <div className="book-stage" style={{ width: dims.w, height: dims.h }}>
          <HTMLFlipBook
            key={`mobile-${dims.w}`}
            ref={book}
            width={dims.w}
            height={dims.h}
            minWidth={dims.w}
            maxWidth={dims.w}
            minHeight={dims.h}
            maxHeight={dims.h}
            size="fixed"
            usePortrait={true}
            showCover={false}
            mobileScrollSupport={false}
            maxShadowOpacity={0.25}
            drawShadow={true}
            flippingTime={500}
            useMouseEvents={true}
            swipeDistance={30}
            showPageCorners={true}
            onChangeState={(e) => {
              flippingRef.current = e.data === "flipping";
            }}
            onFlip={(e) => setPage(e.data)}
            className="mx-auto"
          >
            <Page side="right"><CoverContent /></Page>
            {categories.map((cat, i) => (
              <Page key={cat.id} side={i % 2 === 0 ? "left" : "right"}>
                <CategoryContent cat={cat} highlight={query} />
              </Page>
            ))}
            <Page side="left"><BackCoverContent /></Page>
          </HTMLFlipBook>
        </div>
      </div>

      {/* Arrow controls */}
      <div className="mt-5 flex items-center justify-center gap-4">
        <Button
          variant="white"
          size="icon"
          onClick={() => book.current?.pageFlip()?.flipPrev()}
          disabled={page === 0}
          aria-label="Previous page"
        >
          <ChevronLeft />
        </Button>
        <span className="min-w-[7rem] text-center text-sm font-bold text-masala">
          Page {page + 1} / {total}
        </span>
        <Button
          variant="white"
          size="icon"
          onClick={() => book.current?.pageFlip()?.flipNext()}
          disabled={page >= total - 1}
          aria-label="Next page"
        >
          <ChevronRight />
        </Button>
      </div>
    </div>
  );
}

// ─── DESKTOP BOOK ─────────────────────────────────────────────────────────────
// react-pageflip works perfectly on desktop with usePortrait={false}.
function DesktopBook({ categories, query }) {
  const book = useRef(null);
  const wrapRef = useRef(null);
  const [page, setPage] = useState(0);
  const [dims, setDims] = useState({ w: 380, h: 517 });
  const resizeTimer = useRef(null);

  const total = categories.length + 2;

  useEffect(() => {
    const measure = () => {
      const cw = wrapRef.current?.offsetWidth || 900;
      const next = measureDesktop(cw);
      setDims((prev) =>
        prev.w === next.w && prev.h === next.h ? prev : next
      );
    };
    measure();
    const handler = () => {
      clearTimeout(resizeTimer.current);
      resizeTimer.current = setTimeout(measure, 200);
    };
    window.addEventListener("resize", handler);
    return () => {
      clearTimeout(resizeTimer.current);
      window.removeEventListener("resize", handler);
    };
  }, []);

  // Jump to first matching category page
  useEffect(() => {
    if (!query.trim()) return;
    const lq = query.toLowerCase();
    const idx = categories.findIndex((cat) =>
      cat.items.some((it) => it.name.toLowerCase().includes(lq))
    );
    if (idx !== -1) book.current?.pageFlip()?.flip(idx + 1);
  }, [query, categories]);

  return (
    <div
      ref={wrapRef}
      className="mx-auto mt-6 flex w-full max-w-4xl flex-col items-center sm:mt-8"
    >
      <div className="book-shadow flex w-full max-w-full justify-center px-1">
        <div
          className="mx-auto"
          style={{
            width: dims.w * 2,
            maxWidth: "100%",
            transform: `translateX(${
              page === 0 ? -dims.w / 2 : page === total - 1 ? dims.w / 2 : 0
            }px)`,
            transition: "transform 0.45s ease",
          }}
        >
          <HTMLFlipBook
            key={`desktop-${dims.w}`}
            ref={book}
            width={dims.w}
            height={dims.h}
            minWidth={dims.w}
            maxWidth={dims.w}
            minHeight={dims.h}
            maxHeight={dims.h}
            size="fixed"
            usePortrait={false}
            showCover={true}
            mobileScrollSupport={false}
            maxShadowOpacity={0.35}
            drawShadow={true}
            flippingTime={650}
            useMouseEvents={true}
            swipeDistance={30}
            showPageCorners={true}
            onFlip={(e) => setPage(e.data)}
            className="mx-auto"
          >
            <Page side="right"><CoverContent /></Page>
            {categories.map((cat, i) => (
              <Page key={cat.id} side={i % 2 === 0 ? "left" : "right"}>
                <CategoryContent cat={cat} highlight={query} />
              </Page>
            ))}
            <Page side="left"><BackCoverContent /></Page>
          </HTMLFlipBook>
        </div>
      </div>

      <div className="mt-7 flex items-center gap-4 sm:mt-8">
        <Button
          variant="white"
          size="icon"
          onClick={() => book.current?.pageFlip()?.flipPrev()}
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
          onClick={() => book.current?.pageFlip()?.flipNext()}
          disabled={page >= total - 1}
          aria-label="Next page"
        >
          <ChevronRight />
        </Button>
      </div>
    </div>
  );
}

// ─── Root export ──────────────────────────────────────────────────────────────
export default function BookMenu({ categories }) {
  const [isMobile, setIsMobile] = useState(
    typeof window !== "undefined" ? window.innerWidth < 768 : false
  );
  const [query, setQuery] = useState("");
  const [searchMsg, setSearchMsg] = useState("");

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  const handleSearch = (q) => {
    setQuery(q);
    setSearchMsg("");
    if (!q.trim()) return;
    const lq = q.toLowerCase();
    const idx = categories.findIndex((cat) =>
      cat.items.some((it) => it.name.toLowerCase().includes(lq))
    );
    setSearchMsg(
      idx !== -1
        ? `Found in "${categories[idx].title}"`
        : "No dishes found — try another word"
    );
  };

  return (
    <div className="relative pb-4">
      <div className="container">
        {/* Search bar */}
        <div className="mx-auto mt-6 max-w-sm sm:mt-8">
          <div className="relative">
            <Search className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-masala/40" />
            <input
              type="search"
              value={query}
              onChange={(e) => handleSearch(e.target.value)}
              placeholder="Search menu… e.g. paneer, dosa"
              enterKeyHint="search"
              autoComplete="off"
              className="w-full min-h-[44px] rounded-full border-2 border-input bg-white py-2.5 pl-10 pr-10 text-base font-medium shadow-soft outline-none focus:border-saffron"
            />
            {query && (
              <button
                onClick={() => {
                  setQuery("");
                  setSearchMsg("");
                }}
                className="absolute right-3 top-1/2 grid h-6 w-6 -translate-y-1/2 place-items-center rounded-full bg-masala/5 text-masala/60 hover:bg-masala/10"
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
      </div>

      {/* Mobile or desktop book */}
      <div className="container">
        {isMobile ? (
          <div className="mt-6">
            <MobileBook categories={categories} query={query} />
          </div>
        ) : (
          <DesktopBook categories={categories} query={query} />
        )}
      </div>
    </div>
  );
}