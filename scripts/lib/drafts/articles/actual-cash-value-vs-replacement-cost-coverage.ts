import type { ArticleDraft } from "../types.mts";

export const draft: ArticleDraft = {
  title: "Actual cash value vs replacement cost coverage",
  excerpt: "Two valuation clauses decide how much a property claim pays: replacement cost buys the item new, actual cash value deducts for age and wear. How each is calculated, where the holdback and the roof schedule hide, a worked claim on each basis, and when the cheaper clause is the sensible one.",
  sections: [
    {
      heading: "",
      paragraphs: [
        "Every property policy has to answer one question before it pays a dollar: what is the damaged thing worth? The two standard answers are replacement cost, the amount it takes to buy or rebuild the same thing new today, and actual cash value, that same amount less depreciation for age, wear and obsolescence. The peril, the deductible and the limit can be identical on two policies and the cheques at the end will still differ by the depreciation.",
        "The clause appears in more places than people expect: on the dwelling, on personal property, on a roof schedule buried in an endorsement, on a rental property form, on a renters policy and, in the form of the total loss settlement, on every auto policy. Knowing which basis applies to each part of what you own is the difference between being restored after a loss and being partly restored.",
      ],
    },
    {
      heading: "How replacement cost is calculated",
      paragraphs: [
        "For a building, replacement cost is the estimated cost to rebuild with materials of like kind and quality at current local prices, including labour, permits and debris removal, up to the dwelling limit. It is not market value; a house in a cheap neighbourhood can cost more to rebuild than it would sell for, and one on expensive land can cost far less. For contents, it is the price of a comparable new item today, which for electronics is often less than the original purchase price and for furniture usually more.",
        "Most replacement cost policies pay in two stages. The adjuster first pays actual cash value, then releases the depreciation holdback once the item is actually repaired or replaced and receipts are submitted, within a period stated in the policy. A household that takes the first cheque and never rebuilds or replaces has effectively received an actual cash value settlement, which is the commonest way a replacement cost policy underdelivers.",
      ],
    },
    {
      heading: "How actual cash value is calculated",
      paragraphs: [
        "Actual cash value starts from the same replacement cost figure and subtracts depreciation. The adjuster assigns each item a useful life and a condition, then reduces the value in proportion to the age used. A five-year-old television with a ten-year expected life is depreciated by half; a three-year-old shingle roof on a twenty-year schedule loses a smaller share. In a few states and under some contract wording, actual cash value is defined instead as fair market value or by a broad evidence rule that considers both, but the depreciation approach is what you will meet in practice across the four states.",
        "Depreciation is contestable. The useful life assigned to an item, whether it was in better than average condition, and whether labour as well as materials should be depreciated are all matters on which adjusters and policyholders disagree, and the appraisal clause exists for exactly those disputes.",
      ],
    },
    {
      heading: "Where the clause hides on a homeowners policy",
      paragraphs: ["The declarations page rarely says which basis applies in plain words. Look for these."],
      bullets: [
        "Dwelling: almost always replacement cost on a standard homeowners form, provided the limit is kept at or near the estimated rebuild cost. Some forms reduce the settlement toward actual cash value if the limit is well below the rebuild figure.",
        "Personal property: actual cash value on an unendorsed HO-3, replacement cost when the contents endorsement is added or on an HO-5. This is the line to check first.",
        "Roof: carriers in hail and sun-exposed markets increasingly attach a roof payment schedule that settles wind and hail damage to older roofs at actual cash value, or on a percentage-of-age scale, even when the rest of the dwelling is at replacement cost.",
        "Other structures, such as a detached garage or a fence: usually follows the dwelling, but fences are sometimes carved out to actual cash value.",
        "Landlord and dwelling fire forms: many are written at actual cash value as standard, with replacement cost available for an additional premium.",
        "Auto physical damage: a total loss is settled at actual cash value everywhere, which is why new-car replacement and gap coverages exist as separate additions.",
      ],
    },
    {
      heading: "A worked example",
      paragraphs: [
        "Suppose a hailstorm in Mesa destroys a fifteen-year-old shingle roof that would cost $24,000 to replace today, and the home carries a $2,000 wind and hail deductible. Under a replacement cost settlement the carrier pays $22,000, in two stages: perhaps $10,000 up front as actual cash value and the remaining $12,000 when the new roof is installed and invoiced. Under an actual cash value roof schedule that treats a shingle roof as having a twenty-year life, the adjuster depreciates the roof by three-quarters, values it at $6,000, subtracts the deductible and pays $4,000. The homeowner supplies the other $20,000 or lives with a patched roof. The figures are round and invented, but the gap is the mechanism.",
        "For example, say the same storm breaks a window and rain ruins a six-year-old sectional sofa that would cost $3,000 new. On an actual cash value contents basis with a ten-year life, the sofa is worth $1,200; on replacement cost it is worth $3,000 once a new one is bought. Multiply that across a room and the contents clause decides whether a household can refurnish.",
      ],
    },
    {
      heading: "Who each basis suits",
      paragraphs: [
        "Replacement cost is the right basis for anything you would actually replace after a loss: the house you live in, the contents you use daily, the roof over both. The additional premium is usually modest relative to the extra payout on a serious claim, and the two-stage payment is an inconvenience rather than a cost.",
        "Actual cash value is defensible where you would not replace like with like. A landlord who would sell rather than rebuild a badly damaged rental, an older outbuilding you would demolish, a vehicle whose value has fallen far enough that the physical damage premium no longer earns its keep, or a seasonal property furnished with second-hand pieces you would not buy new. It is also the basis you may have to accept on an older roof if you want a standard carrier to write the house at all; in that case the mitigation is to budget for the roof rather than to argue with the schedule.",
      ],
    },
    {
      heading: "Regional notes",
      paragraphs: [
        "Roof schedules are the live issue in the region. Arizona and Nevada carriers respond to sun-baked shingles and monsoon hail by moving older roofs to actual cash value or declining them; Utah and Idaho carriers see more hail and snow-load damage and are heading the same way for roofs past a certain age. A new roof often restores replacement cost settlement and earns a premium credit, which is worth pricing before the roof fails rather than after. On the auto side, all four states settle total losses at actual cash value, and the difference between that figure and a loan balance on a recently purchased vehicle is a gap coverage question, not a valuation one.",
      ],
    },
    {
      heading: "When to keep what you have",
      paragraphs: [
        "If the dwelling and contents are both at replacement cost and the roof is young enough to escape a schedule, the policy is already on the right basis and the only maintenance is keeping the dwelling limit current with construction costs. If the contents are at actual cash value, adding the replacement cost endorsement is usually the least expensive improvement available and does not require a change of carrier. Moving carriers purely to escape a roof schedule rarely works, because the schedule follows the roof's age rather than the company.",
      ],
    },
    {
      heading: "How to use this",
      paragraphs: [
        "Take the declarations page and any roof or contents endorsements and mark each line as replacement cost or actual cash value. Anything at actual cash value that you would replace after a loss is a candidate for change. We can show what the endorsement or the form change costs across the carriers we represent in Arizona, Nevada, Utah and Idaho, and if the policy is already settling everything that matters at replacement cost, that is the answer and we will say so.",
      ],
    },
  ],
  relatedProducts: ["home-insurance", "renters-insurance", "auto-insurance"],
  relatedArticles: ["replacement-cost-vs-extended-replacement-cost", "how-to-build-a-home-inventory-for-insurance-claims", "ho-3-vs-ho-5-homeowners-policies", "how-to-lower-your-home-insurance-premium"],
  relatedTerms: ["actual-cash-value", "replacement-cost", "betterment", "wind-hail-deductible", "appraisal-clause"],
};
