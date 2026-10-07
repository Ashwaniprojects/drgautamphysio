# Dr. Gautam's Physio & Rehab Centre, Website

Next.js 16 + TypeScript + Tailwind v4. Design tokens match
[`../03-design-system.md`](../03-design-system.md); site structure follows
[`../02-sitemap-and-content-spec.md`](../02-sitemap-and-content-spec.md).

## Live

- **Production:** https://web-ten-omega-8rx65w7riq.vercel.app (custom domain
  pending, `01-requirements-checklist.md` §E)
- **Repo:** https://github.com/clicknify-commits/dr-gautam-physio (private)
- **Vercel project:** https://vercel.com/clicknify/web

Pushes to `master` auto-deploy to production via the GitHub to Vercel
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
   Project Settings, API.
4. Add the same variables in the Vercel project's **Environment Variables**
   settings (`.env.local` is git-ignored and never reaches Vercel on its
   own).

## Real client data

Dr. Gautam's qualifications, career, awards and registration come from his
CV (the primary source, reviewed 2026-10-07) and live in
`src/lib/data/doctor.ts`. His real phone (`+91 94152 06444`) and the clinic
email (`gautamsphysio@gmail.com`) come from his brochure and live in
`src/lib/site-config.ts`. Where the CV and brochure disagree (phone digit,
email, FNMT/FDM wording, K-CAT/COMT) the site uses the conservative value and
the conflict is logged in `01-requirements-checklist.md` §I.

Two photos from `reference files/` are used: the hero/About portrait
(`public/images/dr-gautam-portrait.jpg`) and the IAP Excellence Award 2026
ceremony photo (`public/images/iap-excellence-award-2026.jpg`). The raw
folder is gitignored because it holds personal numbers, third-party photos
and the CV itself. The WhatsApp Business
number is still the one exception, checklist §E specifically needs a number
not already active on personal WhatsApp, and that hasn't been confirmed for
the helpline number, so `siteConfig.whatsappHref` stays a placeholder.

The homepage leads with Dr. Gautam's credentials (Doctor Authority section)
before conditions and clinics, per the doctor-first hierarchy: expertise,
then patient problem, then treatment approach, then proof, then locations.

Each clinic's real address, its own phone number, and its own Google
review count/rating (confirmed from its individual Google Business Profile,
2026-09-24) live in `src/lib/data/clinics.ts`. Hours are a genuine open
question, not just an unfilled placeholder: Subhash Marg's JustDial-sourced
weekly schedule disagrees with its own Google listing by an hour, and Neera
/ Medox only expose the *hospital's* hours, not which days Dr. Gautam
specifically consults there. See the `hoursNote` field and
`01-requirements-checklist.md` §B.

## What's built vs. pending

Built: homepage (doctor-first hierarchy), all 9 condition pages (7 original
plus Migraine and Pelvic Floor Rehab, added once the real clinical scope
became clear), Book Appointment (wired to Supabase), Treatments (the 11
verified techniques), About (full credential grid), Our Clinics, Patient
Stories, Blog index, and Contact (the form opens a pre-filled email via
`mailto:` since a real address now exists; still not a backend-sent form).

Not yet built: individual blog articles (the existing sciatica article
needs migrating from the current site, source content not yet in this
repo), and the reception/admin views (staff schedule, patient records) that
were designed on the canvas but never translated into code. See the root
[`README.md`](../README.md) and [`01-requirements-checklist.md`](../01-requirements-checklist.md)
for what's still pending from the client's side.
