import type { CollectionConfig } from "payload";
import { adminField, tenantAdmin, tenantAdminOrOwnReferrals } from "../access.ts";
import { REFERRAL_STATUSES, REJECTION_REASONS } from "../types.ts";
import { assertSameTenant } from "../engine/tenancy.ts";

/**
 * Referee contact is minimal until opt-in. A referrer sees the referee's
 * first name and the status only (field-level access). `bound` is tracked for
 * analytics and is structurally disconnected from rewards: the reward module
 * accepts a `qualified` referral type and nothing else.
 */
export const Referrals: CollectionConfig = {
  slug: "referrals",
  admin: { useAsTitle: "id", group: "Referrals", defaultColumns: ["id", "tenant", "program", "referrer", "status", "createdAt"] },
  access: { read: tenantAdminOrOwnReferrals, create: () => false, update: tenantAdmin, delete: () => false },
  hooks: {
    beforeValidate: [
      async ({ data, req }) => {
        await assertSameTenant(req, data, [
          ["program", "referral-programs"],
          ["referrer", "referrers"],
        ]);
        return data;
      },
    ],
    beforeChange: [
      ({ data, originalDoc, operation, context }) => {
        // Status changes go through the engine (ReferralEngine.transition), which writes the event. Direct edits of status are refused.
        if (operation === "update" && originalDoc && data.status && data.status !== originalDoc.status && context?.referralEngine !== true) {
          throw new Error("Change referral status through the engine, not by editing the field.");
        }
        return data;
      },
    ],
  },
  fields: [
    { name: "tenant", type: "relationship", relationTo: "tenants", required: true, index: true, access: { update: () => false } },
    { name: "program", type: "relationship", relationTo: "referral-programs", required: true, index: true, access: { update: () => false } },
    { name: "referrer", type: "relationship", relationTo: "referrers", required: true, index: true, access: { update: () => false } },
    {
      name: "referee",
      type: "group",
      fields: [
        { name: "firstName", type: "text", required: true },
        { name: "lastName", type: "text", access: { read: adminField } },
        { name: "email", type: "email", access: { read: adminField } },
        { name: "phone", type: "text", access: { read: adminField } },
        { name: "stateAbbr", type: "text", minLength: 2, maxLength: 2, admin: { description: "Decides which reward rule row applies." } },
        { name: "emailNormalized", type: "text", index: true, admin: { hidden: true }, access: { read: adminField } },
        { name: "phoneNormalized", type: "text", index: true, admin: { hidden: true }, access: { read: adminField } },
      ],
    },
    { name: "interest", type: "relationship", relationTo: "products", hasMany: true },
    { name: "medicareTouching", type: "checkbox", required: true, defaultValue: false, admin: { readOnly: true, description: "Set from interest. Routes to the Medicare rule set." } },
    { name: "source", type: "select", required: true, options: ["link", "code", "form", "portal"].map((v) => ({ label: v, value: v })) },
    {
      name: "attribution",
      type: "group",
      fields: [
        { name: "code", type: "text" },
        { name: "model", type: "select", defaultValue: "first-touch", options: [{ label: "first-touch", value: "first-touch" }] },
        { name: "firstTouchAt", type: "date" },
        { name: "landingPage", type: "text" },
      ],
    },
    {
      name: "consent",
      type: "group",
      fields: [
        { name: "referrerAffirmedPermission", type: "checkbox", required: true, defaultValue: false, admin: { description: "The referrer affirmed they have the referee's permission. Required to create a referral." } },
        { name: "optInMessagesSent", type: "number", required: true, defaultValue: 0, admin: { readOnly: true, description: "Exactly one, ever." } },
        { name: "optInSentAt", type: "date" },
        { name: "optInStatus", type: "select", required: true, defaultValue: "pending", options: ["pending", "accepted", "declined", "expired"].map((v) => ({ label: v, value: v })) },
        { name: "optInRespondedAt", type: "date" },
        { name: "optInToken", type: "text", admin: { hidden: true }, access: { read: () => false } },
      ],
    },
    { name: "status", type: "select", required: true, defaultValue: "submitted", index: true, options: REFERRAL_STATUSES.map((v) => ({ label: v, value: v })) },
    { name: "rejectionReason", type: "select", options: REJECTION_REASONS.map((v) => ({ label: v, value: v })) },
    { name: "duplicateOf", type: "relationship", relationTo: "referrals" },
    {
      name: "fraud",
      type: "group",
      admin: { description: "Every rejection has a reason code; nothing is dropped silently." },
      fields: [
        { name: "selfReferral", type: "checkbox", defaultValue: false },
        { name: "duplicateReferee", type: "checkbox", defaultValue: false },
        { name: "disposableEmail", type: "checkbox", defaultValue: false },
        { name: "velocity", type: "checkbox", defaultValue: false },
        { name: "botCheckPassed", type: "checkbox", defaultValue: false },
        { name: "manualReview", type: "checkbox", defaultValue: false, admin: { description: "First reward for a new referrer waits here." } },
      ],
    },
    { name: "lead", type: "relationship", relationTo: "leads", admin: { description: "Created only after the referee opts in." } },
    { name: "ipHash", type: "text", admin: { hidden: true }, access: { read: adminField } },
    { name: "notes", type: "textarea", access: { read: adminField, update: adminField } },
  ],
};
