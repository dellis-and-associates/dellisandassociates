import type { ArticleDraft } from "../types.mts";

export const draft: ArticleDraft = {
  title: "Getting divorced: updating beneficiaries and policies",
  excerpt: "A divorce splits one insured household into two, and the carriers act on who lives where while the court acts on the decree. Which policies to separate and when, the beneficiary forms that do not follow the will, the life insurance a decree can require, and the order that keeps both of you covered.",
  sections: [
    {
      heading: "",
      paragraphs: [
        "Insurance treats a marriage as a household, and a divorce takes the household apart in stages that do not line up with the legal ones. One spouse moves out months before the decree; the house is sold a year after it. The carriers respond to residency, so coverage changes the day someone moves, whether or not anything has been signed. The court responds to the decree, so a beneficiary form or a required life policy is governed by a document that may not exist yet. The work is to keep both people insured through the gap.",
        "This guide goes policy by policy: auto and home, where a spouse who moves out quietly loses coverage; health, where eligibility ends at the decree; life, where the beneficiary form and the decree can point in different directions; and the smaller pieces, umbrella and name changes. It closes with an order, because the mistake that costs most is removing a spouse from a policy before their own is in force.",
      ],
    },
    {
      heading: "Beneficiaries: the form beats the will, and the decree can beat the form",
      paragraphs: [
        "A life insurance policy, a group life certificate, a retirement account and an annuity each pay the person named on the carrier's beneficiary form, not the person named in a will, and not the person the policyholder would have chosen had they thought about it. A form filled out at the wedding still names the spouse. Each of the four states has a rule that treats a divorce as revoking many designations in favour of a former spouse, but the rule has holes: it generally does not reach employer plans governed by federal law, it does not reach a designation renewed after the divorce, and a carrier that pays the named person in good faith before learning of the divorce is usually protected. Relying on it is a lawsuit for the intended heirs rather than a payment.",
        "The reliable step is to submit new forms on every contract the month the decree is final, and to add a contingent beneficiary behind each primary. Where the children are minors, naming them directly means a court-supervised guardianship holds the money until they come of age; a trust or a custodial arrangement under the state's transfers-to-minors rules, named as beneficiary, is the usual fix and is a question for the attorney drafting the decree.",
        "The decree can also require the opposite of removal. Where one spouse pays child support or maintenance, courts commonly order that spouse to keep life insurance in force with the former spouse, or the children, as beneficiary for the length of the obligation, and sometimes as irrevocable beneficiary so the designation cannot be changed without consent. That is a contract term with the court behind it, and the policy has to exist before the form is filed.",
      ],
    },
    {
      heading: "Life insurance: who owns it, who is insured, who is paid",
      paragraphs: [
        "A life policy has three roles, and a divorce can leave them in three different hands. The owner controls the policy, pays for it and can change the beneficiary; the insured is the life it pays on; the beneficiary receives the money. A policy that one spouse owns on the other's life is marital property and, in Arizona, Nevada and Idaho, community property; Utah divides property by what a court finds equitable. Either way, the decree should say who keeps ownership of each policy and any cash value, and the carrier needs a signed change of ownership form to make it so.",
        "Suppose a decree orders the paying spouse to carry $500,000 of term coverage for fifteen years with the former spouse as irrevocable beneficiary on behalf of two children. A fifteen-year level term policy, owned by the paying spouse but with the beneficiary locked, costs that spouse perhaps $60 a month at good health. Ownership by the receiving spouse instead, with the paying spouse as insured and the premium built into the support order, gives the receiving spouse the notices if a premium is missed and is the arrangement many attorneys prefer. The figures are invented; the choice of owner is the real decision.",
        "Group life through an employer is the exception that catches people. Its beneficiary form is governed by federal plan rules, the state revocation rule generally does not apply, and the plan administrator pays whoever is on file. It has to be changed at the employer, not through the agent.",
      ],
    },
    {
      heading: "Auto: separate the policies before separating the drivers",
      paragraphs: [
        "A spouse who moves out is no longer a resident of the household, and the auto policy's coverage for them narrows to what any listed driver gets while they remain on it. The departing spouse needs a policy in their own name, rated at the new garaging address, with the car they are keeping listed on it. Only then should they be removed from the original policy. The other order, removing first, leaves a person driving a car with no policy that names them and a former household policy that may deny a claim.",
        "Ownership of the cars complicates this. A car titled in both names, or financed under both, has two people with an insurable interest, and the carrier of the spouse who keeps it wants the title and loan moved into that person's name or the other spouse listed on the policy until they are. The decree usually assigns the cars; the DMV transfer and the loan refinance are what the carriers act on. Watch the named insured line too. Only the named insured can cancel or change a policy, so a spouse who was merely a listed driver has no control over a policy they depend on, and a spouse who is the named insured can cancel it without the other's knowledge.",
      ],
    },
    {
      heading: "Home, contents and the spouse who leaves",
      paragraphs: [
        "The home policy covers the named insured and resident relatives. A spouse who moves to an apartment keeps some coverage for property they take with them for a period on most forms, but their new residence needs its own renters policy from the day they sleep there, and their liability for accidents at that apartment is theirs alone. The spouse who stays keeps the policy, but if the house is still titled in both names, the non-occupying owner has an interest the policy no longer clearly covers. Until the title transfers, the carrier should be asked to list both owners so a fire does not pay only one of them.",
        "If the house is to be sold and both spouses move out first, the vacancy clause applies: after a set number of consecutive days empty, coverage for vandalism, theft and freezing narrows or ends unless a vacancy endorsement is bought. A house in Ogden or Idaho Falls empty over a winter while a sale drags is the loss the clause was written for. Contents divided between two households should be re-inventoried, because the policy that covered a whole house of furniture is now covering half of one, and the departing spouse's renters policy needs a limit sized to what actually left.",
      ],
    },
    {
      heading: "Health coverage: eligibility ends at the decree",
      paragraphs: [
        "A spouse covered under the other's employer plan stays eligible through the separation and loses eligibility on the date the divorce is final. The employer must be told within a short period of the decree, and the loss of coverage opens a special enrollment period on the marketplace and on the newly single spouse's own employer plan, if there is one. Continuation coverage under the former spouse's plan is available to a divorced spouse for a longer period than for a departing employee, at the full premium, and is the fallback when a marketplace or employer plan cannot be arranged in time.",
        "Children's coverage is normally settled in the decree, which names the parent responsible for carrying them and often for the out-of-pocket costs as well. That parent's plan should show the children as dependants regardless of which household they live in most, and the other parent should hold the ID cards and know the network, since a child sees a doctor from whichever house they are in that week.",
      ],
    },
    {
      heading: "The order, and the timing traps",
      paragraphs: ["Separation and decree are different dates, and the carriers care about the first while the court cares about the second."],
      bullets: [
        "The week before anyone moves: bind a renters policy and an auto policy in the departing spouse's name, effective the moving date. Nothing is removed from the original policies yet.",
        "The day of the move: tell both carriers the new residency. The original auto policy can now drop the departed spouse as a driver; the home policy stays as it is until the title changes.",
        "While the decree is drafted: settle who owns each life policy, whether a policy is required for support, and who carries the children's health coverage. These become policy changes only when the decree is signed.",
        "Within days of the decree: notify the employer plan of the divorce, apply for the former spouse's replacement health coverage under the qualifying event, and send the decree to any carrier whose policy it touches.",
        "The month after: submit new beneficiary forms on every life policy, group certificate, retirement account and annuity, with contingents, and file the ownership changes the decree ordered.",
        "When titles transfer: move the house and the cars into single names and update the named insured on each policy the same week. An umbrella, if there was one, becomes two or none.",
        "After a name change: update the named insured line on every policy after the driving licence is reissued, in that order.",
      ],
    },
    {
      heading: "How to use this",
      paragraphs: [
        "Send us the moving date, the list of policies both of you hold and, once it exists, the decree. We set up the departing spouse's auto and renters policies before the move, keep the original policies intact until the transfers happen, quote any life policy the decree requires with the ownership arranged the way the attorney wants, and give both of you the beneficiary list to work through. The analysis costs nothing, and where a policy should simply be left alone until the house sells, that is what we will say.",
      ],
    },
  ],
  relatedProducts: ["life-insurance", "auto-insurance", "home-insurance", "renters-insurance", "health-insurance"],
  relatedArticles: ["how-to-name-life-insurance-beneficiaries-correctly", "how-to-cancel-an-insurance-policy-the-right-way", "how-to-switch-insurance-companies-without-a-coverage-lapse", "how-to-update-insurance-after-a-move", "group-life-vs-individual-life-insurance", "how-to-insure-a-vacant-home"],
  relatedTerms: ["beneficiary-designation", "irrevocable-beneficiary", "contingent-beneficiary", "named-insured", "cash-value-life-insurance", "open-enrollment-period"],
  relatedStates: ["arizona", "nevada", "utah", "idaho"],
};
