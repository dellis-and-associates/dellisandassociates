import type { GlossaryDraft } from "../types.mts";

export const draft: GlossaryDraft = {
  term: "Data breach coverage",
  definition: [
    "The insuring agreement that pays the costs a business incurs after personal or confidential information it holds is exposed: forensic investigation, legal advice, notification letters, a call center, credit monitoring for those affected, and public relations.",
  ],
  inPractice: [
    "State notification rules set who must be told and how quickly; the policy pays for complying with them. It is first-party, paying the insured's own expenses; claims by the affected people or regulators sit under the third-party liability agreements. Costs scale with the number of records, so limits are sized to the customer or patient count. Retail, medical, professional and any firm that keeps card numbers or social security numbers is exposed. Small forms are bundled into business owners policies with low limits; dedicated cyber policies carry higher limits and a panel of vendors who handle the response. Carriers require prompt reporting; an insured that investigates for weeks before notifying may jeopardize coverage.",
  ],
  example: [
    "Suppose a dental office's laptop holding records for four thousand patients is stolen. The breach coach, forensic firm, notification letters and a year of monitoring for each patient cost $90,000. The office's cyber policy, with a $250,000 breach response limit and a $2,500 retention, pays the rest. Hypothetical.",
  ],
  relatedTerms: ["first-party-cyber-coverage", "third-party-cyber-coverage", "identity-theft-restoration"],
  relatedProducts: ["cyber-liability-insurance"],
};
