/**
 * Sourced from Dr. Gautam's credential/brochure documents (verified 2026-09-24).
 * Display exactly as given rather than expanding abbreviations that weren't
 * spelled out in the source (ISTM, K-CAT, MIAP, COMT, MMTFI, IAP). Where the
 * source itself gives the full name (FDM, FNMT, FNT, CST), use that form.
 */
export const doctor = {
  name: "Dr. S.K. Gautam",
  suffix: "(P.T.)",
  positioning: ["Physiotherapy", "Chiropractic", "Osteopathy", "Manual Therapy"],
  registration: "IAP No. L-46626",
  qualifications: [
    "PhD Scholar",
    "M.P.T. Neuro",
    "Fellowship in Osteopathy (FOMT), Australia",
    "Fellowship in Neuro Musculoskeletal Technique (FNMT), Dehradun",
    "Fascial Distortion Model (FDM), Germany",
    "Certified in Manual Therapy (CMT), Mangalore",
    "CST",
    "FNT",
    "Visceral Manipulation",
    "K-CAT",
    "M. Dip. in Cupping Therapy",
    "Dry Needling",
    "MIAP",
    "COMT",
    "MMTFI",
  ],
  /** A shorter set for compact display (hero proof line, credential grid highlights). */
  headlineCredentials: [
    { label: "PhD Scholar" },
    { label: "M.P.T. Neuro" },
    { label: "Fellowship in Osteopathy", detail: "Australia" },
    { label: "Fellowship in Neuro Musculoskeletal Technique", detail: "Dehradun" },
    { label: "Fascial Distortion Model", detail: "Germany" },
    { label: "Certified Manual Therapy", detail: "Mangalore" },
  ],
};

export type TreatmentArea = {
  name: string;
  desc: string;
};

/** Clinical treatment areas as grouped on the doctor's own credential documents. */
export const treatmentAreas: TreatmentArea[] = [
  { name: "Neurological", desc: "Neurological rehabilitation" },
  { name: "Orthopedic", desc: "Orthopedic rehabilitation" },
  { name: "Musculoskeletal", desc: "Muscle, joint and movement-related conditions" },
  { name: "Spine", desc: "Back, neck and spine disorders" },
  { name: "Rehabilitation", desc: "Pre and post-fracture rehabilitation" },
  { name: "Specialized Care", desc: "Women's health, pelvic floor, pediatrics, geriatrics" },
];
