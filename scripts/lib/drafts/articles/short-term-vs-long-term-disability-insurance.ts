import type { ArticleDraft } from "../types.mts";

export const draft: ArticleDraft = {
  title: "Short-term vs long-term disability insurance",
  excerpt: "Short-term disability replaces part of a paycheck for weeks or months; long-term disability picks up after that and can pay for years. How elimination periods, benefit periods and the definition of disability decide what each pays, with a worked injury claim.",
  sections: [
    {
      heading: "",
      paragraphs: [
        "For a working adult, the ability to earn an income is usually the largest asset in the household, larger than the house or the retirement account, and it is the one least often insured. Disability insurance pays a monthly benefit when illness or injury keeps someone from working. It comes in two forms that are designed to hand off to each other: short-term coverage for the first part of an absence and long-term coverage for the part that could last years.",
        "People frequently hold one without the other, usually the short-term plan offered through work, and assume they are covered. The two differ in when they start, how long they pay, what counts as being disabled and how the benefit interacts with other income. Those differences decide whether a serious illness is an interruption or a financial emergency.",
      ],
    },
    {
      heading: "What short-term disability does",
      paragraphs: [
        "Short-term disability replaces a portion of pay for a limited period, commonly a few weeks up to several months. Benefits begin after a brief elimination period, which may be zero days for an accident and a week or two for an illness. It responds to the everyday absences of a working life: surgery and recovery, a broken bone, a complicated pregnancy and recovery from childbirth, a serious infection.",
        "Short-term coverage is mainly sold through employers, either paid by the employer or offered as a voluntary payroll deduction, and individual short-term policies are less common. The definition of disability is usually simple: the employee cannot perform the duties of their own job. Because the benefit is short, the policy does less to reduce itself for other income, and underwriting is light.",
      ],
    },
    {
      heading: "What long-term disability does",
      paragraphs: [
        "Long-term disability begins after a longer elimination period, commonly ninety or one hundred eighty days, which is chosen to line up with the end of a short-term plan or with the savings a household can live on. It then pays for a benefit period that might be two, five or ten years, or until a stated retirement age. It is the coverage that responds to cancer treatment that runs a year, a spinal injury, multiple sclerosis, a severe heart condition or a mental health condition that keeps someone out of work for a long stretch.",
        "Long-term coverage is available both through employers and as an individual policy. Individual policies can be written as non-cancelable or guaranteed renewable, which locks the premium and the terms or, in the second case, prevents cancellation while allowing class-wide rate changes. They can add a residual disability rider for partial return to work, a cost-of-living adjustment and a future increase option that lets the benefit grow with income without new medical underwriting.",
      ],
    },
    {
      heading: "The mechanism that actually differs",
      paragraphs: [
        "Three provisions do most of the work. The elimination period decides how long the household funds itself before benefits start, and a longer one lowers the premium substantially. The benefit period decides how long payments can continue, and it is where short-term and long-term coverage diverge most sharply. The definition of disability decides whether a claim is paid at all.",
        "That last provision matters most on long-term policies. An own-occupation definition pays if the insured cannot perform the material duties of their own occupation, even if they could do other work. An any-occupation definition pays only if they cannot do any job suited to their education and experience. Group long-term plans often use own occupation for an initial period and then switch to any occupation, while individual policies can keep an own-occupation definition for the whole benefit period. Long-term benefits are also typically reduced by Social Security disability, workers compensation and some retirement benefits, and taxation depends on who paid the premium: benefits from an employer-paid plan are generally taxable, while benefits from a policy paid with after-tax dollars generally are not.",
      ],
    },
    {
      heading: "A worked claim",
      paragraphs: [
        "Suppose an electrician in Reno earns $6,000 a month and injures his back badly in a weekend off-road accident, so workers compensation does not apply. His employer's short-term plan pays 60% of pay after a seven-day elimination period for up to thirteen weeks, which is $3,600 a month before tax. He also has an employer-paid long-term plan paying 60% after ninety days, reduced by any Social Security disability award. The short-term plan carries him from the second week through the third month.",
        "Now suppose recovery takes eighteen months. From the fourth month, the long-term plan pays $3,600 a month, taxable because the employer paid the premium. Say that at month twelve he is awarded Social Security disability of $1,800 a month; the long-term benefit falls to $1,800 so that combined income stays at the plan's target, and the carrier may ask for part of the retroactive Social Security award back. For example, had he also bought an individual policy with after-tax premiums paying $1,500 a month, that benefit would have continued untaxed and unreduced alongside the group benefit. All figures are illustrative.",
      ],
    },
    {
      heading: "Who needs which",
      paragraphs: ["Short-term coverage manages the common absences; long-term coverage protects against the rare ones that change a household's finances permanently."],
      bullets: [
        "Anyone who depends on their earnings needs long-term coverage first, because a year or more without income is the loss few households can absorb, while a few weeks can often be covered from savings and sick leave.",
        "Short-term coverage is valuable when an employer offers it inexpensively, when savings are thin, or when a pregnancy is planned, since maternity recovery is a frequent short-term claim.",
        "Self-employed people and business owners have no employer plan to rely on and usually need an individual long-term policy, possibly with a longer elimination period that their savings can bridge.",
        "Higher earners and professionals such as physicians, dentists and attorneys often find group long-term benefits capped well below their income and turn to an individual own-occupation policy to cover the difference.",
        "People in physically demanding trades should check whether individual coverage is available to them at all and at what occupation class, since carriers price by occupation.",
      ],
    },
    {
      heading: "Regional notes",
      paragraphs: [
        "Arizona, Nevada, Utah and Idaho do not operate state disability insurance programs of the kind a few other states run, so short-term income replacement in the region depends on employer plans, individual policies, paid leave and savings. Workers compensation in each state covers injuries and illnesses arising from work, which leaves weekend injuries, most cancers and chronic illnesses to disability coverage. Self-employed tradespeople, ranchers, gig workers and small-business owners across the region, many of whom have no employer plan, are the people most exposed to a long absence without any benefit at all.",
      ],
    },
    {
      heading: "When to keep what you have",
      paragraphs: [
        "An employee whose employer provides both short-term and long-term plans with an own-occupation period, a benefit period to retirement age and a benefit that covers the household's fixed costs may need nothing more, and the review is simply to understand the plan's definitions before a claim. An individual long-term policy bought years ago on non-cancelable terms is worth keeping even if a newer policy looks cheaper, because the older contract's definitions and locked premium are difficult to reproduce at an older age. The gaps worth closing are the household with only short-term coverage, the self-employed earner with none, and the higher earner whose group benefit is capped far below their pay. We read the plan documents, show the household's income against the benefit after offsets and taxes, and quote individual coverage from the carriers we represent in Arizona, Nevada, Utah and Idaho only where it adds something.",
      ],
    },
  ],
  relatedProducts: ["life-insurance", "health-insurance", "workers-compensation-insurance"],
  relatedArticles: ["losing-a-job-managing-insurance-coverage-gaps", "starting-a-small-business-insurance-basics", "group-life-vs-individual-life-insurance", "workers-compensation-insurance-explained-a-beginner-s-guide"],
  relatedTerms: ["elimination-period", "benefit-period", "temporary-total-disability", "permanent-total-disability", "coordination-of-benefits"],
};
