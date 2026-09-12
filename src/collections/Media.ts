import type { CollectionConfig } from "payload";

/**
 * Stored in Supabase Storage (bucket in S3_BUCKET) through the S3 adapter; see
 * src/payload.config.ts. Sizes are provisional until Phase 5 fixes the
 * `sizes` attributes the templates actually use; revisit then.
 */
export const Media: CollectionConfig = {
  slug: "media",
  access: { read: () => true },
  fields: [{ name: "alt", type: "text", required: true }],
  upload: {
    mimeTypes: ["image/*", "application/pdf"],
    imageSizes: [
      { name: "thumbnail", width: 400, height: undefined, position: "centre" },
      { name: "card", width: 768 },
      { name: "content", width: 1280 },
      { name: "hero", width: 1920 },
    ],
    adminThumbnail: "thumbnail",
    focalPoint: true,
  },
};
