/**
 * Page-generation defect 3: /insurance/{slug}/ is one dynamic segment shared by
 * product hubs and state hubs. The two slug sets must never intersect, and
 * every slug in the data files must already be normalized.
 */
import { readFileSync } from "node:fs";
import { join } from "node:path";
import { describe, expect, it } from "vitest";
import { isNormalizedSlug, slugify } from "../../src/lib/slug.ts";

const dir = join(process.cwd(), "desert-peak-insurance-sitemap");
const products = [...readFileSync(join(dir, "data-products.xml"), "utf8").matchAll(/<product\s+[^>]*slug="([^"]+)"[^>]*>([^<]*)</g)].map((m) => ({ slug: m[1], name: m[2].replace(/&amp;/g, "&") }));
const locations = readFileSync(join(dir, "data-locations.xml"), "utf8");
const states = [...locations.matchAll(/<state\s+slug="([^"]+)"/g)].map((m) => m[1]);
const cities = [...locations.matchAll(/<city\s+slug="([^"]+)">([^<]*)</g)].map((m) => ({ slug: m[1], name: m[2] }));

describe("reserved slugs", () => {
  it("product and state slugs never intersect", () => {
    const p = new Set(products.map((x) => x.slug));
    expect(states.filter((s) => p.has(s))).toEqual([]);
  });
  it("route sub-segments never collide with a product or state", () => {
    const reserved = ["coverage", "discounts-faq", "plans-enrollment-faq"];
    const all = new Set([...products.map((x) => x.slug), ...states]);
    expect(reserved.filter((r) => all.has(r))).toEqual([]);
  });
  it("every product, state and city slug is normalized", () => {
    for (const s of [...products.map((x) => x.slug), ...states, ...cities.map((c) => c.slug)]) expect(isNormalizedSlug(s), s).toBe(true);
  });
  it("city slugs match the normalizer applied to their names", () => {
    for (const c of cities) expect(slugify(c.name), c.name).toBe(c.slug);
  });
  it("has 36 products after reconciliation and 38 cities in 4 states", () => {
    expect(products).toHaveLength(36);
    expect(states).toHaveLength(4);
    expect(cities).toHaveLength(38);
  });
});
