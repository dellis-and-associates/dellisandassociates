import type { ArticleDraft } from "../types.mts";

export const draft: ArticleDraft = {
  title: "Auto insurance explained: a beginner's guide",
  excerpt: "What an auto policy actually does, part by part: liability, collision, comprehensive, uninsured motorist, medical payments, and the choices that move the premium. Written for someone reading a declarations page for the first time.",
  sections: [
    {
      heading: "",
      paragraphs: [
        "An auto policy is a bundle of separate promises, each with its own limit and often its own deductible. Reading it as one thing is where most confusion starts. Read it as five or six things and it becomes a list you can check: what pays other people, what pays for your own car, what pays when the other driver has nothing, and what pays for injuries regardless of fault.",
        "This guide walks through those parts in the order they appear on most declarations pages, explains what each one is for, and points out the choices that change the premium. It does not quote a price, because the price depends on the car, the drivers, the address and the carrier, and any number we printed here would be wrong for you.",
      ],
    },
    {
      heading: "Liability: what you owe other people",
      paragraphs: [
        "Liability coverage pays for injury and property damage you cause to others in an accident where you are at fault. It is the part every licensed state requires in some form, and it is the part that protects your savings, because a judgment against you is not limited to what your policy pays.",
        "It is written as two or three numbers. Bodily injury liability has a limit per person and a limit per accident; property damage liability has a single limit. A policy described as 100/300/100 pays up to the first figure for any one injured person, up to the second for everyone injured in one accident, and up to the third for the property you damage. The state sets a floor for these figures; the floor is usually far below what a serious accident costs.",
        "The choice here is the limit. Raising liability limits is often the least expensive change on the policy relative to what it buys, because most accidents never reach the limit and the carrier prices accordingly. If you own a home or have savings, the limit is the number to look at first, and an umbrella policy sits on top of it once the auto limit is used up.",
      ],
    },
    {
      heading: "Collision: your car, your fault or nobody's",
      paragraphs: [
        "Collision coverage pays to repair or replace your own vehicle after it hits something or is hit, regardless of fault. It carries a deductible, the amount you pay before the carrier pays, and the deductible is the main lever on its cost.",
        "Suppose your car is worth $9,000 and you carry a $1,000 collision deductible. After a covered crash that totals the car, the carrier pays $8,000 and you absorb the first $1,000. With a $500 deductible the carrier would pay $8,500 and the premium would be somewhat higher. These figures are hypothetical and only show the mechanism.",
        "Collision is optional unless a lender requires it. On an older car whose value is close to the deductible, the coverage can cost more over a few years than it could ever pay; on a financed car it is almost always required. The honest question is how you would replace the car tomorrow if it were gone.",
      ],
    },
    {
      heading: "Comprehensive: everything that is not a collision",
      paragraphs: [
        "Comprehensive coverage pays for damage to your car from causes other than a crash: theft, vandalism, fire, hail, flood, a falling branch, a windshield cracked by a rock, or hitting an animal. In the four states we serve, the last three matter more than people expect. Hail and wind come with monsoon storms, flash floods cross low roads, and deer and elk cross mountain highways at dusk.",
        "It has its own deductible, usually lower than collision, and is priced separately. Like collision it is optional unless a lender requires it, and the same value-versus-cost question applies.",
      ],
    },
    {
      heading: "Uninsured and underinsured motorist",
      paragraphs: [
        "Uninsured motorist coverage pays for your injuries when the driver who hit you has no insurance. Underinsured motorist coverage pays when they have some, but not enough to cover what happened to you. Both step in where liability coverage on the other side should have paid and did not.",
        "Whether a carrier has to offer these coverages, and whether you can reject them in writing, is set by each state's insurance rules; in Arizona, the Department of Insurance and Financial Institutions can confirm how the offer and a written rejection work. Many people decline them to save a few dollars and regret it, because the alternative after a serious crash with an uninsured driver is your own health insurance and your own savings. The sensible default is to match these limits to your liability limits.",
      ],
    },
    {
      heading: "Medical payments and personal injury protection",
      paragraphs: [
        "Medical payments coverage pays medical bills for you and your passengers after an accident, regardless of fault, up to a modest limit. Personal injury protection is the broader version used in no-fault states; it can also pay lost wages and other costs. Which one appears on your policy, and whether it is required, depends on the state; of the four states this office serves, Utah is the one that requires PIP, and the Utah Insurance Department can confirm what it has to include.",
        "If you have good health insurance, medical payments coverage mostly covers deductibles and copays and passengers who are not on your health plan. If you do not, it is the coverage that keeps an accident from becoming a medical debt.",
      ],
    },
    {
      heading: "The choices that move the premium",
      paragraphs: ["Once the parts make sense, the premium is a set of choices you control and a set of facts you do not."],
      bullets: [
        "Limits: higher liability limits cost more, but the increase is usually modest relative to the protection.",
        "Deductibles: higher collision and comprehensive deductibles lower the premium; choose the highest amount you could pay tomorrow without borrowing.",
        "Vehicles: repair cost, theft rate and safety record of the specific model.",
        "Drivers: age, record, and how long each has been licensed.",
        "Use: annual mileage and whether the car is used for work.",
        "Address: where the car sleeps at night, down to the ZIP code.",
        "Carrier: each one rates the same facts differently, which is the whole reason to compare.",
      ],
    },
    {
      heading: "What full coverage means, and does not",
      paragraphs: [
        "There is no coverage called full coverage. When someone says it, they usually mean liability plus collision plus comprehensive. It does not mean every possible loss is covered; roadside service, rental reimbursement, gap coverage on a financed car, and custom equipment are separate items you add or decline. Read the declarations page rather than the phrase.",
      ],
    },
    {
      heading: "How to use this",
      paragraphs: [
        "Take your current declarations page and find each part above. Write down the limit and deductible next to each. Then ask three questions: could I pay this deductible tomorrow, would this liability limit cover a bad day, and is anything I would want to claim on this list excluded. Those three answers are what an independent comparison starts from. We compare the carriers we represent against them, and if what you have is the right policy, we say so.",
      ],
    },
  ],
  relatedProducts: ["auto-insurance", "umbrella-insurance", "motorcycle-insurance"],
  relatedArticles: ["how-to-read-your-auto-insurance-declarations-page", "full-coverage-vs-liability-only-auto-insurance", "how-to-choose-the-right-deductible", "minimum-auto-insurance-requirements-in-arizona"],
  relatedTerms: ["deductible", "premium", "liability-coverage", "collision-coverage", "comprehensive-coverage", "uninsured-motorist-coverage"],
};
