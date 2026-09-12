import { defineConfig } from "vitest/config";

/** `pnpm test`: pure unit suites. DB-backed suites live under tests/access and tests/db and run via vitest.db.config.mts. */
export default defineConfig({
  test: {
    include: ["tests/unit/**/*.test.ts"],
    testTimeout: 30_000,
  },
});
