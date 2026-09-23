# Dr. Gautam's Physio & Rehab Centre — Website

Next.js 16 + TypeScript + Tailwind v4. Design tokens match
[`../03-design-system.md`](../03-design-system.md); site structure follows
[`../02-sitemap-and-content-spec.md`](../02-sitemap-and-content-spec.md).

## Live

- **Production:** https://web-ten-omega-8rx65w7riq.vercel.app (custom domain
  pending — `01-requirements-checklist.md` §E)
- **Repo:** https://github.com/clicknify-commits/dr-gautam-physio (private)
- **Vercel project:** https://vercel.com/clicknify/web

Pushes to `master` auto-deploy to production via the GitHub → Vercel
integration (project root directory is set to `web/`, since the repo root
also holds the client's planning docs).

## Local development

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Booking backend

The `/book` flow calls a Server Action (`src/app/book/actions.ts`) that
writes to Supabase. Until a Supabase project exists, it fails with a clear
in-UI message instead of a fake success state. To connect it:

1. Create a project at [supabase.com](https://supabase.com).
2. Run `supabase/schema.sql` in its SQL editor.
3. Copy `.env.example` to `.env.local` and fill in the values from
   Project Settings → API.
4. Add the same variables in the Vercel project's **Environment Variables**
   settings (`.env.local` is git-ignored and never reaches Vercel on its
   own).

## What's built vs. pending

See the root [`README.md`](../README.md) and
[`01-requirements-checklist.md`](../01-requirements-checklist.md) for the
full status — in short: homepage, one condition-page template (Back Pain &
Slip Disc), and the booking flow are built. About, the remaining condition
pages, Blog, Patient Stories, Contact, and the reception/admin views are not.
