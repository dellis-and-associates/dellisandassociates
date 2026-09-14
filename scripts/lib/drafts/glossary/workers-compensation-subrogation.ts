import type { GlossaryDraft } from "../types.mts";

export const draft: GlossaryDraft = {
  term: "Workers compensation subrogation",
  definition: [
    "The carrier's right, after paying an injured employee's medical bills and lost wages, to recover that money from a third party whose negligence caused the injury.",
  ],
  inPractice: [
    "The employee cannot sue the employer, but can sue a negligent outsider: the driver who hit the delivery van, the manufacturer of a defective machine, another contractor on the same site. When that lawsuit produces a settlement, the carrier holds a lien on it for what it paid, and it can bring the action itself if the employee does not. Recoveries reduce the employer's loss history and, in turn, its experience modification rate, so employers should tell the carrier whenever a third party was involved. Construction contracts often require a waiver of this right in favor of the owner or general contractor, which the carrier endorses for a charge.",
  ],
  example: [
    "Suppose a roofer is hurt when scaffolding rented from an equipment company collapses, and the carrier pays $90,000 in benefits. The roofer sues the equipment company and settles for $250,000. The carrier recovers its $90,000 from the settlement, less a share of the attorney fees, and the roofer keeps the rest. Hypothetical.",
  ],
  relatedTerms: ["subrogation", "waiver-of-subrogation", "experience-modification-rate"],
  relatedProducts: ["workers-compensation-insurance", "contractors-insurance"],
};
