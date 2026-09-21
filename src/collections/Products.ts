import type { CollectionConfig } from "payload";
import { afterChangeRevalidate, afterDeleteRevalidate } from "../hooks/revalidate.ts";
import { adminsOrEditors, reviewedOrStaff } from "../access/index.ts";
import { reviewFields, seoFields, slugField } from "../fields/index.ts";

/**
 * 36 documents drive 108 product routes plus every composed location page.
 * Composition is code (Phase 6 templates); this holds what an editor owns.
 */
export const Products: CollectionConfig = {
  slug: "products",
  admin: {
    useAsTitle: "name",
    group: "Catalogue",
    defaultColumns: ["name", "slug", "tier", "category", "reviewStatus", "indexWave"],
  },
  access: { read: reviewedOrStaff, create: adminsOrEditors, update: adminsOrEditors, delete: adminsOrEditors },
  defaultSort: "name",
  hooks: { afterChange: [afterChangeRevalidate], afterDelete: [afterDeleteRevalidate] },
  fields: [
    { name: "name", type: "text", required: true },
    slugField("name"),
    {
      type: "row",
      fields: [
        {
          name: "tier",
          type: "select",
          required: true,
          options: [
            { label: "1 — city-level pages", value: "1" },
            { label: "2 — state-level only", value: "2" },
          ],
          admin: { description: "Tier 1 gets product × city pages. Promote a Tier 2 line only with search evidence." },
        },
        { name: "category", type: "select", required: true, options: ["Personal", "Commercial"].map((v) => ({ label: v, value: v })) },
        {
          name: "thirdSubpage",
          type: "select",
          required: true,
          defaultValue: "discounts-faq",
          options: [
            { label: "Discounts & FAQ", value: "discounts-faq" },
            { label: "Plans & enrollment FAQ", value: "plans-enrollment-faq" },
          ],
          admin: { description: "Medicare and annuities have no discounts to describe (docs/RECONCILIATION.md)." },
        },
      ],
    },
    {
      name: "parent",
      type: "relationship",
      relationTo: "products",
      admin: { description: "Sub-line of a hub product, e.g. term life under life insurance." },
      filterOptions: ({ id }) => (id ? { id: { not_equals: id } } : true),
    },
    {
      name: "medicareTouching",
      type: "checkbox",
      defaultValue: false,
      admin: { description: "Every page for this product carries the TPMO/CMS disclaimer and routes referrals to the Medicare rule set." },
    },
    { name: "summary", type: "textarea", maxLength: 300, admin: { description: "One paragraph, used on hubs and cards." } },
    { name: "intro", type: "richText" },
    {
      name: "coverageBlocks",
      type: "array",
      admin: { description: "What the policy does, one block per coverage part." },
      fields: [
        { name: "heading", type: "text", required: true },
        { name: "body", type: "richText", required: true },
      ],
    },
    {
      type: "row",
      fields: [
        { name: "covered", type: "array", fields: [{ name: "item", type: "text", required: true }] },
        { name: "notCovered", type: "array", fields: [{ name: "item", type: "text", required: true }] },
      ],
    },
    {
      name: "discounts",
      type: "array",
      admin: { condition: (data) => data?.thirdSubpage !== "plans-enrollment-faq" },
      fields: [
        { name: "name", type: "text", required: true },
        { name: "description", type: "textarea", required: true },
      ],
    },
    {
      name: "faqs",
      type: "array",
      fields: [
        { name: "question", type: "text", required: true },
        { name: "answer", type: "richText", required: true },
      ],
    },
    {
      name: "relatedProducts",
      type: "relationship",
      relationTo: "products",
      hasMany: true,
      filterOptions: ({ id }) => (id ? { id: { not_equals: id } } : true),
    },
    seoFields(),
    ...reviewFields(),
  ],
};
