import type { GlobalConfig } from "payload";
import { admins, publicRead } from "../access/index.ts";

export const BANNED_PHRASES_DEFAULT = [
  "guaranteed lowest rate",
  "cheapest",
  "we'll save you",
  "we will save you",
  "always covered",
  "instant approval",
  "guaranteed savings",
  "lowest price guaranteed",
];

export const REFERRAL_TRACKS = ["customer", "partner"] as const;
export const REWARD_TYPES = ["gift-card", "merchandise", "account-credit", "none"] as const;

/**
 * Admin-write-only. Disclosure texts, the banned-phrase list, retention
 * periods, and the referral reward rule table. Ships with every reward rule
 * row null and the program disabled; counsel fills it in (Phase 4).
 */
export const ComplianceSettings: GlobalConfig = {
  slug: "compliance-settings",
  admin: { group: "Settings", description: "Admin only. Every page reads disclosures from here; nothing is duplicated on a page." },
  access: { read: publicRead, update: admins },
  fields: [
    {
      type: "tabs",
      tabs: [
        {
          label: "Disclosures",
          fields: [
            { name: "independentAgencyDisclosure", type: "textarea", required: true, defaultValue: "Desert Peak Insurance is an independent agency, not an insurer. No coverage is bound by this website." },
            { name: "medicareInScope", type: "checkbox", defaultValue: true, admin: { description: "RECONCILIATION.md: yes. When true, every Medicare-touching page must render the TPMO disclaimer." } },
            { name: "medicareTpmoDisclaimer", type: "textarea", admin: { description: "Plan-year approved text. TODO token until supplied (TODO-CLIENT-DATA.md #11)." }, defaultValue: "{{TODO:compliance.medicareTpmoDisclaimer}}" },
            { name: "medicarePlanYear", type: "text", admin: { description: "e.g. 2027" } },
            { name: "stateLicensingDisclosure", type: "textarea", admin: { description: "Template. {{licenseNumber}} and {{state}} are substituted from States." }, defaultValue: "Desert Peak Insurance is licensed in {{state}}, license number {{licenseNumber}}." },
            { name: "licensedStatesNote", type: "textarea", admin: { description: "Do not display a state count until the client confirms the list (TODO-CLIENT-DATA.md #1)." } },
          ],
        },
        {
          label: "Banned phrases",
          fields: [
            {
              name: "bannedPhrases",
              type: "array",
              admin: { description: "The build fails on any hit in rendered text (page-generation Phase 4)." },
              defaultValue: BANNED_PHRASES_DEFAULT.map((phrase) => ({ phrase })),
              fields: [{ name: "phrase", type: "text", required: true }],
            },
          ],
        },
        {
          label: "Retention",
          fields: [
            { name: "leadRetentionDays", type: "number", required: true, defaultValue: 730, min: 30, admin: { description: "Leads without health information. 24 months by default; counsel may change it." } },
            { name: "healthLeadRetentionDays", type: "number", required: true, defaultValue: 365, min: 30, admin: { description: "Leads with medication or health indications. 12 months by default." } },
          ],
        },
        {
          label: "Referral rewards",
          fields: [
            { name: "referralProgramEnabled", type: "checkbox", defaultValue: false, admin: { description: "Stays false until every rule row below is filled by counsel with a citation." } },
            {
              name: "rewardRules",
              type: "array",
              admin: { description: "One row per state × track (+ the Medicare rule set). Null means the engine refuses to issue a reward." },
              fields: [
                { type: "row", fields: [
                  { name: "state", type: "relationship", relationTo: "states", required: true },
                  { name: "track", type: "select", required: true, options: REFERRAL_TRACKS.map((v) => ({ label: v, value: v })) },
                  { name: "medicareRuleSet", type: "checkbox", defaultValue: false, admin: { description: "Applies to Medicare-touching referrals: non-cash, nominal, never an enrollment incentive." } },
                ] },
                { type: "row", fields: [
                  { name: "rewardTypeAllowed", type: "select", options: REWARD_TYPES.map((v) => ({ label: v, value: v })) },
                  { name: "perReferralCap", type: "number", min: 0 },
                  { name: "perReferrerAnnualCap", type: "number", min: 0 },
                  { name: "cashEquivalentAllowed", type: "select", options: [{ label: "yes", value: "yes" }, { label: "no", value: "no" }] },
                ] },
                { name: "sourceCitation", type: "textarea", admin: { description: "Statute or bulletin, with URL. Required before the row counts as filled." } },
                { name: "verifiedBy", type: "text" },
                { name: "verifiedAt", type: "date" },
              ],
            },
          ],
        },
      ],
    },
  ],
};
