import type { ArticleDraft } from "../types.mts";

export const draft: ArticleDraft = {
  title: "Whole life vs universal life insurance",
  excerpt: "Both are permanent policies with cash value, but whole life fixes the premium and the growth in the contract while universal life leaves both to move. How each is built, what actually differs when the money goes in, a worked example of a policy that underfunds, and a rule for choosing.",
  sections: [
    {
      heading: "",
      paragraphs: [
        "Whole life and universal life are the two permanent designs a carrier will offer once you have decided that a term policy is not the answer. Both pay a death benefit whenever the insured dies, both accumulate a cash value the owner can borrow against, and both cost more than term for the same face amount because they are built to still be in force at ninety. Sales illustrations for the two can look almost interchangeable, which is why people pick between them on a projected number and regret it a decade later.",
        "The difference is not the benefit. It is who carries the risk of the arithmetic inside the policy working out. Whole life puts that risk on the carrier and charges for it. Universal life hands most of it to the owner in exchange for flexibility and, usually, a lower premium at the start. This article sets out how each is built, shows what happens when interest rates or premiums drift, and gives a decision rule that does not depend on an illustration.",
      ],
    },
    {
      heading: "Whole life: everything fixed in the contract",
      paragraphs: [
        "A whole life policy states three things at issue and does not change them: the premium you pay, the death benefit, and a schedule of cash values the policy will reach each year if the premium is paid. The carrier works out a level premium that, invested at a conservative rate it commits to in the contract, will fund the death benefit for a lifetime. Because the premium is level and the cost of insuring an older person rises, the early years overpay and build the reserve that the late years draw down. That reserve is your cash value.",
        "A participating whole life policy from a mutual carrier may also pay dividends, a share of the carrier's surplus when mortality, expenses and investment returns come in better than the conservative assumptions. Dividends are not promised and are declared year by year. Owners commonly direct them to buy paid-up additions, small slices of extra fully-paid coverage that raise both the death benefit and the cash value, which is how a whole life policy grows beyond its contractual schedule without any extra premium.",
        "The trade is rigidity. The premium is due every year at the same figure, and the policy lapses if it stops being paid, although a policy with cash value can lend itself the premium for a while. You cannot pay less in a lean year or more in a good one without a rider designed for it.",
      ],
    },
    {
      heading: "Universal life: the same parts, unbundled",
      paragraphs: [
        "Universal life takes the pieces a whole life policy bundles and shows them separately. Each month the carrier deducts a cost of insurance charge, based on the insured's current age and the amount at risk, plus policy expenses, from the cash value. It credits interest to what remains at a rate it sets, subject to a guaranteed minimum stated in the contract. The owner pays premiums into the cash value, and within limits chooses how much and how often: enough to keep the account ahead of the charges, or a great deal more to build value faster.",
        "Because the pieces are visible and adjustable, the owner can raise or lower the death benefit, skip a premium when the cash value can carry the charges, or pay extra. Indexed universal life uses the same structure but credits interest tied to a market index with a floor and a cap instead of a declared rate; variable universal life invests the cash value in sub-accounts and has no floor. In each case the carrier's promises are narrower than under whole life: a minimum credited rate and a maximum schedule of insurance charges. Everything between those bounds is what the illustration guesses and what your policy actually does.",
      ],
    },
    {
      heading: "The mechanism that differs: who absorbs a bad decade",
      paragraphs: [
        "Under whole life, if interest rates fall or people live shorter lives than assumed, the carrier's dividends shrink but the contractual premium, death benefit and cash value schedule do not move. The owner's downside is limited to disappointing dividends. Under universal life, a fall in the credited rate means the cash value grows more slowly while the monthly insurance charges keep rising with age. If the owner keeps paying the premium shown on the original illustration, the account can start to shrink in the later years, and once it reaches zero the policy lapses unless a larger premium is paid.",
        "That is the failure that defines the product. A universal life policy sold on a projected credited rate that later ran below projection can look healthy for twenty years and then demand a sharply higher premium in the owner's seventies, exactly when the coverage was meant to be paid for. It is not a defect in the design; it is the design. The owner took on the interest-rate risk and the carrier's illustration was never a promise. Guaranteed universal life, a variant that fixes the premium needed to hold the death benefit to a stated age with little or no cash value, exists specifically to remove that risk for people who want permanent coverage without the savings component.",
      ],
    },
    {
      heading: "A worked example",
      paragraphs: [
        "Suppose two forty-year-olds each buy a $500,000 permanent policy. The first buys whole life at a level premium of $9,000 a year, fixed for life, with a contractual cash value schedule and dividends on top if declared. The second buys universal life and is shown an illustration at a credited rate of 6 percent that says $6,000 a year will hold the policy to age one hundred. Both are healthy; both pay every year.",
        "Now suppose the credited rate on the universal life policy averages 4 percent instead. For the first fifteen years nothing visible happens; the cash value grows more slowly than the illustration but the charges are still modest. By the mid-sixties the monthly insurance charge on $500,000 of coverage for a sixty-five-year-old has climbed past what $6,000 a year plus a smaller interest credit can cover, and the account begins to fall. An in-force illustration at that point might say the policy lapses at seventy-eight unless the premium rises to $11,000 a year. The whole life owner, meanwhile, has paid $3,000 a year more for twenty-five years, roughly $75,000, and holds a policy whose premium is unchanged and whose cash value is where the contract said it would be. The numbers are invented; the shape is the ordinary outcome when an illustration is optimistic. Had the universal life owner paid $8,000 a year from the start, or asked for an in-force illustration every few years and adjusted, the account would very likely have carried.",
      ],
    },
    {
      heading: "Who each design suits",
      paragraphs: ["The choice follows from how much attention the owner will pay and how much certainty the need requires."],
      bullets: [
        "Whole life suits a need that is fixed and permanent and an owner who wants no further decisions: funding an estate tax bill, a special-needs trust, a buy-sell agreement between business partners, or final expenses. It also suits someone who values the forced discipline of a fixed premium.",
        "Universal life suits an owner with variable income who will genuinely fund the policy heavily in good years, or one who wants the option to raise or lower the death benefit as a business or family changes, and who will review an in-force illustration regularly.",
        "Indexed universal life suits an owner comfortable treating the policy partly as a savings vehicle, who understands that the cap limits the upside and that the illustrated rate is a scenario. It is a poor choice for someone who will pay the minimum and forget it.",
        "Guaranteed universal life suits someone who needs a death benefit to a set age at the lowest committed premium and has no use for cash value; it behaves like a very long term policy.",
        "Neither suits a need that ends on a date. If the obligation is a mortgage or children's dependency, a term policy for that period is almost always the right tool and the permanent question can wait.",
      ],
    },
    {
      heading: "The decision rule",
      paragraphs: [
        "Ask two questions. Is the amount of coverage going to be the same in thirty years, and will you check on this policy every few years? If the amount is fixed and you will not check, buy whole life or guaranteed universal life and accept the higher or committed premium as the price of certainty. If the amount will change or you will actively manage the funding, universal life earns its flexibility, and the working rule is to fund it at a premium illustrated on a credited rate well below the current one rather than at the minimum.",
        "Two further checks apply to either design. Ask what the policy does if you overfund it: past a threshold the tax code treats it as a modified endowment contract, and withdrawals lose their favourable ordering. And ask for the column of contractual guarantees on the illustration, not just the projected one; a universal life policy whose guarantees column lapses at seventy is telling you what the carrier is actually promising.",
      ],
    },
    {
      heading: "When the answer is to keep what you have",
      paragraphs: [
        "A permanent policy that has been in force for years is usually worth more than a new one. The cost of insurance is set from the age at issue, the contestability period has passed, and the cash value has absorbed the early expense charges that a replacement would charge again. Swapping an old whole life policy for a new universal life policy on the strength of a lower illustrated premium is the classic replacement that hurts the owner; if a universal life policy is underfunded, the fix is usually a higher premium or a reduced face amount, not a new contract. A 1035 exchange can move cash value between policies without tax, but that solves the tax problem, not the cost problem.",
        "If you hold either design, the useful step is an in-force illustration from the carrier, which shows the policy from today forward on current assumptions. We read those for owners in Arizona, Nevada, Utah and Idaho, compare the policy against what a replacement would actually cost at today's age, and tell you whether to adjust the premium, reduce the benefit, or leave it alone. Most of the time the last of those is the recommendation, and the analysis costs nothing.",
      ],
    },
  ],
  relatedProducts: ["whole-life-insurance", "indexed-universal-life-insurance", "life-insurance"],
  relatedArticles: ["term-life-vs-whole-life-insurance", "life-insurance-explained-a-beginner-s-guide", "how-to-choose-life-insurance-coverage-amounts", "guaranteed-issue-vs-medically-underwritten-life"],
  relatedTerms: ["universal-life-insurance", "cash-value-life-insurance", "paid-up-additions", "dividend-options", "modified-endowment-contract", "indexed-universal-life"],
};
