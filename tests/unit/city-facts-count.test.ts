import { describe, expect, it } from "vitest";
import { CITY_FACT_KEYS } from "../../src/collections/Cities.ts";
import { CITY_FACT_COUNT } from "../../src/lib/routes.ts";

describe("city facts count", () => {
  it("matches the CityFacts keys the city collection counts", () => {
    expect(CITY_FACT_COUNT).toBe(CITY_FACT_KEYS.length);
  });
});
