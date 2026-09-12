import { describe, expect, it } from "vitest";
import { collapseRepeatedTail, isNormalizedSlug, slugify } from "../../src/lib/slug.ts";

describe("slugify (page-generation defects 1 and 4)", () => {
  it.each([
    ["Coeur d'Alene", "coeur-d-alene"],
    ["Coeur d’Alene", "coeur-d-alene"],
    ["St. George", "st-george"],
    ["Boat & Watercraft Insurance", "boat-watercraft-insurance"],
    ["Professional Liability (E&O) Insurance", "professional-liability-e-o-insurance"],
    ["Business Owners Policy (BOP)", "business-owners-policy-bop"],
    ["Workers' Compensation Insurance", "workers-compensation-insurance"],
    ["Landlord / Rental Property Insurance", "landlord-rental-property-insurance"],
    ["  Phoenix  ", "phoenix"],
    ["North Las Vegas", "north-las-vegas"],
    ["Cañon City", "canon-city"],
  ])("%s → %s", (input, expected) => {
    expect(slugify(input)).toBe(expected);
  });

  it("collapses a repeated trailing token run (the doubled BOP slug)", () => {
    expect(collapseRepeatedTail("business-owners-policy-business-owners-policy")).toBe("business-owners-policy");
    expect(slugify("Business Owners Policy Business Owners Policy")).toBe("business-owners-policy");
    expect(collapseRepeatedTail("auto-auto")).toBe("auto");
    expect(collapseRepeatedTail("a-b-a-b-a-b")).toBe("a-b");
  });

  it("leaves legitimate repetition that is not a whole-run duplicate alone", () => {
    expect(collapseRepeatedTail("walla-walla-insurance")).toBe("walla-walla-insurance");
    expect(collapseRepeatedTail("new-york-new-york")).toBe("new-york");
  });

  it("recognises normalized slugs", () => {
    expect(isNormalizedSlug("coeur-d-alene")).toBe(true);
    expect(isNormalizedSlug("Coeur-d-Alene")).toBe(false);
    expect(isNormalizedSlug("coeur-d'alene")).toBe(false);
    expect(isNormalizedSlug("--x")).toBe(false);
    expect(isNormalizedSlug("business-owners-policy-business-owners-policy")).toBe(false);
  });
});
