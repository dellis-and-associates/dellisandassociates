import type { GlossaryDraft } from "../types.mts";

export const draft: GlossaryDraft = {
  term: "Second injury fund",
  definition: [
    "A state-run pool that reimburses an employer or its carrier for part of a workers compensation claim when a worker's new workplace accident is made worse by a pre-existing impairment.",
  ],
  inPractice: [
    "The idea was to encourage employers to hire people with prior disabilities by limiting the cost when a later accident combines with the old condition into a larger disability. The carrier pays the whole claim to the worker as usual, then applies to the pool for reimbursement of the portion attributed to the combined effect. Rules differ by state: some have closed their pools to new claims, some require the employer to have known of the prior impairment before hiring, and some cover only specific conditions. Where a pool is open, a recovery from it reduces the loss on the employer's experience rating. Carriers handle the application; the employer's job is to document known prior conditions at hire.",
  ],
  example: [
    "Suppose a warehouse hires a worker who lost sight in one eye years earlier, and a forklift accident then blinds the other eye, producing a permanent total disability worth $400,000 in benefits. The carrier pays the worker in full and recovers $250,000 from the state pool as the share attributable to the combined loss. Hypothetical.",
  ],
  relatedTerms: ["permanent-total-disability", "experience-modification-rate", "claim"],
  relatedProducts: ["workers-compensation-insurance"],
};
