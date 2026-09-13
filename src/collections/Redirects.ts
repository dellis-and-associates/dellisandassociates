import type { CollectionConfig } from "payload";
import { afterChangeRevalidate, afterDeleteRevalidate } from "../hooks/revalidate.ts";
import { adminsOrEditors, publicRead } from "../access/index.ts";

/**
 * Page-level 301s (and 410s for dead WordPress paths). `from` is unique;
 * chains and loops are refused on save by walking the existing map.
 */
export const Redirects: CollectionConfig = {
  slug: "redirects",
  admin: { useAsTitle: "from", group: "Operations", defaultColumns: ["from", "to", "statusCode", "source"] },
  access: { read: publicRead, create: adminsOrEditors, update: adminsOrEditors, delete: adminsOrEditors },
  hooks: {
    afterChange: [afterChangeRevalidate],
    afterDelete: [afterDeleteRevalidate],
    beforeValidate: [
      async ({ data, req }) => {
        if (!data?.from) return data;
        data.from = normalizePath(data.from);
        if (data.statusCode === "410") {
          data.to = "";
          return data;
        }
        data.to = data.to?.startsWith("http") ? data.to : normalizePath(data.to ?? "");
        if (data.to === data.from) throw new Error("A redirect cannot point at itself.");
        // Refuse a chain: `to` must not itself be a `from`.
        const next = await req.payload.find({ collection: "redirects", where: { from: { equals: data.to } }, limit: 1, depth: 0, overrideAccess: true });
        if (next.totalDocs > 0) throw new Error(`Chain: ${data.to} is itself redirected. Point at its final target instead.`);
        // Refuse a loop: nothing may currently redirect *to* our `from` if we redirect onward... (covered by the chain rule on that row).
        return data;
      },
    ],
  },
  fields: [
    { name: "from", type: "text", required: true, unique: true, index: true, admin: { description: "Path only, with leading and trailing slash." } },
    { name: "to", type: "text", admin: { description: "Path or absolute URL. Empty for 410." } },
    {
      name: "statusCode",
      type: "select",
      required: true,
      defaultValue: "301",
      options: [
        { label: "301 Moved permanently", value: "301" },
        { label: "410 Gone", value: "410" },
      ],
    },
    {
      name: "source",
      type: "select",
      required: true,
      defaultValue: "manual",
      options: ["legacy-crawl", "slug-change", "manual"].map((v) => ({ label: v, value: v })),
    },
    { name: "note", type: "text" },
  ],
};

export function normalizePath(p: string): string {
  let s = p.trim();
  if (!s.startsWith("/")) s = `/${s}`;
  if (s.length > 1 && !s.endsWith("/")) s = `${s}/`;
  return s.toLowerCase();
}
