export type IconKey =
  | "spine"
  | "bolt"
  | "neck"
  | "sports"
  | "surgery"
  | "joint"
  | "heart"
  | "migraine"
  | "pelvic";

export type ConditionFaq = { q: string; a: string };
export type ConditionStep = { title: string; desc: string };

export type Condition = {
  slug: string;
  title: string;
  icon: IconKey;
  heroSubhead: string;
  whoHelpsIntro: string;
  whoHelpsBullets: string[];
  sessionSteps: ConditionStep[];
  recovery: {
    sessions: string;
    firstChange: string;
    frequency: string;
  };
  faqs: ConditionFaq[];
};

export const conditions: Condition[] = [
  {
    slug: "back-pain-slip-disc",
    title: "Back Pain & Slip Disc",
    icon: "spine",
    heroSubhead:
      "If bending, sitting or standing too long brings the ache back, the plan needs to change, not just the painkillers. Hands-on assessment and treatment from Dr. S.K. Gautam.",
    whoHelpsIntro:
      "This page is for anyone whose back pain doesn't fully go with rest alone, including a confirmed slip disc (bulging or herniated disc), pain that's flared after lifting or a long drive, or discomfort that's built up from sitting at a desk all day.",
    whoHelpsBullets: [
      "Pain that's worse sitting, bending, or first thing in the morning",
      "A scan report mentioning a bulging, slipped or herniated disc",
      "Pain that spreads into the hip, thigh or leg",
      "You've tried rest and medication, and it keeps coming back",
      "You want an actual plan, not just a prescription refill",
    ],
    sessionSteps: [
      { title: "Movement & posture assessment", desc: "Hands-on check of how you actually move, sit and lift, not just where it hurts." },
      { title: "Manual therapy for acute pain", desc: "Hands-on technique to bring the immediate pain down first." },
      { title: "Guided corrective exercise", desc: "Specific movements to rebuild support around the spine." },
      { title: "Home program to stop the relapse", desc: "What to do, and avoid, between visits so it doesn't come straight back." },
    ],
    recovery: {
      sessions: "[X-X] sessions",
      firstChange: "Visit [X]",
      frequency: "1-2 / week",
    },
    faqs: [
      {
        q: "Is manual therapy safe with a confirmed slip disc?",
        a: "In most cases, yes. Technique is chosen based on your specific scan and symptoms at assessment. Dr. Gautam will tell you directly if something isn't appropriate for your case rather than applying a standard protocol.",
      },
      {
        q: "Do I need a referral or MRI before booking?",
        a: "No. You can book an assessment directly. If you already have a scan report, bring it along; if not, Dr. Gautam will examine you and advise if imaging is needed.",
      },
      {
        q: "Will I need surgery?",
        a: "Most back pain and slip disc cases respond to hands-on treatment and a corrective exercise program without surgery. Dr. Gautam will tell you plainly if your case looks like an exception.",
      },
      {
        q: "How soon can I get an appointment?",
        a: "Same-day or next-day in most cases. Call, WhatsApp, or use the booking page to see the next open slot at your preferred clinic.",
      },
    ],
  },
  {
    slug: "sciatica-nerve-pain",
    title: "Sciatica & Nerve Pain",
    icon: "bolt",
    heroSubhead:
      "A sharp pain running down the leg, numbness, or a burning sensation from the lower back usually points to nerve irritation, not just a muscle strain. Hands-on assessment and treatment from Dr. S.K. Gautam.",
    whoHelpsIntro:
      "This page is for anyone with pain, tingling, numbness or weakness that travels from the lower back into the hip, thigh, calf or foot. Sciatica is a symptom of nerve compression or irritation, most often from a disc problem, and it responds differently to treatment than ordinary back pain.",
    whoHelpsBullets: [
      "Pain, tingling or numbness that runs from the lower back into the leg or foot",
      "Pain that gets worse with sitting, coughing or sneezing",
      "Weakness when lifting the foot or standing on the toes",
      "A course of medication that eased the pain but didn't fix it",
      "You want to know whether this is a disc problem before it gets worse",
    ],
    sessionSteps: [
      { title: "Nerve & movement assessment", desc: "Testing which nerve root is involved and how it's affecting movement and reflexes, not just where the pain radiates." },
      { title: "Targeted manual therapy", desc: "Technique aimed at reducing nerve irritation and disc pressure, chosen for your specific pattern of symptoms." },
      { title: "Nerve gliding & corrective exercise", desc: "Specific movements that help the nerve move freely again and rebuild support around it." },
      { title: "A plan to prevent flare-ups", desc: "What positions and habits tend to trigger it again, and how to manage the early warning signs." },
    ],
    recovery: {
      sessions: "[X-X] sessions",
      firstChange: "Visit [X]",
      frequency: "1-2 / week",
    },
    faqs: [
      {
        q: "Is sciatica the same as a slip disc?",
        a: "Not always. Sciatica describes the nerve pain itself, most commonly caused by a disc pressing on a nerve root, but it can have other causes too. Dr. Gautam identifies the actual source at assessment rather than assuming.",
      },
      {
        q: "Can physiotherapy actually help nerve pain, or only muscle pain?",
        a: "Yes. A large part of treating sciatica is reducing pressure and irritation on the nerve itself through manual therapy and specific exercise, alongside easing the surrounding muscle tension.",
      },
      {
        q: "How long does sciatica usually take to settle?",
        a: "It varies widely by cause and severity. Dr. Gautam gives you a realistic estimate once he has assessed which nerve root is involved and how long you've had symptoms.",
      },
      {
        q: "Should I rest completely until it goes away?",
        a: "Usually not. Complete rest can slow recovery for most sciatica cases. Dr. Gautam will tell you specifically what to avoid and what to keep moving.",
      },
    ],
  },
  {
    slug: "neck-shoulder-pain",
    title: "Neck & Shoulder Pain",
    icon: "neck",
    heroSubhead:
      "Stiffness that won't release, pain that spreads into the shoulder or arm, or headaches that start at the base of the skull are common and treatable. Hands-on assessment and treatment from Dr. S.K. Gautam.",
    whoHelpsIntro:
      "This page is for anyone with ongoing neck or shoulder pain, whether it started suddenly or built up gradually from posture, screen time or an old injury. It covers stiffness, restricted movement, frozen shoulder, and neck-related headaches.",
    whoHelpsBullets: [
      "Stiffness or restricted movement turning the head or reaching overhead",
      "Pain that spreads from the neck into the shoulder, arm or hand",
      "Headaches that start at the back of the head or base of the neck",
      "A shoulder that's gradually gotten harder to move",
      "Pain that's built up from long hours at a desk or on a phone",
    ],
    sessionSteps: [
      { title: "Posture & movement assessment", desc: "Checking neck, shoulder and upper back movement together, since problems in one usually affect the others." },
      { title: "Manual therapy for stiffness & pain", desc: "Hands-on release of the specific joints and muscles that are restricted or irritated." },
      { title: "Guided mobility & strengthening", desc: "Exercises to restore full movement and build the support that keeps pain from returning." },
      { title: "Desk & daily-habit adjustments", desc: "Practical changes to how you sit, sleep and work so the same pattern doesn't rebuild." },
    ],
    recovery: {
      sessions: "[X-X] sessions",
      firstChange: "Visit [X]",
      frequency: "1-2 / week",
    },
    faqs: [
      {
        q: "Is my headache actually coming from my neck?",
        a: "It's common. Headaches that start at the base of the skull and spread forward are frequently linked to neck joint and muscle problems. Dr. Gautam checks for this specifically during assessment.",
      },
      {
        q: "I can't lift my arm properly. Is this frozen shoulder?",
        a: "It might be, or it could be a rotator cuff or joint issue that looks similar. These are treated differently, so an accurate diagnosis at your first visit matters.",
      },
      {
        q: "Will you just crack my neck?",
        a: "No single technique is used for everyone. Dr. Gautam chooses manual therapy based on what your neck and shoulder actually need, and explains what he's doing and why.",
      },
      {
        q: "How soon can I get an appointment?",
        a: "Same-day or next-day in most cases. Call, WhatsApp, or use the booking page to see the next open slot at your preferred clinic.",
      },
    ],
  },
  {
    slug: "sports-injury-recovery",
    title: "Sports Injury Recovery",
    icon: "sports",
    heroSubhead:
      "A sprain, strain or injury that isn't healing on its own needs an accurate diagnosis and a real return-to-play plan, not just rest. Hands-on assessment and treatment from Dr. S.K. Gautam.",
    whoHelpsIntro:
      "This page is for athletes and active people recovering from a sports-related injury, from a twisted ankle to a pulled hamstring to a shoulder injury from throwing or racquet sports. The goal is getting back to the sport safely, not just getting the pain to stop.",
    whoHelpsBullets: [
      "A recent sprain, strain or muscle tear that hasn't fully settled",
      "Pain that comes back every time you return to training",
      "Reduced strength, balance or range of motion since the injury",
      "Swelling or instability that hasn't resolved with rest",
      "You want a structured return-to-play plan, not just \"wait and see\"",
    ],
    sessionSteps: [
      { title: "Injury assessment", desc: "Identifying which structure is injured and how severely, and ruling out anything that needs further imaging." },
      { title: "Hands-on treatment for pain & swelling", desc: "Manual therapy to manage acute symptoms and support the tissue's own healing process." },
      { title: "Progressive strength & control work", desc: "A graded exercise program that rebuilds strength, balance and confidence in the injured area." },
      { title: "Return-to-sport planning", desc: "Specific criteria and drills before you go back to full training or competition, to reduce the chance of re-injury." },
    ],
    recovery: {
      sessions: "[X-X] sessions",
      firstChange: "Visit [X]",
      frequency: "2-3 / week",
    },
    faqs: [
      {
        q: "How soon after an injury should I come in?",
        a: "Sooner is generally better. An early, accurate diagnosis prevents small injuries from becoming chronic ones, and Dr. Gautam can advise on immediate care even before your first full session.",
      },
      {
        q: "Do I need an X-ray or scan first?",
        a: "Not always. Dr. Gautam will examine the injury and advise if imaging is needed based on what he finds, rather than sending everyone for a scan by default.",
      },
      {
        q: "When can I go back to playing?",
        a: "There's no fixed timeline. It depends on the injury and how you respond to treatment. Dr. Gautam sets specific, testable criteria rather than a guess based on the calendar.",
      },
      {
        q: "Do you treat gym injuries too, not just sport?",
        a: "Yes. The same assessment and treatment approach applies to gym and training injuries, including overuse issues that build up gradually rather than happening in one moment.",
      },
    ],
  },
  {
    slug: "post-surgery-rehab",
    title: "Post-Surgery Rehab",
    icon: "surgery",
    heroSubhead:
      "Surgery is only the first part of recovery. What happens in the weeks after, guided properly, determines how much movement and strength you get back. Hands-on rehabilitation from Dr. S.K. Gautam.",
    whoHelpsIntro:
      "This page is for anyone recovering from orthopedic or joint surgery, including knee and hip replacement, ligament reconstruction, and spine surgery. Rehabilitation follows your surgeon's protocol and is coordinated around your specific procedure and timeline.",
    whoHelpsBullets: [
      "Recent joint replacement (knee, hip or shoulder)",
      "ACL, ligament or tendon repair surgery",
      "Spine surgery recovery",
      "Stiffness, weakness or reduced confidence in the operated area",
      "A surgeon's rehabilitation protocol that needs a physiotherapist to carry out",
    ],
    sessionSteps: [
      { title: "Review of your surgical protocol", desc: "Understanding exactly what your surgeon has cleared and any restrictions before starting hands-on work." },
      { title: "Swelling & pain management", desc: "Manual therapy and guided movement to manage post-surgical swelling and discomfort safely." },
      { title: "Progressive movement & strength", desc: "A staged program that rebuilds range of motion and strength in line with normal healing timelines." },
      { title: "Return to daily activity", desc: "Practical work on the movements you need for daily life, walking, stairs, getting up from a chair, before progressing further." },
    ],
    recovery: {
      sessions: "[X-X] sessions",
      firstChange: "Visit [X]",
      frequency: "2-3 / week",
    },
    faqs: [
      {
        q: "Do I need a referral from my surgeon?",
        a: "It helps if you bring your surgeon's discharge notes or protocol, but it's not required to book. Dr. Gautam will coordinate around whatever guidance you've received.",
      },
      {
        q: "How soon after surgery should rehab start?",
        a: "This depends entirely on your procedure and your surgeon's protocol. Some rehabilitation starts within days of surgery, other cases need a longer initial rest period. Bring your surgeon's guidance to your first visit.",
      },
      {
        q: "What if I don't have a specific protocol from my surgeon?",
        a: "Dr. Gautam will work from standard post-surgical guidelines for your procedure and check in with you about what your surgical team has advised.",
      },
      {
        q: "Can rehab happen at home if I can't travel yet?",
        a: "Ask about Physio Home Visits, available across Lucknow for select conditions including early post-surgical stages.",
      },
    ],
  },
  {
    slug: "joint-arthritis-pain",
    title: "Joint & Arthritis Pain",
    icon: "joint",
    heroSubhead:
      "Stiffness that's worse in the morning, joints that ache with weather changes, or pain that's quietly gotten worse over years usually means the joint needs support, not just rest. Hands-on treatment from Dr. S.K. Gautam.",
    whoHelpsIntro:
      "This page is for anyone with ongoing joint pain from osteoarthritis or general wear, most commonly in the knees, hips or hands. The aim is reducing pain and keeping the joint moving well for as long as possible, with surgery kept as a last resort, not the first step.",
    whoHelpsBullets: [
      "Joint stiffness that's worse first thing in the morning",
      "Knee, hip or hand pain that's gradually worsened over months or years",
      "Pain that limits walking, stairs or everyday tasks",
      "A diagnosis of osteoarthritis with no clear plan beyond painkillers",
      "You want to delay or avoid surgery if reasonably possible",
    ],
    sessionSteps: [
      { title: "Joint & movement assessment", desc: "Checking how the joint moves, how much strength supports it, and how it compares to the other side." },
      { title: "Hands-on pain relief", desc: "Manual therapy to ease stiffness and discomfort in and around the affected joint." },
      { title: "Strength & load management", desc: "Building the muscle support around the joint so it carries load better and hurts less." },
      { title: "A long-term management plan", desc: "A realistic home routine and activity guidance, since arthritis is managed over years, not fixed in a few weeks." },
    ],
    recovery: {
      sessions: "[X-X] sessions",
      firstChange: "Visit [X]",
      frequency: "1-2 / week",
    },
    faqs: [
      {
        q: "Can physiotherapy actually help arthritis, or just delay the inevitable?",
        a: "Physiotherapy won't reverse joint changes, but building strength and improving movement consistently reduces pain and can meaningfully delay or reduce the need for surgery.",
      },
      {
        q: "Is exercise safe if my joint already hurts?",
        a: "The right kind and amount of exercise, chosen for your specific joint and pain level, usually helps rather than harms. Dr. Gautam will guide what's appropriate for you.",
      },
      {
        q: "Will I eventually need joint replacement surgery?",
        a: "Some people do, most don't for a long time with proper management. Dr. Gautam will tell you honestly if your case looks like it's heading toward needing a surgical opinion.",
      },
      {
        q: "Do you treat hand and finger arthritis too, not just knees and hips?",
        a: "Yes, the same assessment and treatment approach applies, adapted to the specific joints involved.",
      },
    ],
  },
  {
    slug: "womens-pediatric-health",
    title: "Women's Health & Pediatric",
    icon: "heart",
    heroSubhead:
      "Pregnancy-related pain, postpartum recovery, and physical development concerns in children need a different, gentler approach. Care from Dr. S.K. Gautam suited to each stage.",
    whoHelpsIntro:
      "This page covers two related but distinct areas: physiotherapy for women during and after pregnancy, and physiotherapy for children's movement, posture and developmental concerns. Both need an approach adapted to the person, not a standard adult protocol.",
    whoHelpsBullets: [
      "Back, pelvic or hip pain during pregnancy",
      "Postpartum recovery, including core and pelvic floor concerns",
      "A child with delayed motor milestones or an unusual walking pattern",
      "A child with posture or growth-related pain",
      "You want a physiotherapist who treats these cases specifically, not as an afterthought",
    ],
    sessionSteps: [
      { title: "Stage-specific assessment", desc: "For pregnancy and postpartum, or for a child's age and developmental stage, the assessment is built around where you or your child actually are." },
      { title: "Gentle, appropriate manual therapy", desc: "Technique adjusted for pregnancy, postpartum healing, or a child's smaller frame and different needs." },
      { title: "Guided, safe exercise", desc: "Movement and strengthening that's appropriate and safe for the specific stage of pregnancy, recovery, or childhood development." },
      { title: "Ongoing guidance", desc: "Practical advice for daily life, whether that's safe movement through pregnancy or exercises a parent can help with at home." },
    ],
    recovery: {
      sessions: "[X-X] sessions",
      firstChange: "Visit [X]",
      frequency: "1-2 / week",
    },
    faqs: [
      {
        q: "Is it safe to have physiotherapy while pregnant?",
        a: "Yes, when the assessment and treatment are adapted for pregnancy, which is standard practice here. Dr. Gautam will ask about your stage of pregnancy and any complications before starting.",
      },
      {
        q: "My child doesn't seem to be in pain. Why would they need physiotherapy?",
        a: "Pediatric physiotherapy often addresses movement patterns, posture, balance or developmental milestones, not only pain. An assessment can clarify whether there's something worth addressing early.",
      },
      {
        q: "How is postpartum recovery different from general physiotherapy?",
        a: "It accounts for the physical changes of pregnancy and delivery, including core and pelvic floor function, and is paced around your recovery rather than a standard timeline.",
      },
      {
        q: "What age range do you see for pediatric physiotherapy?",
        a: "Bring your specific concern to Dr. Gautam and he'll advise whether physiotherapy is appropriate for your child's age and situation.",
      },
    ],
  },
  {
    slug: "migraine",
    title: "Migraine",
    icon: "migraine",
    heroSubhead:
      "Recurring headaches that come with nausea, light sensitivity or visual disturbance often have a physical component that medication alone doesn't address. Hands-on assessment and treatment from Dr. S.K. Gautam.",
    whoHelpsIntro:
      "This page is for anyone with migraine or recurring headache that isn't fully controlled by medication. Neck, jaw and upper back tension is a common contributing factor, and it's one physiotherapy can address directly.",
    whoHelpsBullets: [
      "Migraines or headaches that come back regularly despite medication",
      "Headaches that seem linked to neck stiffness or tension",
      "Light or sound sensitivity, nausea, or visual aura with your headaches",
      "You want to reduce how often they happen, not just treat each one as it comes",
      "A doctor has ruled out other causes and referred you toward physical management",
    ],
    sessionSteps: [
      { title: "Headache pattern assessment", desc: "Understanding your triggers, frequency and any neck or jaw involvement, not just the headache itself." },
      { title: "Manual therapy for neck & upper back", desc: "Hands-on treatment of the muscles and joints that commonly refer pain into the head." },
      { title: "Craniosacral technique", desc: "A gentle, specific approach for headache and tension-related symptoms." },
      { title: "Trigger & lifestyle management", desc: "Practical guidance on posture, sleep and triggers alongside your ongoing medical care." },
    ],
    recovery: {
      sessions: "[X-X] sessions",
      firstChange: "Visit [X]",
      frequency: "1-2 / week",
    },
    faqs: [
      {
        q: "Can physiotherapy actually reduce migraines?",
        a: "For migraines with a neck or muscular tension component, yes, hands-on treatment can reduce frequency and severity. Dr. Gautam will assess whether your pattern fits this at your first visit.",
      },
      {
        q: "Should I stop my migraine medication?",
        a: "No. Physiotherapy works alongside your doctor's medical management, not instead of it. Continue any prescribed treatment unless your doctor advises otherwise.",
      },
      {
        q: "Is craniosacral technique the same as a regular head massage?",
        a: "No, it's a specific, gentle manual technique with a defined approach, not a general relaxation massage.",
      },
      {
        q: "How soon can I get an appointment?",
        a: "Same-day or next-day in most cases. Call, WhatsApp, or use the booking page to see the next open slot at your preferred clinic.",
      },
    ],
  },
  {
    slug: "pelvic-floor-rehab",
    title: "Pelvic Floor Rehab",
    icon: "pelvic",
    heroSubhead:
      "Pelvic floor concerns after childbirth, surgery or with age are common and treatable, even though they're rarely discussed. Careful, appropriate assessment and treatment from Dr. S.K. Gautam.",
    whoHelpsIntro:
      "This page is for anyone with pelvic floor weakness, discomfort or dysfunction, including postpartum recovery, post-surgical changes, or general pelvic floor concerns. Assessment and treatment are handled with the sensitivity this area needs.",
    whoHelpsBullets: [
      "Pelvic floor weakness or discomfort after childbirth",
      "Concerns following pelvic or abdominal surgery",
      "Ongoing pelvic pain or dysfunction with no clear cause identified yet",
      "You've been told to \"do pelvic floor exercises\" but aren't sure you're doing them correctly",
      "You want a physiotherapist who treats this specifically, not as an afterthought",
    ],
    sessionSteps: [
      { title: "A careful, appropriate assessment", desc: "Understanding your history and specific concern, conducted with the sensitivity this area needs." },
      { title: "A tailored treatment approach", desc: "Technique and exercise selected for your specific pelvic floor concern and stage of recovery." },
      { title: "Guided, correct exercise", desc: "Making sure the exercises you're doing are actually reaching and strengthening the right muscles." },
      { title: "A progressive home plan", desc: "A realistic routine you can continue independently, with follow-up to track progress." },
    ],
    recovery: {
      sessions: "[X-X] sessions",
      firstChange: "Visit [X]",
      frequency: "1-2 / week",
    },
    faqs: [
      {
        q: "Is this assessment uncomfortable or invasive?",
        a: "Dr. Gautam will explain what assessment and treatment involves before starting, and adapts the approach to what you're comfortable with. Ask any question you have at the first visit.",
      },
      {
        q: "How long after childbirth should I wait before coming in?",
        a: "This varies by individual and delivery type. Bring any guidance from your obstetrician, and Dr. Gautam will advise what's appropriate for your specific recovery stage.",
      },
      {
        q: "Is this only for women?",
        a: "Pelvic floor concerns affect men too, particularly after prostate surgery. The same assessment and treatment approach applies.",
      },
      {
        q: "Do I need a referral?",
        a: "No, you can book directly. If a doctor has already advised you on this, bring that guidance along to your first visit.",
      },
    ],
  },
];

export function getCondition(slug: string): Condition | undefined {
  return conditions.find((c) => c.slug === slug);
}
