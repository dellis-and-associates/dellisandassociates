import type { ArticleDraft } from "../types.mts";

export const draft: ArticleDraft = {
  title: "How to get SR-22 insurance",
  excerpt: "An SR-22 is not a policy but a form your carrier files with the state to prove you carry liability coverage, required after certain convictions. What triggers it, how to get one filed the same day, what it does to the premium, the non-owner route, and the mistake that restarts the clock.",
  sections: [
    {
      heading: "",
      paragraphs: [
        "The SR-22 is a certificate of financial responsibility. A state motor vehicle agency requires it when a driver has shown it cannot trust them to stay insured: after a conviction for driving under the influence, for driving without insurance, for an accident while uninsured, for accumulating enough points to lose the licence, or as a condition of getting the licence back. The carrier files the form electronically with the state, certifying that a liability policy meeting the state's minimum is in force, and it is then obliged to tell the state if the policy cancels or lapses. That second obligation is the point of the form: the state hears immediately if the coverage stops.",
        "Arizona, Nevada, Utah and Idaho all use the SR-22 or a close equivalent, and the process is much the same in each. This guide covers what triggers it, how to get one filed quickly, what to expect on the premium, how a driver without a car meets the requirement, and how to see the filing period through without resetting it.",
      ],
    },
    {
      heading: "What to gather",
      paragraphs: ["Have these ready before calling any carrier."],
      bullets: [
        "The letter or order from the court or the motor vehicle agency that requires the filing. It states the reason, the start date, how long the filing must be maintained and any conditions on reinstatement.",
        "Your driving record, which you can order from the state agency. The carrier will pull it anyway; knowing what is on it avoids surprises.",
        "Details of any vehicle you own or regularly drive, and whether it is financed.",
        "Your current policy, if you have one, and its declarations page.",
        "The reinstatement fee and any other fees the agency lists, and the address where the agency wants the filing sent if it is not electronic.",
      ],
    },
    {
      heading: "Step one: understand what is being required of you",
      paragraphs: [
        "Read the order. It will name the filing period, which is set by each state and by the offence, and it will say whether the period runs from the conviction, from the licence suspension, or from the reinstatement; it can also state a minimum liability limit that the certified policy must carry. The period and limits differ by state: {{TODO:statute.arizona.sr22-filing-period}}, {{TODO:statute.nevada.sr22-filing-period}}, {{TODO:statute.utah.sr22-filing-period}}, {{TODO:statute.idaho.sr22-filing-period}}. The filing period is continuous: any lapse in the certified policy during it is reported to the state, the licence is suspended again, and in most cases the period starts over from the date coverage resumes.",
        "Note also what the order says about the vehicle. The requirement follows the driver, not the car, so a driver who owns no vehicle still needs a filing to hold a licence, and a driver who sells the car mid-period still has to keep the certified policy in force.",
      ],
    },
    {
      heading: "Step two: find a carrier that will file, and ask before you buy",
      paragraphs: [
        "Not every carrier files SR-22 forms, and some that do will not write the underlying policy for a driver with the conviction that triggered it. Your current carrier may agree to add the filing to your existing policy, which is the simplest route; it may instead non-renew the policy because of the conviction, in which case you need a new carrier before the current period ends. Ask directly, before paying anything: does the carrier file SR-22s in this state, will it write a policy for a driver with this record, what is the filing fee, and how quickly does the filing reach the state.",
        "Carriers that write for drivers with convictions are called non-standard carriers, and an independent agent can quote several at once. The premium will be higher than a standard policy for two reasons that are worth separating: the conviction itself, which rates the driver as higher risk for a period whether or not a filing is required, and the filing, which usually carries only a small fee. People often blame the SR-22 for a premium that is in fact driven by the offence on the record.",
      ],
    },
    {
      heading: "Step three: bind the policy and get the filing made",
      paragraphs: [
        "Buy the policy with liability limits at or above whatever the order requires, and ask the carrier to file the SR-22 the same day. In all four states the filing is electronic and the agency usually records it within a day or two. Ask for a copy of the form and written confirmation of the date it was sent. Then contact the agency, pay the reinstatement fee and any other fees, and confirm that the filing is on record and the licence is reinstated. Do not drive until it is; driving on a suspended licence during the period is a fresh offence.",
        "Pay the policy in a way that cannot lapse. A six-month or annual policy paid in full removes the monthly payment risk entirely; if that is not possible, set the instalments to automatic payment and keep a margin in the account. A policy that cancels for non-payment is the commonest way the filing period restarts.",
      ],
    },
    {
      heading: "Step four: if you do not own a car",
      paragraphs: [
        "A driver who needs a filing but has no vehicle buys a non-owner policy. It provides liability coverage when you drive a car you do not own, such as a borrowed or rented one, and it can carry the SR-22 filing. It is cheaper than a policy on a vehicle because it covers no physical damage and assumes occasional use. It does not cover a car you own or have regular access to, so a driver who lives with a household car they use often does not qualify; the carrier will ask. It also does not cover a car owned by someone in your household, or a car given to you for regular use by an employer.",
        "The non-owner route is also how a driver whose car is off the road or sold keeps the filing continuous. Cancelling the vehicle policy without replacing it, even for a month between cars, is reported to the state as a lapse.",
      ],
    },
    {
      heading: "Step five: see the period out and close it properly",
      paragraphs: [
        "Mark the end date from the order, and confirm with the agency what happens at the end. In some states the requirement ends automatically; in others the driver must ask for it to be removed. Once the agency confirms the requirement is satisfied, tell the carrier to stop the filing, because carriers continue filing, and charging the fee, until told to stop. Then shop the policy again; the conviction will still be on the record and rated, but a driver who has completed a filing period without a lapse is a better risk than one who is starting it, and the difference shows in the quotes.",
        "Keep every document: the order, the SR-22 copies, the agency's reinstatement confirmation and the release. A future carrier, an employer or a court may ask for them years later.",
      ],
    },
    {
      heading: "Common mistakes",
      paragraphs: ["Each of these extends the period or adds a second suspension."],
      bullets: [
        "Letting the policy cancel for non-payment. The carrier is required to report it, and the period usually restarts.",
        "Switching carriers mid-period with a gap between the old policy's end and the new filing's start. The new carrier must file before the old policy ends.",
        "Assuming the requirement ends with the car when the car is sold. It follows the driver.",
        "Buying a non-owner policy while living with a car you drive regularly. The policy does not respond, and the filing is on a policy that does not cover your driving.",
        "Not confirming with the agency that the filing was received and the licence reinstated, and driving in the meantime.",
        "Forgetting to cancel the filing after the period, and paying the fee for years.",
        "Treating the whole premium increase as the cost of the form, and not shopping the conviction across several carriers.",
      ],
    },
    {
      heading: "A worked example",
      paragraphs: [
        "Suppose a driver in Las Vegas is convicted of driving under the influence and the agency requires an SR-22 for a period of three years from reinstatement. His existing carrier non-renews the policy. He owns a financed sedan. Through an independent agent he is quoted three non-standard carriers; the lowest of those that will file in Nevada comes to say $2,400 a year against the $1,100 he paid before, of which about $25 is the filing fee and the rest is the conviction and the loss of his prior claims-free discount. He binds it, paid in full, and the carrier files electronically the same afternoon. Two days later the agency confirms the filing, he pays a reinstatement fee of $100 or so, and his licence is restored. Eighteen months in, he sells the sedan and does not replace it for two months; he moves the filing to a non-owner policy at $600 a year for that gap rather than let it lapse. At the end of the three years he confirms with the agency, has the carrier stop the filing, and requotes at around $1,500 with the conviction ageing on his record. Had he let the policy cancel during the car-less months, the three years would have started again. Figures are hypothetical.",
      ],
    },
    {
      heading: "How to use this",
      paragraphs: [
        "Send us the court or agency order and your driving record and we quote the carriers we represent in Arizona, Nevada, Utah and Idaho that will both write the policy and file the SR-22, confirm the filing is made and received, and diary the end of the period so the filing is stopped and the policy requoted. If your current carrier will add the filing and its price is fair, staying put is the simplest answer and we will say so.",
      ],
    },
  ],
  relatedProducts: ["auto-insurance", "motorcycle-insurance"],
  relatedArticles: ["sr-22-high-risk-insurance-rules-in-arizona", "sr-22-high-risk-insurance-rules-in-nevada", "sr-22-high-risk-insurance-rules-in-utah", "sr-22-high-risk-insurance-rules-in-idaho", "standard-vs-non-standard-auto-insurance", "non-owner-auto-policy-vs-standard-auto-policy"],
  relatedTerms: ["sr-22", "non-owner-policy", "policy-lapse", "liability-coverage"],
  relatedStates: ["arizona", "nevada", "utah", "idaho"],
};
