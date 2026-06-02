import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs) {
  return twMerge(clsx(inputs));
}

// Restaurant constants — change here once, used everywhere.
export const RESTAURANT = {
  name: "Chaat Chaska",
  tagline: "Authentic Indian Street Food",
  whatsapp: "971507513245", // +971 50 751 3245
  phones: ["+971 2 650 0101", "+971 50 187 8936"],
  email: "info@chaatchaskauae.com",
  website: "www.chaatchaskauae.com",
  instagram: "chaatchaksa",
  mapsEmbed:
    "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2983.3999682250096!2d54.36560910000001!3d24.4805048!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3e5e67cc46c0c257%3A0x17a7a82412b3771b!2sCHAAT%20CHASKA%20RESTAURANT!5e1!3m2!1sen!2sin!4v1780343249847!5m2!1sen!2sin",
  branches: [
    {
      name: "Madina Zayed — Abu Dhabi",
      address:
        "Front of Vegetable & Fish Market, Behind Madina Zayed Mall, Abu Dhabi",
      phones: ["02 650 0101", "050 187 8936"],
    },
    {
      name: "Shabia 11 — Musaffah, Abu Dhabi",
      address:
        "Behind 24/7 Madina Hyper Market, MBZ 11, Musaffah, Abu Dhabi",
      phones: ["056 792 9709"],
    },
  ],
};

export function waLink(message) {
  const text = encodeURIComponent(
    message || `Hi ${RESTAURANT.name}! I'd like to place an order.`
  );
  return `https://wa.me/${RESTAURANT.whatsapp}?text=${text}`;
}
