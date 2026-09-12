/**
 * Ledger arithmetic. Balances and annual totals are computed from entries,
 * never stored. A `reversed` entry voids an `earned` reward or claws back an
 * `issued` payout; `reversesType` says which.
 */
export type LedgerLike = { type: "earned" | "issued" | "reversed"; reversesType?: "earned" | "issued" | null; amount: number; createdAt: string | Date };

const year = (e: LedgerLike) => new Date(e.createdAt).getUTCFullYear();
const signed = (e: LedgerLike, kind: "earned" | "issued") => (e.type === kind ? e.amount : e.type === "reversed" && e.reversesType === kind ? -e.amount : 0);

/** Earned (net of voids) minus issued (net of clawbacks): what is still owed. */
export function outstandingLiability(entries: LedgerLike[]): number {
  return entries.reduce((sum, e) => sum + signed(e, "earned") - signed(e, "issued"), 0);
}

/** Issued minus clawbacks within a calendar year: what the referrer actually received. The engine asserts no tax threshold. */
export function annualIssuedTotal(entries: LedgerLike[], y: number): number {
  return entries.reduce((sum, e) => (year(e) === y ? sum + signed(e, "issued") : sum), 0);
}

/** Earned minus voids within a year: counts toward the annual cap whether issued yet or not. */
export function annualEarnedTotal(entries: LedgerLike[], y: number): number {
  return entries.reduce((sum, e) => (year(e) === y ? sum + signed(e, "earned") : sum), 0);
}
