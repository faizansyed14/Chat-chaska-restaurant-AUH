import { useEffect, useState } from "react";
import { supabase, isSupabaseConfigured } from "@/lib/supabase";
import { MENU as MENU_MUSSAFFAH } from "@/lib/menuData";
import { MENU_MADINAT_ZAYED } from "@/lib/menuMadinatZayed";

// Returns categories in the same shape as MENU:
// [{ id, title, subtitle, accent, items: [{ name, price }] }]
export function useMenu(branchSlug = "mussafah") {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(isSupabaseConfigured);

  useEffect(() => {
    setLoading(true);
    
    if (!isSupabaseConfigured) {
      // If not configured, we have to use something, but user asked to avoid static.
      // We'll return empty as requested.
      setLoading(false);
      return;
    }
    let active = true;

    (async () => {
      try {
        // Try fetching with branch filter
        let { data: cats, error: e1 } = await supabase
          .from("categories")
          .select("*")
          .eq("branch", branchSlug)
          .order("sort_order", { ascending: true });
        
        // If branch column is missing (Code 42703 or 400), try legacy fetch
        if (e1 && (e1.code === "42703" || e1.status === 400)) {
          const { data: legacyCats, error: legacyErr } = await supabase
            .from("categories")
            .select("*")
            .order("sort_order", { ascending: true });
          if (!legacyErr) cats = legacyCats;
        } else if (e1) throw e1;

        let { data: items, error: e2 } = await supabase
          .from("menu_items")
          .select("*")
          .eq("branch", branchSlug)
          .eq("is_available", true)
          .order("sort_order", { ascending: true });
        
        // Legacy fallback for items too
        if (e2 && (e2.code === "42703" || e2.status === 400)) {
           const { data: legacyItems, error: legacyErr2 } = await supabase
            .from("menu_items")
            .select("*")
            .eq("is_available", true)
            .order("sort_order", { ascending: true });
           if (!legacyErr2) items = legacyItems;
        } else if (e2) throw e2;

        if (!cats?.length) {
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
            .map((it) => ({
              id: it.id,
              name: it.name,
              price: Number(it.price),
            })),
        }));

        if (active) setCategories(shaped);
      } catch (err) {
        console.warn(`Supabase fetch failed:`, err.message);
      } finally {
        if (active) setLoading(false);
      }
    })();

    return () => {
      active = false;
    };
  }, [branchSlug]);

  return { categories, loading };
}
