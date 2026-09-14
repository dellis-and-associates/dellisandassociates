# Referral family: withheld

Not rendered. `collateral.config.json` → `referralProgramEnabled` is `false`, which mirrors the site (every referral program is seeded `program_enabled: false` until counsel supplies the reward-rule table and its disclaimer, see the site's REFERRAL-COMPLIANCE.md).

When counsel enables it: set the flag to `true`, replace `referralDisclaimerSlot` with the approved rule-table disclaimer, and run `pnpm build:social`. The master carries that disclaimer as the last line of the body; the Medicare variant adds the TPMO band. Content lives in `content/referral.json`.

Generated 2026-09-13 by scripts/build-social.ts.
