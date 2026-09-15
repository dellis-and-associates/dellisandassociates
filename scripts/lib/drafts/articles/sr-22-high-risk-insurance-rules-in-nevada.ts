import type { ArticleDraft } from "../types.mts";

export const draft: ArticleDraft = {
  title: "SR-22 and high-risk insurance rules in Nevada",
  excerpt: "How an SR-22 requirement reaches a Nevada driver, what the Nevada DMV needs on file before a licence comes back, how motorcycles, second cars and household drivers complicate the filing, and the lapses that restart the clock.",
  sections: [
    {
      heading: "",
      paragraphs: [
        "In Nevada, an SR-22 requirement usually arrives in a letter from the Department of Motor Vehicles or in the paperwork from a court. It tells the driver that getting a licence back, or keeping it, depends on a carrier certifying to the DMV that a liability policy is in force and will be reported if it ends. The letter rarely explains how to buy that, which is where most of the delay and expense comes from.",
        "This article walks through the Nevada process in the order a driver meets it: reading the requirement, finding a carrier that will file, fitting the filing around the vehicles in the household, keeping it alive and closing it at the end. Durations, fees and notice periods are set by Nevada law, and the article points to where the DMV states each one rather than quoting it from memory.",
      ],
    },
    {
      heading: "Reading the requirement",
      paragraphs: [
        "The document that imposes the filing is the most useful piece of paper the driver has. It names the reason, the date the requirement starts and how long the certificate must stay on file. Nevada commonly imposes a filing after a conviction for driving under the influence, after being found driving without insurance, after an at-fault accident while uninsured, and as a condition of reinstating certain suspended or revoked licences. The triggers and the period for each are set by Nevada law, and the document from the Nevada DMV or the court states the period that applies.",
        "Two details in that document change what to buy. Whether the requirement starts from the offence, the suspension or the reinstatement date decides when the clock actually runs. And whether the requirement names the driver alone or also a specific vehicle decides whether a non-owner policy can satisfy it.",
      ],
    },
    {
      heading: "What the certificate vouches for",
      paragraphs: [
        "The SR-22 tells the DMV that the driver holds liability coverage at Nevada's financial responsibility limits or higher. Those limits are $25,000 per person and $50,000 per accident for bodily injury and $20,000 for property damage, per https://doi.nv.gov/Consumers/Automobile_Insurance/Higher_Minimum_Vehicle_Liability_Requirements/.",
        "Nothing stops a driver from buying more, and a driver with a DUI on the record has more reason than most. The prior conviction does not make the insurance respond differently to the next crash, but it can shape how a jury sees the driver, and it can make a carrier more willing to settle a claim against the driver for the full limit. Higher limits on the certified policy cost more; the filing works the same way on them.",
      ],
    },
    {
      heading: "Finding a carrier that will write and file",
      paragraphs: [
        "Two separate questions decide whether a carrier can help, and the driver needs a yes to both. Will the carrier write a policy for someone with this record, and will it file SR-22 certificates with the Nevada DMV? A carrier that files for existing customers may not accept a new applicant with a recent DUI. A carrier that accepts the record may not file in Nevada at all.",
        "The existing carrier is the first call. It may add the certificate to the current policy at renewal, or it may decide not to renew. If it declines, the market is non-standard carriers, which price records like this every day and differ widely in how they price them. Suppose three carriers quote a Henderson driver $2,100, $2,600 and $3,400 a year for the same limits after a DUI. The filing fee in each might be, for example, $25; the other $1,300 of spread is underwriting. These numbers are hypothetical, but that is why the comparison is worth doing before binding.",
      ],
    },
    {
      heading: "Motorcycles, second cars and the rest of the household",
      paragraphs: [
        "A certificate is attached to a policy, and a Nevada household with several vehicles has choices about which policy that is. A driver who owns a car and a motorcycle generally needs the certificate on a policy that covers what the driver actually rides or drives; whether a single filing on the car policy satisfies the DMV for the motorcycle as well is a question to settle with the DMV and the carrier before assuming it.",
        "Adding a driver with a DUI to a family policy raises the premium for the whole policy. Some households instead exclude that driver from the family policy by name and buy the certificate on a separate policy in the driver's own name. That can cost less overall, but a named driver exclusion means the family policy pays nothing if the excluded driver takes a family car, and a separate policy on that driver has to cover the car the driver actually uses. The trade-off is worth pricing both ways.",
        "A driver with no vehicle and no regular access to one can meet the requirement with a non-owner policy. It covers liability when driving a borrowed or rented car and carries the certificate. It does not cover a car in the household the driver uses regularly.",
      ],
    },
    {
      heading: "How a lapse is reported, and what follows",
      paragraphs: [
        "If the certified policy cancels, the carrier notifies the DMV that the certificate no longer stands. The DMV then sends notice and suspends the licence again on the date that notice gives, and a new certificate is needed to reinstate. Depending on the original requirement, the filing period may start over from the new reinstatement date.",
        "Nevada's electronic verification of registrations runs alongside the filing. A car whose policy ends can bring a registration suspension as well as a licence suspension, with separate fees for each. The combination turns a missed premium payment into two trips to the DMV.",
      ],
    },
    {
      heading: "Keeping the filing alive",
      paragraphs: ["The practical rules are short."],
      bullets: [
        "Pay in full for the term, or automate instalments; non-payment is the cause of most reported lapses.",
        "Keep the certificate on a policy that is continuous through any change of car, carrier or address.",
        "Tell the carrier about a move out of Nevada before it happens; the certificate must keep reaching the Nevada DMV for the rest of the period.",
        "Do not surrender plates and cancel the vehicle policy without a non-owner policy carrying the certificate ready to start the same day.",
        "Keep every confirmation from the carrier and the DMV in one place.",
        "At the end, confirm with the DMV that the requirement is satisfied before asking the carrier to stop filing.",
      ],
    },
    {
      heading: "What we do with a Nevada filing",
      paragraphs: [
        "Send us the DMV letter or court order, your driving record and a list of the vehicles and drivers in the household. We price the carriers we represent that accept the record and file in Nevada, compare adding the driver to the household policy against a separate policy, and confirm the certificate has reached the DMV. When the period ends, we quote again. If the carrier you already have will keep the policy and file, and the price is reasonable, the recommendation is to stay. The analysis costs nothing.",
      ],
    },
  ],
  relatedProducts: ["auto-insurance", "motorcycle-insurance"],
  relatedArticles: ["how-to-get-sr-22-insurance", "minimum-auto-insurance-requirements-in-nevada", "named-driver-exclusion-vs-standard-policy", "non-owner-auto-policy-vs-standard-auto-policy", "standard-vs-non-standard-auto-insurance"],
  relatedTerms: ["sr-22", "named-driver-exclusion", "non-owner-policy", "policy-lapse", "underwriting"],
  relatedStates: ["nevada"],
};
