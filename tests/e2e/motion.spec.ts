import { expect, test } from "@playwright/test";

/**
 * The entrance animation may only touch content below the fold.
 *
 * A reveal-gated element inside the initial viewport is opacity: 0 from first
 * paint until React hydrates — no layout shift, so the visual suite stays
 * green, but a reader on a slow connection sees a heading over empty space,
 * and the head script's failsafe puts the worst case at 2.5 seconds. The
 * smallest viewport is the one that matters: it holds the least, so anything
 * above its fold is above everyone's.
 */
test.describe("entrance animation", () => {
  test.skip(() => ["nojs", "nojs-mobile"].includes(test.info().project.name), "no-JS projects never run the observer");

  test("nothing in the initial viewport is reveal-gated", async ({ page }) => {
    await page.goto("/");
    const above = await page.evaluate(() =>
      [...document.querySelectorAll(".reveal")]
        .map((e) => ({ top: Math.round(e.getBoundingClientRect().top), text: (e.textContent || "").trim().slice(0, 40) }))
        .filter((x) => x.top < window.innerHeight),
    );
    expect(above, "reveal-gated elements above the fold").toEqual([]);
  });

  test("reduced motion renders the final state", async ({ page }) => {
    await page.emulateMedia({ reducedMotion: "reduce" });
    await page.goto("/");
    const hidden = await page.evaluate(() => [...document.querySelectorAll(".reveal")].filter((e) => Number(getComputedStyle(e).opacity) < 1).length);
    expect(hidden, "hidden elements under prefers-reduced-motion").toBe(0);
  });

  test("the failsafe shows the copy, and nothing re-hides it", async ({ page }) => {
    await page.goto("/");
    // What the failsafe does at 2.5s if the observer never mounted, then what a late mount does after it.
    await page.evaluate(() => delete document.documentElement.dataset.js);
    const afterFailsafe = await page.evaluate(() => [...document.querySelectorAll(".reveal")].every((e) => Number(getComputedStyle(e).opacity) === 1));
    expect(afterFailsafe, "copy visible once the failsafe drops the flag").toBe(true);
    await page.evaluate(() => { document.documentElement.dataset.revealReady = "1"; });
    const stillVisible = await page.evaluate(() => [...document.querySelectorAll(".reveal")].every((e) => Number(getComputedStyle(e).opacity) === 1));
    expect(stillVisible, "a late mount must not re-hide what the failsafe revealed").toBe(true);
  });
});
