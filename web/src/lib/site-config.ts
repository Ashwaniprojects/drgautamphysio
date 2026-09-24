/**
 * clinicPhoneDisplay/Href: the clinic's real published helpline, confirmed from
 * the doctor's credential/brochure documents (2026-09-24).
 *
 * whatsappHref stays pending: checklist §E specifically needs a number NOT
 * already active on personal WhatsApp, and the helpline number's WhatsApp
 * status hasn't been confirmed. Don't wire it to the helpline number without
 * that confirmation.
 */
export const siteConfig = {
  clinicPhoneDisplay: "+91 94152 06444",
  clinicPhoneHref: "tel:+919415206444",
  clinicEmail: "gautamsphysio@gmail.com",
  whatsappHref: "#", // TODO: checklist §E, needs a dedicated WhatsApp Business API number
  reviewSummary: "4.8★ · 391+ reviews", // confirmed on JustDial; needs Google count added per checklist §D
  youtubeHandle: "@drgautamphysiotherapy",
};
