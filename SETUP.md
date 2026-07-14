# ATF Projects — VS Code Setup Guide

## Prerequisites (install these once on your machine)

| Tool | Download |
|------|----------|
| Node.js 18+ | https://nodejs.org |
| VS Code | https://code.visualstudio.com |

That's it. No PostgreSQL needed — the backend uses SQLite (a local file).

---

## Step 1 — Open in VS Code

1. Download the `atf-projects` folder from Claude's output
2. Open VS Code → **File → Open Folder** → select `atf-projects`
3. Install the recommended extension when prompted: **ESLint**

---

## Step 2 — Set Up the Backend

Open the **VS Code integrated terminal** (`Ctrl+`` ` or `Terminal → New Terminal`):

```bash
cd backend
npm install
npx prisma generate
npx prisma migrate dev --name init
npx ts-node prisma/seed.ts
npm run dev
```

You should see:
```
🚀 ATF Projects API running on http://localhost:5000
Seed complete!
Admin login  → email: admin@atfprojects.in | password: admin123
Worker login → ID: ATF-W-00001 | phone: 9876543210
```

> **Leave this terminal running.**

---

## Step 3 — Set Up the Frontend

Open a **second terminal** in VS Code (`+` button in the terminal panel):

```bash
cd frontend
npm install
npm run dev
```

You should see:
```
▲ Next.js 14.x.x
- Local: http://localhost:3000
```

---

## Step 4 — Open in Browser

Visit **http://localhost:3000** 🎉

| Page | URL |
|------|-----|
| Home | http://localhost:3000 |
| Projects | http://localhost:3000/projects |
| About | http://localhost:3000/about |
| Services | http://localhost:3000/services |
| Careers | http://localhost:3000/careers |
| Contact | http://localhost:3000/contact |
| Worker Portal Login | http://localhost:3000/portal |
| Worker Dashboard | http://localhost:3000/portal/worker |
| Admin Dashboard | http://localhost:3000/portal/admin |

---

## Demo Login Credentials

### Admin Panel (`/portal` → Admin Login tab)
- **Email:** `admin@atfprojects.in`
- **Password:** `admin123`

### Worker Portal (`/portal` → Worker Login tab)
- **Worker ID:** `ATF-W-00001`
- **Phone:** `9876543210`
- **OTP:** Check the **backend terminal** — in development mode the OTP is printed there instead of sent via SMS.

---

## Adding Your Photos

Drop your images into the correct folders under `frontend/public/images/`:

```
frontend/public/images/
├── hero/           ← Homepage hero background (1920×1080)
├── projects/
│   ├── residential/
│   ├── commercial/
│   ├── infrastructure/
│   └── ongoing/
├── team/           ← Leadership headshots (square, 400×400)
├── partners/       ← Client/partner logos (transparent PNG)
└── testimonials/   ← Client photos for testimonial cards
```

See `frontend/public/images/README.md` for full naming conventions.

---

## VS Code Recommended Extensions

Open Extensions panel (`Ctrl+Shift+X`) and install:

- **ESLint** — `dbaeumer.vscode-eslint`
- **Tailwind CSS IntelliSense** — `bradlc.vscode-tailwindcss`
- **Prisma** — `Prisma.prisma`
- **TypeScript** — built-in

---

## Troubleshooting

**`npm install` fails / takes too long**
→ Make sure you're running it inside `backend/` or `frontend/` separately, not the root folder.

**`prisma migrate dev` asks for a name**
→ Type `init` and press Enter.

**Port 3000 already in use**
→ Kill the other process or run `npm run dev -- -p 3001`

**OTP not received**
→ In development, OTP is printed to the backend terminal. Twilio is only needed in production.

**Images not showing**
→ Add your photos to `frontend/public/images/` — the site shows a grey placeholder until real photos are added.

---

## Project File Structure (Quick Reference)

```
atf-projects/
├── design.md          ← Design tokens, colors, fonts, animation rules
├── SETUP.md           ← This file
├── frontend/          ← Next.js 14 app
│   ├── public/images/ ← YOUR PHOTOS GO HERE
│   └── src/
│       ├── app/       ← Pages
│       └── components/← UI components
└── backend/           ← Node.js + Express + Prisma
    ├── prisma/        ← DB schema + migrations
    └── src/           ← API routes, controllers
```
