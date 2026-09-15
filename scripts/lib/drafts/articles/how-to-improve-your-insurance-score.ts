import type { ArticleDraft } from "../types.mts";

export const draft: ArticleDraft = {
  title: "How to improve your insurance score",
  excerpt: "A credit-based insurance score is built from the same credit file as a lending score but weighted for claims risk, and it moves premiums in states that allow it. What feeds it, how to check and correct it, what raises it over months, and when to ask for a re-score.",
  sections: [
    {
      heading: "",
      paragraphs: [
        "Many auto and home carriers use a credit-based insurance score as one of the rating factors that sets the premium. It is built from the information in a consumer credit report, but it is not the lending score a bank uses, and it is designed to predict something different: the likelihood that a policyholder will file claims, rather than the likelihood of missing a loan payment. Carriers use it because, in their data, it correlates with claim frequency. Consumers dislike it because it is hard to see, it can change a premium materially, and it moves with events that have nothing to do with driving or home maintenance.",
        "The rules differ by state. Arizona, Nevada, Utah and Idaho each allow carriers to use credit information in personal lines rating within limits set by statute or regulation, such as restrictions on using the absence of credit history against a consumer and requirements to notify consumers of adverse action. The steps below work under any of those rules, and alongside the other factors that decide an insurance premium.",
      ],
    },
    {
      heading: "What goes into the score",
      paragraphs: [
        "Scoring models differ between vendors and carriers, but they draw on the same categories of credit behaviour, weighted differently from a lending score.",
      ],
      bullets: [
        "Payment history: late payments, collections, charge-offs and public records such as bankruptcies.",
        "Outstanding debt, particularly revolving balances measured against their credit limits.",
        "Length of credit history, including the age of the oldest account and how long the accounts have been open overall.",
        "Pursuit of new credit: recent applications that result in hard inquiries and newly opened accounts.",
        "Credit mix: the presence of instalment loans alongside revolving accounts.",
        "Not included: income, race, religion, national origin, marital status or gender, which credit-based insurance scoring models do not use and, under many state laws, may not use.",
      ],
    },
    {
      heading: "What to gather",
      paragraphs: ["Start with the source files the score is drawn from."],
      bullets: [
        "Your credit reports from the three national consumer credit bureaus, available free through the official annual credit report site.",
        "Any adverse action notice from a carrier stating that credit information affected your premium, which names the bureau used and the main reasons.",
        "Statements for revolving accounts showing balances and credit limits.",
        "Your CLUE reports for auto and property, and your motor vehicle record, since the premium also depends on claims and driving history.",
        "Your current declarations pages and renewal notices, to compare the premium over time.",
      ],
    },
    {
      heading: "Step one: correct errors in the credit report",
      paragraphs: [
        "Errors are more common than people expect and cost nothing to fix. Read each report for accounts you do not recognise, late payments you did not make, balances that do not match your statements, duplicate collections, and accounts that should have aged off. Dispute inaccuracies directly with the bureau reporting them, online or by mail, and include copies of the documents that show the correct information. The bureau must investigate and correct or remove information it cannot verify. Check the other two bureaus for the same error, since the carrier may use any of them.",
        "If an adverse action notice arrived from a carrier, it lists the specific reasons the score was not better. Those reasons are the most direct guide to what the model weighed against you.",
      ],
    },
    {
      heading: "Step two: change the behaviour the model rewards",
      paragraphs: [
        "Payment history carries the heaviest weight in most insurance scoring models. Set every account to automatic minimum payments so no payment is late, then pay above the minimum as the budget allows. A single late payment stays on the report for years, but its effect fades with time and with a run of on-time payments after it.",
        "Revolving balances are the second lever and the fastest to move. Paying down credit card balances, or asking for a higher credit limit on an account in good standing without spending more, lowers the share of available credit in use. Avoid closing old accounts in good standing, which shortens the credit history and reduces available credit. Hold off on applying for new credit in the months before shopping for insurance, since several new inquiries and accounts can lower the score for a time.",
      ],
    },
    {
      heading: "Step three: ask for a re-score at the right moment",
      paragraphs: [
        "Carriers often pull the insurance score when the policy is written and may not pull it again for years, so improvement in the credit file does not automatically reach the premium. After a meaningful change, such as a paid-off card or a corrected error, ask the carrier or agent whether it will re-score the policy at renewal. Some carriers re-score on request, some on a fixed cycle, and some only when the policyholder shops. The rules in some states require carriers to re-score on request at intervals, and those intervals vary by state.",
        "If a job loss, a serious illness, a divorce or the death of a spouse damaged the credit file, ask whether the carrier grants an exception for extraordinary life circumstances. Several states require carriers to consider such requests, and the carrier may set aside or reduce the credit factor while the file recovers.",
      ],
    },
    {
      heading: "Common mistakes",
      paragraphs: ["These are the errors that keep a score lower than it needs to be."],
      bullets: [
        "Assuming the insurance score is the same number shown by a credit card app.",
        "Closing old credit cards to tidy up the file.",
        "Opening a store card for a discount the week before shopping for insurance.",
        "Never requesting a re-score after paying down debt.",
        "Letting auto coverage lapse, which carriers rate separately and heavily.",
        "Ignoring an adverse action notice rather than reading the reasons listed.",
      ],
    },
    {
      heading: "A worked example",
      paragraphs: [
        "Suppose a couple in Meridian pay $2,400 a year for auto and home, and their carrier sends an adverse action notice citing high revolving balances and a collection account. They pull their credit reports and find the $600 medical collection was paid two years ago but still reported as open; they dispute it with the bureau and it is removed within a month. Over the next eight months they pay their card balances down from $12,000 against $15,000 of limits to $3,000. Before renewal they ask the carrier to re-score the policy, and the premium drops to $2,050, a saving of $350 a year with no change in coverage. The figures are hypothetical; the correction and the lower balances are what moved the score.",
      ],
    },
    {
      heading: "How to use this",
      paragraphs: [
        "If a renewal went up and the notice mentioned credit information, send it to us with your declarations pages. We will tell you whether the carrier will re-score, whether an extraordinary life circumstances exception applies, and how the same coverage prices across the carriers we represent in Arizona, Nevada, Utah and Idaho, some of which weigh credit differently. If your current carrier is already pricing you fairly, that is what we will tell you.",
      ],
    },
  ],
  relatedProducts: ["auto-insurance", "home-insurance"],
  relatedArticles: ["how-to-switch-insurance-companies-without-a-coverage-lapse", "how-to-lower-your-home-insurance-premium", "standard-vs-non-standard-auto-insurance", "how-insurance-actually-works-a-plain-english-guide"],
  relatedTerms: ["underwriting", "premium", "policy-lapse", "claims-free-discount"],
  relatedStates: ["arizona", "nevada", "utah", "idaho"],
};
