import { defineConfig } from "vitest/config";

/** DB-backed suites. Run through scripts/test-access.mts, which loads .env.test and migrates the test database first. */
export default defineConfig({
  test: {
    include: ["tests/access/**/*.test.ts", "tests/db/**/*.test.ts"],
    testTimeout: 60_000,
    hookTimeout: 180_000,
    fileParallelism: false,
  },
});
