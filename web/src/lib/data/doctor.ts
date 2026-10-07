/**
 * Primary source: Dr. Gautam's own CV ("Dr.gautam c.v new.pdf", received 2026-10-07),
 * cross-checked against his clinic brochure and the IAP award letter/certificate.
 * The CV is preferred wherever it spells a credential out in full.
 *
 * Open discrepancies between sources, resolved conservatively (see the
 * "Reference files" section of 01-requirements-checklist.md):
 * - Phone: the CV's clinic number differs by one digit from the brochure and
 *   Subhash Marg's Google listing. The site uses the latter (two independent
 *   public sources, and it's the number patients actually call) until confirmed.
 * - Email: the CV and brochure print different addresses. The site uses the
 *   clinic address. The CV also lists a second personal mobile that is
 *   deliberately not published.
 * - FNMT: the CV says "Neuro Myoskeletal Techniques"; an earlier transcription of
 *   the brochure said "Neuro Musculoskeletal". The CV spelling is used.
 * - FDM: CV says "European", brochure says "Germany". The CV wording is used.
 * - K-CAT and COMT appear on the brochure but not the CV, so they stay
 *   unexpanded and are shown only as "also listed on clinic material".
 */

export type Award = { title: string; event: string; year: string };

export const doctor = {
  name: "Dr. S.K. Gautam",
  fullName: "Dr. Surendra Kumar Gautam",
  suffix: "(P.T.)",
  title: "Chief Consultant Physiotherapist",
  positioning: ["Physiotherapy", "Chiropractic", "Osteopathy", "Manual Therapy"],
  yearsExperience: "18+",
  clinicalSince: 2008,
  positions: [
    "Founder and Director, Dr. Gautam's Physio & Rehab Centre, Lucknow",
    "State Treasurer, Uttar Pradesh, Indian Association of Physiotherapists (IAP)",
  ],
  /** Short form used in compact spots (footer, hero proof line). */
  registration: "Life Member, IAP (L-46626)",
  academics: [
    "Bachelor of Physiotherapy (BPT)",
    "Master of Physiotherapy (Neurology)",
    "Ph.D. Scholar in Physiotherapy, Noida International University",
  ],
  fellowshipsAndCertifications: [
    "Fellowship in Osteopathy & Manipulative Therapy (FOMT), Australia",
    "Certified in Functional Neuroceptive Technique (FNT), Switzerland",
    "Certified in Fascial Distortion Model (FDM), European",
    "Fellowship in Neuro Myoskeletal Techniques (FNMT), Dehradun",
    "Certified in Craniosacral Therapy (CST)",
    "Certified in Dry Needling",
    "Diploma in Cupping Therapy",
    "Certified in Manual Therapy (CMT), Mangalore",
  ],
  /** Listed on his clinic material but not on his CV, so left unexpanded. */
  alsoListedOnClinicMaterial: ["K-CAT", "COMT"],
  affiliations: [
    "Registered with Uttar Pradesh State Medical Faculty (Reg. No. 2305/18/03/2010)",
    "Life Member, Indian Association of Physiotherapists (L-46626)",
    "Life Member, Manual Therapy Foundation of India (MTFI-L-16-151)",
    "Life Member, Lucknow Physiotherapy Association",
  ],
  career: [
    {
      place: "Neera Hospital, Mahanagar, Lucknow",
      period: "Sep 2009 to present",
      points: [
        "Physiotherapy in ICCU, ICU and general wards",
        "Outpatient (OPD) cases, with a focus on prevention and rehabilitation",
        "Internship training for final-year BPT and DPT students",
      ],
    },
    {
      place: "Medox Hospital, Jankipuram, Lucknow",
      period: "Jan 2019 to present",
      points: ["Physiotherapy for inpatients and outpatients, ICU and general ward"],
    },
    {
      place: "Elite Hospital, Lucknow",
      period: "Dec 2020 to 2022",
      points: ["Physiotherapy for ICU and general ward patients"],
    },
    {
      place: "Ford Hospital, Gomti Nagar, Lucknow",
      period: "Sep 2008 to Aug 2009",
      points: ["Clinical caseload of inpatients and outpatients"],
    },
  ],
  /** Dated, event-specific, and all from his CV except the first (see award letter + certificate). */
  awards: [
    { title: "Significant Contribution Award, IAP Excellence Awards", event: "World Physiotherapy Asia Western Pacific Regional Conference, New Delhi", year: "2026" },
    { title: "Distinguished Clinical Service Award", event: "Physioconnect 6 International Conference, Gurugram", year: "2026" },
    { title: "Physio Ratan Award", event: "Physio Guide 3 National Conference, Aligarh", year: "2025" },
    { title: "Dhanvantri Award, Clinician Senior", event: "Physioconnect 5 International Conference, Greater Noida", year: "2025" },
    { title: "Outstanding Clinical Award", event: "Kanpur PHYSIOCON", year: "2023" },
    { title: "Best Clinical Award", event: "Physio Guide 2 National Conference, Aligarh", year: "2022" },
    { title: "Best Contribution in Society", event: "Prem Narayan Memorial Charitable Trust", year: "2020" },
    { title: "Best Physio Award", event: "Ayodhya Physio Symposium", year: "2019" },
    { title: "Excellent Contribution in Physiotherapy", event: "Bareilly", year: "2019" },
    { title: "Outstanding Clinical Award", event: "National Physiotherapy Conference, Mathura", year: "2019" },
    { title: "Significant Contribution Award", event: "1st National Osteo Conference, Kanpur", year: "2019" },
    { title: "Star Physio Award", event: "World Physiotherapy Day, Lucknow Physiotherapy Association", year: "2019" },
  ] as Award[],
  academicContributions: [
    "Invited lecture, \"Role of Fascial Distortion Model in Knee Joint Disorders\", 3rd State Conference, MS Hospital & Research Centre, Lucknow",
    "Session Chairperson, Physioconnect 5 International Conference, Greater Noida",
    "Chairperson, Physio Guide 3 National Conference, Aligarh (2025)",
    "Judge, 3rd National Conference of IPA Women Cell & Physio Manthan, New Delhi (2025)",
    "Organized a CME on professional acceptance and ethics under NCAHP, IAP Lucknow District Branch",
    "Organized a hands-on Spine Alignment workshop with the Department of Plastic and Reconstructive Surgery, King George's Medical University (KGMU), Lucknow",
  ],
  /** Six cards for the homepage credential grid. */
  headlineCredentials: [
    { label: "Ph.D. Scholar", detail: "Noida International University" },
    { label: "Master of Physiotherapy (Neurology)" },
    { label: "Fellowship in Osteopathy (FOMT)", detail: "Australia" },
    { label: "Functional Neuroceptive Technique (FNT)", detail: "Switzerland" },
    { label: "Fascial Distortion Model (FDM)", detail: "European certification" },
    { label: "Neuro Myoskeletal Techniques (FNMT)", detail: "Dehradun" },
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
