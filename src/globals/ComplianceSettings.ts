import type { GlobalConfig } from "payload";
import { globalAfterChangeRevalidate } from "../hooks/revalidate.ts";
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

/**
 * Admin-write-only. Disclosure texts, the banned-phrase list and retention
 * periods. The referral reward rule table lives in the referrals plugin
 * (`referral-reward-rules`, tenant-scoped) because a global cannot be
 * tenant-scoped; see DECISIONS.md, Phase 4.
 */
export const ComplianceSettings: GlobalConfig = {
  slug: "compliance-settings",
  admin: { group: "Settings", description: "Admin only. Every page reads disclosures from here; nothing is duplicated on a page." },
  access: { read: publicRead, update: admins },
  hooks: { afterChange: [globalAfterChangeRevalidate] },
  fields: [
    {
      type: "tabs",
      tabs: [
        {
          label: "Disclosures",
          fields: [
            { name: "independentAgencyDisclosure", type: "textarea", required: true, defaultValue: "Desert Peak Insurance is an independent agency, not an insurer. No coverage is bound by this website." },
            { name: "medicareInScope", type: "checkbox", defaultValue: true, admin: { description: "docs/RECONCILIATION.md: yes. When true, every Medicare-touching page must render the TPMO disclaimer." } },
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
      ],
    },
  ],
};
