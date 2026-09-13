import { describe, expect, it } from "vitest";
import { scanSource } from "../../scripts/lib/token-rules.mts";

const rules = (path: string, src: string) => scanSource(path, src).hits.map((h) => h.rule);

describe("verify:tokens rules", () => {
  it("flags hex, functional colours, arbitrary values, inline px and non-token utilities in TSX", () => {
    expect(rules("a.tsx", 'const c = "#923D28";')).toContain("hex colour literal");
    expect(rules("a.tsx", 'style={{ color: "rgb(1,2,3)" }}')).toContain("functional colour literal");
    expect(rules("a.tsx", '<div className="w-[13px] text-[#fff]" />')).toContain("Tailwind arbitrary value");
    expect(rules("a.tsx", '<div style={{ marginTop: "3px" }} />')).toContain("inline style with a raw length");
    expect(rules("a.tsx", '<div className="bg-red-500 text-gray-700" />')).toContain("non-token colour utility");
  });
  it("allows token utilities, fragment hrefs, ids, grid templates with minmax and documented opt-outs", () => {
    expect(rules("a.tsx", '<div className="bg-surface text-ink-muted rounded-control shadow-1 max-w-measure-body" />')).toEqual([]);
    expect(rules("a.tsx", '<a href="#main">Skip</a>')).toEqual([]);
    expect(rules("a.tsx", '<div id="letter-A" className="grid lg:grid-cols-[minmax(0,1fr)_18rem]" />')).toEqual([]);
    expect(rules("a.tsx", '<div className="group-open:block data-[x]:hidden [&>*]:mt-0" />')).toEqual([]);
    expect(rules("a.tsx", '<div className="min-[360px]:block" />')).toContain("Tailwind arbitrary value");
    expect(rules("a.tsx", '// tokens-ok: logo files carry brand hex by design\nconst MARK = "#923D28";')).toEqual([]);
    expect(scanSource("a.tsx", '// tokens-ok: reason\nconst x = "#fff";').optOuts).toBe(1);
  });
  it("checks stylesheets: raw lengths and colours fail, var() and 1px borders pass, @font-face and @media widths are exempt", () => {
    expect(rules("a.css", ".x { margin: 12px; }")).toContain("raw length in stylesheet");
    expect(rules("a.css", ".x { color: #fff; }")).toContain("hex colour literal");
    expect(rules("a.css", ".x { color: var(--dp-ink); border: 1px solid var(--dp-border); margin: 0; }")).toEqual([]);
    expect(rules("a.css", "@font-face { font-family: X; src: url(a.woff2); font-weight: 100 900; }")).toEqual([]);
    expect(rules("a.css", "@media (min-width: 768px) { .x { color: var(--dp-ink); } }")).toEqual([]);
  });
});
