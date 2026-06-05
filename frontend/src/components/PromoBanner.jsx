import { useEffect, useState } from "react";
import { X } from "lucide-react";
import { supabase, isSupabaseConfigured } from "@/lib/supabase";
import { motion } from "framer-motion";

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
      } catch { /* ignored */ }
    })();
    return () => { active = false; };
  }, []);

  if (!promo || dismissed) return null;

  return (
    <div className="relative z-40 bg-gradient-to-r from-chili to-saffron overflow-hidden border-b border-white/10 py-1.5 shadow-sm">
      <div className="flex whitespace-nowrap">
        <motion.div
          animate={{ x: ["0%", "-50%"] }}
          transition={{
            repeat: Infinity,
            duration: 25,
            ease: "linear",
          }}
          className="flex gap-16 px-4"
        >
          {/* Repeat the text multiple times to ensure continuous flow */}
          {[...Array(6)].map((_, i) => (
            <div key={i} className="flex items-center gap-3 text-sm font-bold text-white uppercase tracking-wider">
              <span>🎉</span>
              <span>{promo.text}</span>
              <span className="opacity-40">✦</span>
            </div>
          ))}
        </motion.div>
      </div>
      
      <button
        onClick={() => {
          sessionStorage.setItem("promo-dismissed", promo.text);
          setDismissed(true);
        }}
        className="absolute right-0 top-0 bottom-0 z-10 bg-gradient-to-l from-saffron to-transparent px-4 py-1 text-white hover:text-white/80"
      >
        <X className="h-4 w-4" />
      </button>
    </div>
  );
}
