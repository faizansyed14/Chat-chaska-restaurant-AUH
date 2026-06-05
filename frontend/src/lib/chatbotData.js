// ============================================================
//  Chaat Chaska - Chatbot knowledge base (rules-based, no AI)
//  Each intent has keywords (with common variants/misspellings)
//  and an answer. The matcher in this file is fuzzy, so small
//  spelling mistakes still resolve to the right answer.
// ============================================================

import { RESTAURANT, waLink } from "@/lib/utils";

export const GREETING =
  "Namaste! 🙏 Welcome to Chaat Chaska. I'm your menu buddy - ask me about our dishes, prices, location, timings, delivery, or anything else!";

export const FALLBACK =
  "Sorry, I didn't quite get that 😅. You can ask me about our menu, popular dishes, prices, location, opening hours, delivery, or how to order. Try one of the quick options below!";

// Quick-reply chips shown under the greeting.
export const QUICK_REPLIES = [
  "📍 Where are you located?",
  "🕒 Opening hours",
  "🍽️ Popular dishes",
  "🛵 Do you deliver?",
  "📞 Contact / WhatsApp",
  "⭐ Are you vegetarian?",
];

// ------------------------------------------------------------
//  Intents
// ------------------------------------------------------------
export const INTENTS = [
  {
    id: "greeting",
    keywords: [
      "hi", "hello", "hey", "hii", "helo", "hai", "namaste", "salam",
      "good morning", "good evening", "yo", "hola", "start",
    ],
    answer:
      "Hello! 😊 Great to see you at Chaat Chaska. How can I help - menu, prices, location, or ordering?",
  },
  {
    id: "about",
    keywords: [
      "about", "who are you", "what is chaat chaska", "tell me about",
      "story", "info", "information", "introduce", "describe", "what do you do",
    ],
    answer:
      "Chaat Chaska is a popular destination for authentic Indian street food in Abu Dhabi 🇮🇳. We serve traditional chaat with a modern touch - freshly prepared, 100% vegetarian, in a clean and welcoming space. From our heart to your plate! ❤️",
  },
  {
    id: "location",
    keywords: [
      "where", "location", "located", "locaton", "loction", "address",
      "find you", "branch", "branches", "outlet", "place", "area",
      "madina zayed", "madinat zayed", "musaffah", "musafah", "mussafah",
      "shabia", "map", "directions", "how to reach", "near",
    ],
    answer:
      "We have two branches in Abu Dhabi 📍\n\n1️⃣ Madinat Zayed - Front of the Vegetable & Fish Market, behind Madina Zayed Mall.\n\n2️⃣ Shabia 11, Musaffah - Behind 24/7 Madina Hyper Market, MBZ 11.\n\n✨ Coming Soon: Mushrif Mall branch!\n\nYou'll find a live map on our website's 'Visit' section!",
  },
  {
    id: "hours",
    keywords: [
      "hours", "timing", "timings", "time", "open", "opning", "opening",
      "close", "closing", "when open", "what time", "schedule",
      "working hours", "are you open", "till what time", "late",
    ],
    answer:
      "We're open every day, 8:00 AM – 12:00 AM 🕒. Come by for breakfast, lunch, an evening chaat craving, or a late-night snack!",
  },
  {
    id: "contact",
    keywords: [
      "contact", "phone", "phone number", "number", "call", "mobile",
      "reach", "telephone", "talk", "speak", "email", "mail", "e-mail",
    ],
    answer: `You can reach us 📞\n\n• Madinat Zayed: 02 650 0101 / 050 187 8936\n• Musaffah: 056 792 9709\n• WhatsApp: +971 56 217 0524\n• Email: ${RESTAURANT.email}`,
  },
  {
    id: "whatsapp",
    keywords: [
      "whatsapp", "whatsap", "watsapp", "wattsapp", "what's app", "wa",
      "order online", "place order", "how to order", "order", "ordering",
      "message you", "chat order",
    ],
    answer:
      "The easiest way to order is on WhatsApp 🟢 - just tap the WhatsApp button (bottom-left) or message us at +971 56 217 0524. Tell us your items and branch, and we'll take it from there!",
    action: { label: "Open WhatsApp", href: waLink() },
  },
  {
    id: "delivery",
    keywords: [
      "delivery", "deliver", "delivary", "delevery", "deleiver", "delievery",
      "home delivery", "bring to home", "send food", "do you deliver",
      "takeaway", "take away", "take-away", "pickup", "pick up", "parcel",
      "to go",
    ],
    answer:
      "Yes! 🛵 You can order for takeaway or delivery - just message us on WhatsApp (+971 56 217 0524) with your items and address, and we'll arrange it. Dine-in is always welcome too!",
    action: { label: "Order on WhatsApp", href: waLink() },
  },
  {
    id: "vegetarian",
    keywords: [
      "vegetarian", "veg", "vej", "veggie", "non veg", "nonveg", "meat",
      "chicken", "beef", "eggless", "egg", "vegan", "pure veg", "jain",
      "is it veg", "halal",
    ],
    answer:
      "We are 100% pure vegetarian 🥬. Every dish is freshly prepared without any meat. If you have a Jain or no-onion-garlic request, just let our staff know and we'll do our best!",
  },
  {
    id: "menu",
    keywords: [
      "menu", "menue", "meny", "what do you serve", "what do you have",
      "food", "dishes", "items", "list", "categories", "what can i eat",
      "options", "eat",
    ],
    answer:
      "Our menu is huge! 🍽️ A few sections: Chaat (pani puri, bhel, sev puri), Dosa & Uttapam, Pav Bhaji & Tawa specials, Parathas, Vada Pav, Pakora, daily Thalis, Sandwiches, plus Falooda, Milkshakes, Juices & Sweets. Open the 'Menu' book on our site to flip through everything!",
  },
  {
    id: "popular",
    keywords: [
      "popular", "best", "bestseller", "best seller", "famous", "signature",
      "recommend", "recomend", "recommendation", "must try", "favourite",
      "favorite", "speciality", "specialty", "what is good", "whats good",
      "top dish", "suggest",
    ],
    answer:
      "Our crowd favourites ⭐: Pani Puri, Bhel Puri, Sev Puri, Masala Dosa, Butter Pav Bhaji and Delhi Style Falooda. You really can't go wrong with the Combo Chaat Platter!",
  },
  {
    id: "pani_puri",
    keywords: [
      "pani puri", "panipuri", "pani-puri", "golgappa", "gol gappa",
      "puchka", "pani poori", "pani", "puri water",
    ],
    answer:
      "Pani Puri 🫗 is our signature! Aloo Masala style is 7 AED and Hot Ragda style is 8 AED. Crisp puris with spiced water - a burst of flavour in every bite!",
  },
  {
    id: "dosa",
    keywords: [
      "dosa", "dosaa", "masala dosa", "rava dosa", "mysore dosa", "south indian",
      "dose", "crepe", "uttapam", "uttappam",
    ],
    answer:
      "Loads of dosas 🌯! Sada Dosa 7 AED, Masala Dosa 10 AED, Rava Masala 14 AED, Mysore Masala 13 AED, Paneer Crispy Dosa 20 AED, plus specials like Jinni, Schezwan & Spring Roll Dosa. Uttapams start at 7 AED too!",
  },
  {
    id: "pav_bhaji",
    keywords: [
      "pav bhaji", "pavbhaji", "pao bhaji", "bhaji", "pav", "tawa",
      "butter pav",
    ],
    answer:
      "Pav Bhaji 🍛 done right! Butter Pav Bhaji 12 AED, Paneer Pav Bhaji 14 AED, Cheese Pav Bhaji 15 AED. We've also got Tawa Pulao (14 AED) from the Bombay Tawa section.",
  },
  {
    id: "chaat",
    keywords: [
      "chaat", "chat", "bhel", "bhel puri", "sev puri", "sev", "dahi puri",
      "papdi", "samosa", "kachori", "aloo tikki", "dahi bhalla", "tikki",
      "dabeli", "ragda",
    ],
    answer:
      "Our 'Chaat Ke Chaske' section is the heart of the menu 🥗: Bhel Puri 8 AED, Sev Puri 9 AED, Dahi Puri 10 AED, Papdi Chaat 8 AED, Dahi Bhalla 9 AED, Samosa Chaats from 8 AED, Raj Kachori 12 AED and the Combo Chaat Platter 20 AED!",
  },
  {
    id: "breakfast",
    keywords: [
      "breakfast", "morning", "nashta", "nashte", "chole bhatura", "bhatura",
      "poha", "upma", "puri bhaji", "paratha", "parathas",
    ],
    answer:
      "Start your day with us 🌅! Chole Bhatura 14 AED, Puri Bhaji 8.50 AED, Poha 7 AED, Upma 8 AED, plus fresh parathas (Aloo, Paneer, Cheese) from 8 AED. Perfect with our Zafran milk tea (2 AED)!",
  },
  {
    id: "thali",
    keywords: [
      "thali", "thaali", "meal", "lunch", "rice", "combo meal", "full meal",
      "rajma", "kadhi", "chawal", "daily special",
    ],
    answer:
      "Our 'Zaikedar Thali' changes daily and is just 15 AED - rice, dal, a veg curry, papad, sweet, salad & pickle 🍱. We also have Rajma Chawal, Kadhi Chawal and Chole Chawal at 12 AED each.",
  },
  {
    id: "sweets",
    keywords: [
      "sweet", "sweets", "dessert", "desserts", "mithai", "gulab jamun",
      "jalebi", "kulfi", "brownie", "ice cream", "icecream", "gujia",
    ],
    answer:
      "Sweet tooth? 🍨 Gulab Jamun 3.50 AED (10 AED with ice cream), Jalebi 6 AED, Matka Kulfi 9 AED, Brownie with Ice Cream 12 AED and Nutella Brownie 14 AED. Don't miss our Faloodas!",
  },
  {
    id: "falooda",
    keywords: [
      "falooda", "faluda", "phalooda", "rose falooda", "kulfi falooda",
      "mango falooda",
    ],
    answer:
      "Faloodas are a must 🍧! Rose 10 AED, Butter Scotch 12 AED, Kesar / Fresh Fruit 13 AED, Mango / Dry Fruit 14 AED, Kulfi / Pista 15 AED and the Delhi Style Falooda at 16 AED.",
  },
  {
    id: "drinks",
    keywords: [
      "drink", "drinks", "milkshake", "shake", "shakes", "lassi", "juice",
      "juices", "mojito", "beverage", "beverages", "tea", "coffee", "water",
      "soda", "thirsty", "cold drink",
    ],
    answer:
      "Plenty to sip 🥤! Milkshakes 8–12 AED, Lassi 7–10 AED, Fresh Juices 5–13 AED, Mojitos 15 AED, plus tea (2 AED) and coffee (5 AED). Try the Mango Melody or Oreo shake!",
  },
  {
    id: "kids",
    keywords: [
      "kids", "kid", "children", "child", "fries", "french fries", "cutlet",
      "nutella", "sandwich", "burger",
    ],
    answer:
      "For the little ones 🧒: French Fries 6 AED, Cheesy Fries 7 AED, Peri-Peri Fries 7 AED, Veg Cutlet 2 AED and a Nutella Bread Sandwich 5 AED. We also have grilled sandwiches & Aloo Tikki burgers!",
  },
  {
    id: "price",
    keywords: [
      "price", "prices", "cost", "how much", "expensive", "cheap", "budget",
      "rate", "rates", "charges", "aed", "dirham", "affordable",
    ],
    answer:
      "Our prices are very pocket-friendly 💸 - most chaats are 7–12 AED, dosas 7–20 AED, thalis 15 AED, and drinks/desserts start as low as 2 AED. You can see exact prices on the flip-book menu on our site!",
  },
  {
    id: "spicy",
    keywords: [
      "spicy", "spice", "hot", "mild", "less spicy", "too spicy", "chilli",
      "chili", "tikha", "masala level",
    ],
    answer:
      "We can adjust the spice for you 🌶️! Just tell our staff if you'd like it mild, medium or extra spicy when you order.",
  },
  {
    id: "reservation",
    keywords: [
      "reservation", "reserve", "book", "booking", "table", "seat", "seating",
      "dine in", "dinein", "dine-in", "sit", "family", "group", "party",
    ],
    answer:
      "You're welcome to dine in anytime - it's mostly walk-in 🪑. For larger groups or family gatherings, give us a call (02 650 0101) and we'll get you sorted!",
  },
  {
    id: "catering",
    keywords: [
      "catering", "cater", "event", "events", "bulk", "party order",
      "function", "large order", "wedding", "office order",
    ],
    answer:
      "Yes, we do catering & bulk orders for events 🎉! WhatsApp us at +971 56 217 0524 with your headcount and menu, and we'll prepare a quote for you.",
    action: { label: "Enquire on WhatsApp", href: waLink("Hi Chaat Chaska! I'd like to ask about catering / bulk orders.") },
  },
  {
    id: "payment",
    keywords: [
      "payment", "pay", "cash", "card", "credit card", "debit", "apple pay",
      "online payment", "how to pay", "tabby",
    ],
    answer:
      "We accept cash and cards 💳 at both branches. For WhatsApp orders, our team will guide you through payment when you place the order.",
  },
  {
    id: "parking",
    keywords: ["parking", "park", "car", "vehicle", "where to park"],
    answer:
      "There's street parking available near both branches 🚗 - the Madinat Zayed outlet is right by the Vegetable & Fish Market, which is easy to reach.",
  },
  {
    id: "instagram",
    keywords: [
      "instagram", "insta", "social media", "facebook", "follow", "social",
      "page", "online",
    ],
    answer: `Follow us on Instagram @${RESTAURANT.instagram} for fresh updates, offers and lots of delicious photos 📸!`,
  },
  {
    id: "rating",
    keywords: [
      "rating", "ratings", "review", "reviews", "google", "stars", "feedback",
      "rated", "trusted", "popular reviews",
    ],
    answer:
      "We're proud of our 4.8★ rating with 1,000+ happy customers on Google 🌟. Authentic taste, fresh food and warm service - come see why everyone keeps coming back!",
  },
  {
    id: "offers",
    keywords: [
      "offer", "offers", "discount", "deal", "deals", "promo", "promotion",
      "coupon", "combo", "special offer",
    ],
    answer:
      "Great value all round 🎈! Our daily Thali (15 AED) and Combo Chaat Platter (20 AED) are the best deals. For any running offers, check our Instagram @chaatchaksa or just ask our staff!",
  },
  {
    id: "thanks",
    keywords: [
      "thanks", "thank you", "thankyou", "thx", "thnx", "great", "awesome",
      "appreciate", "perfect", "nice", "good", "cool",
    ],
    answer:
      "You're most welcome! 🙏 We can't wait to serve you. Anything else you'd like to know?",
  },
  {
    id: "bye",
    keywords: [
      "bye", "goodbye", "see you", "later", "tata", "ok bye", "thats all",
      "that's all", "nothing", "no thanks",
    ],
    answer:
      "Thank you for visiting Chaat Chaska! 👋 Hope to see you soon for another round of delicious chaat. Have a great day!",
  },
];

