import { useEffect, useState } from "react";
import { getOpenStatus } from "@/lib/utils";

export default function OpenStatus({ className = "", dark = false }) {
  const [status, setStatus] = useState(getOpenStatus());

  useEffect(() => {
    const id = setInterval(() => setStatus(getOpenStatus()), 60 * 1000);
    return () => clearInterval(id);
  }, []);

  const dot = status.open ? "bg-green-500" : "bg-red-500";
  const text = status.open
    ? dark
      ? "text-green-300"
      : "text-green-700"
    : dark
    ? "text-red-300"
    : "text-red-600";

  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[11px] font-bold ${
        dark ? "bg-white/10" : "bg-black/5"
      } ${text} ${className}`}
    >
      <span className="relative flex h-2 w-2">
        {status.open && (
          <span
            className={`absolute inline-flex h-2 w-2 animate-ping rounded-full ${dot} opacity-60`}
          />
        )}
        <span className={`relative inline-flex h-2 w-2 rounded-full ${dot}`} />
      </span>
      {status.label}
    </span>
  );
}
