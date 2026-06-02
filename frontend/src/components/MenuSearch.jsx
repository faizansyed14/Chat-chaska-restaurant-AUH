import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import { Search, X } from "lucide-react";
import { useLang } from "@/lib/LanguageContext";

// A fast search/filter over all menu items. Sits above the flip-book so
// people who don't want to flip can jump straight to a dish.
export default function MenuSearch({ categories }) {
  const { t } = useLang();
  const [query, setQuery] = useState("");
  const [cat, setCat] = useState("all");

  const allItems = useMemo(
    () =>
      categories.flatMap((c) =>
        c.items.map((it) => ({ ...it, cat: c.title, catId: c.id }))
      ),
    [categories]
  );

  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    return allItems.filter((it) => {
      const inCat = cat === "all" || it.catId === cat;
      const inQuery = !q || it.name.toLowerCase().includes(q);
      return inCat && inQuery;
    });
  }, [allItems, query, cat]);

  const active = query.trim() || cat !== "all";

  return (
    <div className="mx-auto mt-10 max-w-3xl">
      {/* Search box */}
      <div className="relative">
        <Search className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-masala/40" />
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder={t.searchPlaceholder}
          className="w-full rounded-full border-2 border-input bg-white py-3.5 pl-12 pr-12 text-sm font-medium shadow-soft outline-none focus:border-saffron"
        />
        {query && (
          <button
            onClick={() => setQuery("")}
            aria-label="Clear"
            className="absolute right-3 top-1/2 grid h-8 w-8 -translate-y-1/2 place-items-center rounded-full bg-masala/5 text-masala/60 hover:bg-masala/10"
          >
            <X className="h-4 w-4" />
          </button>
        )}
      </div>

      {/* Category chips */}
      <div className="mt-4 flex gap-2 overflow-x-auto pb-2">
        <Chip active={cat === "all"} onClick={() => setCat("all")}>
          {t.all}
        </Chip>
        {categories.map((c) => (
          <Chip key={c.id} active={cat === c.id} onClick={() => setCat(c.id)}>
            {c.title}
          </Chip>
        ))}
      </div>

      {/* Results — only shown when the user is actively searching/filtering */}
      {active && (
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-4 max-h-[320px] overflow-y-auto rounded-3xl border border-border bg-card p-2 shadow-soft"
        >
          {results.length === 0 ? (
            <p className="py-8 text-center text-sm text-masala/50">
              No dishes found. Try another word.
            </p>
          ) : (
            results.map((it, i) => (
              <div
                key={`${it.catId}-${i}`}
                className="flex items-baseline gap-2 rounded-xl px-3 py-2 text-sm hover:bg-masala/5"
              >
                <span className="font-semibold text-masala">{it.name}</span>
                <span className="text-xs text-masala/40">· {it.cat}</span>
                <span className="ml-auto font-display font-bold text-chili">
                  {Number(it.price).toFixed(2)}{" "}
                  <span className="text-[10px]">AED</span>
                </span>
              </div>
            ))
          )}
        </motion.div>
      )}
    </div>
  );
}

function Chip({ active, onClick, children }) {
  return (
    <button
      onClick={onClick}
      className={`shrink-0 whitespace-nowrap rounded-full px-4 py-2 text-xs font-bold transition-colors ${
        active
          ? "bg-chili text-white shadow-soft"
          : "bg-white text-masala hover:bg-masala/5"
      }`}
    >
      {children}
    </button>
  );
}
