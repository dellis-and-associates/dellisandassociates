import type { Block, CollectionConfig } from "payload";
import { afterChangeRevalidate, afterDeleteRevalidate } from "../hooks/revalidate.ts";
import { adminsOrEditors, reviewedOrStaff } from "../access/index.ts";
import { reviewFields, seoFields } from "../fields/index.ts";
import { isNormalizedSlug } from "../lib/slug.ts";

export const PAGE_TEMPLATES = ["home", "static", "quote-hub", "claims-hub", "products-hub", "locations-hub", "carriers-hub", "team-hub", "blog-hub", "legal-static", "utility"] as const;
/** Utility routes (intake forms, gated portal entry) are never indexable and never in the sitemap, whatever their wave. */
export const UTILITY_TEMPLATES: readonly string[] = ["utility"];

const RichTextBlock: Block = { slug: "richText", fields: [{ name: "body", type: "richText", required: true }] };
const FaqBlock: Block = {
  slug: "faq",
  fields: [
    { name: "heading", type: "text" },
    { name: "items", type: "array", minRows: 1, fields: [{ name: "question", type: "text", required: true }, { name: "answer", type: "richText", required: true }] },
  ],
};
const CtaBlock: Block = {
  slug: "cta",
  fields: [
    { name: "heading", type: "text", required: true },
    { name: "body", type: "textarea" },
    { name: "label", type: "text", required: true },
    { name: "href", type: "text", required: true },
  ],
};
const DisclosureBlock: Block = {
  slug: "disclosure",
  admin: { disableBlockName: true },
  fields: [
    {
      name: "key",
      type: "select",
      required: true,
      options: [
        { label: "Independent agency / no coverage bound", value: "independentAgency" },
        { label: "Medicare TPMO", value: "medicareTpmo" },
        { label: "State licensing", value: "stateLicensing" },
      ],
      admin: { description: "Text comes from ComplianceSettings; a page never carries its own copy of a disclosure." },
    },
  ],
};
const FormBlock: Block = { slug: "form", fields: [{ name: "form", type: "relationship", relationTo: "forms", required: true }] };
/**
 * A numbered sequence: how something works, in order. The index is never
 * authored — the renderer counts from the array position, so reordering the
 * steps in the admin cannot leave the numbering saying something else.
 */
const StepsBlock: Block = {
  slug: "steps",
  fields: [
    { name: "eyebrow", type: "text", admin: { description: "Mono label above the heading. Two or three words." } },
    { name: "heading", type: "text", required: true },
    { name: "intro", type: "textarea" },
    {
      name: "items",
      type: "array",
      minRows: 2,
      maxRows: 6,
      admin: { description: "Numbered in the order shown here. Drag to reorder; the numbers follow." },
      fields: [{ name: "title", type: "text", required: true }, { name: "body", type: "textarea", required: true }],
    },
  ],
};

/**
 * 29 hand-built routes: 20 core + 9 legal. `path` is the full route path so
 * nested core pages (/claims/how-to-file/) are one document each.
 */
export const Pages: CollectionConfig = {
  slug: "pages",
  admin: { useAsTitle: "title", group: "Content", defaultColumns: ["title", "path", "template", "reviewStatus", "indexWave"] },
  access: { read: reviewedOrStaff, create: adminsOrEditors, update: adminsOrEditors, delete: adminsOrEditors },
  defaultSort: "path",
  hooks: {
    afterChange: [afterChangeRevalidate],
    afterDelete: [afterDeleteRevalidate],
    beforeChange: [
      ({ data }) => {
        data.noindex = UTILITY_TEMPLATES.includes(data?.template);
        return data;
      },
    ],
  },
  fields: [
    { name: "title", type: "text", required: true },
    { name: "noindex", type: "checkbox", defaultValue: false, admin: { readOnly: true, position: "sidebar", description: "Set from the template. Utility routes are noindex and excluded from the sitemap regardless of wave." } },
    {
      name: "path",
      type: "text",
      required: true,
      unique: true,
      index: true,
      admin: { position: "sidebar", description: "Leading and trailing slash, e.g. /claims/how-to-file/. Home is /." },
      validate: (v: unknown) => {
        if (typeof v !== "string") return "Path is required.";
        if (v === "/") return true;
        if (!/^\/(?:[a-z0-9-]+\/)+$/.test(v)) return "Path must look like /segment/ or /segment/segment/.";
        return v.split("/").filter(Boolean).every(isNormalizedSlug) ? true : "Every segment must be a normalized slug.";
      },
    },
    { name: "template", type: "select", required: true, defaultValue: "static", options: PAGE_TEMPLATES.map((v) => ({ label: v, value: v })), admin: { position: "sidebar" } },
    { name: "legalState", type: "relationship", relationTo: "states", admin: { condition: (data) => data?.template === "legal-static", description: "For /legal/licensing/{state}/." } },
    { name: "lede", type: "textarea", maxLength: 300 },
    { name: "layout", type: "blocks", blocks: [RichTextBlock, StepsBlock, FaqBlock, CtaBlock, DisclosureBlock, FormBlock] },
    seoFields(),
    ...reviewFields(),
  ],
};
