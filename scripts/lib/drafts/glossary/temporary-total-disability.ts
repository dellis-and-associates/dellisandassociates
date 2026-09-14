import type { GlossaryDraft } from "../types.mts";
export const draft: GlossaryDraft = {
  term: "Temporary total disability",
  definition: [
    "The wage replacement a workers compensation policy pays while an injured employee is completely unable to do any job during recovery. It stops when the employee returns to work in some capacity or reaches maximum medical improvement, whichever comes first.",
  ],
  inPractice: [
    "It is the benefit most claims involve and the one employers see most directly. Payment is a fraction of the pre-injury average weekly wage, subject to state minimums and maximums, and it usually starts after a short waiting period that is paid retroactively only if the absence runs long enough; the exact rules vary by state. The benefit is not taxed, which is why the fraction is set below full pay. A partial version exists for employees who return part-time or to lower-paid duties, paying a share of the difference. For the employer the cost accrues week by week into the claim reserve, so every week of absence has a price, and a light-duty assignment that brings the employee back early is usually the least expensive thing a business can do. The analysis walks through the state's schedule so an employer knows what a month off actually costs.",
  ],
  example: [
    "Suppose an employee in Utah earning $900 a week breaks an ankle on the job and cannot stand for eight weeks. Suppose the state pays two thirds of wages, $600 a week, after a waiting period that is later paid back because the absence exceeded the threshold. The carrier pays $4,800 in wage benefits plus the medical bills. Had the employer offered a seated job at full pay in week three, the wage benefit would have stopped there. Hypothetical figures.",
  ],
  relatedTerms: ["permanent-total-disability", "light-duty-assignment", "average-weekly-wage", "maximum-medical-improvement"],
  relatedProducts: ["workers-compensation-insurance"],
};
