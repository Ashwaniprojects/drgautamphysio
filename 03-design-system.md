# Design System

## Colour

Most local competitors default to clinical blue-and-white. Teal sits between blue's calm/trust and green's healing/renewal without the sterile or generic-medical feel — a real point of difference in this specific market.

| Token | Hex | Use |
|---|---|---|
| `--color-primary` (Recovery Teal) | `#0E5E56` | Headers, nav, primary brand colour |
| `--color-ink` (Warm Charcoal) | `#1B1B18` | Body text |
| `--color-paper` (Warm Paper) | `#FAF7F2` | Page background |
| `--color-accent` (Recovery Coral) | `#E8703A` | **CTA buttons only** — Book, WhatsApp |
| `--color-tint` (Pale Teal) | `#E4F0EE` | Card backgrounds, section dividers |

Rules:
- Two colours plus one accent — no third colour introduced through service icons, tags, or badges.
- Coral is reserved for the two primary actions. If it starts showing up elsewhere, the palette is breaking down.
- Contrast holds at WCAG AA minimum throughout — a meaningful share of this audience is older or reading under discomfort; low-contrast pastels cost usability here, not just aesthetics.

## Typography

| Role | Typeface | Notes |
|---|---|---|
| Display | Fraunces | Headlines. Warmth and character over generic sans. Lora is a safe fallback. |
| Body | Inter | Highly legible at small sizes. Set base size a notch larger than a typical marketing site. |

Both are Google Fonts — already available for any Pillow-based graphics work without a new asset pipeline. Stop at two typefaces; it does more of the "premium, intentional" work here than photography or motion will.

## UI patterns

- Symptom-tile grid on the homepage instead of a flat modality nav.
- Sticky mobile bar: Call / WhatsApp / Book — no scroll required to reach it.
- Stateful microcopy on the two actions that matter most:
  - WhatsApp button: "Message us on WhatsApp" → "Opening WhatsApp…"
  - Booking confirm: "Confirm booking" → "Booking…" → "Booked — we'll confirm on WhatsApp."
- Card-based treatment grid, not a dropdown nav.

## Imagery

- Real photos of the actual Subhash Marg clinic and the actual doctor — stock "doctor pointing at an X-ray" imagery is exactly what every competitor site already runs.
- Medox/Neera: exterior, signage, or map imagery — don't claim interior space that isn't independently branded.
- Patient photos only with signed consent (`01-requirements-checklist.md` §D/H).

## Motion

Restrained — hover/tap micro-transitions only (card lift, button state change). No parallax or glitch effects; wrong tone for a calm-recovery brand, and outside what a solo build at this budget should spend time on.

## Accessibility baseline

- WCAG AA contrast minimum
- Generous tap-target sizing (this audience skews older, on mobile)
- No auto-playing video or aggressive motion — the audience is often anxious or in pain
