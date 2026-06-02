import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  LogOut,
  Plus,
  Trash2,
  Save,
  Eye,
  EyeOff,
  Database,
  Loader2,
  Utensils,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input, Label, Card } from "@/components/ui/index";
import { Logo } from "@/components/Navbar";
import { supabase, isSupabaseConfigured } from "@/lib/supabase";
import { MENU } from "@/lib/menuData";

export default function AdminDashboard() {
  const nav = useNavigate();
  const [ready, setReady] = useState(false);
  const [cats, setCats] = useState([]);
  const [items, setItems] = useState([]);
  const [activeCat, setActiveCat] = useState(null);
  const [newItem, setNewItem] = useState({ name: "", price: "" });
  const [busy, setBusy] = useState(false);
  const [toast, setToast] = useState("");

  const flash = (m) => {
    setToast(m);
    setTimeout(() => setToast(""), 2500);
  };

  // Auth guard
  useEffect(() => {
    if (!isSupabaseConfigured) {
      setReady(true);
      return;
    }
    supabase.auth.getSession().then(({ data }) => {
      if (!data.session) nav("/admin/login");
      else {
        setReady(true);
        loadAll();
      }
    });
  }, []);

  async function loadAll() {
    const { data: c } = await supabase
      .from("categories")
      .select("*")
      .order("sort_order");
    const { data: i } = await supabase
      .from("menu_items")
      .select("*")
      .order("sort_order");
    setCats(c || []);
    setItems(i || []);
    if (c?.length && !activeCat) setActiveCat(c[0].id);
  }

  async function seedDatabase() {
    if (!confirm("Seed the database with the full Chaat Chaska menu? This adds all categories & items."))
      return;
    setBusy(true);
    try {
      for (let ci = 0; ci < MENU.length; ci++) {
        const cat = MENU[ci];
        const { data: inserted, error } = await supabase
          .from("categories")
          .insert({
            slug: cat.id,
            title: cat.title,
            subtitle: cat.subtitle,
            accent: cat.accent,
            sort_order: ci,
          })
          .select()
          .single();
        if (error) throw error;
        const rows = cat.items.map((it, idx) => ({
          category_id: inserted.id,
          name: it.name,
          price: it.price,
          sort_order: idx,
          is_available: true,
        }));
        const { error: e2 } = await supabase.from("menu_items").insert(rows);
        if (e2) throw e2;
      }
      flash("Database seeded ✦");
      await loadAll();
    } catch (e) {
      flash("Error: " + e.message);
    } finally {
      setBusy(false);
    }
  }

  async function addItem() {
    if (!newItem.name || !newItem.price || !activeCat) return;
    const max = Math.max(
      0,
      ...items.filter((i) => i.category_id === activeCat).map((i) => i.sort_order || 0)
    );
    const { error } = await supabase.from("menu_items").insert({
      category_id: activeCat,
      name: newItem.name,
      price: Number(newItem.price),
      sort_order: max + 1,
      is_available: true,
    });
    if (error) flash("Error: " + error.message);
    else {
      setNewItem({ name: "", price: "" });
      flash("Item added");
      loadAll();
    }
  }

  async function updateItem(id, fields) {
    const { error } = await supabase.from("menu_items").update(fields).eq("id", id);
    if (error) flash("Error: " + error.message);
    else {
      setItems((prev) => prev.map((i) => (i.id === id ? { ...i, ...fields } : i)));
    }
  }

  async function deleteItem(id) {
    if (!confirm("Delete this item?")) return;
    const { error } = await supabase.from("menu_items").delete().eq("id", id);
    if (error) flash("Error: " + error.message);
    else {
      setItems((prev) => prev.filter((i) => i.id !== id));
      flash("Item deleted");
    }
  }

  async function signOut() {
    await supabase.auth.signOut();
    nav("/admin/login");
  }

  if (!ready)
    return (
      <div className="grid min-h-screen place-items-center bg-spice">
        <Loader2 className="h-8 w-8 animate-spin text-chili" />
      </div>
    );

  if (!isSupabaseConfigured)
    return (
      <div className="bg-spice grid min-h-screen place-items-center p-6">
        <Card className="max-w-lg p-8 text-center">
          <Database className="mx-auto h-10 w-10 text-chili" />
          <h1 className="mt-4 font-display text-2xl font-black text-masala">
            Connect Supabase to use the admin panel
          </h1>
          <p className="mt-2 text-masala/70">
            Add <code className="rounded bg-muted px-1">VITE_SUPABASE_URL</code>{" "}
            and{" "}
            <code className="rounded bg-muted px-1">
              VITE_SUPABASE_ANON_KEY
            </code>{" "}
            to <code className="rounded bg-muted px-1">frontend/.env</code>, run
            the SQL in <code>supabase/schema.sql</code>, then reload.
          </p>
          <Button className="mt-6" onClick={() => nav("/")}>
            Back to site
          </Button>
        </Card>
      </div>
    );

  const catItems = items.filter((i) => i.category_id === activeCat);

  return (
    <div className="min-h-screen bg-spice grain">
      {/* Top bar */}
      <header className="sticky top-0 z-30 border-b border-border bg-cream/90 backdrop-blur">
        <div className="container flex items-center justify-between py-3">
          <div className="flex items-center gap-3">
            <Logo />
            <span className="hidden rounded-full bg-chili/10 px-3 py-1 text-xs font-bold text-chili sm:inline">
              Admin
            </span>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" onClick={() => nav("/")}>
              View site
            </Button>
            <Button variant="ghost" size="sm" onClick={signOut} className="gap-1">
              <LogOut className="h-4 w-4" /> Sign out
            </Button>
          </div>
        </div>
      </header>

      {toast && (
        <div className="fixed left-1/2 top-20 z-50 -translate-x-1/2 rounded-full bg-masala px-5 py-2 text-sm font-bold text-cream shadow-warm">
          {toast}
        </div>
      )}

      <div className="container py-8">
        {cats.length === 0 ? (
          <Card className="mx-auto max-w-xl p-10 text-center">
            <Utensils className="mx-auto h-10 w-10 text-saffron" />
            <h2 className="mt-4 font-display text-2xl font-black text-masala">
              Your menu is empty
            </h2>
            <p className="mt-2 text-masala/70">
              Click below to import the full Chaat Chaska menu from the bundled
              data into your Supabase database.
            </p>
            <Button className="mt-6 gap-2" onClick={seedDatabase} disabled={busy}>
              {busy ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                <Database className="h-4 w-4" />
              )}
              Seed full menu
            </Button>
          </Card>
        ) : (
          <div className="grid gap-6 lg:grid-cols-[260px_1fr]">
            {/* Category sidebar — horizontal strip on mobile, column on desktop */}
            <aside className="-mx-1 flex gap-2 overflow-x-auto px-1 pb-2 lg:mx-0 lg:flex-col lg:space-y-1.5 lg:overflow-visible lg:px-0 lg:pb-0">
              <p className="hidden px-2 text-xs font-bold uppercase tracking-widest text-masala/50 lg:block">
                Categories
              </p>
              {cats.map((c) => (
                <button
                  key={c.id}
                  onClick={() => setActiveCat(c.id)}
                  className={`flex shrink-0 items-center gap-2 whitespace-nowrap rounded-2xl px-4 py-3 text-left text-sm font-bold transition-colors lg:w-full lg:justify-between ${
                    activeCat === c.id
                      ? "bg-chili text-white shadow-soft"
                      : "bg-card text-masala hover:bg-masala/5"
                  }`}
                >
                  {c.title}
                  <span
                    className={`rounded-full px-2 py-0.5 text-xs ${
                      activeCat === c.id ? "bg-white/20" : "bg-muted"
                    }`}
                  >
                    {items.filter((i) => i.category_id === c.id).length}
                  </span>
                </button>
              ))}
            </aside>

            {/* Items editor */}
            <main className="space-y-4">
              {/* Add item */}
              <Card className="p-5">
                <Label>Add a new item</Label>
                <div className="mt-2 flex flex-col gap-3 sm:flex-row">
                  <Input
                    placeholder="Dish name"
                    value={newItem.name}
                    onChange={(e) =>
                      setNewItem((s) => ({ ...s, name: e.target.value }))
                    }
                    className="flex-1"
                  />
                  <Input
                    type="number"
                    step="0.5"
                    placeholder="Price"
                    value={newItem.price}
                    onChange={(e) =>
                      setNewItem((s) => ({ ...s, price: e.target.value }))
                    }
                    className="sm:w-32"
                  />
                  <Button onClick={addItem} className="gap-1">
                    <Plus className="h-4 w-4" /> Add
                  </Button>
                </div>
              </Card>

              {/* Item rows */}
              <div className="space-y-2">
                {catItems.map((it) => (
                  <ItemRow
                    key={it.id}
                    item={it}
                    onSave={updateItem}
                    onDelete={deleteItem}
                  />
                ))}
                {catItems.length === 0 && (
                  <p className="py-8 text-center text-masala/50">
                    No items in this category yet.
                  </p>
                )}
              </div>
            </main>
          </div>
        )}
      </div>
    </div>
  );
}

