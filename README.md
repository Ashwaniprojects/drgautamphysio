# Dr. Gautam's Physio & Rehab Centre

Patient-facing website for Dr. S.K. Gautam's physiotherapy practice in Lucknow, India.

## Stack

- **Frontend** — Next.js 16 (App Router), React 19, TypeScript, Tailwind CSS v4
- **Fonts** — Figtree (display headings), Noto Sans (body)
- **Animation** — GSAP (`@gsap/react`) + IntersectionObserver-based scroll reveals
- **Data** — Static files in `web/src/lib/data/` (no CMS)
- **Backend / DB** — Supabase (`@supabase/supabase-js`) for future booking, reviews, and contact-form persistence
- **Hosting** — Vercel (auto-deploys from `master` branch)
  - Preview URL: `https://web-beta-jade-71.vercel.app`

## Repo

```
GitHub : https://github.com/Ashwaniprojects/drgautamphysio.git
Branch : master
Local  : E:\dr gautam
       └── web/          ← Next.js project root
```

## Pages

| Route | Purpose |
|---|---|
| `/` | Home — hero, stats, services preview, testimonials, CTA |
| `/about` | Doctor bio, credentials, clinic mission |
| `/treatments` | Service catalogue with details |
| `/conditions` | Condition listing |
| `/conditions/[slug]` | Single condition detail |
| `/clinics` | Three Lucknow clinic locations with maps/addresses |
| `/awards` | Awards, certifications, conference photos |
| `/stories` | Patient success stories |
| `/blog` | Health articles |
| `/contact` | Contact form + clinic details |
| `/book` | Appointment booking form |

## Environment variables

Configured in Vercel Dashboard → Project → Settings → Environment Variables.

| Variable | Purpose |
|---|---|
| `NEXT_PUBLIC_SUPABASE_URL` | Supabase project URL |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Supabase anon (public) key |

Client-side Supabase client initialised in `web/src/lib/supabase-client.ts`.

## Running locally

```bash
cd E:\dr gautam\web
npm install
npm run dev        # http://localhost:3000
npm run build      # production build
```

Requires Node.js 18+ (Next.js 16 needs 18.17+) and npm/pnpm.

## Project structure

```
web/
├── src/
│   ├── app/                    # App Router pages + layouts
│   │   ├── layout.tsx          # Root layout (fonts, metadata, nav/footer)
│   │   ├── page.tsx            # Home
│   │   ├── globals.css         # Tailwind v4 + design tokens + animations
│   │   └── [page]/page.tsx     # Other routes
│   ├── components/
│   │   ├── home/               # Hero, ClinicsGrid, Testimonials, etc.
│   │   ├── ui/                 # Button, WhatsAppButton, StarIcon, etc.
│   │   ├── icons/              # SVG icon components
│   │   ├── SectionHeading.tsx  # Shared section title component
│   │   └── Footer.tsx
│   ├── hooks/
│   │   ├── useScrollReveal.ts  # IntersectionObserver hook
│   │   └── useCountUp.ts       # Animated number hook
│   ├── lib/
│   │   ├── data/               # Static data (doctor, clinics, conditions, testimonials)
│   │   ├── site-config.ts      # Site-wide constants (name, phone, rating, etc.)
│   │   └── supabase-client.ts  # Supabase browser client
│   └── app/globals.css         # Design tokens, mesh gradients, reveal animations
├── public/
│   ├── images/                 # Doctor photos, clinic photos, awards, events
│   └── *.ico / *.png           # Favicons
├── next.config.ts
├── package.json
└── tsconfig.json
```

## Design system

- **Palette** — Teal primary (`#0d9488`), cyan secondary (`#06b6d4`), dark ink (`#0c1a1a`)
- **Shapes** — Soft rounded corners, floating glass cards, mesh gradient backgrounds
- **Motion** — Scroll-triggered fade-up reveals, shape-float animations, slow-spin orbiters
- **Responsive** — Mobile-first, breakpoints at `md:` (768 px) and `lg:` (1024 px)

## Git workflow

```bash
git status                      # check working tree
git add <files>                 # stage changes
git commit -m "..."             # commit (co-authored by Claude Sonnet 5)
git push origin master          # triggers Vercel production deploy
```

## Roadmap

- [ ] Booking confirmation emails (Supabase Edge Function + Resend)
- [ ] Reviews fetch from Google Places API
- [ ] Blog CMS (Sanity/Contentlayer)
- [ ] Multi-language (English + Hindi)
- [ ] Google Analytics / GA4
- [ ] Accessibility audit + Lighthouse 90+
