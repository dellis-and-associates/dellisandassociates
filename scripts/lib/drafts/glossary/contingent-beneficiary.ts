import type { GlossaryDraft } from "../types.mts";
export const draft: GlossaryDraft = {
  term: "Contingent beneficiary",
  definition: ["The backup recipient named on a policy, who collects only if the primary recipient has died or cannot be found when the insured dies. Without one, the proceeds go to the insured's estate and pass through probate."],
  inPractice: ["The order is strict: the primary receives everything if alive; the secondary receives nothing unless every primary is gone. A couple commonly name each other as primary and their children or a trust as secondary, which covers a shared accident. Shares should add up to the whole at each level, and the form should say whether a deceased child's share goes to that child's children or is split among the survivors. Update the secondary name as carefully as the primary; a stale secondary is what sends money into probate."],
  example: ["Suppose a mother names her husband as primary and her two children as secondary, half each, on a $250,000 policy. If she and her husband die in the same crash, each child receives $125,000 directly. If she had named only her husband, the $250,000 would have gone to her estate. Hypothetical figures."],
  relatedTerms: ["beneficiary-designation", "per-stirpes-designation", "irrevocable-beneficiary"],
  relatedProducts: ["life-insurance", "term-life-insurance"],
};
