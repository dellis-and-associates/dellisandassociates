import type { GlossaryDraft } from "../types.mts";
export const draft: GlossaryDraft = {
  term: "Average weekly wage",
  definition: [
    "The figure a workers compensation carrier uses as an injured employee's normal pre-injury earnings, from which every disability benefit is calculated. Each state defines how it is computed, usually from the pay earned over a set number of weeks before the injury.",
  ],
  inPractice: [
    "Getting it right matters because every disability benefit is a fraction of it. Overtime, bonuses, tips, shift differentials and the value of employer-provided housing or meals may or may not count depending on the state, and an employee who worked a partial year, held two jobs, or had just been hired is handled under special rules. The carrier calculates it from payroll records the employer supplies, and errors run both ways: an understated figure short-changes the employee and invites a dispute, an overstated one inflates the reserve and the employer's experience modification rate. Concurrent employment is a common surprise, since some states include earnings from a second employer that the first knew nothing about. The analysis tells an employer what records to keep so the figure is right the first time.",
  ],
  example: [
    "Suppose an employee in Idaho earned $52,000 over the prior year, including $4,000 of overtime, and the state counts overtime. The figure comes to $1,000 a week. Suppose the state's wage benefit is two thirds, $667 a week. Had the employer omitted the overtime from the payroll report, the figure would have been $923 and the benefit $615, and the employee would have grounds to contest it. Hypothetical figures.",
  ],
  relatedTerms: ["temporary-total-disability", "permanent-total-disability", "manual-rate"],
  relatedProducts: ["workers-compensation-insurance"],
};
