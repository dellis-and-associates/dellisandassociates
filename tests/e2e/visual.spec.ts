import { expect, test } from "@playwright/test";
import { NOT_FOUND_URL, PRINT_URLS, TEMPLATE_URLS } from "../templates.ts";

const slug = (u: string) => (u === "/" ? "home" : u.replace(/^\/|\/$/g, "").replace(/\//g, "_"));

test.describe("visual baseline", () => {
  test.skip(() => ["nojs", "nojs-mobile"].includes(test.info().project.name), "no-JS projects have their own suite");
  for (const url of [...TEMPLATE_URLS, NOT_FOUND_URL]) {
    test(`${url}`, async ({ page }, info) => {
      test.skip(info.project.name === "print" && !(PRINT_URLS as readonly string[]).includes(url));
      if (info.project.name === "print") await page.emulateMedia({ media: "print" });
      await page.goto(url, { waitUntil: "load" });
      // The baseline is the design with its own faces applied, not the metric-matched fallback: every face is
      // font-display: swap, so a cold context can screenshot the fallback. Finish the downloads, then re-declare the
      // faces with font-display: block (a later @font-face with the same descriptors wins) so the cached files apply.
      const FACES = ['400 1em "Instrument Serif"', '400 1em "Figtree"', '600 1em "Figtree"', '400 1em "DM Mono"'];
      await page.evaluate((faces) => Promise.all(faces.map((f) => document.fonts.load(f))), FACES);
      await page.addStyleTag({ content: '@font-face{font-family:"Instrument Serif";src:url("/fonts/instrument-serif-400.woff2") format("woff2");font-weight:400;font-style:normal;font-display:block}@font-face{font-family:"Figtree";src:url("/fonts/figtree-variable.woff2") format("woff2");font-weight:400 600;font-style:normal;font-display:block}@font-face{font-family:"DM Mono";src:url("/fonts/dm-mono-400.woff2") format("woff2");font-weight:400;font-style:normal;font-display:block}' });
      await page.evaluate((faces) => Promise.all(faces.map((f) => document.fonts.load(f))), FACES);
      await page.evaluate(() => document.fonts.ready);
      // The Turnstile widget is third-party content that renders on its own schedule; its box is reserved in CSS and masked here.
      await expect(page).toHaveScreenshot(`${slug(url)}.png`, { fullPage: true, mask: [page.locator(".cf-turnstile")] });
    });
  }
});
