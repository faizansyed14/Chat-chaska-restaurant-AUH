import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { createClient } from "@supabase/supabase-js";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 4000;
const { SUPABASE_URL, SUPABASE_SERVICE_KEY } = process.env;

const supabase =
  SUPABASE_URL && SUPABASE_SERVICE_KEY
    ? createClient(SUPABASE_URL, SUPABASE_SERVICE_KEY)
    : null;

app.get("/api/health", (_req, res) => res.json({ ok: true }));

// Public: full menu (categories + available items), grouped.
app.get("/api/menu", async (_req, res) => {
  if (!supabase)
    return res
      .status(503)
      .json({ error: "Supabase not configured on the server." });

  try {
    const [{ data: cats }, { data: items }] = await Promise.all([
      supabase.from("categories").select("*").order("sort_order"),
      supabase
        .from("menu_items")
        .select("*")
        .eq("is_available", true)
        .order("sort_order"),
    ]);

    const menu = (cats || []).map((c) => ({
      id: c.slug,
      title: c.title,
      subtitle: c.subtitle,
      accent: c.accent,
      items: (items || [])
        .filter((i) => i.category_id === c.id)
        .map((i) => ({ name: i.name, price: Number(i.price) })),
    }));

    res.json({ menu });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

// Example: receive a WhatsApp-style order payload (extend as needed:
// send email, log to DB, forward to a messaging API, etc.)
app.post("/api/order", async (req, res) => {
  const { items, customer } = req.body || {};
  console.log("New order:", { customer, items });
  // TODO: persist / notify here.
  res.json({ received: true });
});

app.listen(PORT, () =>
  console.log(`Chaat Chaska API running on http://localhost:${PORT}`)
);
