import type { ArticleDraft } from "../types.mts";

export const draft: ArticleDraft = {
  title: "How to read your auto insurance declarations page",
  excerpt: "The declarations page is the one-page summary of what your auto policy actually does. Here is what each block means, which numbers matter, and the five things to check before you file it away.",
  sections: [
    {
      heading: "",
      paragraphs: [
        "Every auto policy comes with a declarations page, usually the first page of the packet and the one page worth reading closely. It lists who is insured, which vehicles, what each coverage pays up to, what you pay first, and what it all costs. The rest of the packet is the contract that explains the words; the declarations page is where the choices you made are written down.",
        "This guide walks down a typical page block by block. Layouts differ between carriers, but the blocks are the same because they describe the same policy parts.",
      ],
    },
    {
      heading: "The header: policy number, period, named insured",
      paragraphs: [
        "At the top you will find the policy number, the policy period with a start and an end date, and the named insured. The period matters more than it looks: coverage ends at the time printed on the end date, and a renewal is a new period with a new page. If you are switching carriers, the new policy must start when this one ends, to the day, so there is no gap for the state's verification program to notice.",
        "The named insured is the person the contract is with. Other drivers in the household are usually listed separately. Anyone who lives with you and drives the car regularly should be listed; an unlisted regular driver is the most common reason a claim gets complicated.",
      ],
    },
    {
      heading: "Vehicles",
      paragraphs: [
        "Each vehicle appears with its year, make, model and vehicle identification number, plus the address where it is garaged and often an annual mileage estimate. Check the identification number against the car; a transposed digit means the wrong car is insured. Check the garaging address if you have moved, because the premium is rated on where the car sleeps at night.",
        "If a vehicle is financed or leased, the lender appears here as a loss payee or additional interest. That is who the carrier pays first after a total loss. It is also why collision and comprehensive coverage are listed on that vehicle even if you did not choose them: the lender requires them.",
      ],
    },
    {
      heading: "Coverages, limits and deductibles",
      paragraphs: [
        "This is the block that matters. Each coverage is a row; each row shows a limit, a deductible where one applies, and a premium. Liability appears first, often as three numbers: bodily injury per person, bodily injury per accident, and property damage. Then medical payments or personal injury protection, uninsured and underinsured motorist, and finally the coverages for your own car, collision and comprehensive, each with its deductible.",
        "Read the limits as the most the carrier will pay for that coverage on one claim. Read the deductibles as what you pay before the carrier pays anything on that coverage. Suppose the collision row shows a $1,000 deductible and the car needs $4,000 of covered repairs; the body shop is paid $3,000 by the carrier and $1,000 by you. That is a hypothetical figure to show how the two numbers relate.",
        "A row that says not covered, or a coverage that is missing from the list, is a choice that was made at some point, possibly by default. It is worth knowing which ones are absent on purpose.",
      ],
    },
    {
      heading: "Endorsements and discounts",
      paragraphs: [
        "Below the coverages sit the endorsements: additions or changes to the standard contract, listed by form number and usually by name. Rental reimbursement, roadside service, gap coverage on a financed car, custom equipment, and a named-driver exclusion are all endorsements. The form number lets you find the exact wording in the packet.",
        "Discounts are listed too, and they are worth reading once a year. A good-student discount ends when the student graduates; a low-mileage discount depends on a number you gave the carrier; a multi-policy discount disappears if the home policy moves. None of these change the coverage, but they change what you pay for it.",
      ],
    },
    {
      heading: "The premium",
      paragraphs: [
        "The total premium for the period is printed near the bottom, sometimes with a per-vehicle breakdown and sometimes with a per-coverage one. Per-coverage figures are useful: they show what each part costs and make the trade-offs concrete. Raising a deductible lowers one row; raising a liability limit raises another, usually by less than people expect.",
        "A declarations page never explains why the premium changed from last period. If it went up and the coverage did not, the reasons are somewhere in the rating: a claim, a ticket, a driver's age, the vehicle, the ZIP code, or the carrier's own rate filing with the state. Comparing carriers is the only way to know whether the change is about you or about them.",
      ],
    },
    {
      heading: "Five things to check before you file it",
      paragraphs: ["Ten minutes with the page, once per period."],
      bullets: [
        "Names and drivers: everyone who regularly drives the car is listed, and nobody who has moved out still is.",
        "Vehicles: identification numbers match, and the garaging address is where the car actually lives.",
        "Liability limits: high enough for a bad day, not just for the state's floor.",
        "Deductibles: amounts you could pay tomorrow without borrowing, on each vehicle.",
        "Lienholder and endorsements: the lender is right, and every endorsement is one you still want.",
      ],
    },
    {
      heading: "What to do with it",
      paragraphs: [
        "Keep the current page where you can find it and a photo of the ID card on your phone. When you compare policies, the declarations page is what an honest comparison starts from, because it states the coverage you actually have rather than the coverage you think you have. Send it to us and we will compare it line by line against the carriers we represent. If it is already the right policy, we will tell you that.",
      ],
    },
  ],
  relatedProducts: ["auto-insurance", "umbrella-insurance"],
  relatedArticles: ["auto-insurance-explained-a-beginner-s-guide", "how-to-choose-the-right-deductible", "how-to-switch-insurance-companies-without-a-coverage-lapse", "full-coverage-vs-liability-only-auto-insurance"],
  relatedTerms: ["declarations-page", "deductible", "named-insured", "endorsement", "premium"],
};
