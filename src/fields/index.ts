import { APIError, type Field, type TextField, type TextFieldSingleValidation } from "payload";
import { adminFieldOnly } from "../access/index.ts";
import { isAdmin, userOf } from "../lib/roles.ts";
import { isNormalizedSlug, slugify } from "../lib/slug.ts";

export const REVIEW_STATUSES = ["draft", "in-review", "reviewed"] as const;
export type ReviewStatus = (typeof REVIEW_STATUSES)[number];

/**
 * reviewStatus + indexWave on every content document (page-generation Phase 3
 * and 4). `reviewed` is a human, admin-only act: an editor can move a document
 * to in-review but the validate hook refuses `reviewed` from anyone else.
 * Anything not `reviewed` renders noindex regardless of wave; wave decides
 * indexability among reviewed documents.
 */
export const reviewFields = (): Field[] => [
  {
    name: "reviewStatus",
    type: "select",
    required: true,
    defaultValue: "draft",
    index: true,
    options: REVIEW_STATUSES.map((v) => ({ label: v, value: v })),
    admin: { position: "sidebar", description: "Only an admin can set reviewed. Everything else renders noindex." },
    hooks: {
      beforeChange: [
        ({ value, previousValue, req }) => {
          // A userless local-API call (seed, migrations) is system code; the rule binds every signed-in non-admin.
          if (req.user && value === "reviewed" && previousValue !== "reviewed" && !isAdmin(userOf(req))) {
            throw new APIError("Only an admin can mark a document reviewed.", 403);
          }
          return value;
        },
      ],
    },
  },
  {
    name: "indexWave",
    type: "select",
    required: true,
    defaultValue: "3",
    index: true,
    options: [
      { label: "1 — launch", value: "1" },
      { label: "2 — second wave", value: "2" },
      { label: "3 — as review completes", value: "3" },
    ],
    admin: { position: "sidebar", description: "Promoted by changing this, not by rebuilding." },
    access: { update: adminFieldOnly },
  },
];

export const seoFields = (): Field => ({
  name: "seo",
  type: "group",
  admin: { description: "Leave blank to derive from the document. Title ≤ 60, description ≤ 155." },
  fields: [
    { name: "title", type: "text", maxLength: 60 },
    { name: "description", type: "textarea", maxLength: 155 },
    { name: "image", type: "upload", relationTo: "media" },
  ],
});

const validateSlug: TextFieldSingleValidation = (value) => {
  if (typeof value !== "string" || value === "") return "Slug is required.";
  if (!isNormalizedSlug(value)) return `Slug must be normalized (got "${value}", expected "${slugify(value)}").`;
  return true;
};

/** Slug that is normalized on save and refuses anything the normalizer would change. */
export const slugField = (from = "name", overrides: Partial<TextField> = {}): Field => ({
  name: "slug",
  type: "text",
  required: true,
  unique: true,
  index: true,
  admin: { position: "sidebar", description: `Derived from ${from} when blank. Lowercase, hyphens, no apostrophes.` },
  hooks: {
    beforeValidate: [
      ({ value, siblingData }) => {
        const source = (siblingData as Record<string, unknown>)?.[from];
        if ((value === undefined || value === "") && typeof source === "string") return slugify(source);
        return typeof value === "string" ? value.trim() : value;
      },
    ],
  },
  validate: validateSlug,
  ...(overrides as object),
} as Field);

/** `{{TODO:scope.key}}` tokens are how unknown facts are recorded (operating rule 2). */
export const TODO_TOKEN = /\{\{TODO:[a-zA-Z0-9_.-]+\}\}/;
export const hasTodo = (v: unknown): boolean => typeof v === "string" && TODO_TOKEN.test(v);
