import { describe, expect, it } from "vitest";
import { isVin } from "../../src/lib/validate.ts";

/**
 * The VIN is what a carrier rates on — make, model and year are the human-readable
 * summary of it. Required on every vehicle entered (client, 2026-09-23).
 */
describe("VIN", () => {
  it("accepts a real 17-character VIN, in any case", () => {
    expect(isVin("1HGCM82633A004352")).toBe(true);
    expect(isVin("1hgcm82633a004352")).toBe(true);
    expect(isVin("  1HGCM82633A004352  ")).toBe(true);
  });

  it("rejects the wrong length", () => {
    expect(isVin("1HGCM82633A00435")).toBe(false);
    expect(isVin("1HGCM82633A0043521")).toBe(false);
    expect(isVin("")).toBe(false);
  });

  it("rejects I, O and Q, which the standard omits so they cannot be read as 1 and 0", () => {
    expect(isVin("IHGCM82633A004352")).toBe(false);
    expect(isVin("1OGCM82633A004352")).toBe(false);
    expect(isVin("1QGCM82633A004352")).toBe(false);
  });

  it("rejects punctuation and spaces inside", () => {
    expect(isVin("1HGCM82633A00435-")).toBe(false);
    expect(isVin("1HGCM 2633A004352")).toBe(false);
  });
});
