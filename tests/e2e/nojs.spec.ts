import { expect, test } from "@playwright/test";
import { NOT_FOUND_URL, TEMPLATE_URLS } from "../templates.ts";

test.describe("renders and links without JavaScript", () => {
  test.skip(() => !test.info().project.name.startsWith("nojs"), "only the no-JS projects");
  for (const url of TEMPLATE_URLS) {
    test(`${url}`, async ({ page }, info) => {
      const res = await page.goto(url);
      expect(res?.status(), "status").toBe(url === "/partners/login/" ? 200 : 200);
      expect(await page.locator("h1").count()).toBe(1);
      expect(await page.locator("main").innerText()).not.toEqual("");
      expect(await page.locator("main a[href^='/'], nav a[href^='/']").count(), "internal links").toBeGreaterThanOrEqual(3);
      if (info.project.name === "nojs") {
        await expect(page.locator("header nav[aria-label='Primary'] summary", { hasText: "Insurance" })).toBeVisible();
        await expect(page.locator("header nav[aria-label='Primary'] summary", { hasText: "Locations" })).toBeVisible();
      } else {
        expect(await page.locator("header details summary[aria-label='Menu']").count()).toBe(1);
      }
      for (const form of await page.locator("form").all()) {
        const method = ((await form.getAttribute("method")) ?? "get").toLowerCase();
        const action = await form.getAttribute("action");
        expect(method === "get" || method === "post" || method === "dialog").toBe(true);
        if (method === "get") expect(action, "search forms have an action").toBeTruthy();
      }
    });
  }
  test("404 links home", async ({ page }) => {
    const res = await page.goto(NOT_FOUND_URL);
    expect(res?.status()).toBe(404);
    expect(await page.locator("main a[href='/']").count()).toBeGreaterThan(0);
  });
});
