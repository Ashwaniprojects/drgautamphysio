# Client Requirements Checklist: Dr. Gautam's Physio

Go through this with Dr. Gautam (and Sunita Mam where noted) before content and build are finalized. Grouped so it can be done in one sitting or split across calls.

## A. Doctor & credibility content
- [x] Full name, degree(s)/qualifications: confirmed from his credential documents (2026-09-24), see `web/src/lib/data/doctor.ts`. Years in practice still needed
- [ ] Year the clinic/practice was founded (for a "since [year]" claim)
- [ ] Professional bio (2–3 paragraphs), or permission to draft one from a call
- [ ] High-res headshot photo
- [ ] Any awards, certifications, or professional body memberships worth naming
- [ ] Short intro video, if he'll record one (even on a phone); a meaningful trust lift for the About page

## B. Locations, hours & the booking calendar
- [x] Addresses for all 3 locations: confirmed from each clinic's own Google Business Profile (2026-09-24), see `web/src/lib/data/clinics.ts`
- [ ] Exact days/hours he's physically present at each of the 3 locations. Subhash Marg has a JustDial-sourced weekly schedule (Mon-Sat 9 AM-9 PM, Sun 9 AM-2 PM) that disagrees with Google's own listing by an hour; confirm which is right. Neera and Medox only show the *hospital's* hours, not which days Dr. Gautam specifically consults there
- [ ] Typical session length per location (this sizes the slots in the booking widget)
- [ ] Real photos: Subhash Marg exterior, interior, reception. It's his own branded space, worth doing properly
- [ ] For Medox Hospital and Neera Hospital: can we photograph anything, or exterior/signage/map imagery only?
- [ ] Confirm these are the only 3 active locations

## C. Services & positioning
- [ ] Confirm the full, current service list (physiotherapy, chiropractic, osteopathy, manual therapy, orthopedic, neurological, cranio-sacral, visceral manipulation, dry needling, cupping, home visit). Anything to add or drop?
- [ ] Is women's health physiotherapy a real, active service? If yes, what specifically?
- [ ] Is pediatric physiotherapy offered?
- [ ] Any condition he specifically wants to be known for, or gets the most patients for?
- [ ] Typical number of sessions / recovery window for the 4–5 most common conditions (for honest, non-clinical-claim copy on each service page)
- [ ] Does he want per-session/package pricing shown on the site, or "call for pricing"?

## D. Reviews & testimonials
- [x] Google review counts: confirmed per-clinic from each Google Business Profile (2026-09-24): Subhash Marg 4.9★ (190), Neera Hospital 4.9★ (466), Medox Hospital 5.0★ (73), 729 total. JustDial separately shows 5.0★ from 460 ratings. Both now live on the site, see `web/src/lib/site-config.ts`
- [ ] Permission to pull and display real reviews from Google/JustDial by name on the site
- [ ] 3–5 patients willing to be named and photographed for a testimonial feature; get a signed one-line consent per patient
- [ ] Any recovery/case-study stories he can share in his own words (specific, not generic)

## E. Access: build is blocked without these
- [ ] Domain registrar login for drgautamphysio.com (or willingness to update DNS). Confirmed live and linked from all 3 Google Business listings (2026-09-24), so it's actively in use; still need registrar access to point it at the new build
- [ ] Current hosting provider and login, or confirmation a new host is needed
- [ ] Google Business Profile: claimed? Admin access or an invite
- [ ] Facebook Page admin access
- [ ] Instagram and YouTube access (YouTube channel already exists: @drgautamphysiotherapy)
- [ ] Any existing patient list (register, Excel, other software); format matters for setting up recall automation
- [ ] A WhatsApp number dedicated to WhatsApp Business API (can't be a number already active on personal WhatsApp)
- [ ] A sending email address for automation that he controls

## F. Budget sign-off (pass-through costs, not in the ₹15,000 / ₹500 pricing)
- [ ] Who pays for domain renewal, hosting, WhatsApp API/conversation charges, email service charges, SMS, and any payment gateway fees
- [ ] Confirm he understands these are billed separately, per the proposal

## G. Sunita Mam / training logistics
- [ ] Her availability for the training sessions
- [ ] Device/software she'll use (does a Canva account need setting up?)
- [ ] Preferred training format: in person, video call, or recorded sessions she can replay

## H. Consent & boundaries
- [ ] Signed/written consent for every patient photo or testimonial used publicly
- [ ] Anything he explicitly does not want mentioned or shown
