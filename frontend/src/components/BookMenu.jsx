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

function CategoryPage({ cat }) {
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
      <ul className="menu-page-list mt-4 flex-1 space-y-2 overflow-y-auto pr-1">
        {cat.items.map((it, i) => (
            <li
              key={i}
              className="flex items-baseline rounded-lg px-1 text-[13px] sm:text-sm"
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
        ))}
      </ul>
      <p className="mt-3 text-center text-[10px] font-bold uppercase tracking-widest text-masala/40">
        All prices in AED · Pure Vegetarian
      </p>
    </div>
  );
}

function measureBook(vw, containerWidth) {
  const mobile = vw < 768;
  const w = mobile
    ? Math.max(280, Math.min(vw - 24, 400))
    : Math.max(300, Math.min(440, Math.floor((containerWidth - 24) / 2)));
  return { w, h: Math.round(w * 1.36), mode: mobile ? "mobile" : "desktop" };
}

export default function BookMenu({ categories }) {
  const book = useRef(null);
  const [page, setPage] = useState(0);
  const [dims, setDims] = useState(() =>
    measureBook(
      typeof window !== "undefined" ? window.innerWidth : 360,
      360
    )
  );
  const wrapRef = useRef(null);
  const flippingRef = useRef(false);
  const resizeTimer = useRef(null);

  const total = categories.length + 2;
  const isMobile = dims.mode === "mobile";

  useEffect(() => {
    const applySize = () => {
      if (flippingRef.current) return;
      const vw = window.innerWidth;
      const next = measureBook(vw, wrapRef.current?.offsetWidth || vw);
      setDims((prev) =>
        prev.w === next.w && prev.h === next.h && prev.mode === next.mode
          ? prev
          : next
      );
    };

    const scheduleResize = () => {
      clearTimeout(resizeTimer.current);
      resizeTimer.current = setTimeout(applySize, 200);
    };

    applySize();
    window.addEventListener("orientationchange", applySize);
    window.addEventListener("resize", scheduleResize);
    return () => {
      clearTimeout(resizeTimer.current);
      window.removeEventListener("orientationchange", applySize);
      window.removeEventListener("resize", scheduleResize);
    };
  }, []);

  useEffect(() => {
    setPage(0);
  }, [dims.mode]);

  const flipPrev = () => book.current?.pageFlip()?.flipPrev();
  const flipNext = () => book.current?.pageFlip()?.flipNext();

  return (
    <div className="relative pb-4">
      <div className="container">
        <div
          ref={wrapRef}
          className="mx-auto mt-6 flex w-full max-w-4xl flex-col items-center sm:mt-8"
        >
          <div
            className="book-shadow w-full max-w-full px-1"
            style={{ touchAction: "manipulation" }}
          >
            <div
              className="book-stage mx-auto"
              style={{ width: dims.w, height: dims.h }}
            >
              <HTMLFlipBook
                key={dims.mode}
                ref={book}
                width={dims.w}
                height={dims.h}
                minWidth={dims.w}
                maxWidth={dims.w}
                minHeight={dims.h}
                maxHeight={dims.h}
                size="fixed"
                usePortrait={isMobile}
                showCover={true}
                mobileScrollSupport={false}
                maxShadowOpacity={isMobile ? 0.15 : 0.35}
                drawShadow={!isMobile}
                flippingTime={isMobile ? 420 : 650}
                useMouseEvents={true}
                swipeDistance={30}
                showPageCorners={true}
                onChangeState={(e) => {
                  flippingRef.current = e.data === "flipping";
                }}
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
                    <CategoryPage cat={cat} />
                  </Page>
                ))}

                {/* Back cover */}
                <Page side="left">
                  <div className="flex h-full flex-col items-center justify-center rounded-2xl bg-gradient-to-br from-saffron to-chili p-8 text-center text-white">
                    <h3 className="font-display text-3xl font-black">
                      Thank you!
                    </h3>
                    <p className="mt-3 max-w-[18rem] text-sm leading-relaxed text-white/90">
                      We serve street food with pride - from our heart to your
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
