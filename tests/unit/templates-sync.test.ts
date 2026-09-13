import { createRequire } from "node:module";
import { expect, it } from "vitest";
import { LHCI_URLS, TEMPLATE_URLS } from "../templates.ts";
const req = createRequire(import.meta.url);
it("tests/templates.cjs mirrors tests/templates.ts", () => {
  const cjs = req("../templates.cjs") as { TEMPLATE_URLS: string[]; LHCI_URLS: string[] };
  expect(cjs.TEMPLATE_URLS).toEqual([...TEMPLATE_URLS]);
  expect(cjs.LHCI_URLS).toEqual([...LHCI_URLS]);
});
