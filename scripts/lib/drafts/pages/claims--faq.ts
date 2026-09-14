import type { PageDraft } from "../types.mts";

export const draft: PageDraft = {
  title: "Claims FAQ",
  lede: "The questions people ask before, during and after a claim: whether to file, what it does to the premium, how depreciation works, and what to do when the carrier says no.",
  blocks: [
    {
      type: "faq",
      items: [
        {
          question: "Should I file a claim for a small loss?",
          answer: [
            "Not always. A loss only slightly above the deductible pays little, and with some carriers it counts against you at renewal. Compare the repair cost with the deductible, then ask the office how your carrier treats claim history; we will say plainly if paying it yourself is the better decision.",
            "Do not skip filing when someone is injured or another party is involved. Those claims can grow, and late notice can cost you the coverage that would have paid them.",
          ],
        },
        {
          question: "Will a claim raise my premium?",
          answer: [
            "It can, and it depends on the carrier, the type of claim and who was at fault. Not-at-fault accidents and weather losses are treated differently from at-fault crashes or liability claims, and many carriers offer claim forgiveness or a look-back period after which a claim stops counting. Part of the analysis is reading your carrier's rating rules so you know before you file.",
          ],
        },
        {
          question: "How long do I have to report a claim?",
          answer: [
            "Policies say promptly or as soon as practicable rather than naming a fixed number of days, and carriers judge a delay by whether it hurt their ability to investigate. Report the same day when you can. Some coverages carry their own time limits, and lawsuits have statutes of limitation; if a loss is already weeks old, call the office before assuming it is too late.",
          ],
        },
        {
          question: "What does actual cash value mean on my estimate?",
          answer: [
            "The cost to replace the item today, less depreciation for its age and condition. A policy that pays replacement cost pays actual cash value first and releases the withheld depreciation after you repair or replace and send in the invoice. Roofs are the common surprise: some policies pay an older roof at actual cash value only, and the depreciation withheld can be a large share of the estimate.",
          ],
        },
        {
          question: "The adjuster's estimate is lower than my contractor's. What now?",
          answer: [
            "Send both to the office. Differences usually come from scope (items one estimate missed), unit prices, or code upgrades and matching the adjuster left out. The carrier's process allows a supplement: the contractor documents the missing items and the adjuster revises.",
            "If the gap survives that, the policy's appraisal clause lets each side pick an appraiser, and the two appraisers pick an umpire, to settle the amount without a lawsuit.",
          ],
        },
        {
          question: "My claim was denied. Is that final?",
          answer: [
            "No. A denial letter has to cite the policy language it relies on. Read it with the office; denials often turn on a fact the adjuster got wrong, a cause of loss that was misclassified, or an exclusion applied more broadly than it is written. Ask the carrier for a written reconsideration, and if that fails, the state Department of Insurance takes complaints about claim handling.",
          ],
        },
        {
          question: "Who pays when the other driver was at fault?",
          answer: [
            "Their liability coverage should, but their carrier investigates first and can dispute fault. Filing under your own collision coverage gets the car repaired now, less your deductible; your carrier then recovers from the other insurer and returns the deductible. In Utah, personal injury protection pays your own medical bills first regardless of fault. In Arizona, Nevada and Idaho, the at-fault driver's carrier is the primary payer for injuries.",
          ],
        },
        {
          question: "Does my policy pay for a rental car or a hotel?",
          answer: [
            "An auto policy pays for a rental only if you bought rental reimbursement, and then up to the daily and total limits on the declarations page. Home and renters policies include loss of use, which pays the extra cost of living elsewhere while a covered loss makes the home unlivable. Keep the receipts, and expect the carrier to pay the increase over your normal living costs rather than the whole hotel bill.",
          ],
        },
      ],
    },
    { type: "cta", heading: "Filing a claim now", body: "The steps, in order, and who to call at each one.", label: "How to file a claim", href: "/claims/how-to-file/" },
  ],
  seo: { description: "Claims questions answered: whether to file a small claim, premium effects, reporting deadlines, actual cash value, disputed estimates, denials and rentals." },
};