function ItemRow({ item, onSave, onDelete }) {
  const [name, setName] = useState(item.name);
  const [price, setPrice] = useState(item.price);
  const dirty = name !== item.name || Number(price) !== Number(item.price);

  return (
    <Card className="flex flex-wrap items-center gap-3 p-3 sm:flex-nowrap">
      <Input
        value={name}
        onChange={(e) => setName(e.target.value)}
        className="flex-1 border-transparent bg-transparent hover:border-input"
      />
      <div className="flex items-center gap-1">
        <Input
          type="number"
          step="0.5"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          className="w-24"
        />
        <span className="text-xs font-bold text-masala/50">AED</span>
      </div>
      <Button
        variant="ghost"
        size="icon"
        title={item.is_available ? "Available" : "Hidden"}
        onClick={() => onSave(item.id, { is_available: !item.is_available })}
        className={item.is_available ? "text-leaf" : "text-masala/30"}
      >
        {item.is_available ? (
          <Eye className="h-4 w-4" />
        ) : (
          <EyeOff className="h-4 w-4" />
        )}
      </Button>
      <Button
        size="icon"
        variant={dirty ? "saffron" : "ghost"}
        disabled={!dirty}
        onClick={() => onSave(item.id, { name, price: Number(price) })}
        title="Save"
      >
        <Save className="h-4 w-4" />
      </Button>
      <Button
        size="icon"
        variant="ghost"
        className="text-chili"
        onClick={() => onDelete(item.id)}
        title="Delete"
      >
        <Trash2 className="h-4 w-4" />
      </Button>
    </Card>
  );
}
