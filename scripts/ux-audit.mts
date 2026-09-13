/**
 * pnpm ux:audit [--base=https://www.dellisandassociates.com] — the "before"
 * audit: screenshots at 320/768/1280/1920 on the device baseline (4× CPU,
 * Slow 4G emulation), axe-core per page, and a findings table written to
 * docs/ux-audit/<host>.json for UX-AUDIT.md.
 */
import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";
import { chromium } from "playwright";
import AxeBuilder from "@axe-core/playwright";

const base = process.argv.find((a) => a.startsWith("--base="))?.slice(7) ?? "https://www.dellisandassociates.com";
const pages = process.argv.find((a) => a.startsWith("--pages="))?.slice(8).split(",") ?? ["/", "/life-insurance", "/medicare", "/contact-us", "/resources", "/new-client-intake-form", "/work-with-us", "/agent-training"];
const fast = process.argv.includes("--fast");
const host = new URL(base).host.replace(/[^a-z0-9.-]/gi, "_");
const out = join(process.cwd(), "docs", "ux-audit", host);
mkdirSync(out, { recursive: true });
const browser = await chromium.launch();
const results: Record<string, unknown>[] = [];
for (const path of pages) {
  const row: Record<string, unknown> = { path };
  for (const width of [320, 768, 1280, 1920]) {
    const ctx = await browser.newContext({ viewport: { width, height: 900 }, deviceScaleFactor: 1, isMobile: width < 768, hasTouch: width < 768 });
    const page = await ctx.newPage();
    if (!fast) {
      const cdp = await ctx.newCDPSession(page);
      await cdp.send("Network.emulateNetworkConditions", { offline: false, latency: 400, downloadThroughput: (400 * 1024) / 8, uploadThroughput: (400 * 1024) / 8 });
      await cdp.send("Emulation.setCPUThrottlingRate", { rate: 4 });
    }
    const t0 = Date.now();
    const res = await page.goto(`${base}${path}`, { waitUntil: "load", timeout: 90_000 }).catch(() => null);
    const loadMs = Date.now() - t0;
    await page.waitForTimeout(500);
    const file = `${path === "/" ? "home" : path.replace(/^\//, "").replace(/\//g, "_")}-${width}.png`;
    await page.screenshot({ path: join(out, file), fullPage: true });
    const scrollWidth = await page.evaluate(() => document.documentElement.scrollWidth);
    const axe = await new AxeBuilder({ page }).withTags(["wcag2a", "wcag2aa", "wcag21aa", "wcag22aa", "best-practice"]).analyze().catch(() => null);
    const h1 = await page.locator("h1").count();
    const small = await page.evaluate(() => [...document.querySelectorAll("a,button")].filter((el) => { const r = el.getBoundingClientRect(); return r.width > 0 && (r.width < 24 || r.height < 24); }).length);
    row[String(width)] = { status: res?.status(), loadMs, file, horizontalScroll: scrollWidth > width, h1, smallTargets: small, axeViolations: axe?.violations.map((v) => ({ id: v.id, impact: v.impact, nodes: v.nodes.length })) ?? "axe failed" };
    await ctx.close();
  }
  results.push(row);
  console.log(JSON.stringify(row));
}
await browser.close();
writeFileSync(join(out, "audit.json"), JSON.stringify({ base, at: new Date().toISOString(), results }, null, 2));
console.log(`wrote ${out}/audit.json`);
