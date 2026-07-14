# ATF Projects

Full-stack construction and real estate website with a Labour Payment Transparency System.

This repository contains:

- `backend/` — Node.js + Express API with Prisma and PostgreSQL support
- `frontend/` — Next.js 14 marketing site, project pages, and admin/worker portals
- `render.yaml` — Render service blueprint for backend deployment
- `backend/prisma/` — Prisma schema, migrations, and seed scripts

---

## Quick Start

### 1. Backend

```bash
cd backend
npm install
npx prisma generate
npx prisma migrate dev --name init
npx ts-node prisma/seed.ts
npm run dev
```

The backend runs at `http://localhost:5000` by default.

### 2. Frontend

Open a second terminal:

```bash
cd frontend
npm install
npm run dev
```

The frontend runs at `http://localhost:3000`.

---

## Repository Structure

```
atf-projects/
├── backend/              # Express API, Prisma schema, seed data
│   ├── prisma/
│   │   ├── schema.prisma
│   │   ├── seed.ts
│   │   └── migrations/
│   ├── src/
│   │   ├── controllers/
│   │   ├── middleware/
│   │   ├── routes/
│   │   └── services/
│   ├── package.json
│   └── .env.example
├── frontend/             # Next.js 14 marketing and portal frontend
│   ├── public/images/
│   ├── src/
│   ├── package.json
│   └── .env.local.example
├── render.yaml           # Render backend deployment manifest
├── SETUP.md              # Local setup guide
└── README.md             # This file
```

---

## Backend Details

The backend is an Express API written in TypeScript.

- Uses Prisma for database access.
- Supports PostgreSQL via `DATABASE_URL`.
- Uses JWT authentication and Twilio OTP support.
- Exposes API routes under `/api/*`.
- Includes a health check on `/health`.

### Backend scripts

From `backend/package.json`:

- `npm run dev` — start development server with `nodemon`
- `npm run build` — compile TypeScript
- `npm start` — run compiled production server
- `npm run prisma:migrate` — perform Prisma migrations
- `npm run prisma:generate` — generate Prisma client
- `npm run prisma:studio` — open Prisma Studio
- `npm run prisma:seed` — seed demo data

### Backend environment variables

Copy `backend/.env.example` to `backend/.env` and fill in values.

Required variables:

- `NODE_ENV` — `development` or `production`
- `DATABASE_URL` — Postgres connection string
- `JWT_SECRET` — secret key for JWT signing
- `FRONTEND_URL` — frontend origin for CORS

Optional but recommended for production:

- `TWILIO_SID`
- `TWILIO_TOKEN`
- `TWILIO_PHONE`
- `SMTP_HOST`
- `SMTP_PORT`
- `SMTP_USER`
- `SMTP_PASS`

> In development, OTP codes are printed to the backend terminal, so Twilio is not required locally.

---

## Frontend Details

The frontend is a Next.js 14 application.

- Uses Tailwind CSS and React for UI.
- Fetches API data from `NEXT_PUBLIC_API_URL`.
- Includes admin and worker portal login routes.

### Frontend scripts

From `frontend/package.json`:

- `npm run dev` — start Next.js in development mode
- `npm run build` — build production app
- `npm run start` — start the production build
- `npm run lint` — run Next.js linting

### Frontend environment variables

Copy `frontend/.env.local.example` to `frontend/.env.local`.

Required variable:

- `NEXT_PUBLIC_API_URL` — backend API base URL, for example `http://localhost:5000/api`

---

## Deploy Backend to Render

This project already includes `render.yaml` for Render deployment.

### Render service setup

1. Connect your GitHub repository to Render.
2. Import `render.yaml` or create a new Web Service with:
   - Root directory: `backend`
   - Runtime: `node`
   - Build command: `npm install && npx prisma generate && npx prisma migrate deploy && npx ts-node prisma/seed.ts`
   - Start command: `npm run start`
   - Health check path: `/health`

3. Add Render environment variables:
   - `DATABASE_URL`
   - `JWT_SECRET`
   - `FRONTEND_URL`
   - `TWILIO_SID`
   - `TWILIO_TOKEN`
   - `TWILIO_PHONE`
   - `SMTP_HOST`
   - `SMTP_PORT`
   - `SMTP_USER`
   - `SMTP_PASS`

4. Deploy the service.

### Notes

- Render sets `PORT` automatically, but the backend falls back to `process.env.PORT || 5000`.
- Use a production-safe Postgres database URL for `DATABASE_URL`.
- If you use Supabase, use the direct Postgres connection string for migrations.

---

## Deploy Frontend to Vercel

1. Import the repository into Vercel.
2. Set the project root to `frontend`.
3. Use the default Next.js settings.
4. Set the environment variable:
   - `NEXT_PUBLIC_API_URL` = `https://<your-render-backend>.onrender.com/api`
5. Deploy.

### Vercel settings

- Build command: `npm run build`
- Output directory: default (`.next`)
- Framework:** Next.js

---

## Local Demo Accounts

Use these demo accounts after seeding:

- Admin: `admin@atfprojects.in` / `admin123`
- Worker: `ATF-W-00001` / phone `9876543210` (OTP shown in backend terminal during dev)

---

## Useful commands

From project root:

```bash
cd backend && npm install
cd ../frontend && npm install
```

From `backend/`:

```bash
npm run dev
npm run build
npm run start
```

From `frontend/`:

```bash
npm run dev
npm run build
npm run start
```
```
}
