import type { ArticleDraft } from "../types.mts";

export const draft: ArticleDraft = {
  title: "How to lower your home insurance premium",
  excerpt: "A home premium is built from a handful of inputs: rebuild cost, deductible, roof, location, claims record, discounts and the carrier's own rates. Several can be moved without touching the coverage. The steps in order, what each does, and the cuts that cost more than they save.",
  sections: [
    {
      heading: "",
      paragraphs: [
        "Home insurance premiums in the Mountain West have moved up for reasons that have nothing to do with any one house: wildfire losses, hail and wind seasons, construction costs and carriers repricing whole regions. A homeowner cannot change those. What they can change is the set of inputs the carrier applies to their own address, and there are more of them than the renewal letter suggests. Some reduce the premium by changing what the policy pays; others reduce it by changing how the house looks to an underwriter, with the coverage untouched.",
        "This guide is a sequence of steps, from the ones that cost nothing and carry no risk to the ones that trade coverage for premium and need a deliberate decision. Do them in order, because the early ones frequently remove the need for the later ones. It ends with the reductions that look attractive and are not, and with a worked example showing how the pieces add up on one house.",
      ],
    },
    {
      heading: "Step one: check the rebuild cost, not the market value",
      paragraphs: [
        "The dwelling limit is the largest single driver of the premium, and it should equal what it would cost to rebuild the house, not what it would sell for and not the balance on the mortgage. Land is not insured. A house bought in a hot market in Boise or Gilbert may be insured at a figure that drifted upward with sale prices rather than construction costs; a house whose limit was set years ago may be under-insured after a run of construction inflation. Neither is a saving. The check is to ask the carrier for its replacement cost estimate, compare it to the square footage, construction type and finishes of the actual house, and correct the inputs that are wrong. A garage counted twice or a basement recorded as finished when it is not moves the limit and the premium.",
        "Two related settings sit beside the limit. Extended replacement cost adds a margin above the limit for the case where rebuilding costs more than estimated, and is worth keeping. Inflation guard raises the limit automatically each year; check that it has not compounded the limit past what the house needs. Contents coverage is usually set as a fraction of the dwelling limit and can be lowered if an inventory shows it is generous, though the scheduled items should stay scheduled.",
      ],
    },
    {
      heading: "Step two: collect the discounts you already qualify for",
      paragraphs: ["Discounts are applied only when the carrier knows about the thing that earns them. Go through the list and tell them."],
      bullets: [
        "Multi-policy: auto and home with the same carrier is the largest discount most households can earn, and it usually applies to both policies.",
        "Protective devices: a monitored alarm, water leak sensors with automatic shutoff, smoke detectors, and a sprinkler system each earn something; the automatic water shutoff is increasingly the one carriers reward most.",
        "Roof: a newer roof, and in hail-exposed parts of Utah and Idaho an impact-resistant one, is both a discount and a reason a carrier will keep writing the house.",
        "Claims-free: a period without claims earns a discount with many carriers and is one reason not to file small ones.",
        "Payment: paying annually rather than monthly avoids installment fees, and automatic payment or paperless billing earns a small credit with some carriers.",
        "Occupancy and age: retired homeowners, non-smoking households and newer homes are rated favourably by some carriers.",
        "Mitigation: in wildfire interface areas, documented defensible space, ember-resistant vents and a non-combustible roof and siding can be the difference between a quote and a declination, and carriers increasingly price them.",
      ],
    },
    {
      heading: "Step three: raise the deductible, deliberately",
      paragraphs: [
        "The deductible is the amount you pay on every claim before the carrier pays anything. Raising it lowers the premium because the carrier stops paying for the small claims it would otherwise handle. The right figure is the amount you could pay tomorrow without borrowing, and no higher; a deductible set for the premium saving rather than the bank balance turns a covered loss into an uncovered one. The saving from each step up is largest at the low end and shrinks as the deductible rises, so the carrier's quote at three or four deductible levels shows where the curve flattens.",
        "Check for separate deductibles. Many policies in Utah, Idaho and northern Nevada carry a wind and hail deductible set as a percentage of the dwelling limit rather than a flat figure, and it may be much higher than the all-other-perils deductible. A percentage deductible on a large dwelling limit is a large number; know it before a hailstorm rather than after.",
      ],
    },
    {
      heading: "Step four: fix the things underwriters see",
      paragraphs: [
        "A carrier prices what its inspection or its data shows. Some items raise the premium or block a discount and are fixable: an old roof, a wood-burning stove without a listed installation, a trampoline or an unfenced pool, a dog breed the carrier rates, knob-and-tube wiring or an old electrical panel, galvanised plumbing, a wood shake roof in a wildfire zone. Replacing a roof is expensive and usually done because it is needed; the premium reduction is a side effect. Fencing a pool, removing a trampoline, updating a panel or documenting a stove installation are cheaper and can change both the premium and the carrier's willingness to renew.",
        "Location factors are fixed, but the data about them is not always right. A house recorded as being far from a fire station when a new station has opened, or in a flood zone from which a map revision removed it, is paying for a risk it no longer has. The protection class and the flood zone determination are both worth confirming.",
      ],
    },
    {
      heading: "Step five: shop it, and then compare properly",
      paragraphs: [
        "Carriers price the same house differently, and the spread between them at the same coverage is often wider than any single discount. A comparison is only honest when the dwelling limit, the contents limit, the liability limit, the deductibles, the valuation basis and the endorsements match line by line; a lower quote that dropped replacement cost on contents or removed the water backup endorsement is a different policy, not a cheaper one. Ask for the quotes on identical terms, then compare the premium.",
        "A switch also has costs to weigh: a claims-free discount earned over years with one carrier resets, a multi-policy discount on the auto policy may end, and the new carrier will inspect and may ask for repairs. Switching at renewal avoids a short-rate cancellation charge. Loyalty is not rewarded by every carrier, and a long-standing policy that has never been shopped is the one most likely to be overpriced, but the arithmetic has to include the discounts lost.",
      ],
    },
    {
      heading: "Reductions that cost more than they save",
      paragraphs: ["Each of these lowers the premium and leaves a hole that a single claim falls through."],
      bullets: [
        "Lowering the dwelling limit below the rebuild cost. Many policies also reduce partial-loss payments when the limit is below a stated share of replacement cost, so an under-insured house is penalised on every claim, not only a total loss.",
        "Dropping the liability limit. The premium for personal liability is small relative to the limit; cutting it saves little and exposes the household's assets.",
        "Removing water backup, service line or ordinance-or-law endorsements on an older house. These are the claims older houses actually have.",
        "Switching contents from replacement cost to actual cash value. The saving is modest; the payout after a fire is dramatically smaller.",
        "Letting a flood or earthquake policy lapse because the base policy went up. They cover what the base policy excludes, and the lapse restarts any waiting period.",
        "Not reporting a renovation or an addition to save the premium increase. Unreported square footage is uninsured square footage.",
      ],
    },
    {
      heading: "A worked example",
      paragraphs: [
        "Suppose a house in Meridian is insured with a $500,000 dwelling limit, a $1,000 deductible, contents at $250,000 and a premium of $2,600. The owner reviews the rebuild estimate and finds the basement was recorded as finished; corrected, the limit falls to $460,000 and the premium to $2,420. Raising the deductible to $2,500, an amount they hold in savings, brings it to $2,180. Installing a leak sensor with automatic shutoff and moving the auto policy to the same carrier brings it to $1,900. They keep replacement cost on contents, keep the water backup endorsement, and keep the liability limit. Shopping the identical policy across other carriers produces one quote at $1,750 but with the loss of a claims-free discount earned over six years and a new inspection, so they stay. All figures are invented; the order of the steps is the recommendation.",
      ],
    },
    {
      heading: "How to use this",
      paragraphs: [
        "Send the declarations page and any inspection report, and we work down the list: correct the rebuild inputs, apply the discounts the carrier does not know about, quote the deductible options, and compare the identical policy across the carriers we represent in Arizona, Nevada, Utah and Idaho. Where the current carrier is already at a fair price for the coverage the house needs, the recommendation is to correct the inputs and leave the policy where it is.",
      ],
    },
  ],
  relatedProducts: ["home-insurance", "auto-insurance", "flood-insurance"],
  relatedArticles: ["how-to-choose-the-right-deductible", "how-to-bundle-home-and-auto-insurance", "replacement-cost-vs-extended-replacement-cost", "how-to-prepare-your-home-for-a-wildfire-insurance-inspection", "how-to-improve-your-insurance-score"],
  relatedTerms: ["replacement-cost", "wind-hail-deductible", "claims-free-discount", "multi-policy-discount", "co-insurance", "wildfire-mitigation"],
  relatedStates: ["arizona", "nevada", "utah", "idaho"],
};
