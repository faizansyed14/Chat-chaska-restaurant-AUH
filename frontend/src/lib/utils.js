import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs) {
  return twMerge(clsx(inputs));
}

// Restaurant constants - change here once, used everywhere.
export const RESTAURANT = {
  name: "Chaat Chaska",
  tagline: "Authentic Indian Street Food",
  whatsapp: "971562170524", // Updated WhatsApp: 056 217 0524
  phones: ["+971 2 650 0101", "+971 50 187 8936"],
  email: "info@chaatchaskauae.com",
  secondaryEmail: "Chaatchaska.restaurant@gmail.com",
  instagram: "https://www.instagram.com/chaatchaska2023?utm_source=qr",
  tiktok: "https://www.tiktok.com/@chaatchaska",
  // Open 8:00 AM – 12:00 AM every day.
  openHour: 8,
  closeHour: 24, // 12 AM
  reviewUrl:
    "https://www.google.com/search?sca_esv=18b9090e1ebdf78c&sxsrf=ANbL-n7UWE-fDsqZ-sjwPSyL9_5SvN9G0A:1780752022113&q=chaat+chaska&si=AL3DRZEsmMGCryMMFSHJ3StBhOdZ2-6yYkXd_doETEE1OR-qOR7JNAvbGTMNgJp62OpJmTMfKc00Rw2jr-OyYnrJ1QvDHM9Jd-wHFRrXgx-fCZnWbLrsjQrX8Y4CLvzwF0JmgPI3fAhdiciSirDvQH7sihZbNYHFNw%3D%3D&sa=X&ved=2ahUKEwii89ed2vKUAxXAgP0HHdCLApgQrrQLegQIJxAA&biw=1280&bih=631&dpr=1.5",
  mapsEmbed:
    "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d4312.557785823392!2d54.5318322!3d24.325094699999994!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3e5e390045d9f2ed%3A0xf67dd35688177388!2sCHAAT%20CHASKA!5e1!3m2!1sen!2sae!4v1780664533396!5m2!1sen!2sae",
  branches: [
    {
      name: "Mushrif Mall - Coming Soon!",
      address: "Mushrif Mall, Abu Dhabi",
      comingSoon: true,
    },
    {
      name: "Madina Zayed - Abu Dhabi",
      address:
        "Front of Vegetable & Fish Market, Behind Madina Zayed Mall, Abu Dhabi",
      mapUrl: "https://maps.app.goo.gl/hFCJ1AdXGRmbPzLRA?g_st=iw",
      mapsEmbed: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2983.3999682250096!2d54.36560910000001!3d24.4805048!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3e5e67cc46c0c257%3A0x17a7a82412b3771b!2sCHAAT%20CHASKA%20RESTAURANT!5e1!3m2!1sen!2sae!4v1780665089135!5m2!1sen!2sae",
      phones: ["02 650 0101", "050 187 8936"],
    },
    {
      name: "Shabia 11 - Musaffah, Abu Dhabi",
      address:
        "Behind 24/7 Madina Hyper Market, MBZ 11, Musaffah, Abu Dhabi",
      mapUrl: "https://maps.app.goo.gl/NPCC91QzbcQBQFes5?g_st=iw",
      mapsEmbed: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d4312.557785823392!2d54.5318322!3d24.325094699999994!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3e5e390045d9f2ed%3A0xf67dd35688177388!2sCHAAT%20CHASKA!5e1!3m2!1sen!2sae!4v1780664533396!5m2!1sen!2sae",
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

// ------------------------------------------------------------
//  Live open / closed status (8 AM – 12 AM daily)
// ------------------------------------------------------------
function fmtHour(h24) {
  const h = ((h24 % 24) + 24) % 24;
  const period = h >= 12 ? "PM" : "AM";
  let hr = h % 12;
  if (hr === 0) hr = 12;
  return `${hr} ${period}`;
}

export function getOpenStatus(date = new Date()) {
  const { openHour, closeHour } = RESTAURANT;
  const hours = date.getHours() + date.getMinutes() / 60;
  // Window spans midnight: open if after openHour OR before (closeHour-24).
  const closeToday = closeHour - 24; // 1 (i.e. 1 AM)
  const isOpen = hours >= openHour || hours < closeToday;
  if (isOpen) {
    return { open: true, label: `Open now · closes ${fmtHour(closeHour)}` };
  }
  return { open: false, label: `Closed · opens ${fmtHour(openHour)}` };
}

// ------------------------------------------------------------
//  Today's thali (matches the daily Thali names in menuData)
// ------------------------------------------------------------
export const DAILY_THALI = {
  Sunday: { dish: "Ghee Rice, Dal, Aloo Palak", price: 15 },
  Monday: { dish: "Plain Rice, Dal, Aloo Gobi", price: 15 },
  Tuesday: { dish: "Plain Rice, Dal, Karela", price: 15 },
  Wednesday: { dish: "Plain Rice, Dal, Bhindi", price: 15 },
  Thursday: { dish: "Plain Rice, Dal, Aloo Matar", price: 15 },
  Friday: { dish: "Jeera Rice, Dal, Paneer Curry", price: 15 },
  Saturday: { dish: "Matar Pulao, Dal, Mix Veg", price: 15 },
};

export function getTodaysThali(date = new Date()) {
  const day = date.toLocaleDateString("en-US", { weekday: "long" });
  return { day, ...DAILY_THALI[day] };
}
