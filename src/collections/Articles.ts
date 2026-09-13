import type { CollectionConfig } from "payload";
import { afterChangeRevalidate, afterDeleteRevalidate } from "../hooks/revalidate.ts";
import { adminsOrEditors, reviewedOrStaff } from "../access/index.ts";
import { reviewFields, seoFields, slugField } from "../fields/index.ts";
import { generationFields } from "../fields/generation.ts";
import { countWords } from "../lib/text.ts";

export const ARTICLE_SECTIONS = [
  { label: "Insurance 101 guides", value: "guides", count: 30 },
  { label: "State requirements", value: "state-requirements", count: 12 },
  { label: "Comparison articles", value: "compare", count: 52 },
  { label: "How-to & checklists", value: "how-to", count: 52 },
  { label: "Life-event guides", value: "life-events", count: 20 },
  { label: "Seasonal & timely guides", value: "seasonal", count: 20 },
] as const;

export const Articles: CollectionConfig = {
  slug: "articles",
  admin: { useAsTitle: "title", group: "Content", defaultColumns: ["title", "section", "wordCount", "reviewStatus", "indexWave"] },
  access: { read: reviewedOrStaff, create: adminsOrEditors, update: adminsOrEditors, delete: adminsOrEditors },
  defaultSort: "-updatedAt",
  hooks: {
    afterChange: [afterChangeRevalidate],
    afterDelete: [afterDeleteRevalidate],
    beforeChange: [
      ({ data }) => {
        data.wordCount = countWords(data?.body);
        return data;
      },
    ],
  },
  fields: [
    { name: "title", type: "text", required: true },
    slugField("title"),
    { name: "section", type: "select", required: true, index: true, options: ARTICLE_SECTIONS.map((s) => ({ label: s.label, value: s.value })) },
    { name: "excerpt", type: "textarea", maxLength: 300 },
    { name: "body", type: "richText" },
    {
      name: "relatedProducts",
      type: "relationship",
      relationTo: "products",
      hasMany: true,
      admin: { description: "A reviewed article links to at least 2 products." },
    },
    {
      name: "relatedArticles",
      type: "relationship",
      relationTo: "articles",
      hasMany: true,
      filterOptions: ({ id }) => (id ? { id: { not_equals: id } } : true),
      admin: { description: "A reviewed article links to at least 3 other articles." },
    },
    { name: "relatedStates", type: "relationship", relationTo: "states", hasMany: true },
    { name: "relatedTerms", type: "relationship", relationTo: "glossary-terms", hasMany: true },
    { name: "wordCount", type: "number", admin: { readOnly: true, position: "sidebar" } },
    seoFields(),
    ...reviewFields(),
    generationFields(),
  ],
};
