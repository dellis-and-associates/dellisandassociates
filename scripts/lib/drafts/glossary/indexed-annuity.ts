import type { GlossaryDraft } from "../types.mts";
export const draft: GlossaryDraft = {
  term: "Indexed annuity",
  definition: ["A contract that credits interest based on the movement of a market index, with a floor that stops the balance from falling in a bad year and a cap or participation rate that limits what it earns in a good one. The money is not invested in the index; the insurer uses the index as a formula for crediting."],
  inPractice: ["The crediting method matters more than the marketing: annual point-to-point with a cap, monthly averaging, participation rate and spread methods all produce different results from the same index year, and the carrier can reset caps and rates each year within contract limits. Dividends are excluded from the index measure, which lowers returns relative to owning the stocks. The floor protects principal from market loss but not from surrender charges, which run long, often seven to ten years, and are steep early. Income riders are common and add a fee. It sits between a fixed and a variable contract: more upside than a declared rate, far less than the market, and no downside from the index itself."],
  example: ["Suppose a contract has an annual cap of 7% and a 0% floor, and the balance is $100,000. If the index gains 15% the account is credited $7,000; if it gains 4% the account is credited $4,000; if it loses 12% the account is credited nothing but does not fall. Over several years the pattern smooths returns at the cost of the big years. Hypothetical figures."],
  relatedTerms: ["fixed-annuity", "variable-annuity", "surrender-charge", "indexed-universal-life"],
  relatedProducts: ["annuities"],
};
