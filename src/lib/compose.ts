/**
 * Composition rules for the data-driven templates. Products, states and
 * cities are data; this is the code that turns them into a page. Block order
 * and selection vary by tier and by city size band so 380 city pages do not
 * share one sequence (page-generation "Template contract").
 */
import type { City, Product, State } from "../payload-types.ts";
import { hasTodo } from "../fields/index.ts";

export type Block = "intro" | "local-risk" | "state-minimums" | "coverage" | "covered" | "discounts" | "faq" | "related" | "cta";

export function blockOrder(product: Pick<Product, "tier" | "category">, city?: Pick<City, "sizeBand"> | null): Block[] {
  const commercial = product.category === "Commercial";
  const band = city?.sizeBand ?? "mid";
  if (!city) return commercial ? ["intro", "state-minimums", "coverage", "covered", "faq", "cta", "related"] : ["intro", "state-minimums", "coverage", "covered", "discounts", "faq", "cta", "related"];
  if (band === "large") return commercial ? ["intro", "local-risk", "coverage", "state-minimums", "covered", "faq", "cta", "related"] : ["intro", "local-risk", "state-minimums", "coverage", "covered", "discounts", "faq", "cta", "related"];
  if (band === "small") return commercial ? ["intro", "state-minimums", "local-risk", "coverage", "faq", "cta", "related"] : ["intro", "state-minimums", "local-risk", "covered", "coverage", "faq", "cta", "related"];
  return commercial ? ["intro", "coverage", "local-risk", "state-minimums", "covered", "faq", "cta", "related"] : ["intro", "coverage", "local-risk", "state-minimums", "covered", "discounts", "faq", "cta", "related"];
}

const HAZARD_TEXT: Record<string, string> = {
  "monsoon-dust": "monsoon storms and blowing dust",
  "extreme-heat": "sustained extreme heat",
  "wildfire-wui": "wildfire at the wildland–urban interface",
  hail: "hail",
  freeze: "hard freezes",
  "flood-plain": "mapped flood plains",
  "flash-flood": "flash flooding",
  earthquake: "earthquake exposure",
  wind: "high wind",
  "snow-load": "snow load",
  "mountain-driving": "mountain driving",
  "wildlife-collision": "wildlife collisions",
  "urban-theft": "vehicle theft and break-ins",
};
export const hazardLabel = (h: string) => HAZARD_TEXT[h] ?? h.replace(/-/g, " ");

/**
 * The city-specific text. Every sentence here comes from a CityFacts field;
 * a TODO token anywhere makes the page non-indexable (the caller checks
 * `complete`). Nothing is guessed to fill a gap.
 */
export function localText(product: Pick<Product, "name" | "category">, city: City, state: Pick<State, "name" | "abbr">) {
  const f = city.cityFacts ?? {};
  const parts: { key: string; text: string; todo: boolean }[] = [];
  const add = (key: string, v: string | null | undefined, fmt: (s: string) => string) => {
    if (!v) return parts.push({ key, text: "", todo: true });
    parts.push({ key, text: hasTodo(v) ? "" : fmt(v), todo: hasTodo(v) });
  };
  add("county", f.county, (c) => `${city.name} sits in ${c}, ${state.name}.`);
  const hazards = (f.localHazards ?? []).map(hazardLabel);
  parts.push({ key: "localHazards", text: hazards.length ? `The risks that shape a ${product.name.toLowerCase()} policy here are ${hazards.length === 1 ? hazards[0] : `${hazards.slice(0, -1).join(", ")} and ${hazards[hazards.length - 1]}`}.` : "", todo: hazards.length === 0 });
  add("housingStock", f.housingStock, (s) => `Housing: ${s}`);
  add("drivingContext", f.drivingContext, (s) => `Driving: ${s}`);
  const hoods = (f.neighborhoods ?? []).map((n) => n.name).filter(Boolean);
  parts.push({ key: "neighborhoods", text: hoods.length ? `We write policies across ${hoods.join(", ")}.` : "", todo: hoods.length === 0 });
  add("notableRegulatory", f.notableRegulatory, (s) => s);
  add("nearestOfficeOrAgent", f.nearestOfficeOrAgent, (s) => `Nearest office or agent: ${s}.`);
  const complete = parts.every((p) => !p.todo);
  const words = parts.map((p) => p.text).join(" ").split(/\s+/).filter(Boolean).length;
  return { parts, complete, words };
}

/** Statutory minimums for a product in a state, each with its citation. */
export function minimumsFor(state: State, productId: number) {
  return (state.statutoryMinimums ?? []).filter((m) => (typeof m.product === "object" ? m.product?.id : m.product) === productId);
}

export const ctaLabel = (product?: Pick<Product, "name" | "medicareTouching"> | null) => (product?.medicareTouching ? "Request a plan review" : "Request the analysis");

export const titles = {
  product: (p: Pick<Product, "name">) => `${p.name}`,
  coverage: (p: Pick<Product, "name">) => `What ${p.name.toLowerCase()} covers`,
  third: (p: Pick<Product, "name" | "thirdSubpage">) => (p.thirdSubpage === "plans-enrollment-faq" ? `${p.name} plans and enrollment` : `${p.name} discounts and questions`),
  state: (s: Pick<State, "name">) => `Insurance in ${s.name}`,
  productState: (p: Pick<Product, "name">, s: Pick<State, "name">) => `${p.name} in ${s.name}`,
  productCity: (p: Pick<Product, "name">, c: Pick<City, "name">, s: Pick<State, "abbr">) => `${p.name} in ${c.name}, ${s.abbr}`,
};
