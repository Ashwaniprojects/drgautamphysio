export type IconKey =
  | "spine"
  | "bolt"
  | "neck"
  | "sports"
  | "surgery"
  | "joint"
  | "heart";

export type ConditionFaq = { q: string; a: string };
export type ConditionStep = { title: string; desc: string };

export type Condition = {
  slug: string;
  title: string;
  icon: IconKey;
  /** Pages with full, bespoke content (no boilerplate) get a route. Others are shown on the
   * homepage as a symptom tile but aren't linked yet — see 02-sitemap-and-content-spec.md's
   * warning against copy-pasted condition pages. */
  published: boolean;
  heroSubhead?: string;
  whoHelpsIntro?: string;
  whoHelpsBullets?: string[];
  sessionSteps?: ConditionStep[];
  recovery?: {
    sessions: string;
    firstChange: string;
    frequency: string;
  };
  faqs?: ConditionFaq[];
};

export const conditions: Condition[] = [
  {
    slug: "back-pain-slip-disc",
    title: "Back Pain & Slip Disc",
    icon: "spine",
    published: true,
    heroSubhead:
      "If bending, sitting or standing too long brings the ache back, the plan needs to change — not just the painkillers. Hands-on assessment and treatment from Dr. S.K. Gautam.",
    whoHelpsIntro:
      "This page is for anyone whose back pain doesn't fully go with rest alone — including a confirmed slip disc (bulging or herniated disc), pain that's flared after lifting or a long drive, or discomfort that's built up from sitting at a desk all day.",
    whoHelpsBullets: [
      "Pain that's worse sitting, bending, or first thing in the morning",
      "A scan report mentioning a bulging, slipped or herniated disc",
      "Pain that spreads into the hip, thigh or leg",
      "You've tried rest and medication, and it keeps coming back",
      "You want an actual plan, not just a prescription refill",
    ],
    sessionSteps: [
      { title: "Movement & posture assessment", desc: "Hands-on check of how you actually move, sit and lift — not just where it hurts." },
      { title: "Manual therapy for acute pain", desc: "Hands-on technique to bring the immediate pain down first." },
      { title: "Guided corrective exercise", desc: "Specific movements to rebuild support around the spine." },
      { title: "Home program to stop the relapse", desc: "What to do — and avoid — between visits so it doesn't come straight back." },
    ],
    recovery: {
      sessions: "[X–X] sessions",
      firstChange: "Visit [X]",
      frequency: "1–2 / week",
    },
    faqs: [
      {
        q: "Is manual therapy safe with a confirmed slip disc?",
        a: "In most cases, yes — technique is chosen based on your specific scan and symptoms at assessment. Dr. Gautam will tell you directly if something isn't appropriate for your case rather than applying a standard protocol.",
      },
      {
        q: "Do I need a referral or MRI before booking?",
        a: "No — you can book an assessment directly. If you already have a scan report, bring it along; if not, Dr. Gautam will examine you and advise if imaging is needed.",
      },
      {
        q: "Will I need surgery?",
        a: "Most back pain and slip disc cases respond to hands-on treatment and a corrective exercise program without surgery. Dr. Gautam will tell you plainly if your case looks like an exception.",
      },
      {
        q: "How soon can I get an appointment?",
        a: "Same-day or next-day in most cases — call, WhatsApp, or use the booking page to see the next open slot at your preferred clinic.",
      },
    ],
  },
  { slug: "sciatica-nerve-pain", title: "Sciatica & Nerve Pain", icon: "bolt", published: false },
  { slug: "neck-shoulder-pain", title: "Neck & Shoulder Pain", icon: "neck", published: false },
  { slug: "sports-injury-recovery", title: "Sports Injury Recovery", icon: "sports", published: false },
  { slug: "post-surgery-rehab", title: "Post-Surgery Rehab", icon: "surgery", published: false },
  { slug: "joint-arthritis-pain", title: "Joint & Arthritis Pain", icon: "joint", published: false },
  { slug: "womens-pediatric-health", title: "Women's Health & Pediatric", icon: "heart", published: false },
];

export function getCondition(slug: string): Condition | undefined {
  return conditions.find((c) => c.slug === slug && c.published);
}
