-- ============================================================
--  Chaat Chaska - Supabase schema
--  Run this in the Supabase SQL Editor (Dashboard -> SQL -> New query).
-- ============================================================

-- Categories (e.g. "Chaat Ke Chaske", "Dose Ki Dukan")
create table if not exists public.categories (
  id          uuid primary key default gen_random_uuid(),
  slug        text unique not null,
  title       text not null,
  subtitle    text,
  accent      text default 'saffron',          -- chili | saffron | leaf | turmeric
  sort_order  int  default 0,
  created_at  timestamptz default now()
);

-- Menu items belonging to a category
create table if not exists public.menu_items (
  id            uuid primary key default gen_random_uuid(),
  category_id   uuid references public.categories(id) on delete cascade,
  name          text not null,
  price         numeric(10,2) not null default 0,
  is_available  boolean default true,
  sort_order    int default 0,
  created_at    timestamptz default now()
);

create index if not exists menu_items_category_idx
  on public.menu_items (category_id);

-- ============================================================
--  Row Level Security
--  Public (anon) can READ. Only signed-in admins can WRITE.
-- ============================================================
alter table public.categories  enable row level security;
alter table public.menu_items  enable row level security;

-- Public read access
drop policy if exists "public read categories" on public.categories;
create policy "public read categories"
  on public.categories for select
  using (true);

drop policy if exists "public read menu_items" on public.menu_items;
create policy "public read menu_items"
  on public.menu_items for select
  using (true);

-- Authenticated write access (insert / update / delete)
drop policy if exists "auth write categories" on public.categories;
create policy "auth write categories"
  on public.categories for all
  to authenticated
  using (true) with check (true);

drop policy if exists "auth write menu_items" on public.menu_items;
create policy "auth write menu_items"
  on public.menu_items for all
  to authenticated
  using (true) with check (true);

-- ============================================================
--  Next steps:
--  1. Authentication -> Users -> "Add user" to create your admin login.
--  2. Open the site at /admin/login and sign in.
--  3. Click "Seed full menu" to import every dish from the printed menu.
-- ============================================================

-- ============================================================
--  Settings table (for the admin-controlled promo banner, etc.)
--  key = 'promo', value = { "enabled": true, "text": "20% off thali!" }
-- ============================================================
create table if not exists public.settings (
  key        text primary key,
  value      jsonb not null default '{}',
  updated_at timestamptz default now()
);

alter table public.settings enable row level security;

drop policy if exists "public read settings" on public.settings;
create policy "public read settings"
  on public.settings for select using (true);

drop policy if exists "auth write settings" on public.settings;
create policy "auth write settings"
  on public.settings for all to authenticated
  using (true) with check (true);
