import type { Product } from "../payload-types.ts";

/**
 * The four coverage groups the homepage, the header mega-menu and the footer
 * use. Every one of the 36 lines belongs to exactly one group
 * (tests/unit/groups.test.ts); the group shows its headline lines and links
 * into /insurance/ for the rest, so every product stays two clicks from home.
 */
export type GroupKey = "auto-home" | "life" | "health-medicare" | "commercial";
export type Group = { key: GroupKey; name: string; headline: string[]; category: "Personal" | "Commercial" };

export const GROUPS: Group[] = [
  { key: "auto-home", name: "Auto & Home", category: "Personal", headline: ["auto-insurance", "home-insurance", "renters-insurance", "umbrella-insurance", "motorcycle-insurance", "landlord-rental-property-insurance"] },
  { key: "life", name: "Life", category: "Personal", headline: ["life-insurance", "term-life-insurance", "whole-life-insurance", "indexed-universal-life-insurance", "annuities"] },
  { key: "health-medicare", name: "Health & Medicare", category: "Personal", headline: ["medicare", "health-insurance", "dental-and-vision-insurance"] },
  { key: "commercial", name: "Commercial", category: "Commercial", headline: ["general-liability-insurance", "business-owners-policy", "commercial-auto-insurance", "workers-compensation-insurance", "professional-liability-eo-insurance", "cyber-liability-insurance"] },
];

const LIFE = new Set(["life-insurance", "term-life-insurance", "whole-life-insurance", "indexed-universal-life-insurance", "annuities"]);
const HEALTH = new Set(["medicare", "health-insurance", "dental-and-vision-insurance"]);

export function groupOf(p: Pick<Product, "slug" | "category">): GroupKey {
  if (p.category === "Commercial") return "commercial";
  if (LIFE.has(p.slug)) return "life";
  if (HEALTH.has(p.slug)) return "health-medicare";
  return "auto-home";
}

/** Products of a group in headline order, then the rest alphabetically. */
export function groupProducts(products: Product[], key: GroupKey): { headline: Product[]; rest: Product[] } {
  const g = GROUPS.find((x) => x.key === key)!;
  const members = products.filter((p) => groupOf(p) === key);
  const headline = g.headline.map((slug) => members.find((p) => p.slug === slug)).filter((p): p is Product => Boolean(p));
  const rest = members.filter((p) => !g.headline.includes(p.slug)).sort((a, b) => a.name.localeCompare(b.name));
  return { headline, rest };
}

/** The order the client brief lists the licensed states in (Arizona, Nevada, Utah, Idaho); unknown states follow alphabetically. */
export const STATE_ORDER = ["AZ", "NV", "UT", "ID"];
export const orderStates = <T extends { abbr: string; name: string }>(states: T[]): T[] =>
  [...states].sort((a, b) => { const ia = STATE_ORDER.indexOf(a.abbr), ib = STATE_ORDER.indexOf(b.abbr); return (ia === -1 ? 99 : ia) - (ib === -1 ? 99 : ib) || a.name.localeCompare(b.name); });
