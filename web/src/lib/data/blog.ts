export type ArticleBlock =
  | { type: "h2"; text: string }
  | { type: "p"; text: string }
  | { type: "ul"; items: string[] }
  | { type: "ol"; items: string[] }
  | { type: "callout"; title: string; text: string };

export type BlogArticle = {
  slug: string;
  category: string;
  title: string;
  /** Written for the meta description, so it stays under ~160 characters. */
  excerpt: string;
  /** Written for the page, so it can be longer. */
  heroSubhead: string;
  readTime: string;
  publishedAt: string;
  blocks: ArticleBlock[];
};

/**
 * Articles are authored content, so they stay static here rather than behind the
 * bookings database. Every page that links to a blog post must link to one of
 * these slugs — the blog index builds its list from this array.
 */
export const articles: BlogArticle[] = [
  {
    slug: "sciatica-pain-what-actually-helps",
    category: "Sciatica",
    title: "Sciatica pain: what actually helps, and what to skip",
    excerpt:
      "What sciatica really is, the three things that move it, and the habits that quietly keep it going. Plus the warning signs that need a doctor, not physio.",
    heroSubhead:
      "A sharp line of pain, numbness or tingling running from the lower back down one leg. It gets worse sitting or coughing, and often eases when you walk or lie flat. Most of the time it settles without surgery — but 'rest' and 'movement' aren't interchangeable, and knowing which one you need is the whole game.",
    readTime: "5 min read",
    publishedAt: "2026-02-09",
    blocks: [
      {
        type: "h2",
        text: "What sciatica actually is",
      },
      {
        type: "p",
        text: "Sciatica isn't a separate disease. It's a description: your sciatic nerve is being irritated somewhere along its route, usually where the disc presses on the nerve root in the lower back. The pain doesn't have to be dramatic to qualify. A dull ache below the knee, tingling in the toes, or a leg that feels slightly weaker than the other can all be it.",
      },
      {
        type: "p",
        text: "The useful thing to know is that nerve irritation is partly mechanical and partly sensitised. The disc can be pinching the nerve, yes. But the nervous system also turns the signal up, so what started as a minor irritation starts feeling like a fire alarm. Treating only the disc and ignoring that amplification is why so many people feel better for a week and then slide straight back.",
      },
      {
        type: "h2",
        text: "The three things that actually move it",
      },
      {
        type: "ol",
        items: [
          "Positional control. You need to find the positions that calm the nerve and learn to spend more time in them. This is genuinely different person to person, which is why the generic 'avoid all bending' advice so often backfires.",
          "Nerve mobility work. Small, repeated movements that teach the nerve to glide instead of catching. Done at the right dose this is one of the most effective things we have. Done aggressively and badly it makes a flare worse, which is why the dose has to be assessed rather than guessed.",
          "Core and hip loading, in stages. The back doesn't get irritated because you're weak in general. It gets irritated because certain movements load the disc in a direction it can't handle. You strengthen the muscles that change that load path, not everything at once.",
        ],
      },
      {
        type: "h2",
        text: "What usually makes it worse",
      },
      {
        type: "ul",
        items: [
          "Two weeks of complete rest. A disc that isn't being gently loaded stays stiff, and the surrounding muscles switch off faster than they recover.",
          "Repetitive heavy end-range flexion. Reaching for something on the floor with a rounded back, every day, for years, adds up to far more than any single lift.",
          "Long stretches in one position. Sitting through a whole workday on a soft sofa is a bigger driver of flare-ups than most people's exercise habits ever are.",
          "Bouncing back to the same movement that caused it. If lifting your child from the floor was the trigger, you don't learn to lift your child from the floor faster. You change the movement.",
        ],
      },
      {
        type: "h2",
        text: "How long does it take?",
      },
      {
        type: "p",
        text: "Most mechanical sciatica with no neurological deficit settles over 4 to 6 weeks of structured work, with the leg symptoms usually improving before the back does. Some people see the worst of it inside a week once the positioning changes. If it hasn't shifted meaningfully after a month of proper assessment and a real plan, that's worth re-evaluating rather than extending the same plan.",
      },
      {
        type: "callout",
        title: "See a doctor promptly, not physio",
        text: "Numbness or weakness that's getting worse, loss of bladder or bowel control, saddle numbness around the groin, or severe pain after a fall or accident. These need medical assessment, and if you're unsure it's always better to be seen sooner.",
      },
      {
        type: "p",
        text: "None of this is a substitute for your own assessment. Sciatica presents differently enough person to person that a plan written for a stranger is usually wrong. If you want it looked at properly rather than guessed at, the clinics are listed below.",
      },
    ],
  },
  {
    slug: "how-many-physiotherapy-sessions",
    category: "Recovery",
    title: "How many physiotherapy sessions will I actually need?",
    excerpt:
      "Honest session ranges for the four commonest cases, why the estimates you've heard are usually wrong, and how to tell when you've reached the end.",
    heroSubhead:
      "It's the question everyone asks first, and the one that's hardest to answer honestly. The good version of this page tells you why the number depends on more than your diagnosis, what range to expect for the commonest cases, and the signals that say you're finished.",
    readTime: "4 min read",
    publishedAt: "2026-02-23",
    blocks: [
      {
        type: "h2",
        text: "Why 'it takes 6 sessions' is almost always wrong",
      },
      {
        type: "p",
        text: "Session counts come from two things you don't start with the same values on: your starting point, and how hard you train between visits. Two people with identical diagnoses can be three weeks apart on their own clock. Anyone quoting you a flat number without asking those two questions is guessing.",
      },
      {
        type: "p",
        text: "What I can do is give you a realistic range for each case, and be upfront about what the range is doing.",
      },
      {
        type: "h2",
        text: "Typical ranges, with the fine print",
      },
      {
        type: "ul",
        items: [
          "Acute low back pain, no leg symptoms: 4 to 8 sessions. Often shorter if it's positional and improves quickly, longer if the movement work needs rebuilding properly.",
          "Mechanical sciatica: 6 to 12 sessions. The nerve work takes time to change, and leg symptoms lag behind back symptoms.",
          "Knee or hip replacement rehab: 8 to 16 sessions, spread over 6 to 12 weeks. Your surgeon's protocol is the floor, not the target.",
          "Frozen shoulder: 8 to 14 sessions. Slower than most people expect, and consistency between visits matters more than session intensity.",
        ],
      },
      {
        type: "h2",
        text: "What actually determines which end of the range",
      },
      {
        type: "ul",
        items: [
          "How long it's been going on. Three months of pain reorganises your nervous system more than three weeks of it ever will, and undoing that is a separate piece of work.",
          "Whether the movement work is happening outside the clinic. The session shows you the work. The improvement happens when you do it.",
          "What you're asking it to do. Going back to gardening is a different target from returning to a sport that involves contact, and the gap is real.",
          "The habits that caused the problem in the first place. If those are still running, you're running alongside the recovery instead of with it.",
        ],
      },
      {
        type: "h2",
        text: "How to tell when you've reached the end",
      },
      {
        type: "p",
        text: "There's a fairly reliable pattern. You stop gaining from a session. The next two visits produce no meaningful change in pain, movement or the task you're training for, and your home work is done consistently. At that point the clinic isn't adding anything you can't do yourself, and staying adds cost without adding recovery.",
      },
      {
        type: "p",
        text: "The reverse is also worth naming. If you've been through 4 or 5 sessions and nothing has moved — the pain, the movement, the day-to-day — that's information too. The plan needs revising or a different kind of assessment is needed, and sitting with the same plan hoping is how people end up twice as deep into it.",
      },
      {
        type: "p",
        text: "The first assessment exists precisely to answer your question for your case, with the actual number and the reasoning behind it. That's more useful than any range on a webpage.",
      },
    ],
  },
  {
    slug: "after-joint-replacement-recovery",
    category: "Post-Surgery",
    title: "Getting back on your feet after joint replacement",
    excerpt:
      "What joint replacement rehab actually involves, the realistic timeline week by week, and the single thing that decides whether you get back to full.",
    heroSubhead:
      "The surgery replaces the joint. It doesn't give you it back. What makes you walk properly, climb stairs and get back to what you used to do is the recovery work afterwards, and it takes longer than most people expect. Here's what it actually looks like.",
    readTime: "6 min read",
    publishedAt: "2026-03-09",
    blocks: [
      {
        type: "h2",
        text: "The first week is not about exercise",
      },
      {
        type: "p",
        text: "In the first few days the priorities are swelling, mobility within safe limits, and protecting the repair while it starts to settle. You'll learn how to position yourself, how to move safely, and what the early exercises are — but you're not building anything yet. The joint is busy with inflammation, and it isn't ready to be loaded meaningfully.",
      },
      {
        type: "p",
        text: "This is also the phase people get most anxious about, because nothing feels like progress. It is progress. The goal here is to set up a clean recovery, and that pays off in the next three weeks.",
      },
      {
        type: "h2",
        text: "What the timeline actually looks like",
      },
      {
        type: "ol",
        items: [
          "Weeks 1 to 2: swelling control, safe movement, early range of motion within the surgeon's limits.",
          "Weeks 2 to 4: walking distance and quality improve, stairs become possible, you rebuild normal daily movement patterns.",
          "Weeks 4 to 8: strength work begins properly. This is where balance, push and pull strength, and hip and core control come back.",
          "Weeks 8 to 12 and beyond: task-specific work — the garden, the grandchild, the long walk, the sport. This phase is where the difference between 'able to walk' and 'back to normal life' gets made.",
        ],
      },
      {
        type: "callout",
        title: "Your surgeon's protocol is the floor",
        text: "It isn't the target. Some surgeons are deliberately conservative about range of motion early on, which is a reasonable position. But recovering to their minimum and stopping there is how people end up with a well-implanted joint and a life that's still limited.",
      },
      {
        type: "h2",
        text: "The thing that decides your outcome",
      },
      {
        type: "p",
        text: "Between-session work. The gap between two physiotherapy visits is where the adaptation actually happens. If a movement isn't being repeated between sessions, it isn't being learned. This isn't about being a hard trainer — it's about doing the prescribed work most days, consistently, even when it doesn't feel like much.",
      },
      {
        type: "h2",
        text: "What's realistic about the ending",
      },
      {
        type: "p",
        text: "Most people get back to independent daily life and a return to the activities they enjoyed, usually inside three months, with strength continuing to improve for 6 to 9 months. What we don't promise is the pre-injury version. You recover to where your other joints, your age and your training actually are, and for many people that's fully enough.",
      },
      {
        type: "p",
        text: "We work directly to your surgeon's protocol and coordinate where needed. If you're recovering from a replacement and aren't sure what your next step should be, an assessment will sort that out.",
      },
    ],
  },
  {
    slug: "why-your-neck-hurts",
    category: "Neck Pain",
    title: "Why your neck hurts and what to do about it",
    excerpt:
      "The two causes behind most neck pain, why it usually aches in the morning, how long it takes, and the movement that makes the difference.",
    heroSubhead:
      "Neck pain is one of the most common complaints I see and one of the most over-explained. Most of it isn't a structural problem at all. Most of it is a load problem, and load problems respond to different work than people expect.",
    readTime: "4 min read",
    publishedAt: "2026-03-23",
    blocks: [
      {
        type: "h2",
        text: "The two things that actually cause it",
      },
      {
        type: "p",
        text: "In the overwhelming majority of cases it's one of two things. Either the muscles and joints at the back of the neck are overloaded by sustained posture, or the nerve is being irritated lower down and the neck is just where you notice it. Everything else is usually a detail of one of those two.",
      },
      {
        type: "ul",
        items: [
          "Postural overload. Sitting, screen use, long head-forward positions, and sleeping on an awkward pillow. The upper trapezius and the muscles at the base of the skull take it all.",
          "Cervical nerve irritation. Sharp or shooting pain, often down one arm, sometimes with numbness in the fingers. This one needs assessment before you move much at all.",
        ],
      },
      {
        type: "h2",
        text: "Why it usually arrives in the morning",
      },
      {
        type: "p",
        text: "If your neck is stiff before you've even sat up, the cause is almost always overnight. A pillow that's too high or too low holds your neck in a position for seven hours. You wake up with what is, in effect, a long held stretch that your muscles have to shake off. Changing the pillow is one of the cheapest and most effective changes in all of physiotherapy.",
      },
      {
        type: "h2",
        text: "What makes it better",
      },
      {
        type: "ol",
        items: [
          "Posture correction done early. You can't out-exercise a workday spent with your chin forward, and this is the single biggest factor.",
          "De-loading the overloaded muscles. Hands-on work to calm the tissues that have been compensating for weeks or years.",
          "Cervical mobility work. Gentle, specific, and dose-controlled. The range of motion you're after is small, and small range is where the gain is.",
          "Building the neck and upper back's endurance, not just its flexibility. Muscles that can hold a position is what stops the pain coming back.",
        ],
      },
      {
        type: "h2",
        text: "What makes it worse",
      },
      {
        type: "ul",
        items: [
          "Rapid self-cracking of the neck. It feels like relief, it isn't, and it's the pattern behind a surprising number of the presentations I see.",
          "Stretching aggressively into sharp pain. Sharp pain means stop, every time, for neck problems.",
          "Skipping the screen break entirely. Every hour at a screen with no reset adds directly to the load.",
        ],
      },
      {
        type: "h2",
        text: "How long it takes",
      },
      {
        type: "p",
        text: "Most postural neck pain responds noticeably within a week of proper work, with meaningful change over 3 to 6 weeks. If there's nerve involvement the timeline is longer and the first step is assessment rather than exercise.",
      },
      {
        type: "callout",
        title: "Get this checked",
        text: "Numbness or weakness in a hand, pain that follows a specific nerve path and is worsening, any neck pain after a fall or accident, or pain waking you from sleep. These need a proper assessment, not a plan you've found online.",
      },
      {
        type: "p",
        text: "A neck assessment takes time because the answer genuinely differs between people. If yours is affecting your days, that's worth sorting out properly.",
      },
    ],
  },
  {
    slug: "returning-to-sport-after-injury",
    category: "Sports Injuries",
    title: "Returning to sport after injury: a realistic timeline",
    excerpt:
      "Why most relapses happen in the same place, the four phases of a proper return, and the real timelines for sprains, ligament and muscle injuries.",
    heroSubhead:
      "The injury heals. The player comes back. Two months later they're back on the treatment table with the same injury. That's not bad luck, it's a pattern, and it happens because the return was measured in pain-free walking instead of sport-specific demands.",
    readTime: "5 min read",
    publishedAt: "2026-04-06",
    blocks: [
      {
        type: "h2",
        text: "Why relapses happen",
      },
      {
        type: "p",
        text: "Most sport-specific injuries aren't reinjured by the same accident twice. They're reinjured by a half-restored joint or muscle being asked for the same explosive movement it can't yet deliver. The tissue has healed enough to feel fine on a walk, and nowhere near enough to survive a deceleration at speed.",
      },
      {
        type: "p",
        text: "The fix isn't more time. It's a graded return that matches the demands of your sport, in order, with the criteria for each step actually being met.",
      },
      {
        type: "h2",
        text: "The four phases that work",
      },
      {
        type: "ol",
        items: [
          "Phase 1 — heal. Pain and swelling come under control, range of motion returns, and the injured tissue tolerates normal daily load.",
          "Phase 2 — strength and movement quality. You rebuild the strength and the movement patterns the injury changed. This is the longest phase and the one most people rush.",
          "Phase 3 — sport-specific loading. Jogging, then running, then cutting, then sport drills. Each progression only happens when the previous one is fully tolerated.",
          "Phase 4 — full training and contact. Returned to the full session, including collision and maximal effort, with the same load your teammates are getting.",
        ],
      },
      {
        type: "h2",
        text: "What the timelines actually are",
      },
      {
        type: "ul",
        items: [
          "Grade 1 ankle sprain: 2 to 4 weeks to full training, 4 to 6 for contact sport.",
          "Grade 2 ankle sprain: 6 to 10 weeks, and the return is about balance and stiffness response more than anything else.",
          "Hamstring strain: 4 to 8 weeks depending on grade. Recurrence is common because eccentric strength is rarely rebuilt.",
          "ACL reconstruction: 9 to 12 months minimum, with the return-to-sport assessment being the gate, not the clock.",
        ],
      },
      {
        type: "callout",
        title: "The one that decides it",
        text: "Phase 2. Every relapse I've seen traces back to shortening the strength and movement-quality phase, usually because of a fixture date, a selection window or the athlete wanting to get back. The tissue will tell you when it's ready. Calendar dates won't.",
      },
      {
        type: "h2",
        text: "How the assessment works",
      },
      {
        type: "p",
        text: "We assess the movement you need for your sport, not a generic battery of tests. If you play a sport that requires repeated direction changes, we test direction changes. If it's an endurance sport, we test the specific loading pattern of that sport. Then the return plan is built backwards from the demands you have to meet.",
      },
      {
        type: "p",
        text: "If you've injured the same spot more than once, that's the clearest sign your last return was too early. It's worth looking at properly.",
      },
    ],
  },
  {
    slug: "slip-disc-surgery-isnt-always-the-answer",
    category: "Back Pain",
    title: "Slip disc: surgery isn't always the answer",
    excerpt:
      "What a slip disc really is, why most don't need surgery, the timeline that changes everything, and the signs that do mean you should go.",
    heroSubhead:
      "Hearing 'slip disc' sounds like a broken thing that needs fixing. Most of them aren't broken in the way that word implies, and most of them settle with the right work. But there are real situations where surgery is the correct answer, and knowing the difference is the whole point.",
    readTime: "6 min read",
    publishedAt: "2026-04-20",
    blocks: [
      {
        type: "h2",
        text: "What a slip disc actually is",
      },
      {
        type: "p",
        text: "Each disc is a gel-filled cushion between the vertebrae. A bulging disc means that cushion has stretched outward beyond where it belongs. A herniated disc means a portion of the gel has pushed through the outer layer. Both can press on a nerve root, which is what causes the leg pain, numbness and weakness.",
      },
      {
        type: "p",
        text: "Here's the part imaging scans don't show you: the same disc that is causing symptoms in one person causes nothing at all in another. Large scans show bulging discs in healthy people constantly. The disc looks the same. The person is completely different. So the decision can never be made from a scan alone.",
      },
      {
        type: "h2",
        text: "Why most don't need surgery",
      },
      {
        type: "ul",
        items: [
          "Herniated discs can resorb. The body reabsorbs herniated disc material over time, often over 6 to 12 months, and symptoms commonly settle before any surgical timeline would have made sense.",
          "Nerves recover. Once the compression reduces, nerve symptoms resolve — just more slowly than the back pain, and not always completely if compression lasts too long.",
          "The cause is usually mechanical. The movement and load that produced it are still happening. Without changing those, any intervention is fighting the same force all over again.",
        ],
      },
      {
        type: "h2",
        text: "The timeline that matters",
      },
      {
        type: "p",
        text: "Most mechanical disc cases settle meaningfully within 6 to 12 weeks of proper assessment and a real plan. That's the window where you should be working through physiotherapy, not on a waiting list. If a case hasn't responded at all after 6 to 8 weeks of genuine work, or is getting worse, the conversation changes — and that's when a referral to a surgeon is the right call, not the last resort.",
      },
      {
        type: "callout",
        title: "When surgery is genuinely indicated",
        text: "Progressive or severe weakness, foot drop, cauda equina symptoms (bladder or bowel control changes, saddle numbness), or pain that has not responded to conservative care over 3 to 6 months. These are the real indications. Everything else is a conversation, not a decision made for you.",
      },
      {
        type: "h2",
        text: "What the conservative plan involves",
      },
      {
        type: "ol",
        items: [
          "Positional control to reduce the nerve load and calm the flare.",
          "Movement and nerve mobility work, dose-controlled and progressed.",
          "Core and hip strengthening to change the load path through the spine.",
          "Rebuilding the movement patterns and loads that caused it in the first place, so it doesn't return.",
        ],
      },
      {
        type: "h2",
        text: "What this isn't",
      },
      {
        type: "p",
        text: "This isn't saying surgery is wrong. It's saying it shouldn't be the first decision for a disc that might settle on its own, and it shouldn't be the decision for someone who hasn't been properly assessed. Either of those is a decision made with missing information.",
      },
      {
        type: "p",
        text: "If your scan says disc and your life has changed, an assessment will tell you which side of that line you're on.",
      },
    ],
  },
];

export function getArticle(slug: string): BlogArticle | undefined {
  return articles.find((a) => a.slug === slug);
}
