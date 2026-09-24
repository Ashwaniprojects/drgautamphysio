# Design System

## Colour

Updated 2026-09-24 to match a client-supplied reference palette (a mint/teal
medical-site moodboard). Most local competitors default to clinical
blue-and-white; this stays in the teal family but moves brighter and more
monochrome — a single saturated teal carries both brand identity and CTA
weight, on a clean white ground, rather than pairing teal with a second
accent hue.

| Token | Hex | Use |
|---|---|---|
| `--color-primary` (MindCare Teal) | `#1CA898` | Headers, nav, primary brand colour, **and CTA buttons** |
| `--color-primary-dark` | `#14786D` | Footer background, dark-on-teal surfaces |
| `--color-primary-hover` | `#189284` | Hover state for solid teal buttons |
| `--color-ink` | `#101E1C` | Headings, strong text (near-black, cool) |
| `--color-muted` | `#565750` | Body copy, secondary text |
| `--color-paper` | `#FFFFFF` | Page background |
| `--color-tint` | `#BEE6DC` | Pale-mint card backgrounds, section dividers |

`--color-accent` still exists as a token (for anything still wired to it) but
is set equal to `--color-primary` — **there is no second accent hue in this
palette.** That's a deliberate change from the earlier two-colour-plus-accent
system: the reference has no orange/coral anywhere, so "Book Appointment",
"Confirm booking", stat highlights, and icon badges all use the same solid
teal, differentiated from chrome by weight (solid fill vs. outline vs. pale
tint) rather than by hue.

Rules:
- One brand colour, three tones of it (solid / pale tint / near-black), on
  white. No third hue introduced through service icons, tags, or badges —
  including the temptation to reach for orange/red for "attention" states,
  which now needs a different solution (see below).
- Exception: functional error/warning states (e.g. a failed form
  submission) use a standard semantic red (Tailwind's `red-600`/`red-50`),
  not the brand palette — a teal-on-teal message would read as neutral
  info, not a warning. This is a UI-state color, not a brand color, and
  should stay rare.
- Contrast holds at WCAG AA minimum throughout — a meaningful share of this
  audience is older or reading under discomfort; low-contrast pastels cost
  usability here, not just aesthetics.

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
