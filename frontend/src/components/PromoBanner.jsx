import { useEffect, useState } from "react";
import { X } from "lucide-react";
import { supabase, isSupabaseConfigured } from "@/lib/supabase";

// Reads a single row from the `settings` table (key = 'promo'):
//   { enabled: bool, text: string }
// Toggle it from the admin panel. If Supabase isn't set up, the banner
// simply doesn't show. Dismissal is remembered per text via sessionStorage.
export default function PromoBanner() {
  const [promo, setPromo] = useState(null);
  const [dismissed, setDismissed] = useState(false);

  useEffect(() => {
    if (!isSupabaseConfigured) return;
    let active = true;
    (async () => {
      try {
        const { data } = await supabase
          .from("settings")
          .select("value")
          .eq("key", "promo")
          .single();
        if (active && data?.value?.enabled && data.value.text) {
          setPromo(data.value);
          const seen = sessionStorage.getItem("promo-dismissed");
          if (seen === data.value.text) setDismissed(true);
        }
      } catch {
        /* no promo configured — ignore */
      }
    })();
    return () => {
      active = false;
    };
  }, []);

  if (!promo || dismissed) return null;

  return (
    <div className="relative z-[55] bg-gradient-to-r from-chili to-saffron text-center text-sm font-bold text-white">
      <div className="container flex items-center justify-center gap-2 py-2">
        <span className="animate-pulse">🎉</span>
        <span className="truncate">{promo.text}</span>
        <button
          onClick={() => {
            sessionStorage.setItem("promo-dismissed", promo.text);
            setDismissed(true);
          }}
          aria-label="Dismiss"
          className="absolute right-3 grid h-6 w-6 place-items-center rounded-full bg-white/20 hover:bg-white/30"
        >
          <X className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
}