// ------------------------------------------------------------
//  Fuzzy matcher
// ------------------------------------------------------------
function normalize(s) {
  return s
    .toLowerCase()
    .replace(/[^a-z0-9\s]/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

// Levenshtein edit distance
function editDistance(a, b) {
  const m = a.length;
  const n = b.length;
  if (!m) return n;
  if (!n) return m;
  const dp = Array.from({ length: m + 1 }, (_, i) => [i, ...Array(n).fill(0)]);
  for (let j = 0; j <= n; j++) dp[0][j] = j;
  for (let i = 1; i <= m; i++) {
    for (let j = 1; j <= n; j++) {
      const cost = a[i - 1] === b[j - 1] ? 0 : 1;
      dp[i][j] = Math.min(
        dp[i - 1][j] + 1,
        dp[i][j - 1] + 1,
        dp[i - 1][j - 1] + cost
      );
    }
  }
  return dp[m][n];
}

// 0..1 similarity between two words
function similarity(a, b) {
  if (a === b) return 1;
  const maxLen = Math.max(a.length, b.length);
  if (maxLen === 0) return 1;
  return 1 - editDistance(a, b) / maxLen;
}

// Score one intent against a normalized query.
function scoreIntent(query, queryTokens, intent) {
  let score = 0;
  for (const raw of intent.keywords) {
    const kw = normalize(raw);
    if (!kw) continue;

    if (kw.includes(" ")) {
      // Multi-word phrase: strong signal if it appears in the query.
      if (query.includes(kw)) score += 4;
      else {
        // partial phrase: count overlapping fuzzy tokens
        const kwTokens = kw.split(" ");
        let hit = 0;
        for (const kt of kwTokens) {
          for (const qt of queryTokens) {
            if (similarity(kt, qt) >= 0.8) {
              hit++;
              break;
            }
          }
        }
        if (hit === kwTokens.length) score += 3;
        else if (hit > 0) score += hit * 0.6;
      }
    } else {
      // Single keyword: best fuzzy match against any query token.
      let best = 0;
      for (const qt of queryTokens) {
        if (qt === kw) {
          best = Math.max(best, 1.3);
        } else if (qt.length >= 3 && kw.length >= 3) {
          // substring (e.g. "panipuri" contains "puri") - require the
          // shorter string be a meaningful chunk of the longer one.
          const shorter = qt.length < kw.length ? qt : kw;
          const longer = qt.length < kw.length ? kw : qt;
          if (longer.includes(shorter) && shorter.length >= 4) {
            best = Math.max(best, 0.95);
          }
          const s = similarity(qt, kw);
          if (s >= 0.74) best = Math.max(best, s);
        }
      }
      score += best;
    }
  }
  return score;
}

// Returns the best-matching intent (or null).
export function findAnswer(input) {
  const query = normalize(input || "");
  if (!query) return null;
  const queryTokens = query.split(" ").filter(Boolean);

  let bestIntent = null;
  let bestScore = 0;
  for (const intent of INTENTS) {
    const s = scoreIntent(query, queryTokens, intent);
    if (s > bestScore) {
      bestScore = s;
      bestIntent = intent;
    }
  }

  // Threshold scales a little with query length so single-word
  // queries ("dosa") still match, but random text falls through.
  const threshold = 0.95;
  if (bestIntent && bestScore >= threshold) return bestIntent;
  return null;
}
