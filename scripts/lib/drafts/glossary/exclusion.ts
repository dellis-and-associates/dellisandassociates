import type { GlossaryDraft } from "../types.mts";

export const draft: GlossaryDraft = {
  term: "Exclusion",
  definition: [
    "A clause that names a cause of loss, a type of property or a situation the policy will not pay for. It is how an insurer carves out risks it does not intend to price, such as flood and earthquake on a standard home policy, or intentional damage on almost any policy.",
  ],
  inPractice: [
    "Exclusions decide many of the claims that surprise people. Ground water, earth movement, wear and tear, mold, business use of a home, and racing a car are common examples. Some can be bought back with an endorsement or a separate policy; others cannot be covered at any price.",
    "The exclusion section is usually the longest part of the form, and it is the part to read before assuming a loss is covered.",
  ],
  example: [
    "Suppose a monsoon storm sends water into a Phoenix home through the roof and, separately, through the front door from a flooded street. The roof leak may be a covered wind-driven rain loss under the home policy. The water rising from the street falls under the flood exclusion and is paid only if the homeowner also carries a flood policy. Same storm, two very different outcomes, decided entirely by the exclusion wording.",
  ],
  relatedTerms: ["peril", "endorsement", "named-peril-policy"],
  relatedProducts: ["home-insurance", "flood-insurance"],
};
