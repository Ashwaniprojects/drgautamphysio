export type Treatment = {
  name: string;
  description: string;
};

/**
 * The 11 advanced techniques listed on Dr. Gautam's own credential documents
 * (verified 2026-09-24), used according to assessment, not applied uniformly.
 */
export const treatments: Treatment[] = [
  { name: "Chiropractic", description: "Spinal and joint adjustment for alignment-related pain." },
  { name: "Osteopathy", description: "Whole-body manual technique treating cause, not just site." },
  { name: "Fascial Distortion Model (FDM)", description: "A structured technique targeting specific fascial distortions." },
  { name: "Manual Therapy", description: "Hands-on soft tissue and joint mobilisation." },
  { name: "Cupping Therapy", description: "Suction therapy to ease muscle tension and stiffness." },
  { name: "Dry Needling", description: "Targeted needling to release trigger-point muscle pain." },
  { name: "ISTM", description: "Instrument-assisted soft tissue technique." },
  { name: "Tapping", description: "Therapeutic taping to support movement and reduce strain." },
  { name: "Functional Neuroceptive Techniques (FNT)", description: "Technique addressing nervous system contributions to pain and movement." },
  { name: "Visceral Manipulation", description: "Manual work addressing organ-related restriction and pain." },
  { name: "Craniosacral Technique (CST)", description: "Gentle technique for headaches, tension and nerve stress." },
];
