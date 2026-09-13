import type { CollectionConfig } from "payload";
import { afterChangeRevalidate, afterDeleteRevalidate } from "../hooks/revalidate.ts";
import { adminsOrEditors, publicRead } from "../access/index.ts";
import { slugField } from "../fields/index.ts";

export const FIELD_TYPES = ["text", "email", "tel", "date", "textarea", "select", "checkbox", "checkbox-group", "address", "hidden"] as const;
export const LEAD_TYPES = ["contact", "intake", "medication", "quote", "referral"] as const;

/**
 * Form definitions. The renderer (Phase 5) reads these; submissions become
 * Leads. Turnstile is not optional and is therefore not a field.
 */
export const Forms: CollectionConfig = {
  slug: "forms",
  admin: { useAsTitle: "name", group: "Operations", defaultColumns: ["name", "slug", "leadType"] },
  access: { read: publicRead, create: adminsOrEditors, update: adminsOrEditors, delete: adminsOrEditors },
  hooks: { afterChange: [afterChangeRevalidate], afterDelete: [afterDeleteRevalidate] },
  fields: [
    { name: "name", type: "text", required: true },
    slugField("name"),
    { name: "leadType", type: "select", required: true, options: LEAD_TYPES.map((v) => ({ label: v, value: v })) },
    { name: "collectsHealthInformation", type: "checkbox", defaultValue: false, admin: { description: "Medication and health indications: shorter retention, admin-only read, never emailed in full." } },
    {
      name: "fields",
      type: "array",
      required: true,
      minRows: 1,
      fields: [
        { type: "row", fields: [
          { name: "name", type: "text", required: true },
          { name: "label", type: "text", required: true },
          { name: "type", type: "select", required: true, options: FIELD_TYPES.map((v) => ({ label: v, value: v })) },
        ] },
        { type: "row", fields: [
          { name: "required", type: "checkbox", defaultValue: false },
          { name: "autocomplete", type: "text", admin: { description: "WHATWG autocomplete token, e.g. given-name, tel, bday" } },
          { name: "inputmode", type: "text" },
          { name: "pii", type: "checkbox", defaultValue: false, admin: { description: "Stored only in Leads.data, never in notifications or logs." } },
        ] },
        { name: "placeholder", type: "text" },
        { name: "help", type: "text" },
        { name: "options", type: "array", admin: { condition: (_, sibling) => ["select", "checkbox-group"].includes(sibling?.type) }, fields: [{ name: "label", type: "text", required: true }, { name: "value", type: "text", required: true }] },
        { name: "optionsFromProducts", type: "checkbox", defaultValue: false, admin: { description: "Populate options from the reviewed product list at render time." } },
      ],
    },
    { name: "submitLabel", type: "text", required: true, defaultValue: "Send" },
    { name: "confirmation", type: "richText", admin: { description: "Shown after a successful submission." } },
    { name: "notifyEmails", type: "array", fields: [{ name: "email", type: "email", required: true }], admin: { description: "Notification recipients. Falls back to OWNER_EMAIL. Notifications never include PII fields." } },
  ],
};
