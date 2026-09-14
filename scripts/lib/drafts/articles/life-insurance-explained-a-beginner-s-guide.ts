import type { ArticleDraft } from "../types.mts";

export const draft: ArticleDraft = {
  title: "Life insurance explained: a beginner's guide",
  excerpt: "A life policy is a contract with three roles, two broad designs and one number that matters more than the rest. How term and permanent policies work, how to size the death benefit from what it has to replace, what underwriting looks at, and the beneficiary mistakes that undo a good policy.",
  sections: [
    {
      heading: "",
      paragraphs: [
        "Life insurance is simpler than the way it is sold. A carrier promises to pay a stated sum, the death benefit, to a named person, the beneficiary, if the insured person dies while the policy is in force. In return the owner pays a premium. Everything else in the industry, from term lengths to cash value to riders, is a variation on those three roles and that one promise.",
        "This guide walks through the two designs you will actually be offered, how to decide the amount, what the carrier does before it agrees to insure you, and where people get the paperwork wrong. It does not quote a premium. That depends on age, health, tobacco use, the amount and the design, and it is the last thing to look at rather than the first.",
      ],
    },
    {
      heading: "The three roles, and why they are not always the same person",
      paragraphs: [
        "Every policy has an owner, an insured and a beneficiary. The owner controls the policy: pays the premium, changes the beneficiary, borrows against cash value if there is any, and can cancel it. The insured is the life the policy is measured on. The beneficiary receives the money. In the common case one spouse is owner and insured and the other is beneficiary, and nothing needs thinking about.",
        "It matters when the roles split. A business may own a policy on a partner. A parent may own a policy on an adult child. A trust may own a policy so that the proceeds sit outside an estate. Each of those arrangements changes who can make decisions and who is taxed, and each is worth a short conversation before the application is signed rather than after.",
      ],
    },
    {
      heading: "Term life: coverage for a set number of years",
      paragraphs: [
        "A term policy covers a fixed period, commonly ten, twenty or thirty years, at a premium that stays level for that period. If the insured dies inside the term, the beneficiary is paid. If the term ends first, the policy ends and nothing is paid back; you bought protection and used the years. That is not a flaw. It is the reason a healthy thirty-five-year-old can buy a large death benefit for a modest premium: the carrier expects most term policies to expire unpaid.",
        "Three features decide whether a term policy is a good one. The premium should be level, not annually renewable, or it climbs each year. The policy should be convertible, meaning it can be exchanged for a permanent policy from the same carrier without a new medical exam, which matters if your health changes at year fifteen. And the term should outlast the obligation it covers: a mortgage with twenty-five years left is not well served by a ten-year policy.",
        "At the end of the term most policies allow renewal year by year at a much higher premium based on your age at that point. Treat that as a bridge, not a plan. If you still need coverage when the term is ending, the time to decide is a couple of years out, while conversion is still available.",
      ],
    },
    {
      heading: "Permanent life: whole, universal and indexed universal",
      paragraphs: [
        "A permanent policy is designed to stay in force for life, as long as the premium is paid, and it builds a cash value inside the policy that the owner can borrow against or withdraw. The premium is higher than term for the same death benefit because part of it funds that cash value and part of it prepays for the years when insuring an older person would otherwise cost more than anyone would pay.",
        "Whole life fixes the premium, the death benefit and a minimum cash value growth in the contract; a participating policy may also pay dividends that are not promised. Universal life separates the insurance cost from the savings component and lets the owner vary the premium within limits, which is flexible and also the way people accidentally let a policy lapse by underfunding it. Indexed universal life credits interest to the cash value based on a market index, with a floor and a cap set by the carrier; the floor limits losses, the cap limits gains, and the illustration you are shown is a projection, not a promise.",
        "The decision rule is short. If the need ends on a date, a mortgage, children reaching independence, a business loan, buy term for that period. If the need never ends, estate liquidity, a lifelong dependant, a buy-sell agreement between partners, funeral and final expenses, a permanent policy is the tool. Many households sensibly hold both: a large term policy for the years of heavy obligation and a small permanent one that stays.",
      ],
    },
    {
      heading: "How much: size it from what it has to replace",
      paragraphs: [
        "The amount is not a multiple of salary pulled from a rule of thumb. It is the sum of what would go wrong financially if the insured died, less what is already in place. List the pieces: the income the household would lose until the youngest child is independent, the debts that should be cleared, the cost of education, final expenses, and a margin for the years it takes a surviving spouse to reorganise. Subtract savings, existing group coverage from an employer, and any policy already held.",
        "Suppose one earner brings home $60,000 a year, the household wants that replaced for fifteen years, the mortgage balance is $250,000, and there is $50,000 in savings plus a $100,000 group policy at work. Fifteen years of income is $900,000; add the mortgage for $1,150,000; subtract the $150,000 already in place and the gap is roughly $1,000,000. Those are round numbers for illustration, and the income figure could be discounted because the proceeds would be invested, but the shape of the arithmetic is the point. Group coverage through an employer is worth counting and not worth relying on: it usually ends when the job does.",
      ],
    },
    {
      heading: "Underwriting: what the carrier looks at and why the premium moves",
      paragraphs: [
        "Before issuing a policy the carrier assesses how likely it is to pay. The application asks about health history, medications, family history, tobacco and nicotine use, driving record, occupation, hobbies like flying or climbing, and travel. Many policies require a paramedical exam, a short visit for blood, urine, height, weight and blood pressure; some carriers now offer accelerated underwriting that skips the exam for healthy applicants below a certain amount, using prescription and motor vehicle databases instead.",
        "The result is a rate class, from preferred plus down through standard to rated classes that carry a surcharge. Tobacco is the single largest lever after age; a nicotine user typically pays a multiple of a non-user's premium for the same policy, and most carriers require a stated period free of nicotine before reclassifying. Two clauses in every policy follow from underwriting: a contestability period during which the carrier can rescind the policy for material misstatements on the application, and a suicide exclusion for a stated early period. Answer the application completely. A forgotten prescription is the commonest reason a claim is contested.",
      ],
    },
    {
      heading: "Beneficiaries: where good policies go wrong",
      paragraphs: ["The death benefit goes to the people named on the form, not the people named in a will, and the form is checked less often than it should be."],
      bullets: [
        "Name a contingent beneficiary. If the primary dies first and there is no contingent, the proceeds usually go to the estate and through probate, which is slow and public.",
        "Do not name a minor child directly. A carrier cannot pay a child; a court will appoint a guardian for the money. Name a trust or a custodian under a uniform transfers to minors arrangement instead.",
        "Decide between per capita and per stirpes. Per stirpes passes a deceased child's share to that child's children; per capita divides among the survivors only. The default varies by carrier, so state it.",
        "Update after marriage, divorce, births and deaths. In some states a divorce revokes a former spouse's designation automatically and in others it does not; do not rely on either.",
        "Keep the owner and the insured aligned with the plan. A policy owned by the insured is part of the insured's taxable estate; that only matters above the federal and any state thresholds, but a large policy is exactly the case where it does.",
      ],
    },
    {
      heading: "Riders worth asking about",
      paragraphs: [
        "A rider is an addition to the base contract, usually for a small extra premium. Waiver of premium keeps the policy in force without payments if the insured becomes disabled. An accelerated death benefit lets a terminally ill insured draw part of the benefit early; many carriers now include it at no charge. A guaranteed insurability rider on a young person's policy lets them buy more coverage at set future dates without new underwriting. A child rider adds a small benefit on each child. A return of premium rider on term refunds the premiums paid if you outlive the term, at a materially higher cost, and is usually a worse deal than investing the difference.",
      ],
    },
    {
      heading: "How to use this",
      paragraphs: [
        "Write down four things: the obligations the policy has to cover and the year each ends, what coverage already exists and whether it depends on a job, who the money should go to and through what structure, and any health or tobacco facts that will shape the rate class. From those we can say whether term, permanent or a mix fits, and put the amount against the carriers we represent in Arizona, Nevada, Utah and Idaho. If the group policy at work and the term policy you bought a decade ago already cover the gap, the analysis ends there and that is what we will tell you.",
      ],
    },
  ],
  relatedProducts: ["life-insurance", "term-life-insurance", "whole-life-insurance", "indexed-universal-life-insurance"],
  relatedArticles: ["term-life-vs-whole-life-insurance", "how-to-choose-life-insurance-coverage-amounts", "how-to-name-life-insurance-beneficiaries-correctly", "having-a-baby-updating-your-life-insurance", "whole-life-vs-universal-life-insurance"],
  relatedTerms: ["beneficiary-designation", "contingent-beneficiary", "cash-value-life-insurance", "incontestability-clause", "per-stirpes-designation", "waiver-of-premium-rider"],
};
