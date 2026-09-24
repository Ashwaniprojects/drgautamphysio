# Sitemap & Content Spec

Cross-references to `01-requirements-checklist.md` are marked *(needs: §X)*.

## Navigation

Six groups, not the current flat 10-link nav. Patients think in symptoms, not treatment modalities.

```
Home
├── Conditions We Treat
│   ├── Back Pain & Slip Disc
│   ├── Sciatica & Nerve Pain          (migrate existing sciatica page)
│   ├── Neck & Shoulder Pain
│   ├── Sports Injury Recovery
│   ├── Post-Surgery Rehab
│   ├── Joint & Arthritis Pain
│   └── Women's Health / Pediatric      (needs: §C, confirm these are active)
├── How We Treat You
│   ├── Physiotherapy · Chiropractic · Osteopathy · Manual Therapy
│   ├── Dry Needling · Cupping Therapy · Cranio-Sacral · Visceral Manipulation
│   └── Physio Home Visit
├── About
│   ├── Dr. S.K. Gautam: bio, credentials, photo/video   (needs: §A)
│   └── Our Approach
├── Our Clinics
│   ├── Subhash Marg: our own clinic                     (needs: §B photos)
│   ├── Neera Hospital, Mahanagar/Aliganj: also consults here
│   └── Medox Hospital, Jankipuram: also consults here
├── Patient Stories                                        (needs: §D)
├── Blog
├── Book Appointment
└── Contact
```

## Homepage: section by section

1. **Sticky utility bar.** Call · WhatsApp · Choose Your Clinic. Always visible on mobile; never requires a scroll to reach.
2. **Hero.** A specific claim with a real number, not a category description.
   - Draft: *"3 Lucknow clinics. 500+ patient reviews. Real relief, no surgery, no meds."*
   - Two CTAs only: Book Appointment / WhatsApp Us.
   - *(needs: §D, final wording depends on the confirmed aggregate review count before this goes live as a hero claim)*
3. **What brings you here.** 6–7 tappable symptom tiles routing into Conditions pages.
4. **How treatment works.** Dated timeline: Assessment → Diagnosis & Plan → Hands-on Sessions → Home Program & Recall.
5. **Treatments grid.** The 8 modalities as cards, not nav items.
6. **Patient stories.** 3 real, named, photographed reviews. *(needs: §D)*
7. **Our 3 clinics.** Honestly differentiated cards, map pin, days/hours, "Book at this clinic." *(needs: §B)*
8. **From the blog.** 3 latest posts.
9. **Footer.** All 3 addresses, phone, WhatsApp, socials incl. YouTube (@drgautamphysiotherapy).

## Page templates

**Condition/service pages (×7).** Model on the existing sciatica page, not the boilerplate on the other service pages. Each includes:
- Symptom-led H1
- Who this helps
- What a session actually involves
- Realistic recovery window, non-clinical-claim wording *(needs: §C, session/timeline input)*
- FAQ block
- Location + booking CTA

No two pages share a paragraph. The current site's biggest tell (and an SEO liability) is identical boilerplate copy-pasted across the osteopathy, chiropractic, and cranio-sacral pages.

**Our Clinics.** One directory page plus 3 sub-profiles. Subhash Marg gets a full profile (it's the owned clinic); Medox and Neera get an honest "Dr. Gautam also consults here" framing with exterior/signage imagery rather than claimed interior space.

**About/Doctor.** Bio, qualifications, photo, ideally an embedded short video from the existing YouTube channel. *(needs: §A)*

**Patient Stories.** Full aggregated review wall (Google + JustDial + Facebook), filterable by condition if build time allows.

**Book Appointment.** See `04-booking-and-automation-spec.md`.

**Blog.** Category-tagged; migrate the existing sciatica article as the first/model post.

**Contact.** All 3 addresses with maps, hours, WhatsApp; a contact form only as a backup to WhatsApp/call, not the primary path.
