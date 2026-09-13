import type { CollectionConfig } from "payload";
import { afterChangeRevalidate, afterDeleteRevalidate } from "../hooks/revalidate.ts";
import { adminFieldOnly, adminsOrEditors, publicRead } from "../access/index.ts";
import { slugField } from "../fields/index.ts";

/**
 * Four documents. Statutory minimums carry a source URL each; the license
 * number is compliance-locked at the field level (admin-only update) so
 * editors can maintain everything else on the record.
 */
export const States: CollectionConfig = {
  slug: "states",
  admin: { useAsTitle: "name", group: "Catalogue", defaultColumns: ["name", "abbr", "slug", "licenseNumber"] },
  access: { read: publicRead, create: adminsOrEditors, update: adminsOrEditors, delete: adminsOrEditors },
  defaultSort: "name",
  hooks: { afterChange: [afterChangeRevalidate], afterDelete: [afterDeleteRevalidate] },
  fields: [
    { name: "name", type: "text", required: true },
    slugField("name"),
    { name: "abbr", type: "text", required: true, minLength: 2, maxLength: 2, unique: true },
    {
      name: "licenseNumber",
      type: "text",
      access: { update: adminFieldOnly },
      admin: { position: "sidebar", description: "Compliance-locked: admin only. Leave as a TODO token until the client supplies it. Never guess." },
    },
    {
      name: "doi",
      type: "group",
      label: "Department of Insurance",
      fields: [
        { name: "name", type: "text" },
        { name: "url", type: "text" },
      ],
    },
    {
      name: "statutoryMinimums",
      type: "array",
      admin: { description: "One row per product per requirement. The source URL is mandatory: a minimum without a citation does not exist." },
      fields: [
        { name: "product", type: "relationship", relationTo: "products", required: true },
        { name: "coverage", type: "text", required: true, admin: { description: "e.g. Bodily injury liability per person" } },
        { name: "requirement", type: "text", required: true, admin: { description: "e.g. $25,000 — or a TODO token" } },
        { name: "sourceUrl", type: "text", required: true, validate: (v: unknown) => (typeof v === "string" && /^https?:\/\//.test(v) ? true : "A source URL is required.") },
        { name: "verifiedAt", type: "date" },
        { name: "note", type: "textarea" },
      ],
    },
    { name: "riskNotes", type: "richText", admin: { description: "State-level hazards and regulatory context that city pages inherit." } },
    {
      name: "notableRegulatory",
      type: "textarea",
      admin: { description: "e.g. UT no-fault PIP, NV SR-22 rules. Cite in statutoryMinimums; summarise here." },
    },
  ],
};
