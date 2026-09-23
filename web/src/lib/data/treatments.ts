export type Treatment = {
  name: string;
  description: string;
};

export const treatments: Treatment[] = [
  { name: "Physiotherapy", description: "Movement-based rehab for pain, mobility and strength." },
  { name: "Chiropractic", description: "Spinal and joint adjustment for alignment-related pain." },
  { name: "Osteopathy", description: "Whole-body manual technique treating cause, not just site." },
  { name: "Manual Therapy", description: "Hands-on soft tissue and joint mobilisation." },
  { name: "Dry Needling", description: "Targeted needling to release trigger-point muscle pain." },
  { name: "Cupping Therapy", description: "Suction therapy to ease muscle tension and stiffness." },
  { name: "Cranio-Sacral Therapy", description: "Gentle technique for headaches, tension and nerve stress." },
  { name: "Visceral Manipulation", description: "Manual work addressing organ-related restriction and pain." },
];
