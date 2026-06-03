import { useEffect, useState } from "react";
import { supabase, isSupabaseConfigured } from "@/lib/supabase";
import { MENU } from "@/lib/menuData";

// Returns categories in the same shape as MENU:
// [{ id, title, subtitle, accent, items: [{ name, price }] }]
export function useMenu() {
  const [categories, setCategories] = useState(MENU);
  const [loading, setLoading] = useState(isSupabaseConfigured);

  useEffect(() => {
    if (!isSupabaseConfigured) return;
    let active = true;

    (async () => {
      try {
        const { data: cats, error: e1 } = await supabase
          .from("categories")
          .select("*")
          .order("sort_order", { ascending: true });
        if (e1) throw e1;

        const { data: items, error: e2 } = await supabase
          .from("menu_items")
          .select("*")
          .eq("is_available", true)
          .order("sort_order", { ascending: true });
        if (e2) throw e2;

        if (!cats?.length) {
          // DB empty - keep the bundled fallback so the site never looks bare.
          if (active) setLoading(false);
          return;
        }

        const shaped = cats.map((c) => ({
          id: c.slug,
          title: c.title,
          subtitle: c.subtitle,
          accent: c.accent || "saffron",
          items: (items || [])
            .filter((it) => it.category_id === c.id)
            .map((it) => ({ name: it.name, price: Number(it.price) })),
        }));

        if (active) setCategories(shaped);
      } catch (err) {
        console.warn("Falling back to bundled menu:", err.message);
      } finally {
        if (active) setLoading(false);
      }
    })();

    return () => {
      active = false;
    };
  }, []);

  return { categories, loading };
}
