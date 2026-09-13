import { defineConfig, devices } from "@playwright/test";

/**
 * Runs against a production build: `pnpm build` first, then any of the
 * test:* scripts (the webServer starts `pnpm start` unless one is running).
 */
export default defineConfig({
  testDir: "tests/e2e",
  timeout: 60_000,
  expect: { timeout: 10_000, toHaveScreenshot: { maxDiffPixelRatio: 0.002, animations: "disabled" } },
  fullyParallel: false,
  workers: 2,
  reporter: [["list"], ["html", { open: "never", outputFolder: "tests/e2e/report" }]],
  snapshotPathTemplate: "tests/visual/__screenshots__/{projectName}/{arg}{ext}",
  use: { baseURL: "http://localhost:3000", trace: "retain-on-failure" },
  webServer: { command: "pnpm start", url: "http://localhost:3000/", reuseExistingServer: true, timeout: 120_000 },
  projects: [
    { name: "mobile", use: { viewport: { width: 320, height: 640 }, deviceScaleFactor: 2, isMobile: true, hasTouch: true } },
    { name: "tablet", use: { viewport: { width: 768, height: 1024 } } },
    { name: "desktop", use: { ...devices["Desktop Chrome"], viewport: { width: 1280, height: 800 } } },
    { name: "wide", use: { ...devices["Desktop Chrome"], viewport: { width: 1920, height: 1080 } } },
    { name: "nojs", use: { ...devices["Desktop Chrome"], viewport: { width: 1280, height: 800 }, javaScriptEnabled: false } },
    { name: "nojs-mobile", use: { viewport: { width: 320, height: 640 }, isMobile: true, hasTouch: true, javaScriptEnabled: false } },
    { name: "print", use: { ...devices["Desktop Chrome"], viewport: { width: 816, height: 1056 } } },
  ],
});
