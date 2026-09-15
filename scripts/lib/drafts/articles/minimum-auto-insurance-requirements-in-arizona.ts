import type { ArticleDraft } from "../types.mts";

export const draft: ArticleDraft = {
  title: "Minimum auto insurance requirements in Arizona",
  excerpt: "What Arizona requires a driver to carry, how the state checks, what happens when a policy lapses, and why the required minimums are a floor rather than a recommendation. Every statutory figure is cited to the statute itself.",
  sections: [
    {
      heading: "",
      paragraphs: [
        "Arizona requires every registered vehicle to carry liability insurance, and it checks. The figures below are the ones the state sets by statute, and we publish them only with a citation to the statute's own text; where a rule turns on a period or a penalty, we name the agency that states it rather than guess. The Department of Insurance and Financial Institutions publishes the current requirements at https://difi.az.gov/.",
        "This guide explains what the requirement covers, how the state enforces it, what a lapse costs, and why the minimum is a starting point rather than a plan. It applies to private passenger vehicles; commercial vehicles and vehicles for hire follow separate rules.",
      ],
    },
    {
      heading: "What the state requires",
      paragraphs: [
        "The required coverage is liability only: what you owe other people for injuries and property damage in an accident you cause. Arizona sets a per-person bodily injury limit of $25,000, a per-accident bodily injury limit of $50,000, and a property damage limit of $15,000, as the statute sets out at https://www.azleg.gov/ars/28/04009.htm. Written the way carriers print it, that is the familiar three-number form on a declarations page.",
        "Nothing in the requirement pays for your own car, your own injuries, or an accident caused by a driver with no insurance. Collision, comprehensive, medical payments and uninsured motorist coverage are all separate purchases. Whether a carrier must offer uninsured and underinsured motorist coverage, and whether you may reject it in writing, is set by Arizona law; the carrier's offer form shows the choice, and the Department of Insurance and Financial Institutions can explain the rule.",
      ],
    },
    {
      heading: "How the state checks",
      paragraphs: [
        "Arizona runs an electronic verification program: carriers report policies to the state, and the state matches them against registrations. A vehicle whose policy is reported cancelled and not replaced is flagged, and the owner receives notice to prove coverage. The state sets the mechanics and how long the owner has to respond, and the notice from the Motor Vehicle Division states the deadline.",
        "Two practical consequences follow. First, letting a policy lapse for even a short gap while switching carriers can trigger a notice, so a new policy should start the day the old one ends, not the day after. Second, proof of insurance must be carried in the vehicle, on paper or on a phone, and shown at a stop or after an accident.",
      ],
    },
    {
      heading: "What a lapse costs",
      paragraphs: [
        "Driving without the required coverage brings a fine, a registration suspension and a licence suspension, with amounts and periods set by statute that the Arizona Motor Vehicle Division can confirm. Reinstatement usually requires proof of current coverage and, for a period, a certificate of financial responsibility filed by the carrier, commonly called an SR-22.",
        "The larger cost is not the fine. A driver who causes an accident while uninsured owes the full amount personally, and Arizona allows the injured party to pursue it. The requirement exists so that the person hit by an uninsured driver is not left holding the bill; the same logic is why the minimum is a floor.",
      ],
    },
    {
      heading: "Why the minimum is a floor",
      paragraphs: [
        "The required limits were set to make sure a typical fender-bender is paid for. They were not set to cover a serious crash. Suppose you cause an accident that injures two people, and their medical bills come to $80,000 and $40,000 respectively. If your per-person limit is $25,000 and your per-accident limit is $50,000, the policy pays $25,000 for the first person and $25,000 for the second, and the remaining $70,000 is owed by you. These figures are hypothetical and only show how the limits interact.",
        "Property damage works the same way. A minimum property damage limit is usually less than the value of a new pickup, let alone two cars and a guardrail. Raising liability limits is, for most drivers, the least expensive change on the policy relative to what it buys, because most accidents never reach the limit and carriers price the increase accordingly.",
      ],
    },
    {
      heading: "What we recommend instead of the minimum",
      paragraphs: ["We do not quote a figure without a citation, but we can say how to think about it."],
      bullets: [
        "Set bodily injury and property damage limits from what a bad day would cost, not from the statute.",
        "Match uninsured and underinsured motorist limits to your liability limits; the other driver's coverage is the one thing you cannot control.",
        "If you own a home or have savings, ask whether an umbrella policy on top of the auto limit costs less than raising the auto limit further.",
        "Carry collision and comprehensive on a financed or recent car; weigh them against the car's value on an older one.",
        "Keep the policy continuous through any switch so the verification program never sees a gap.",
      ],
    },
    {
      heading: "Proof of insurance",
      paragraphs: [
        "Arizona accepts proof of insurance on paper or on a phone, and an officer may ask for it at any stop. The card the carrier issues shows the policy number and the period, not the limits, so it proves that a policy exists rather than what it pays. Keep the current card in the glove box and a photo of it on your phone, and replace both at every renewal; an expired card presented at a stop is treated as no proof at all.",
      ],
    },
    {
      heading: "Where the figures come from",
      paragraphs: [
        "The limits in this article are cited to the statute at https://www.azleg.gov/ars/28/04009.htm, and the Department of Insurance and Financial Institutions at https://difi.az.gov/ regulates carriers and takes complaints. Periods and penalties are left to the agency that states them. Arizona changes these figures by legislation, not often, but when it does the old figure is wrong the next day; the citation is the only way to know which one you are reading.",
        "If you are comparing policies for a car registered in Arizona, we will compare the limits on your current declarations page against the carriers we represent and show the math. If what you have is the right policy, that is what you will hear.",
      ],
    },
  ],
  relatedProducts: ["auto-insurance", "umbrella-insurance"],
  relatedArticles: ["auto-insurance-explained-a-beginner-s-guide", "sr-22-high-risk-insurance-rules-in-arizona", "how-to-switch-insurance-companies-without-a-coverage-lapse", "umbrella-policy-vs-higher-liability-limits"],
  relatedTerms: ["liability-coverage", "sr-22", "policy-lapse", "uninsured-motorist-coverage", "bodily-injury-liability", "property-damage-liability"],
  relatedStates: ["arizona"],
};
