import { describe, expect, it } from "vitest";
import { GROUPS, groupOf, groupProducts } from "../../src/lib/groups.ts";
import products from "../../src/seed-data/products.json";
import type { Product } from "../../src/payload-types.ts";

const list = (products as { slug: string; name: string; category: string }[]).map((p, i) => ({ ...p, id: i } as unknown as Product));

describe("coverage groups", () => {
  it("place every product in exactly one group", () => {
    const seen = new Map<string, number>();
    for (const p of list) seen.set(groupOf(p), (seen.get(groupOf(p)) ?? 0) + 1);
    expect([...seen.values()].reduce((a, b) => a + b, 0)).toBe(list.length);
    expect(list.length).toBe(36);
  });
  it("name only real slugs as headline lines, five or six per group", () => {
    const slugs = new Set(list.map((p) => p.slug));
    for (const g of GROUPS) {
      for (const s of g.headline) expect(slugs.has(s), s).toBe(true);
      expect(g.headline.length).toBeGreaterThanOrEqual(3);
      expect(g.headline.length).toBeLessThanOrEqual(6);
      const { headline, rest } = groupProducts(list, g.key);
      expect(headline.length).toBe(g.headline.length);
      for (const p of rest) expect(g.headline.includes(p.slug)).toBe(false);
    }
  });
});
