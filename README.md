# Dr. Gautam's Physio — Website & Growth System — Project Spec

**Client:** Dr. Surendra Gautam (Dr. S.K. Gautam) — Dr. Gautam's Physio & Rehab Centre, Lucknow
**Prepared by:** Clicknify · Contact: 9044854093 · contact@clicknify.com
**Based on:** Proposal dated 18 September 2026

## Investment & phasing

| Scope | Price |
|---|---|
| One-time: website redesign, blog dashboard, booking integration, Call Reception/WhatsApp integration, automation setup, training | ₹15,000 |
| Recurring: appointment booking system | ₹500/month |

Domain, hosting, WhatsApp API charges, email service, SMS, and payment gateway fees are **not included** in the above — see `01-requirements-checklist.md` §F for the sign-off needed.

Recommended build order:

1. **Phase 1 — Site foundation.** Redesigned site (symptom-first nav, real review proof, honest 3-location structure) + the booking widget.
2. **Phase 2 — Retention & training.** WhatsApp/email recall automation (n8n) + content/Canva/Reels training for Sunita Mam.

Phase 2 depends on Phase 1 being live — there's no booking data to automate against and nothing to train on until the site exists.

## Files in this spec

- `01-requirements-checklist.md` — everything to confirm or collect from Dr. Gautam (and Sunita Mam) before content and build are locked
- `02-sitemap-and-content-spec.md` — full site architecture, homepage layout, and what every page needs
- `03-design-system.md` — colour, typography, UI, motion, and accessibility rules
- `04-booking-and-automation-spec.md` — functional spec for the booking widget and the n8n retention workflows

## Current status

Architecture and design direction are set. Build is blocked on the open items in `01-requirements-checklist.md` — mainly real content (photos, bio, testimonial consent) and access (domain, hosting, WhatsApp number, patient list format).
