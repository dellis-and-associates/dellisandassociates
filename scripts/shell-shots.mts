/**
 * pnpm shell:shots --label=before|after [--base=http://localhost:3000] — header, hero
 * and footer of the homepage at 320/768/1280/1920, clipped to the element, into
 * docs/ux-audit/shell/<label>/ for UX-AUDIT.md and CRITIQUE.md. Look at them.
 */
import { mkdirSync } from "node:fs";
import { join } from "node:path";
import { chromium } from "playwright";

const arg = (k: string, d: string) => process.argv.find((a) => a.startsWith(`--${k}=`))?.slice(k.length + 3) ?? d;
const base = arg("base", "http://localhost:3000");
const label = arg("label", "before");
const out = join(process.cwd(), "docs", "ux-audit", "shell", label);
mkdirSync(out, { recursive: true });
const browser = await chromium.launch();
for (const width of [320, 768, 1280, 1920]) {
  const ctx = await browser.newContext({ viewport: { width, height: 900 }, deviceScaleFactor: 1, isMobile: width < 768, hasTouch: width < 768 });
  const page = await ctx.newPage();
  await page.goto(`${base}/`, { waitUntil: "load" });
  await page.evaluate(() => Promise.all([document.fonts.load('400 1em "Source Serif 4"'), document.fonts.load('400 1em "Archivo"')]));
  await page.reload({ waitUntil: "load" });
  await page.evaluate(() => document.fonts.ready);
  for (const [name, sel] of [["header", "header"], ["hero", "main section"], ["footer", "footer"]] as const) {
    const el = page.locator(sel).first();
    await el.screenshot({ path: join(out, `${name}-${width}.png`) });
  }
  await page.screenshot({ path: join(out, `home-${width}.png`), fullPage: true });
  await ctx.close();
}
await browser.close();
console.log(`wrote ${out}`);
