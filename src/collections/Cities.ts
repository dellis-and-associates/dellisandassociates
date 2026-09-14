import type { CollectionConfig } from "payload";
import { afterChangeRevalidate, afterDeleteRevalidate } from "../hooks/revalidate.ts";
import { adminsOrEditors, publicRead } from "../access/index.ts";
import { hasTodo, slugField } from "../fields/index.ts";

/** The seven CityFacts fields the uniqueness requirement depends on (page-generation Phase 2). */
export const CITY_FACT_KEYS = ["county", "nearestOfficeOrAgent", "localHazards", "housingStock", "drivingContext", "neighborhoods", "notableRegulatory"] as const;

export const LOCAL_HAZARDS = [
  "monsoon-dust",
  "extreme-heat",
  "wildfire-wui",
  "hail",
  "freeze",
  "flood-plain",
  "flash-flood",
  "earthquake",
  "wind",
  "snow-load",
  "mountain-driving",
  "wildlife-collision",
  "urban-theft",
];

const isFilled = (v: unknown): boolean => {
  if (Array.isArray(v)) return v.length > 0 && v.every((x) => isFilled(typeof x === "object" && x ? (x as { value?: unknown; name?: unknown }).value ?? (x as { name?: unknown }).name : x));
  if (typeof v === "string") return v.trim() !== "" && !hasTodo(v);
  return v !== null && v !== undefined;
};

export const Cities: CollectionConfig = {
  slug: "cities",
  admin: {
    useAsTitle: "name",
    group: "Catalogue",
    defaultColumns: ["name", "state", "sizeBand", "factsComplete", "factsMissing"],
    description: "Thin cities are visible in the list: factsComplete counts the 7 CityFacts fields that are filled without a TODO token.",
  },
  access: { read: publicRead, create: adminsOrEditors, update: adminsOrEditors, delete: adminsOrEditors },
  defaultSort: "name",
  hooks: {
    afterChange: [afterChangeRevalidate],
    afterDelete: [afterDeleteRevalidate],
    beforeChange: [
      ({ data }) => {
        const facts = (data?.cityFacts ?? {}) as Record<string, unknown>;
        const missing = CITY_FACT_KEYS.filter((k) => !isFilled(facts[k]));
        data.factsComplete = CITY_FACT_KEYS.length - missing.length;
        data.factsMissing = missing.join(", ");
        return data;
      },
    ],
  },
  fields: [
    { name: "name", type: "text", required: true },
    slugField("name"),
    { name: "state", type: "relationship", relationTo: "states", required: true, index: true },
    {
      name: "sizeBand",
      type: "select",
      required: true,
      defaultValue: "mid",
      options: ["large", "mid", "small"].map((v) => ({ label: v, value: v })),
      admin: { position: "sidebar", description: "Drives block order and selection on local pages so 380 pages do not share one sequence." },
    },
    {
      name: "cityFacts",
      type: "group",
      admin: { description: "Every field feeds the 250 words of city-specific text. Unknown → {{TODO:city.<slug>.<field>}} token, never a guess." },
      fields: [
        { name: "county", type: "text" },
        { name: "nearestOfficeOrAgent", type: "text", admin: { description: "TODO token until the client confirms offices/agents." } },
        { name: "localHazards", type: "select", hasMany: true, options: LOCAL_HAZARDS.map((v) => ({ label: v, value: v })) },
        { name: "housingStock", type: "textarea", admin: { description: "e.g. stucco tract, mid-century ranch, mountain cabin, HOA-heavy" } },
        { name: "drivingContext", type: "textarea", admin: { description: "e.g. I-17 commute, mountain passes, tourist traffic" } },
        { name: "neighborhoods", type: "array", minRows: 0, fields: [{ name: "name", type: "text", required: true }], admin: { description: "3–5 real neighborhoods. Real. A fabricated one is worse than an empty list." } },
        { name: "notableRegulatory", type: "textarea" },
      ],
    },
    { name: "intro", type: "richText", admin: { description: "Optional city-level intro shared by every product page for this city." } },
    { name: "factsComplete", type: "number", admin: { readOnly: true, position: "sidebar" }, index: true },
    { name: "factsMissing", type: "text", admin: { readOnly: true, position: "sidebar" } },
  ],
};
