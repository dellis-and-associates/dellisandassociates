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
      // fallback, which is the documented first-visit behaviour, not the baseline. Finish both downloads (a reload
      // would cancel an in-flight one), then reload with the fonts cached.
      const FACES = ['400 1em "Source Serif 4"', '400 1em "Archivo"'];
      await page.evaluate((faces) => Promise.all(faces.map((f) => document.fonts.load(f))), FACES);
      for (let attempt = 0; attempt < 3; attempt++) {
        await page.reload({ waitUntil: "load" });
        await page.evaluate(() => document.fonts.ready);
        if (await page.evaluate((faces) => faces.every((f) => document.fonts.check(f)), FACES)) break;
      }
      // The Turnstile widget is third-party content that renders on its own schedule; its box is reserved in CSS and masked here.
      await expect(page).toHaveScreenshot(`${slug(url)}.png`, { fullPage: true, mask: [page.locator(".cf-turnstile")] });
    });
  }
});
