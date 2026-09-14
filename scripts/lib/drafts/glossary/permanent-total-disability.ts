import type { GlossaryDraft } from "../types.mts";
export const draft: GlossaryDraft = {
  term: "Permanent total disability",
  definition: [
    "The workers compensation classification for an employee whose injury leaves them unable to return to any gainful employment for the rest of their working life. Benefits are paid for life or to retirement age, depending on the state, and it is the most expensive outcome a claim can have.",
  ],
  inPractice: [
    "Some injuries qualify automatically in most states: loss of both hands, both feet, both eyes, or any two of them, and certain spinal injuries. Others are decided on evidence: age, education, transferable skills and the labour market as much as the medical findings. Benefits are a fraction of the pre-injury average weekly wage, subject to a state maximum, and some states adjust them for inflation while others do not; some also allow a lump-sum settlement. Because the reserve on such a claim can be very large, carriers assign senior adjusters, order independent medical examinations, and investigate whether any work is possible. For an employer the claim stays in the experience modification calculation for its full cycle. Return-to-work efforts are the main lever employers have, since a modified job the employee can actually do converts a lifetime claim into a limited one.",
  ],
  example: [
    "Suppose a construction employee in Nevada suffers a spinal cord injury and cannot return to any job. Suppose the employee's average weekly wage was $1,200 and the state benefit is two thirds of it, $800 a week, paid for life. Over twenty years that is more than $800,000 before medical costs, which continue for life as well. The carrier reserves accordingly, and the employer's experience modification rate rises for three years. Hypothetical figures.",
  ],
  relatedTerms: ["permanent-partial-disability", "average-weekly-wage", "independent-medical-examination"],
  relatedProducts: ["workers-compensation-insurance"],
};
