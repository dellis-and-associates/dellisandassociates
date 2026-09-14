import type { ArticleDraft } from "../types.mts";

export const draft: ArticleDraft = {
  title: "Umbrella insurance explained: a beginner's guide",
  excerpt: "An umbrella policy sits above your auto, home and other liability limits and pays when a judgement runs past them. How it attaches, why it requires specific underlying limits, what it adds that the primary policies lack, what it excludes, and how to decide whether a household needs one at all.",
  sections: [
    {
      heading: "",
      paragraphs: [
        "A personal umbrella is the least complicated policy most households will ever buy and the one they most often have not heard of. It does one thing: when you are legally liable for injury or damage and the liability limit on your auto, home, boat or rental property policy is used up, the umbrella pays the rest, up to its own limit. It also pays for the defence once the underlying carrier's obligation ends.",
        "It is priced low relative to its limit because it almost never pays. The auto or home policy handles the ordinary claim, and the umbrella responds only to the serious one: a multi-car crash with several injured people, a guest paralysed at a pool, a teen driver who hits a cyclist. Those are the claims that are rare and that would otherwise be paid out of a house and a retirement account. This guide explains how the policy attaches, what it requires, and how to think about whether you need one.",
      ],
    },
    {
      heading: "How it attaches to the policies underneath",
      paragraphs: [
        "The umbrella is excess coverage. It does not pay first; it pays after a primary policy has paid its full limit. To make that work, the umbrella carrier requires that you carry stated minimum liability limits on each underlying policy: a specified bodily injury and property damage limit on auto, a specified personal liability limit on home, and similar figures for boats, motorcycles, rental properties and recreational vehicles. Those required limits are set by the umbrella carrier, not by the state, and they are usually well above what a minimum-limits auto policy carries.",
        "Suppose the umbrella carrier requires $250,000 per person and $500,000 per accident in bodily injury liability on the auto policy, and the household carries exactly that. An accident results in a judgement of $1,200,000 to one injured person. The auto policy pays its $250,000 per-person limit; the umbrella, with a $1,000,000 limit, pays the remaining $950,000. Had the household carried only $100,000 per person on the auto policy, the umbrella would still treat $250,000 as the attachment point, leaving a $150,000 gap the household pays itself. The figures are invented, but the gap is real and it is the commonest way an umbrella fails: the underlying policy was changed and the umbrella was not told.",
      ],
    },
    {
      heading: "What it covers that the primary policies do not",
      paragraphs: [
        "Beyond adding limit, most personal umbrellas are broader than the policies beneath them. They commonly cover personal injury offences such as libel, slander, defamation and false arrest, which a standard homeowner policy excludes unless endorsed. They cover liability arising from rental properties you own, boats and recreational vehicles, and often incidents while driving abroad. Where the umbrella covers a loss the underlying policies do not, it drops down and pays from the first dollar after a self-insured retention, a deductible-like figure you pay yourself. That retention is usually modest and applies only to these drop-down claims, not to claims that an underlying policy already paid on.",
        "Defence is included and, on most personal umbrellas, paid outside the limit. Once the primary carrier has paid its limit and withdrawn, the umbrella carrier takes over the defence at its own cost. For a long personal-injury lawsuit that is a significant benefit on its own.",
      ],
    },
    {
      heading: "What it does not cover",
      paragraphs: ["An umbrella follows the exclusions of the policies beneath it and adds its own."],
      bullets: [
        "Business and professional liability. A home-based business, a consulting practice or a landlord operation above a small number of units needs commercial coverage; the personal umbrella will not respond.",
        "Your own injuries or your own property. It is liability coverage only; it pays other people.",
        "Intentional acts, and in most forms criminal acts, including assault.",
        "Vehicles, boats and properties not listed on the underlying schedule. An unlisted ATV or a jet ski bought mid-season is usually outside both the umbrella and its required underlying policy.",
        "Contractual liability, except where the underlying policy covers it.",
        "Certain dogs, aircraft, and some recreational vehicles, depending on the carrier's rules; ask about anything unusual in the household.",
      ],
    },
    {
      heading: "Who needs one: a decision rule",
      paragraphs: [
        "The question is not whether you are wealthy. It is whether a judgement above your liability limits would take something you cannot afford to lose: home equity, savings, a business, or future wages, which can be garnished in all four states. A young professional with little saved and a high future income has a real exposure; so does a retiree with a paid-off house and a pension. Then look at what raises the odds of a large claim."
      ],
      bullets: [
        "A teen or young adult driver on the policy.",
        "A pool, a trampoline, a boat, an ATV, a motorcycle, or a large dog.",
        "Rental property, even a single condo.",
        "A long commute or a lot of driving in dense traffic in Phoenix, Las Vegas or along the Wasatch Front.",
        "Frequent guests, entertaining, or volunteer roles that put you in charge of other people's children.",
        "A public profile or a habit of reviewing businesses online, which raises defamation exposure.",
      ],
    },
    {
      heading: "How much, and what it costs to add more",
      paragraphs: [
        "Umbrellas are sold in round increments, and the first increment is the most expensive per dollar of coverage; each additional one costs less because the chance of a claim reaching that high falls sharply. The right limit is roughly the value of what could be taken from you, including several years of income, rounded up to the next increment. Owning rental property or having a young driver argues for a higher figure. The premium is driven mostly by how many cars, drivers, properties and toys sit underneath, and by the driving records of everyone in the household. A single ticket on a teen's record moves an umbrella premium more than most people expect.",
      ],
    },
    {
      heading: "Buying it: with the same carrier or separately",
      paragraphs: [
        "Most carriers prefer to write the umbrella over their own auto and home policies, and some require it. The advantage is that the underlying limits are checked automatically and one claims department handles the whole loss. A stand-alone umbrella from a different carrier is possible and sometimes necessary, for example when the auto carrier will not write umbrellas or the household has an exposure the primary carrier declines, but it puts the burden on you to keep the underlying limits at the required level every time a policy renews or a car is added. Whichever route, the umbrella application asks about every vehicle, property, driver and pet, and answering it completely is what makes the coverage reliable.",
      ],
    },
    {
      heading: "How to use this",
      paragraphs: [
        "Take the liability limits from every policy you hold and list every driver, property, boat and recreational vehicle in the household. If the sum of your home equity, savings and a few years of income is larger than the smallest liability limit on that list, an umbrella is worth pricing, and the first step is usually to raise the underlying limits to what the umbrella carrier requires. We quote both together across the carriers we represent in Arizona, Nevada, Utah and Idaho. If the exposure is genuinely small, we say so, and the advice is to spend the money on the underlying limits instead.",
      ],
    },
  ],
  relatedProducts: ["umbrella-insurance", "auto-insurance", "home-insurance", "boat-watercraft-insurance", "landlord-rental-property-insurance"],
  relatedArticles: ["umbrella-policy-vs-higher-liability-limits", "how-to-choose-umbrella-policy-coverage-limits", "home-insurance-explained-a-beginner-s-guide", "how-to-insure-a-pool-or-trampoline-for-liability", "a-checklist-for-insuring-your-new-teen-driver"],
  relatedTerms: ["umbrella-policy", "excess-liability", "self-insured-retention", "liability-coverage", "bodily-injury-liability"],
};
