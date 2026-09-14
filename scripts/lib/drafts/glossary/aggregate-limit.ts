import type { GlossaryDraft } from "../types.mts";
export const draft: GlossaryDraft = {
  term: "Aggregate limit",
  definition: [
    "The most a policy will pay in total for every claim during one policy period, no matter how many separate events there are. Once the aggregate is spent, the policy pays nothing further until it renews, even if the per-occurrence limit has never been reached on any single claim.",
  ],
  inPractice: [
    "Most general liability and professional liability policies carry two numbers: one for each occurrence and one for the year, with the annual figure often written at twice the occurrence figure. A business with many jobs or customers can exhaust the annual figure quietly through a string of moderate claims, and a general contractor's agreement may require a separate aggregate for each project. Reinstating a spent aggregate mid-term is sometimes available for an additional premium. The analysis considers how many claims a business could plausibly face in a year, not only how large one could be.",
  ],
  example: [
    "Suppose a landscaper's policy carries a $1 million per-occurrence limit and a $2 million aggregate. In one year the business has three claims of $800,000 each. The first two are paid in full, using $1.6 million of the aggregate. Only $400,000 remains for the third claim; the landscaper owes the other $400,000 from its own funds. Hypothetical, to show how the yearly cap binds before the per-claim cap does.",
  ],
  relatedTerms: ["per-occurrence-limit", "per-project-aggregate", "excess-liability"],
  relatedProducts: ["general-liability-insurance"],
};
