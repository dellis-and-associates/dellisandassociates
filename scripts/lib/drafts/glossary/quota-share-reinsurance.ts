import type { GlossaryDraft } from "../types.mts";
export const draft: GlossaryDraft = {
  term: "Quota share reinsurance",
  definition: [
    "A proportional arrangement in which a primary insurer cedes a fixed percentage of the premium on every policy in a defined class to another insurer, which then pays the same percentage of every claim. The ceding company receives a commission back to cover its acquisition costs.",
  ],
  inPractice: [
    "It is the simplest form of risk transfer between insurers and the one most used by carriers that are growing faster than their capital: by ceding a fixed portion of everything, the carrier reduces the premium it retains and so the surplus it must hold against it, which lets it write more policies. It does not protect the carrier against a large single loss the way an excess of loss arrangement does, because the carrier keeps its retained portion of every claim however big. New or specialty carriers, and captives in their early years, rely on it heavily; a client reading a small carrier's financial statements will often find a large portion of its premium ceded this way. The reinsurer's strength then matters nearly as much as the carrier's. The analysis considers the reinsurance arrangements of smaller carriers when their quotes are being compared with larger ones.",
  ],
  example: [
    "Suppose a new commercial auto carrier writes $30 million of premium and cedes forty percent under such an arrangement, keeping $18 million. The reinsurer pays a ceding commission of $3 million. Over the year claims total $20 million; the reinsurer pays $8 million and the carrier $12 million. A single $2 million truck accident is split the same way: $800,000 to the reinsurer, $1.2 million to the carrier. Hypothetical figures.",
  ],
  relatedTerms: ["reinsurance-treaty", "excess-of-loss-reinsurance", "reinsurance", "policyholder-surplus"],
  relatedProducts: ["commercial-auto-insurance"],
};
