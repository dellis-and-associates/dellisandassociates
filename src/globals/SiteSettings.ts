import type { GlobalConfig } from "payload";
import { globalAfterChangeRevalidate } from "../hooks/revalidate.ts";
import { adminsOrEditors, publicRead } from "../access/index.ts";

/** Editor-maintained facts about the agency. Every value starts as a TODO token; see TODO-CLIENT-DATA.md. */
export const SiteSettings: GlobalConfig = {
  slug: "site-settings",
  admin: { group: "Settings" },
  access: { read: publicRead, update: adminsOrEditors },
  hooks: { afterChange: [globalAfterChangeRevalidate] },
  fields: [
    { type: "row", fields: [
      { name: "name", type: "text", required: true, defaultValue: "Desert Peak Insurance" },
      { name: "legalName", type: "text", defaultValue: "{{TODO:site.legalName}}" },
    ] },
    { type: "row", fields: [
      { name: "phone", type: "text", admin: { description: "Display form, e.g. 801-300-9980" } },
      { name: "phoneHref", type: "text", admin: { description: "tel: form, digits only, e.g. tel:8013009980" } },
      { name: "email", type: "email" },
    ] },
    {
      name: "address",
      type: "group",
      fields: [
        { name: "street", type: "text" },
        { type: "row", fields: [
          { name: "city", type: "text" },
          { name: "state", type: "relationship", relationTo: "states" },
          { name: "zip", type: "text" },
        ] },
      ],
    },
    { name: "officeHours", type: "text" },
    {
      name: "social",
      type: "group",
      fields: [
        { name: "facebook", type: "text" },
        { name: "instagram", type: "text" },
        { name: "linkedin", type: "text" },
        { name: "google", type: "text", admin: { description: "Google Business Profile URL" } },
      ],
    },
    {
      name: "nav",
      type: "group",
      fields: [
        { name: "header", type: "array", fields: [{ name: "label", type: "text", required: true }, { name: "href", type: "text", required: true }] },
        { name: "footer", type: "array", fields: [
          { name: "heading", type: "text", required: true },
          { name: "links", type: "array", fields: [{ name: "label", type: "text", required: true }, { name: "href", type: "text", required: true }] },
        ] },
      ],
    },
    {
      name: "defaultSeo",
      type: "group",
      fields: [
        { name: "titleSuffix", type: "text", defaultValue: " — Desert Peak Insurance" },
        { name: "description", type: "textarea", maxLength: 155 },
        { name: "image", type: "upload", relationTo: "media" },
      ],
    },
  ],
};
