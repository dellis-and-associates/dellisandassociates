import type { CollectionConfig } from "payload";
import { admins } from "../access/index.ts";

/** Field Core Web Vitals from /api/rum. Admin read-only; created by the endpoint through the local API. p75 per path is computed by scripts/rum-report.mts. */
export const RumSamples: CollectionConfig = {
  slug: "rum-samples",
  admin: { group: "Operations", defaultColumns: ["metric", "value", "rating", "path", "device", "createdAt"], useAsTitle: "path" },
  access: { read: admins, create: () => false, update: () => false, delete: admins },
  fields: [
    { name: "metric", type: "select", required: true, index: true, options: ["CLS", "INP", "LCP", "TTFB", "FCP"].map((v) => ({ label: v, value: v })) },
    { name: "value", type: "number", required: true },
    { name: "rating", type: "select", required: true, options: ["good", "needs-improvement", "poor"].map((v) => ({ label: v, value: v })) },
    { name: "path", type: "text", required: true, index: true },
    { name: "navigationType", type: "text" },
    { name: "device", type: "select", options: ["mobile", "desktop"].map((v) => ({ label: v, value: v })), index: true },
  ],
};
