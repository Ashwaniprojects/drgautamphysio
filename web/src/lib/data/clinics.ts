export type Clinic = {
  slug: string;
  name: string;
  tag: "Own clinic" | "Consults here";
  area: string;
  address: string;
  phoneDisplay: string;
  phoneHref: string;
  rating: number;
  reviewCount: number;
  blurb: string;
  photoPlaceholder: string;
  /** Short, for compact UI (booking wizard, homepage cards). */
  hours: string;
  /** Longer version with source caveats, shown on the dedicated Clinics/Contact pages. */
  hoursNote?: string;
};

/**
 * Addresses, phone numbers and Google review counts confirmed from each
 * clinic's own Google Business Profile listing (verified 2026-09-24).
 *
 * Hours: Subhash Marg's weekly schedule comes from its JustDial listing
 * (phone-matched to the same number as its Google listing). Its Google
 * listing showed "closes 8pm" at the moment it was viewed, an hour earlier
 * than JustDial's 9pm, a real discrepancy, not resolved here, worth
 * confirming with the client directly rather than guessing which is right
 * (see hoursNote). Neera and Medox only have a momentary "closes 9pm" from
 * Google, not a full weekly schedule, and Dr. Gautam only consults there on
 * select days, so their hours stay unconfirmed rather than copying Subhash
 * Marg's.
 */
export const clinics: Clinic[] = [
  {
    slug: "subhash-marg",
    name: "Subhash Marg",
    tag: "Own clinic",
    area: "Yahiyaganj",
    address: "98-89, Subhash Marg, Jawahar Nagar, Yahiyaganj, Lucknow, Uttar Pradesh 226003",
    phoneDisplay: "+91 94152 06444",
    phoneHref: "tel:+919415206444",
    rating: 4.9,
    reviewCount: 190,
    blurb:
      "The main clinic. Full assessment rooms, manual therapy space, and where most treatment programs run start to finish.",
    photoPlaceholder: "Subhash Marg exterior & reception",
    hours: "Mon-Sat 9 AM to 9 PM · Sun 9 AM to 2 PM",
    hoursNote:
      "Sourced from JustDial. Google's own listing showed an 8 PM close at the moment it was checked, an hour earlier than JustDial's 9 PM. Worth confirming directly rather than trusting either blindly.",
  },
  {
    slug: "neera-hospital",
    name: "Neera Hospital",
    tag: "Consults here",
    area: "Mahanagar / Aliganj",
    address: "Neera Hospital, B-2, Maha Nagar, Crossing B2, near New Hanuman Mandir, Aliganj, Lucknow, Uttar Pradesh 226021",
    phoneDisplay: "+91 87872 82889",
    phoneHref: "tel:+918787282889",
    rating: 4.9,
    reviewCount: 466,
    blurb: "Dr. Gautam also consults here on select days. Good if this side of Lucknow is closer for you.",
    photoPlaceholder: "Neera Hospital exterior/signage, Mahanagar/Aliganj",
    hours: "Call to confirm consulting days",
    hoursNote:
      "Google shows the hospital open until 9 PM, but that's the hospital's own hours, not specifically when Dr. Gautam consults there. Pending, requirements checklist §B.",
  },
  {
    slug: "medox-hospital",
    name: "Medox Hospital",
    tag: "Consults here",
    area: "Jankipuram",
    address: "Medox Hospital, CP-2, Tedhi Pulia Ring Road, near Bhavna Complex, Sector F, Jankipuram, Lucknow, Uttar Pradesh 226021",
    phoneDisplay: "+91 87872 82889",
    phoneHref: "tel:+918787282889",
    rating: 5.0,
    reviewCount: 73,
    blurb: "Dr. Gautam also consults here on select days. Good if Jankipuram is closer for you.",
    photoPlaceholder: "Medox Hospital exterior/signage, Jankipuram",
    hours: "Call to confirm consulting days",
    hoursNote:
      "Google shows the hospital open until 9 PM, but that's the hospital's own hours, not specifically when Dr. Gautam consults there. Pending, requirements checklist §B.",
  },
];
