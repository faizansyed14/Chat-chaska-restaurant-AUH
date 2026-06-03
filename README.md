# 🍛 Chaat Chaska - Restaurant Website

A modern, animated full-stack website for **Chaat Chaska**, authentic Indian
street food in Abu Dhabi. Built to look genuinely designed - not "vibe-coded".

**Stack:** React + Vite · Tailwind CSS · shadcn-style UI · Framer Motion ·
react-pageflip (flip-book menu) · Supabase (database + auth) · optional
Node/Express backend.

---

## ✨ What's included

- **Striking hero** with staggered reveals & floating dish doodles
- **Animated marquee** of dish names
- **Story / About** section with brand values
- **Signature dishes grid** - each card orders straight to WhatsApp
- **Flip-book menu** 📖 - turn pages with the left/right buttons or by dragging
  the corner; contains the *entire* printed menu (every category & price)
- **Google rating banner** (4.8 ★, 1,000+ reviews) + **testimonials**
- **Contact** with one-tap **WhatsApp** (`+971 50 751 3245`) and the embedded
  **Google Map**
- **Floating WhatsApp button** on every screen
- **Admin panel** (`/admin`) - log in, add/edit/delete dishes, change prices,
  hide/show items. One click seeds the whole menu into your database.
- Fully **responsive** + custom branded styling (marigold, masala-red, cream).

> The site works **immediately** with the bundled menu data - Supabase is only
> needed to make the menu editable from the admin panel.

---

## 🚀 Quick start (frontend)

```bash
cd frontend
npm install
npm run dev
```

Open http://localhost:5173 - done. The full menu, animations, map and WhatsApp
all work out of the box.

To build for production:

```bash
npm run build      # outputs to frontend/dist
npm run preview    # preview the build locally
```

---

## 🗄️ Enable the admin panel (Supabase)

1. Create a free project at <https://supabase.com>.
2. In **Project Settings → API**, copy the **Project URL** and the **anon
   public** key.
3. In `frontend/`, copy `.env.example` to `.env` and paste them in:

   ```env
   VITE_SUPABASE_URL=https://your-project.supabase.co
   VITE_SUPABASE_ANON_KEY=your-anon-key
   ```

4. In Supabase open **SQL Editor → New query**, paste the contents of
   `frontend/supabase/schema.sql`, and **Run** it.
5. In **Authentication → Users → Add user**, create your admin login
   (email + password).
6. Restart `npm run dev`, go to **`/admin/login`**, sign in, then click
   **“Seed full menu”** to import every dish.

Now the public menu reads live from the database, and any price you change in
`/admin` updates the site instantly. ✅

---

## 🖼️ Adding real food photos

The cards show branded gradient tiles by default so nothing looks broken.
To use real photos, drop images into `frontend/public/images/` using the
filenames listed in `frontend/public/images/README.md`
(`pani-puri.jpg`, `bhel-puri.jpg`, `samosa.jpg`, …).

---

## ⚙️ Optional Node.js backend

Supabase already gives you a secure REST API, so the Express server is optional.
It's included for custom logic (order webhooks, email notifications, etc.):

```bash
cd backend
npm install
cp .env.example .env     # add your Supabase URL + SERVICE ROLE key
npm start                # http://localhost:4000
```

Endpoints: `GET /api/health`, `GET /api/menu`, `POST /api/order`.

---

## 📞 Customising contact details

Everything (WhatsApp number, phones, email, branches, map embed) lives in one
place: **`frontend/src/lib/utils.js`** → the `RESTAURANT` object. Edit it once
and it updates across the whole site.

---

## ☁️ Deploying

- **Frontend** → Vercel / Netlify (build command `npm run build`, output `dist`).
  Add the two `VITE_SUPABASE_*` env vars in the host's dashboard. For client-side
  routing, add a rewrite of all paths to `/index.html`.
- **Backend** (if used) → Render / Railway / Fly.io with the `.env` values.
- **Database/Auth** → already hosted by Supabase.

---

Made with ❤️ and a lot of chutney.
