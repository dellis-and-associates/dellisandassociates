import type { ArticleDraft } from "../types.mts";

export const draft: ArticleDraft = {
  title: "Annual vs six-month auto insurance policies",
  excerpt: "A six-month auto policy is re-rated twice a year; an annual policy holds its rate for twelve months. How the term length changes when tickets, claims and rate increases reach your premium, how it differs from payment frequency, and a worked example of both.",
  sections: [
    {
      heading: "",
      paragraphs: [
        "Auto policies are written for a set term, and in personal auto the two common terms are six months and twelve. Many carriers offer only six-month policies, some offer only annual ones, and a few offer both. The term shows on the declarations page as the policy period, and it is easy to confuse with the payment schedule, which is a separate choice.",
        "The term length decides how long the premium is fixed, how often the carrier re-rates the policy using updated driving records and rate tables, and how often either side can walk away at renewal. None of that changes what the policy covers. It changes the timing of when good and bad news reaches the price.",
      ],
    },
    {
      heading: "What a six-month policy does",
      paragraphs: [
        "A six-month policy runs for half a year and then renews. At each renewal the carrier can apply its current rates, pull an updated motor vehicle report and claims history, reapply credit-based insurance scores where permitted, and adjust discounts. A new ticket or at-fault claim can appear in the premium within months, and an improvement, such as an old violation ageing off the record or a young driver reaching an age that rates lower, can reduce it just as quickly.",
        "Carriers also have a renewal decision point twice a year. After a policy's initial underwriting period, state rules generally limit the reasons a carrier can cancel mid-term, but it can choose not to renew at expiration with proper notice. A shorter term means those decisions come around more often.",
      ],
    },
    {
      heading: "What an annual policy does",
      paragraphs: [
        "An annual policy holds the premium for twelve months, subject to changes the policyholder makes, such as adding a vehicle or driver, moving, or changing coverage. A carrier's filed rate increase does not reach the policy until the annual renewal, and a violation or claim during the term is generally not surcharged until then. Improvements also wait for the renewal to be recognised.",
        "Annual policies are more common with carriers that write preferred drivers and with policies bundled alongside a homeowner policy, where a matching annual term simplifies renewals. They can offer a meaningful pay-in-full discount for paying the whole year's premium at once, though many also allow monthly or quarterly installments.",
      ],
    },
    {
      heading: "The mechanism that actually differs",
      paragraphs: [
        "The difference is the re-rating interval, not the coverage or the total cost per month. A six-month term exposes the premium to the carrier's current rates and the driver's current record twice a year; an annual term does so once. In a rising rate environment, or for a household expecting a new ticket or accident to count against it, a longer term delays the increase. In a falling rate environment, or for a household whose risk profile is improving, a shorter term brings the reduction sooner.",
        "Payment frequency is a separate lever. Monthly billing on either term usually carries installment fees or a slightly higher total, and a missed payment can trigger cancellation for non-payment on either one. Paying in full avoids fees and often earns a discount, and on an annual policy that means a larger single payment. Renewal notice periods, cancellation rules and the carrier's ability to non-renew are set by state law and the policy, and they apply at whichever renewal date the term produces.",
      ],
    },
    {
      heading: "A worked example",
      paragraphs: [
        "Suppose a driver in Chandler pays $1,800 a year for coverage, either as an annual policy or as two six-month terms of $900. In the second month of the year she receives a speeding ticket that her carrier surcharges at $200 per six-month term. On a six-month policy, the surcharge appears at the first renewal and she pays $1,100 for months seven through twelve, raising the year to $2,000. On an annual policy, the full year stays at $1,800 and the surcharge arrives with the renewal at month twelve. Say the ticket stays on her rating record for three years either way; the annual term shifts the timing of the extra cost rather than removing it.",
        "Now suppose instead that her son turns twenty-five in the third month of the year and his rate on the household policy falls by $300 per year. For example, on a six-month policy, half of that reduction arrives at month six. On an annual policy, the household keeps paying the higher rate until month twelve. And suppose the carrier takes a statewide rate increase of 8% effective in month four; a six-month policy reflects it at month six, while an annual policy reflects it at month twelve. All figures are illustrative.",
      ],
    },
    {
      heading: "Who each suits",
      paragraphs: ["The better term depends on which way the household's rating is heading and how much it values predictability."],
      bullets: [
        "An annual term suits households that want a fixed cost for budgeting, that expect rates in their market to rise, or that are bundling auto with an annual homeowner policy.",
        "A six-month term suits households whose rating factors are improving, such as a violation about to age off, a young driver approaching a lower-rated age, or a recently improved credit history where that is used in rating.",
        "Drivers who have just had a ticket or accident may prefer an annual term if one is available at a comparable price, since it delays the surcharge, but they should not switch carriers solely for that reason.",
        "Drivers with an SR-22 filing or a history of lapses gain little from either term and should focus on keeping coverage continuously in force, since a lapse at any renewal is reported and expensive.",
        "Households that pay in full should compare the pay-in-full discount on each term, since it can be larger on an annual policy.",
      ],
    },
    {
      heading: "Regional notes",
      paragraphs: [
        "Personal auto carriers in Arizona, Nevada, Utah and Idaho write both six-month and annual terms, and which is available depends on the carrier rather than the state. Auto premiums across the region have risen in recent years with repair costs and injury claim costs, which has made the rate stability of an annual term more attractive to some drivers. Winter visitors to Arizona and southern Nevada who garage a vehicle part of the year, and Idaho and Utah households with seasonal vehicles, can adjust coverage mid-term on either type of policy. Utah's personal injury protection requirement and the at-fault liability systems in the other three states apply identically to both terms.",
      ],
    },
    {
      heading: "When to keep what you have",
      paragraphs: [
        "For a typical driver, the term length is a minor factor next to coverage limits, deductibles and the carrier's overall price, and a policy that fits on those measures should not be moved just to change terms. A household that already has an annual policy bundled with its home, or a six-month policy with a carrier that has priced it well for years, is usually best left where it is. Term length becomes worth discussing when a household expects a change in its rating, or when a carrier offering the other term is otherwise competitive. We compare both terms where available across the carriers we represent in Arizona, Nevada, Utah and Idaho, and if the current policy already makes sense, we say so.",
      ],
    },
  ],
  relatedProducts: ["auto-insurance", "motorcycle-insurance", "umbrella-insurance"],
  relatedArticles: ["how-to-switch-insurance-companies-without-a-coverage-lapse", "how-to-read-your-auto-insurance-declarations-page", "how-to-add-a-teen-driver-to-your-policy", "bundling-vs-separate-auto-home-policies", "how-to-cancel-an-insurance-policy-the-right-way"],
  relatedTerms: ["premium", "declarations-page", "grace-period", "policy-lapse", "claims-free-discount", "good-student-discount"],
};
