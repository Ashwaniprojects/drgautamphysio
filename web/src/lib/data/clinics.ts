export type Clinic = {
  slug: string;
  name: string;
  tag: "Own clinic" | "Consults here";
  area: string;
  photoPlaceholder: string;
  hours: string;
};

export const clinics: Clinic[] = [
  {
    slug: "subhash-marg",
    name: "Subhash Marg",
    tag: "Own clinic",
    area: "Our own branded space — the full facility.",
    photoPlaceholder: "Subhash Marg exterior & reception",
    hours: "[Days/hours pending — requirements checklist §B]",
  },
  {
    slug: "neera-hospital",
    name: "Neera Hospital",
    tag: "Consults here",
    area: "Mahanagar / Aliganj",
    photoPlaceholder: "Neera Hospital exterior/signage, Mahanagar/Aliganj",
    hours: "[Days/hours pending — requirements checklist §B]",
  },
  {
    slug: "medox-hospital",
    name: "Medox Hospital",
    tag: "Consults here",
    area: "Jankipuram",
    photoPlaceholder: "Medox Hospital exterior/signage, Jankipuram",
    hours: "[Days/hours pending — requirements checklist §B]",
  },
];
