export type Clinic = {
  slug: string;
  name: string;
  tag: "Own clinic" | "Consults here";
  area: string;
  blurb: string;
  photoPlaceholder: string;
  hours: string;
};

export const clinics: Clinic[] = [
  {
    slug: "subhash-marg",
    name: "Subhash Marg",
    tag: "Own clinic",
    area: "Our own branded space, the full facility.",
    blurb:
      "The main clinic. Full assessment rooms, manual therapy space, and where most treatment programs run start to finish.",
    photoPlaceholder: "Subhash Marg exterior & reception",
    hours: "[Days/hours pending, requirements checklist §B]",
  },
  {
    slug: "neera-hospital",
    name: "Neera Hospital",
    tag: "Consults here",
    area: "Mahanagar / Aliganj",
    blurb: "Dr. Gautam also consults here on select days. Good if this side of Lucknow is closer for you.",
    photoPlaceholder: "Neera Hospital exterior/signage, Mahanagar/Aliganj",
    hours: "[Days/hours pending, requirements checklist §B]",
  },
  {
    slug: "medox-hospital",
    name: "Medox Hospital",
    tag: "Consults here",
    area: "Jankipuram",
    blurb: "Dr. Gautam also consults here on select days. Good if Jankipuram is closer for you.",
    photoPlaceholder: "Medox Hospital exterior/signage, Jankipuram",
    hours: "[Days/hours pending, requirements checklist §B]",
  },
];
