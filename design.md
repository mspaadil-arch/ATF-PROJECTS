# ATF Projects — Design Specification

## Brand Overview
**Company:** ATF Projects  
**Industry:** Construction & Real Estate (Pan-India)  
**Tone:** Confident, large-scale, premium, professional — not playful.  
**Comparable brands:** DLF, Godrej Properties, L&T Construction

---

## Color Palette

| Role | Color | Hex |
|------|-------|-----|
| Primary Background | Deep Navy | `#0A1628` |
| Secondary Background | Charcoal | `#1A2332` |
| Surface / Cards | Slate | `#1E2D42` |
| Accent Primary | Gold | `#C9A84C` |
| Accent Hover | Amber | `#E8C06A` |
| Text Primary | White | `#FFFFFF` |
| Text Secondary | Light Grey | `#A0AEC0` |
| Text Muted | Mid Grey | `#718096` |
| Border | Dark Border | `#2D3748` |
| Success | Green | `#48BB78` |
| Warning | Orange | `#ED8936` |
| Error | Red | `#FC8181` |

> **Alt industrial palette (optional):** Concrete Grey `#2D2D2D` + Safety Orange `#FF6B35`

---

## Typography

| Role | Font | Weight | Size |
|------|------|--------|------|
| Display / Hero | Space Grotesk | 700–800 | 64–80px |
| H1 | Space Grotesk | 700 | 48px |
| H2 | Space Grotesk | 600 | 36px |
| H3 | Space Grotesk | 600 | 24px |
| H4 | Space Grotesk | 500 | 20px |
| Body | Inter | 400 | 16px |
| Body Small | Inter | 400 | 14px |
| Caption | Inter | 400 | 12px |
| Label / Button | Inter | 600 | 14–16px |

**Google Fonts import:**
```
https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;500;600;700;800&family=Inter:wght@400;500;600&display=swap
```

---

## Spacing & Layout

- **Max container width:** 1280px  
- **Grid:** 12-column, 24px gutter  
- **Section padding:** 80–120px vertical  
- **Card border-radius:** 12px  
- **Button border-radius:** 8px  
- **Border width:** 1px solid `#2D3748`

---

## Animation Guidelines

### Library: Framer Motion (React) + AOS for scroll triggers

| Animation | Config |
|-----------|--------|
| Fade Up | `y: 40 → 0`, `opacity: 0 → 1`, duration `0.6s`, ease `easeOut` |
| Slide In Left | `x: -60 → 0`, `opacity: 0 → 1`, duration `0.5s` |
| Slide In Right | `x: 60 → 0`, `opacity: 0 → 1`, duration `0.5s` |
| Scale In | `scale: 0.95 → 1`, `opacity: 0 → 1`, duration `0.4s` |
| Stagger children | `staggerChildren: 0.1s` |
| Counter count-up | Duration `2s`, start on viewport entry |
| Page transition | `opacity: 0 → 1`, `y: 10 → 0`, duration `0.3s` |

### Rules
- Stagger list items by 0.1s
- Scroll-trigger threshold: `0.2` (20% visible before firing)
- Never animate more than 3 things simultaneously per section
- Reduce motion: respect `prefers-reduced-motion` media query
- Parallax on hero background only (subtle, max 20px shift)

---

## Component Design Tokens

### Buttons
```css
/* Primary */
background: #C9A84C; color: #0A1628; font-weight: 600;
padding: 14px 32px; border-radius: 8px;
hover: background #E8C06A, transform translateY(-2px), shadow gold glow

/* Secondary / Outline */
border: 1px solid #C9A84C; color: #C9A84C; background: transparent;
hover: background rgba(201,168,76,0.1)

/* Ghost */
color: #A0AEC0; background: transparent;
hover: color #FFFFFF
```

### Cards
```css
background: #1E2D42; border: 1px solid #2D3748; border-radius: 12px;
padding: 24px; hover: border-color #C9A84C, transform translateY(-4px)
transition: all 0.3s ease;
```

### Input Fields
```css
background: #1A2332; border: 1px solid #2D3748; border-radius: 8px;
color: #FFFFFF; padding: 12px 16px;
focus: border-color #C9A84C, outline none, box-shadow 0 0 0 3px rgba(201,168,76,0.2)
```

---

## Page-by-Page Specifications

