import type { CollectionConfig } from "payload";
import { tenantAdmin, tenantStaff } from "../access.ts";
import { REWARD_TYPES, TRACKS } from "../types.ts";

/**
 * Per-state, per-track reward rules, tenant-scoped and admin-write-only.
 * Ships with every value null: the engine refuses to earn a reward where the
 * row is missing or any of the five rule fields is null (rule-missing /
 * rule-incomplete). Counsel fills a row and cites the source.
 */
export const ReferralRewardRules: CollectionConfig = {
  slug: "referral-reward-rules",
  admin: { useAsTitle: "label", group: "Referrals", defaultColumns: ["label", "tenant", "rewardTypeAllowed", "perReferralCap", "perReferrerAnnualCap", "verifiedAt"] },
  access: { read: tenantStaff, create: tenantAdmin, update: tenantAdmin, delete: tenantAdmin },
  hooks: {
    beforeValidate: [
      ({ data }) => {
        if (data) data.label = `${data.stateAbbr ?? "?"} · ${data.track ?? "?"}${data.medicareRuleSet ? " · medicare" : ""}`;
        return data;
      },
    ],
  },
  fields: [
    { name: "label", type: "text", admin: { readOnly: true } },
    { name: "tenant", type: "relationship", relationTo: "tenants", required: true, index: true },
    {
      type: "row",
      fields: [
        { name: "stateAbbr", type: "text", required: true, minLength: 2, maxLength: 2, admin: { description: "Two-letter state code (matches the referee's state)." } },
        { name: "track", type: "select", required: true, options: TRACKS.map((v) => ({ label: v, value: v })) },
        { name: "medicareRuleSet", type: "checkbox", required: true, defaultValue: false, admin: { description: "Applies to Medicare-touching referrals (CMS: nominal, non-cash, never an enrollment incentive)." } },
      ],
    },
    {
      type: "row",
      fields: [
        { name: "rewardTypeAllowed", type: "select", options: REWARD_TYPES.map((v) => ({ label: v, value: v })), admin: { description: "null = engine refuses" } },
        { name: "perReferralCap", type: "number", min: 0, admin: { description: "null = engine refuses" } },
        { name: "perReferrerAnnualCap", type: "number", min: 0, admin: { description: "null = engine refuses" } },
        { name: "cashEquivalentAllowed", type: "select", options: [{ label: "yes", value: "yes" }, { label: "no", value: "no" }], admin: { description: "null = engine refuses" } },
      ],
    },
    { name: "sourceCitation", type: "textarea", admin: { description: "Statute, regulation or bulletin with URL. null = engine refuses." } },
    { type: "row", fields: [{ name: "verifiedBy", type: "text" }, { name: "verifiedAt", type: "date" }] },
  ],
};
