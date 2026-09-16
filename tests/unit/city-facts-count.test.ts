import { describe, expect, it } from "vitest";
import { CITY_FACT_KEYS, CITY_INDEXING_FACT_KEYS } from "../../src/collections/Cities.ts";
import { hasLocalGuidance, localGuidance } from "../../src/lib/local-guidance.ts";
import { CITY_INDEXING_FACTS, cityReady } from "../../src/lib/routes.ts";

describe("city facts that gate indexing", () => {
  it("are the local-content facts, without the office contact", () => {
    expect([...CITY_INDEXING_FACT_KEYS]).toEqual(CITY_INDEXING_FACTS);
    expect(CITY_FACT_KEYS).toContain("nearestOfficeOrAgent");
    expect(CITY_INDEXING_FACTS).not.toContain("nearestOfficeOrAgent");
  });
  it("treat a city as ready when only the office contact is missing", () => {
    expect(cityReady({ factsMissing: "nearestOfficeOrAgent" })).toBe(true);
    expect(cityReady({ factsMissing: "" })).toBe(true);
    expect(cityReady({ factsMissing: "housingStock, nearestOfficeOrAgent" })).toBe(false);
    expect(cityReady({})).toBe(true);
  });
});

describe("local guidance decides whether a city page is worth indexing", () => {
  const hazards = ["extreme-heat", "flash-flood", "wind"];
  it("is present for auto, home and commercial lines", () => {
    expect(hasLocalGuidance({ slug: "auto-insurance", category: "Personal" }, hazards)).toBe(true);
    expect(hasLocalGuidance({ slug: "business-owners-policy", category: "Commercial" }, hazards)).toBe(true);
  });
  it("is absent for life, because a hazard does not change a life policy", () => {
    expect(hasLocalGuidance({ slug: "life-insurance", category: "Personal" }, hazards)).toBe(false);
    expect(hasLocalGuidance({ slug: "life-insurance", category: "Personal" }, [])).toBe(false);
  });
  it("tops a thin page up from traits the city's own facts state", () => {
    const city = { name: "Test", cityFacts: { localHazards: hazards, housingStock: "HOA membership is close to universal.", drivingContext: "", notableRegulatory: "" } };
    const product = { slug: "auto-insurance", category: "Personal" as const, name: "Auto Insurance" };
    const thin = localGuidance(product, { ...city, cityFacts: { ...city.cityFacts, housingStock: "Ranch homes." } } as never);
    expect(localGuidance(product, city as never).length).toBeGreaterThan(thin.length);
  });
});
