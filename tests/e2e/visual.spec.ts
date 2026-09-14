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
      // The serif is font-display: optional (fonts.css): a cold context can miss the block period and keep the
      // fallback, which is the documented first-visit behaviour, not the baseline. The baseline is the design with
      // both faces applied, so the test finishes both downloads and then re-declares the faces with
      // font-display: block (a later @font-face with the same descriptors wins), which applies the cached files.
      const FACES = ['400 1em "Source Serif 4"', '400 1em "Archivo"'];
      await page.evaluate((faces) => Promise.all(faces.map((f) => document.fonts.load(f))), FACES);
      await page.addStyleTag({ content: '@font-face{font-family:"Source Serif 4";src:url("/fonts/source-serif-4-variable.woff2") format("woff2");font-weight:400 700;font-style:normal;font-display:block}@font-face{font-family:"Archivo";src:url("/fonts/archivo-variable.woff2") format("woff2");font-weight:400 700;font-stretch:100% 112%;font-style:normal;font-display:block}' });
      await page.evaluate((faces) => Promise.all(faces.map((f) => document.fonts.load(f))), FACES);
      await page.evaluate(() => document.fonts.ready);
      // The Turnstile widget is third-party content that renders on its own schedule; its box is reserved in CSS and masked here.
      await expect(page).toHaveScreenshot(`${slug(url)}.png`, { fullPage: true, mask: [page.locator(".cf-turnstile")] });
    });
  }
});
