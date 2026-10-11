/**
 * clinicPhoneDisplay/Href: Subhash Marg's number, used as the site-wide
 * "call us" line (nav, footer, mobile bar). Neera and Medox have their own
 * numbers in clinics.ts. Confirmed from Dr. Gautam's credential documents
 * and cross-checked against Subhash Marg's own Google Business listing
 * (2026-09-24).
 *
 * whatsappHref stays pending: checklist §E specifically needs a number NOT
 * already active on personal WhatsApp, and the helpline number's WhatsApp
 * status hasn't been confirmed. Don't wire it to the helpline number without
 * that confirmation.
 *
 * reviewSummary: sum of the 3 clinics' own verified Google review counts
 * (190 + 466 + 73 = 729), weighted-average rating. JustDial separately
 * shows 5.0★ from 460 ratings on its own listing; not folded in here since
 * it's a different platform's count, not additional Google reviews. See
 * clinics.ts for the per-location source notes.
 */
export const siteConfig = {
  clinicPhoneDisplay: "+91 94152 06444",
  clinicPhoneHref: "tel:+919415206444",
  clinicEmail: "gautamsphysio@gmail.com",
  whatsappHref: "#",
  googleRating: 4.9,
  googleReviewCount: 729,
  justdialRating: 5.0,
  justdialReviewCount: 460,
  youtubeHandle: "@drgautamphysiotherapy",
};
