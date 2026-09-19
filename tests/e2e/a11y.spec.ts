import AxeBuilder from "@axe-core/playwright";
import { expect, test } from "@playwright/test";
import { NOT_FOUND_URL, TEMPLATE_URLS } from "../templates.ts";

test.describe("accessibility floor", () => {
  test.skip(() => ["nojs", "nojs-mobile", "print"].includes(test.info().project.name), "other projects");
  for (const url of [...TEMPLATE_URLS, NOT_FOUND_URL]) {
    test(`${url}`, async ({ page }) => {
      await page.goto(url);
      await page.evaluate(() => document.fonts.ready);
      const axe = await new AxeBuilder({ page }).withTags(["wcag2a", "wcag2aa", "wcag21a", "wcag21aa", "wcag22aa", "best-practice"]).analyze();
      expect(axe.violations.map((v) => `${v.id} (${v.impact}): ${v.nodes.slice(0, 3).map((n) => n.target.join(" ")).join(" | ")}`), "axe violations").toEqual([]);
      // Structure
      expect(await page.locator("h1").count(), "exactly one h1").toBe(1);
      for (const l of ["header", "main", "footer", "nav"]) expect(await page.locator(l).count(), `${l} landmark`).toBeGreaterThan(0);
      expect(await page.getAttribute("html", "lang")).toBe("en");
      // Consistent help: a contact link in the header or footer on every page (WCAG 2.2 consistent help)
      expect(await page.locator("header a[href='/contact/'], footer a[href='/contact/'], header a[href^='tel:']").count()).toBeGreaterThan(0);
      // Skip link first
      await page.keyboard.press("Tab");
      expect(await page.evaluate(() => document.activeElement?.textContent?.trim())).toBe("Skip to content");
      // Target size: interactive elements ≥ 24×24 unless inline text links inside prose
      const small = await page.evaluate(() => [...document.querySelectorAll("a,button,input,select,textarea,summary")].filter((el) => {
        const r = el.getBoundingClientRect();
        if (r.width === 0 || r.height === 0) return false;
        if (el.closest("p, li, td, dd, .prose, blockquote, figcaption") && el.tagName === "A") return false;
        // A 20 px checkbox or radio (brand size) is fine when its label is the target and is ≥ 24 px tall.
        if (el.tagName === "INPUT" && ["checkbox", "radio"].includes((el as HTMLInputElement).type)) { const lr = el.closest("label")?.getBoundingClientRect(); if (lr && lr.height >= 24 && lr.width >= 24) return false; }
        return r.width < 24 || r.height < 24;
      }).map((el) => `${el.tagName.toLowerCase()}:${(el.textContent ?? "").trim().slice(0, 30)}`));
      expect(small, "targets under 24px").toEqual([]);
      // Focus visible and never obscured by the sticky header, for the first 40 focusables
      const headerBottom = await page.evaluate(() => document.querySelector("header")?.getBoundingClientRect().bottom ?? 0);
      const problems: string[] = [];
      for (let i = 0; i < 40; i++) {
        await page.keyboard.press("Tab");
        const r = await page.evaluate((hb) => {
          const el = document.activeElement as HTMLElement | null;
          if (!el || el === document.body) return null;
          // Cloudflare Turnstile injects its own focusable widget; its focus styling is the third party's (THIRD-PARTY.md).
          if (el.closest(".cf-turnstile") || el.tagName === "IFRAME") return { tag: el.tagName, text: "turnstile", visible: true, obscured: false, sr: false };
          const cs = getComputedStyle(el);
          const rect = el.getBoundingClientRect();
          const visible = cs.outlineStyle !== "none" && cs.outlineWidth !== "0px" || cs.boxShadow !== "none";
          // 2.4.11 Focus Not Obscured (Minimum): the focused component must not be *entirely* hidden. A control that
          // fits under the header has to clear it outright; one taller than the viewport (a scrollable minimums table
          // on a phone) can never put its top edge below a sticky header, so the test is whether any of it is visible.
          const fits = rect.height <= window.innerHeight - hb;
          const visiblePart = Math.min(rect.bottom, window.innerHeight) - Math.max(rect.top, hb);
          const obscured = rect.height > 0 && !el.closest("header") && (fits ? rect.top < hb && rect.bottom > 0 : visiblePart <= 0);
          return { tag: el.tagName, text: (el.textContent ?? "").trim().slice(0, 30), visible, obscured, sr: el.closest(".sr-only") !== null };
        }, headerBottom);
        if (!r) break;
        if (!r.visible && !r.sr) problems.push(`no visible focus: ${r.tag} ${r.text}`);
        if (r.obscured) problems.push(`obscured by header: ${r.tag} ${r.text}`);
      }
      expect(problems).toEqual([]);
    });
  }
});
