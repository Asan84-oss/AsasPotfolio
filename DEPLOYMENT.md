# 🚀 Deployment Instructions — Asa Samuel Bless Portfolio

## Architecture Overview

This is a **dual-persona portfolio** built with React, TypeScript, Tailwind CSS, Framer Motion, and React Router. It features:

- **Software Engineer Theme**: Cyberpunk/Neo-Tokyo HUD with interactive matrix grid
- **Content Creator Theme**: Ultra-minimalistic luxury editorial design
- **Admin Dashboard**: Full CRUD workspace with activity logging
- **Prisma Schema**: Ready for PostgreSQL connection

---

## 🗄️ Database Setup (PostgreSQL via Neon or Supabase)

### Step 1: Create a Database

**Option A: Neon (Recommended for Vercel)**
1. Go to [neon.tech](https://neon.tech)
2. Create a new project
3. Copy the connection string (looks like: `postgresql://user:pass@ep-xxx.region.aws.neon.tech/db?sslmode=require`)

**Option B: Supabase**
1. Go to [supabase.com](https://supabase.com)
2. Create a new project
3. Go to Settings > Database > Connection string
4. Copy the URI format connection string

### Step 2: Configure Environment Variables

Create a `.env` file in the project root:

```env
POSTGRES_PRISMA_URL=postgresql://user:password@host/dbname?sslmode=require
```

### Step 3: Install Prisma Dependencies

```bash
npm install prisma @prisma/client
```

### Step 4: Push Schema to Database

```bash
npx prisma db push
```

This creates all tables (admins, projects, testimonials, biographies, activity_logs) in your PostgreSQL database.

### Step 5: Seed Initial Data (Optional)

Create `prisma/seed.ts` or run SQL inserts to populate initial data.

---

## 🔗 Connecting Frontend to Real Database

The current frontend uses **localStorage** as a mock database for immediate functionality. To connect to the real PostgreSQL database:

1. **For Next.js deployment**: Convert to Next.js App Router and use Server Actions or API routes
2. **For this Vite deployment**: Create API endpoints (e.g., using Vercel serverless functions) that use Prisma Client

Example API route structure:
```
/api/projects    → GET, POST, DELETE
/api/testimonials → GET, POST, DELETE
/api/biographies  → GET, PUT
/api/admin        → POST (register/login)
/api/activity-log → GET, POST
```

---

## 🌐 Deploy to Vercel

### Step 1: Push to GitHub

```bash
git init
git add .
git commit -m "Initial commit: Dual-persona portfolio"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO.git
git push -u origin main
```

### Step 2: Connect to Vercel

1. Go to [vercel.com](https://vercel.com)
2. Click "Add New Project"
3. Import your GitHub repository
4. Vercel auto-detects Vite configuration

### Step 3: Configure Environment Variables in Vercel

In Vercel Dashboard > Settings > Environment Variables, add:

```
POSTGRES_PRISMA_URL=your_connection_string_here
```

### Step 4: Deploy

Click "Deploy" — Vercel handles the rest!

---

## 🔐 Admin Access

1. Navigate to `yoursite.com/admin/auth` (or click the subtle `// admin.sys` link in the footer)
2. First visit: Create your admin account (email + password)
3. Subsequent visits: Login only (registration is permanently disabled after first admin creation)
4. Access the dashboard to manage all content

---

## 📁 Project Structure

```
├── prisma/
│   └── schema.prisma          # Database schema
├── src/
│   ├── components/
│   │   ├── About.tsx           # About section (dual layout)
│   │   ├── CreatorBackground.tsx # Organic blob animation
│   │   ├── EngineerBackground.tsx # Matrix grid animation
│   │   ├── Footer.tsx          # Footer with admin portal
│   │   ├── Header.tsx          # Navigation + toggle
│   │   ├── PersonaToggle.tsx   # Theme switcher
│   │   ├── Projects.tsx        # Project gallery (expand/collapse)
│   │   ├── Testimonials.tsx    # Client reviews
│   │   └── Welcome.tsx         # Hero with typing effect
│   ├── data/
│   │   └── mockData.ts        # Data layer (localStorage + types)
│   ├── pages/
│   │   └── admin/
│   │       ├── AuthPage.tsx    # Login/Register
│   │       └── DashboardPage.tsx # Admin workspace
│   ├── App.tsx                 # Router + main layout
│   ├── index.css               # Tailwind + custom animations
│   └── main.tsx                # Entry point
├── index.html                  # HTML template with fonts
└── DEPLOYMENT.md               # This file
```

---

## 🎨 Features Delivered

### Part 1 — Frontend Engine
- ✅ Dual-persona state system with smooth transitions
- ✅ Cyberpunk matrix background (cursor-reactive)
- ✅ Organic glassmorphic blob background
- ✅ Fira Code + Playfair Display typography
- ✅ Neon green/hot pink vs cream/charcoal color systems

### Part 2 — Enhanced Sections + Admin
- ✅ Terminal typing effect for engineer pitch
- ✅ Elegant fade-in for creator pitch
- ✅ View More/Hide project expansion
- ✅ Real project data (UBA Bank, AI Assistant, TikTok growth)
- ✅ Dashboard-style About (engineer) / Editorial About (creator)
- ✅ Testimonial cards with avatars
- ✅ Footer with hidden admin portal link
- ✅ Admin auth (register once, then login only)
- ✅ Dashboard with collapsible sidebar
- ✅ Activity Matrix (full audit log)
- ✅ Edit Workspace (CRUD for projects, testimonials, bios)
- ✅ Prisma schema ready for PostgreSQL
- ✅ Deployment instructions for Vercel

---

## ⚡ Quick Start (Local Development)

```bash
npm install
npm run dev
```

Visit `http://localhost:5173` for the portfolio.
Visit `http://localhost:5173/admin/auth` for the admin panel.
