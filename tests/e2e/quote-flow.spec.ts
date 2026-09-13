import { expect, test, type Page } from "@playwright/test";

/** Keyboard only, end to end. No page.mouse, no click. Data survives errors, back, and reload. */
const tabTo = async (page: Page, selector: string, max = 60) => {
  for (let i = 0; i < max; i++) {
    if (await page.evaluate((s) => document.activeElement?.matches(s) ?? false, selector)) return;
    await page.keyboard.press("Tab");
  }
  throw new Error(`could not tab to ${selector}`);
};
const type = async (page: Page, selector: string, value: string) => {
  await tabTo(page, selector);
  await page.keyboard.press("ControlOrMeta+A");
  await page.keyboard.type(value);
};

test.describe("quote flow", () => {
  test.skip(() => !["mobile", "desktop"].includes(test.info().project.name), "mobile and desktop only");
  test("completes with the keyboard, keeps data across errors, back and reload", async ({ page }) => {
    await page.goto("/quote/");
    await expect(page).toHaveURL(/\/quote\/1\/$/);
    await expect(page.getByText("Step 1 of 4")).toBeVisible();
    for (const input of await page.locator("input:not([type=hidden]), select, textarea").all()) {
      expect(await input.getAttribute("autocomplete") ?? (await input.getAttribute("type")) === "checkbox" ? "ok" : null, "autocomplete present").toBeTruthy();
    }
    await tabTo(page, "input[name=products][value=auto-insurance]");
    await page.keyboard.press("Space");
    await type(page, "#zip", "85224");
    expect(await page.locator("#zip").getAttribute("inputmode")).toBe("numeric");
    await page.keyboard.press("Enter");
    await expect(page).toHaveURL(/\/quote\/2\/$/);
    await type(page, "#name", "Sam Tester");
    await type(page, "#email", "not-an-email");
    await type(page, "#phone", "8015550100");
    expect(await page.locator("#phone").getAttribute("type")).toBe("tel");
    await page.keyboard.press("Enter");
    const summary = page.locator("#error-summary");
    await expect(summary).toBeVisible();
    await expect(page.locator("#name")).toHaveValue("Sam Tester");
    await expect(page.locator("#phone")).toHaveValue("8015550100");
    await tabTo(page, "#error-summary a");
    await page.keyboard.press("Enter");
    await expect(page.locator("#email")).toBeFocused();
    await page.keyboard.press("ControlOrMeta+A");
    await page.keyboard.type("sam@example.com");
    await page.keyboard.press("Enter");
    await expect(page).toHaveURL(/\/quote\/3\/$/);
    await type(page, "#vehicle-0-year", "2019");
    await type(page, "#vehicle-0-make", "Toyota");
    await type(page, "#vehicle-0-model", "Tacoma");
    // Back keeps step 2 values
    await tabTo(page, "a[href='/quote/2/']");
    await page.keyboard.press("Enter");
    await expect(page.locator("#email")).toHaveValue("sam@example.com");
    await page.goto("/quote/3/");
    await page.reload();
    await expect(page.locator("#vehicle-0-make")).toHaveValue("Toyota");
    await tabTo(page, "form button[type=submit], form button:not([type])");
    await page.keyboard.press("Enter");
    await expect(page).toHaveURL(/\/quote\/summary\/$/);
    const text = await page.locator("[data-quote-summary]").innerText();
    for (const v of ["Sam Tester", "sam@example.com", "8015550100", "85224", "2019 Toyota Tacoma", "Auto Insurance"]) expect(text).toContain(v);
    await expect(page.locator("#consent")).not.toBeChecked();
    await tabTo(page, "form button[type=submit], form button:not([type])");
    await page.keyboard.press("Enter");
    await expect(page.locator("#error-summary")).toBeVisible();
    await tabTo(page, "#consent");
    await page.keyboard.press("Space");
    await tabTo(page, "form button[type=submit], form button:not([type])");
    await page.keyboard.press("Enter");
    await expect(page).toHaveURL(/\/quote\/done\//);
    await expect(page.locator("[data-reference]")).toHaveText(/^L-/);
  });
});
