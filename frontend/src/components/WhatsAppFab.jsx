import { MessageCircle } from "lucide-react";
import { waLink } from "@/lib/utils";

export default function WhatsAppFab() {
  return (
    <a
      href={waLink()}
      target="_blank"
      rel="noreferrer"
      aria-label="Order on WhatsApp"
      className="fixed bottom-4 left-4 z-40 sm:bottom-6 sm:left-6"
    >
      <span className="relative grid h-12 w-12 place-items-center rounded-full bg-[#25D366] text-white shadow-soft transition-transform hover:-translate-y-0.5 active:scale-95 sm:h-14 sm:w-14">
        {/* subtle pulse — desktop only, low opacity */}
        <span className="absolute inset-0 hidden animate-ping rounded-full bg-[#25D366] opacity-20 sm:block" />
        <MessageCircle className="relative h-6 w-6" />
      </span>
    </a>
  );
}
