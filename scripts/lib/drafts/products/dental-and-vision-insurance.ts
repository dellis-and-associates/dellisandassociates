import type { ProductDraft } from "../types.mts";

export const draft: ProductDraft = {
  summary: "Two small policies for two predictable costs. Dental pays cleanings in full and a share of fillings, crowns and root canals up to an annual maximum; vision pays for an exam and an allowance toward glasses or contacts each year. Both are priced on what they pay out, not on your risk.",
  intro: [
    "Dental and vision are sold separately from health insurance because the costs they cover are frequent and small rather than rare and large, and the policies are built accordingly. A dental plan works in the opposite direction from a health plan: it pays preventive care in full, pays a decreasing share as the work gets more expensive, and stops at an annual maximum. A vision plan is closer to a prepaid benefit: an exam and a fixed allowance toward lenses and frames, once a year, with reduced prices on anything above the allowance.",
    "Both are available as individual policies for people without employer coverage, for retirees whose Medicare does not include them, and for families whose employer plan covers only the employee. The premium is set from the plan's benefit schedule, the annual maximum, the network and the waiting periods, not from your teeth or your eyes; carriers do not underwrite these plans, they price the benefit.",
    "The analysis is arithmetic: what you expect to spend on dental and vision in a year, against the premium plus the plan's share of that spend. For someone whose dental work is two cleanings a year, paying cash can cost less than a policy; for someone facing a crown or a child's orthodontics, the right plan and the right timing around waiting periods can pay for itself in the first year. We say which case you are in.",
  ],
  coverageBlocks: [
    { heading: "Preventive, basic and major dental", paragraphs: ["Dental plans sort procedures into three classes. Preventive is cleanings, exams, routine X-rays and fluoride for children, paid in full or nearly so, with no deductible, usually twice a year. Basic is fillings, simple extractions and sometimes root canals and periodontal work, paid at a high share after a small deductible. Major is crowns, bridges, dentures and implants where covered, paid at a lower share. Which class a root canal or a crown falls into varies by carrier and is worth checking against the work you know is coming."] },
    { heading: "Annual maximums and waiting periods", paragraphs: ["Every dental plan has an annual maximum, the most it will pay in a plan year, after which you pay the dentist in full until the year resets. It is per person and modest by health insurance standards, which is why a plan is a tool for managing routine and mid-sized bills rather than catastrophic ones. Individual plans also carry waiting periods for basic and major work, commonly months for basic and up to a year for major, to stop people buying a plan the week they need a crown; some carriers waive them for people switching from prior coverage without a gap."] },
    { heading: "Dental networks and fee schedules", paragraphs: ["A dental PPO lets you see any dentist but pays on a fee schedule, and in-network dentists agree to that schedule while out-of-network dentists can bill the difference. A dental HMO pays only within its network, at fixed copays per procedure and often with no annual maximum, at a lower premium and a much shorter list of dentists. Whether your dentist is in the specific plan's network is the first check we make, and it settles the choice for many households."] },
    { heading: "Orthodontics", paragraphs: ["Braces and aligners are excluded from many individual plans, and where covered they carry a separate lifetime maximum per person, a waiting period and an age limit that usually confines the benefit to children. A plan bought for a child's orthodontics should be bought well before the treatment plan starts, and the lifetime maximum should be compared against the orthodontist's quote, since it will usually cover a fraction of it."] },
    { heading: "Vision exams and eyewear", paragraphs: ["A vision plan pays for a routine eye exam once a year for a small copay, then an allowance toward frames and lenses or toward contact lenses, one or the other, in the same year. Lens options such as anti-reflective coating, progressive lenses and photochromic tint carry their own fixed copays. Anything above the allowance is billed at a plan-negotiated price rather than list price. Medical eye care, such as an injury, an infection or treatment for glaucoma or cataracts, is billed to the health plan, not the vision plan."] },
  ],
  covered: [
    "Cleanings, exams and routine X-rays, paid in full or nearly so",
    "Fillings and simple extractions after a small deductible",
    "Crowns, bridges and dentures at the plan's major-work share",
    "A routine eye exam once a year",
    "An allowance toward frames and lenses, or toward contact lenses",
    "Reduced pricing on eyewear above the allowance",
    "Orthodontics for children on plans that include a lifetime orthodontic benefit",
  ],
  notCovered: [
    "Work above the annual maximum in a plan year",
    "Basic or major work during the waiting period on a new plan",
    "Cosmetic dentistry such as whitening and veneers",
    "Implants on many plans, or only at a reduced share on plans that list them",
    "Non-prescription sunglasses and a second pair in the same year",
    "Medical eye conditions, which belong to the health plan",
    "Work already in progress when the plan starts, such as a crown prepped before the effective date",
  ],
  discounts: [
    { name: "Bundled dental and vision", description: "Buying both from the same carrier usually cuts the combined premium and puts them on one bill." },
    { name: "Family enrollment", description: "A household rate that costs less per person than separate policies." },
    { name: "Annual payment", description: "Paying the year up front instead of monthly, on some carriers." },
    { name: "Prior coverage credit", description: "Some carriers waive waiting periods for applicants who had dental coverage without a gap, which is worth more than a premium discount if work is pending." },
    { name: "In-network care", description: "Not a discount on the premium but on the bill: in-network dentists accept the fee schedule and cannot balance-bill." },
  ],
  faqs: [
    { question: "Is dental insurance worth it if I only need cleanings?", answer: ["Do the sum. Two cleanings and an exam at your dentist's cash price against twelve months of premium; if the premium is higher, the plan is paying you nothing in a normal year and only helps if something goes wrong. Some carriers sell a discount plan rather than insurance, which for a smaller fee gives you the fee schedule without paying claims, and for a cleanings-only household that can be the better fit."] },
    { question: "Why does my plan have a waiting period?", answer: ["Because dental work is planned rather than accidental, a plan with no waiting period would be bought only by people about to need a crown and cancelled after. The waiting period spreads the risk. If you are switching from another dental plan with no gap, ask about a waiver; if you have work pending, the analysis compares the wait against paying cash for that one procedure and insuring what comes after."] },
    { question: "Can I keep my dentist?", answer: ["On a dental PPO, yes, though out of network you pay the difference between the fee schedule and what the dentist charges. On a dental HMO, only if the dentist is in the plan's network, which is typically much smaller. We check the dentist against the plan's directory, not the carrier's, before enrolling you."] },
    { question: "Does Medicare cover dental and vision?", answer: ["Original Medicare does not cover routine dental care or eyewear, with narrow exceptions for dental work tied to a covered medical procedure and for one pair of glasses after cataract surgery. Some Medicare Advantage plans add a dental and vision benefit, often with its own allowance and network; a standalone dental and vision policy is the route for people on Original Medicare with a Medigap plan."] },
    { question: "Are contacts and glasses both covered in the same year?", answer: ["Usually not; the allowance is for one or the other, and you choose at the time of purchase. Some plans allow both for a higher premium, and many offer reduced pricing on the second item. The exam is separate from the allowance and does not reduce it."] },
  ],
  relatedProducts: ["health-insurance", "medicare", "life-insurance"],
  seo: { description: "How individual dental and vision plans work: preventive, basic and major classes, annual maximums, waiting periods, dental PPO versus HMO networks, and the eyewear allowance, from an independent agency in Arizona, Nevada, Utah and Idaho." },
};
