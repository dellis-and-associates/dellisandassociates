import type { CollectionConfig } from "payload";
import { tenantAdmin, tenantStaff } from "../access.ts";
import { TRACKS } from "../types.ts";

export const ReferralPrograms: CollectionConfig = {
  slug: "referral-programs",
  admin: { useAsTitle: "name", group: "Referrals", defaultColumns: ["name", "tenant", "track", "active"] },
  access: { read: tenantStaff, create: tenantAdmin, update: tenantAdmin, delete: () => false },
  fields: [
    { name: "tenant", type: "relationship", relationTo: "tenants", required: true, index: true },
    { name: "name", type: "text", required: true },
    { name: "track", type: "select", required: true, options: TRACKS.map((v) => ({ label: v, value: v })), admin: { description: "customer = unlicensed individuals (nominal-gift regime); partner = licensed producers and business partners. Separate rule sets, ledgers and portals. Never collapsed." } },
    { name: "active", type: "checkbox", required: true, defaultValue: false, admin: { description: "Ships false." } },
    { type: "row", fields: [{ name: "activeFrom", type: "date" }, { name: "activeTo", type: "date" }] },
    {
      name: "qualification",
      type: "group",
      admin: { description: "A qualified referral is a real, consenting, non-duplicate person who was contacted. The engine enforces opt-in and contact; a bound policy is not, and cannot be made, a condition." },
      fields: [{ name: "note", type: "textarea", admin: { description: "Tenant-specific wording for the portal; not a rule." } }],
    },
    {
      name: "reward",
      type: "group",
      admin: { description: "Requested reward. The rule row for the referee's state and this track caps it; the engine takes the lower." },
      fields: [
        { name: "type", type: "select", options: ["gift-card", "merchandise", "account-credit", "none"].map((v) => ({ label: v, value: v })) },
        { name: "amount", type: "number", min: 0 },
      ],
    },
    {
      name: "terms",
      type: "array",
      admin: { description: "Versioned. Acceptance is recorded against a version; editing a version in place is refused." },
      fields: [
        { name: "version", type: "text", required: true },
        { name: "effectiveFrom", type: "date", required: true },
        { name: "text", type: "textarea", required: true },
      ],
    },
    { name: "currentTermsVersion", type: "text" },
  ],
  hooks: {
    beforeChange: [
      ({ data, originalDoc }) => {
        // Existing terms versions are immutable.
        const prior = new Map<string, string>((originalDoc?.terms ?? []).map((t: { version: string; text: string }) => [t.version, t.text]));
        for (const t of data?.terms ?? []) if (prior.has(t.version) && prior.get(t.version) !== t.text) throw new Error(`Terms version ${t.version} is already published; add a new version instead.`);
        return data;
      },
    ],
  },
};
