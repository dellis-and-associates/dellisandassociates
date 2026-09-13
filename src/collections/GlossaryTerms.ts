import type { CollectionConfig } from "payload";
import { afterChangeRevalidate, afterDeleteRevalidate } from "../hooks/revalidate.ts";
import { adminsOrEditors, reviewedOrStaff } from "../access/index.ts";
import { reviewFields, seoFields, slugField } from "../fields/index.ts";
import { generationFields } from "../fields/generation.ts";
import { countWords } from "../lib/text.ts";

/**
 * No self-relation (validated here); ≥ 1 inbound link per term is a graph
 * property checked by `pnpm verify:glossary` against reviewed terms, because a
 * single save cannot see the whole graph.
 */
export const GlossaryTerms: CollectionConfig = {
  slug: "glossary-terms",
  admin: { useAsTitle: "term", group: "Content", defaultColumns: ["term", "slug", "wordCount", "reviewStatus", "indexWave"] },
  access: { read: reviewedOrStaff, create: adminsOrEditors, update: adminsOrEditors, delete: adminsOrEditors },
  defaultSort: "term",
  hooks: {
    afterChange: [afterChangeRevalidate],
    afterDelete: [afterDeleteRevalidate],
    beforeChange: [
      ({ data }) => {
        data.wordCount = countWords(data?.definition) + countWords(data?.inPractice) + countWords(data?.example);
        return data;
      },
    ],
  },
  fields: [
    { name: "term", type: "text", required: true },
    slugField("term"),
    { name: "definition", type: "richText", admin: { description: "Plain language. Never defines the term using itself." } },
    { name: "inPractice", type: "richText", admin: { description: "How it affects a policy in practice." } },
    { name: "example", type: "richText", admin: { description: "A short worked example." } },
    {
      name: "relatedTerms",
      type: "relationship",
      relationTo: "glossary-terms",
      hasMany: true,
      filterOptions: ({ id }) => (id ? { id: { not_equals: id } } : true),
      validate: (value: unknown, { id }: { id?: number | string }) => {
        if (id !== undefined && Array.isArray(value) && value.some((v) => String(typeof v === "object" && v ? (v as { id: unknown }).id : v) === String(id))) return "A term cannot relate to itself.";
        return true;
      },
    },
    { name: "relatedProducts", type: "relationship", relationTo: "products", hasMany: true },
    { name: "wordCount", type: "number", admin: { readOnly: true, position: "sidebar" } },
    seoFields(),
    ...reviewFields(),
    generationFields(),
  ],
};
