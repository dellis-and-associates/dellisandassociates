import type { Field } from "payload";

/**
 * Resumable batched generation state (page-generation Phase 3) lives on the
 * document instead of content/.generation-state.json. Only a human flips
 * reviewStatus; this group is the generator's bookkeeping.
 */
export const generationFields = (): Field => ({
  name: "generation",
  type: "group",
  admin: { position: "sidebar" },
  fields: [
    {
      name: "status",
      type: "select",
      required: true,
      defaultValue: "pending",
      index: true,
      options: ["pending", "drafted", "failed"].map((v) => ({ label: v, value: v })),
    },
    { name: "generatedAt", type: "date" },
    { name: "batch", type: "text" },
    { name: "error", type: "textarea" },
  ],
});