### 1. Home (`/`)
**Sections (top to bottom):**
1. **Navbar** — Logo left, nav links centre, CTA button right, sticky with blur backdrop on scroll
2. **Hero** — Full-viewport, parallax background image/video, large headline, sub-headline, two CTAs (Primary + Outline), scroll indicator
3. **Stats Bar** — 4 animated counters: 150+ Projects | 10,000+ Labourers | 25 States | 20+ Years
4. **Featured Projects** — 3-column grid, hover zoom + gold overlay with "View Project" link
5. **Services Overview** — Icon + title + 1-line description, 3-4 columns, fade-up stagger
6. **About Teaser** — Split layout: large image left, text + bullets + CTA right
7. **Timeline** — Horizontal scrollable milestone timeline (founding → expansion → today)
8. **Testimonials** — Auto-sliding carousel, client photo + quote + designation
9. **India Map** — SVG India map with dot markers on active project states
10. **CTA Banner** — Full-width gold-tinted banner, big headline, two CTA buttons
11. **Footer** — 4-column: Logo+tagline, Quick Links, Services, Contact info + social

### 2. About Us (`/about`)
- Company story (timeline)
- Mission, Vision, Values (3-column cards)
- Leadership team (headshots, name, role, LinkedIn)
- Certifications (RERA, GST, ISO logos)
- Why Choose Us (icon list)

### 3. Projects / Portfolio (`/projects`)
- Filter bar: All | Residential | Commercial | Infrastructure | Ongoing | Completed
- Masonry or uniform grid gallery
- Each card: project image, name, location, type badge, status badge
- Detail page (`/projects/[slug]`): hero image, description, stats (area, timeline, value), image gallery slider, location map, related projects

### 4. Services (`/services`)
- Construction, Real Estate Development, Project Consulting, Interior Finishing, Labour Supply
- Each service: icon, headline, description, sub-list, image

### 5. Careers (`/careers`)
- Two tracks: Professional Roles & Labour/Contractor Onboarding
- Job listing cards with apply modal
- Labour application form (name, phone, skill, state, Aadhaar upload)

### 6. Labour Payment Portal (`/portal`)
- Login page (worker ID + OTP or admin credentials)
- **Worker dashboard:** attendance, payment history, download slip, raise dispute
- **Admin dashboard:** manage workers, record attendance/wages, generate slips, export reports

### 7. Contact (`/contact`)
- India-wide office addresses
- Google Maps embed
- Enquiry form (name, phone, email, project type, message)
- WhatsApp float button + click-to-call

---

## Photos / Assets Guide

See [`frontend/public/images/README.md`](frontend/public/images/README.md) for the complete guide on where to place photos.

**Quick reference:**
```
frontend/public/images/
├── hero/           → Hero background images (min 1920×1080)
├── projects/
│   ├── residential/  → Residential project photos
│   ├── commercial/   → Commercial project photos
│   ├── infrastructure/ → Roads, bridges, infrastructure
│   └── ongoing/      → Active construction site photos
├── team/           → Leadership headshots (400×400, square)
├── partners/       → Client & partner logos (transparent PNG)
└── testimonials/   → Client photos for testimonial cards (150×150)
```

---

## Multi-language Support
- Default: English
- Secondary: Hindi (`hi`)
- Use `next-intl` or `i18next` for translation management
- Store translations in `frontend/src/locales/{en,hi}/`

---

## SEO Requirements
- `<title>` and `<meta description>` per page
- Open Graph tags (og:title, og:image, og:description)
- JSON-LD structured data: `LocalBusiness`, `RealEstateAgent`
- Sitemap.xml + robots.txt
- Canonical URLs

---

## Performance Targets
- Lighthouse score: ≥ 90 (Performance, Accessibility, SEO)
- LCP < 2.5s
- CLS < 0.1
- Use `next/image` for all images (auto-optimize, lazy-load)
- Video: autoplay, muted, loop, preload="none"

---

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Frontend | Next.js 14 (App Router) |
| Styling | Tailwind CSS v3 |
| Animations | Framer Motion + AOS |
| Icons | Lucide React + React Icons |
| State | Zustand |
| Forms | React Hook Form + Zod |
| Backend | Node.js + Express |
| Database | PostgreSQL |
| ORM | Prisma |
| Auth | JWT + OTP (Twilio/MSG91) |
| File storage | AWS S3 / Cloudflare R2 |
| Hosting | Vercel (frontend) + Railway/Render (backend) |
| Analytics | Google Analytics 4 |
