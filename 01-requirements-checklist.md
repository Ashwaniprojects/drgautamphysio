# Client Requirements Checklist: Dr. Gautam's Physio

Go through this with Dr. Gautam (and Sunita Mam where noted) before content and build are finalized. Grouped so it can be done in one sitting or split across calls.

## A. Doctor & credibility content
- [x] Full name, degree(s)/qualifications, years in practice: confirmed from his CV (2026-10-07), 18+ years, clinical since Sep 2008. See `web/src/lib/data/doctor.ts`
- [ ] Year the clinic/practice (Dr. Gautam's Physio & Rehab Centre) was founded. The CV says "Founder/Director" but gives no year
- [x] Professional bio: drafted from the CV's own summary (About page). A narrative version in his own words is still welcome but no longer blocking
- [~] Headshot: one portrait received (`WhatsApp Image 2026-10-04 at 1.35.44 PM`, 1600px, looks upscaled/soft). Used on the site; a proper high-res shot is still better. Please confirm it's the photo he wants public
- [x] Awards, certifications, memberships: all in the CV, plus the IAP Significant Contribution Award 2026 (letter, certificate and ceremony photo received; not on the CV yet)
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

## I. Reference files review (2026-10-07): confirm these before launch
Reviewed the full `reference files/` folder (CV, 4 clinic/ceremony photos, 4 WhatsApp images, 4 `file_0000...png` images). These need a quick confirmation with Dr. Gautam; the site currently uses the safer option in each case.
- [ ] **Phone number typo?** CV prints `+91-9415306444`; his brochure and Subhash Marg's Google listing print `9415206444`. Site uses `9415206444`. Confirm which is right
- [ ] **Which email is public?** CV prints `dr.gautam444@gmail.com`; brochure prints `gautamsphysio@gmail.com`. Site uses the clinic one. The CV's second mobile (`8795971355`) is intentionally not published
- [ ] **Credential spellings.** FNMT is "Neuro *Myo*skeletal Techniques" on the CV (an earlier transcription said "Musculoskeletal"); FDM is "European" on the CV vs "Germany" on the brochure. Site follows the CV. K-CAT and COMT are on the brochure but not the CV, so they stay unexpanded. Is that his preferred wording?
- [ ] **Second doctor?** The clinic signboard visible in the Google Business photo appears to list a second clinician (Dr. Sunita Gautam, women's health). If she treats patients, the Women's Health and Pelvic Floor pages should say so. Not confirmed from this folder
- [ ] **Photos to retake.** No real photos of him treating a patient were in the folder. The four `file_0000...png` images appear AI-generated (one shows an awards plaque reading "DR. SURENDRA KUMAR GUPTA", other frames are illegible) and are not used. A short phone shoot at Subhash Marg (treating a patient with consent, reception, exterior) would replace the hero's portrait
- [x] **Consent for photos of other people:** Dr. Gautam has said everything in the reference folder is authorized, including by the people pictured (stated to us 2026-10-07). Worth keeping that in writing (a WhatsApp message from him is enough) before launch
- [x] **Now used, with event-only captions that name no one:** `DSC_1968` (IAP Uttar Pradesh programme, About), `DSC_5976` (Physio Guide 3 conference, About), the Significant Contribution Award certificate (`WhatsApp ... 11.37.20 AM`, About)
- [ ] **Still not used, and why:** the four `file_0000...png` images (see "Photos to retake" above: they look AI-generated, and one shows his name misspelled "GUPTA", so consent does not fix them; if they are real photographs, tell us); the dignitary close-up PNG; `IMG-20260927-WA0019` (unlabelled group shot, nothing to caption); `IMG-20260930-WA0031` (a second shot of the award ceremony, lower quality than the one in use); the "Vision Change" photo (unrelated to physiotherapy, certificate text is garbled); the IAP award letter (the certificate says the same without a third party's email)
