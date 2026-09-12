import type { CollectionConfig } from "payload";
import { adminsOrEditors, publicRead } from "../access/index.ts";

/**
 * Sparse by design: a row exists only when an editor writes one for a given
 * product × city. Everything else composes from Products + Cities + States.
 */
export const LocationOverrides: CollectionConfig = {
  slug: "location-overrides",
  admin: { group: "Catalogue", defaultColumns: ["product", "city", "updatedAt"], useAsTitle: "label" },
  access: { read: publicRead, create: adminsOrEditors, update: adminsOrEditors, delete: adminsOrEditors },
  hooks: {
    beforeValidate: [
      async ({ data, req, originalDoc }) => {
        if (!data?.product || !data?.city) return data;
        const productId = typeof data.product === "object" ? data.product.id : data.product;
        const cityId = typeof data.city === "object" ? data.city.id : data.city;
        const dup = await req.payload.find({
          collection: "location-overrides",
          where: { and: [{ product: { equals: productId } }, { city: { equals: cityId } }, ...(originalDoc?.id ? [{ id: { not_equals: originalDoc.id } }] : [])] },
          limit: 1,
          depth: 0,
          overrideAccess: true,
        });
        if (dup.totalDocs > 0) throw new Error("An override for this product and city already exists; edit that one.");
        data.label = `${productId}:${cityId}`;
        return data;
      },
    ],
  },
  fields: [
    { name: "label", type: "text", admin: { hidden: true } },
    {
      type: "row",
      fields: [
        { name: "product", type: "relationship", relationTo: "products", required: true, index: true },
        { name: "city", type: "relationship", relationTo: "cities", required: true, index: true },
      ],
    },
    { name: "intro", type: "richText" },
    {
      name: "testimonial",
      type: "group",
      admin: { description: "Renders only when consent is on file. Legacy testimonials are never reused without written consent." },
      fields: [
        { name: "quote", type: "textarea" },
        { name: "attribution", type: "text", admin: { description: "First name and city at most." } },
        { name: "consentOnFile", type: "checkbox", defaultValue: false },
        { name: "consentDocument", type: "upload", relationTo: "media" },
      ],
    },
    { name: "assignedAgent", type: "relationship", relationTo: "agents" },
    {
      name: "customFaqs",
      type: "array",
      fields: [
        { name: "question", type: "text", required: true },
        { name: "answer", type: "richText", required: true },
      ],
    },
  ],
};
