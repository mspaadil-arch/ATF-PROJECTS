# ATF Projects — Photo & Asset Guide

This is the single source of truth for where to place all images and media files.

## Directory Structure

```
frontend/public/images/
├── hero/
│   ├── hero-bg-1.jpg          ← Main hero background (1920×1080 min, landscape)
│   ├── hero-bg-2.jpg          ← Alternate hero (for slideshow or video fallback)
│   └── hero-video-poster.jpg  ← Poster frame for background video
│
├── projects/
│   ├── residential/
│   │   ├── proj-res-1.jpg     ← Project thumbnail (800×600)
│   │   ├── proj-res-1-a.jpg   ← Project gallery image 1
│   │   ├── proj-res-1-b.jpg   ← Project gallery image 2
│   │   └── ...
│   ├── commercial/
│   │   ├── proj-com-1.jpg
│   │   └── ...
│   ├── infrastructure/
│   │   ├── proj-inf-1.jpg
│   │   └── ...
│   └── ongoing/
│       ├── proj-ong-1.jpg     ← Active site photos (can be updated regularly)
│       └── ...
│
├── team/
│   ├── ceo.jpg                ← 400×400, square crop, professional headshot
│   ├── coo.jpg
│   ├── cto.jpg
│   └── ...
│
├── partners/
│   ├── partner-dlf.png        ← Transparent PNG, any size (will be displayed ~120px wide)
│   ├── partner-nhai.png
│   ├── client-logo-1.png
│   └── ...
│
├── testimonials/
│   ├── client-1.jpg           ← 150×150, square, person photo
│   ├── client-2.jpg
│   └── ...
│
├── about/
│   ├── office.jpg             ← Office / HQ building photo
│   ├── site-workers.jpg       ← Workers on site (used in About section)
│   └── certifications/
│       ├── rera-cert.jpg
│       ├── iso-cert.jpg
│       └── gst-cert.jpg
│
├── services/
│   ├── construction.jpg       ← Image for Construction service card
│   ├── real-estate.jpg
│   ├── consulting.jpg
│   ├── interior.jpg
│   └── labour.jpg
│
└── og/
    └── og-default.jpg         ← Open Graph share image (1200×630)
```

## Naming Convention

- Use **kebab-case** (lowercase, hyphens): `project-name-01.jpg`
- Include a **sequence number** for galleries: `proj-res-mahaveer-01.jpg`
- No spaces, no uppercase, no special characters

## Size Guidelines

| Use | Width × Height | Max file size |
|-----|----------------|---------------|
| Hero background | 1920 × 1080 | 400 KB |
| Project thumbnail | 800 × 600 | 150 KB |
| Project gallery | 1200 × 900 | 250 KB |
| Team headshot | 400 × 400 | 80 KB |
| Partner logo | any | 50 KB |
| Testimonial photo | 150 × 150 | 30 KB |
| OG image | 1200 × 630 | 200 KB |

## Format Recommendations

- **Photos:** JPEG, quality 80–85% (use Squoosh or ImageOptim before uploading)
- **Logos/icons with transparency:** PNG
- **Prefer WebP** where possible — Next.js will auto-convert via `next/image`
- **Videos:** MP4 (H.264), max 10MB for hero background loop

## How Photos Are Loaded in Code

All images use `next/image` for automatic optimization:

```tsx
import Image from 'next/image'

// Project thumbnail
<Image
  src="/images/projects/residential/proj-res-1.jpg"
  alt="Mahaveer Residency, Pune"
  width={800}
  height={600}
  className="object-cover"
/>

// Hero background
<Image
  src="/images/hero/hero-bg-1.jpg"
  alt="ATF Projects construction site"
  fill
  priority
  className="object-cover"
/>
```

## Video (Hero Background)

Place the hero background video at:
```
frontend/public/videos/hero-loop.mp4
```

Requirements:
- Format: MP4, H.264
- Resolution: 1920×1080
- Duration: 10–30 seconds (loops seamlessly)
- No audio needed
- Max size: 10 MB

## Updating Project Photos

To add a new project:
1. Create a folder: `projects/{category}/project-slug/`
2. Add thumbnail as `thumb.jpg` and gallery images as `01.jpg`, `02.jpg`, etc.
3. Update the project data in `frontend/src/lib/projects-data.ts`

## Icons & SVGs

- Icons use **Lucide React** (imported from `lucide-react`)
- Brand SVGs (logo, etc.) go in `frontend/public/icons/`
- India map SVG: `frontend/public/icons/india-map.svg`
