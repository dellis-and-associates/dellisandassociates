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
      name: "advisor",
      type: "group",
      admin: { description: "The advisor panel in the homepage hero. The photo is optional; the panel holds without one." },
      fields: [
        { name: "name", type: "text" },
        { name: "title", type: "text" },
        { name: "statement", type: "textarea", maxLength: 240, admin: { description: "One sentence, in the advisor's voice." } },
        { name: "photo", type: "upload", relationTo: "media" },
      ],
    },
    {
      name: "carriers",
      type: "group",
      admin: { description: "The carrier strip under the hero. Names are text until the client supplies licensed logo files (TODO-CLIENT-DATA.md)." },
      fields: [
        { name: "headline", type: "text", admin: { description: 'e.g. "Appointed with 40+ carriers"' } },
        { name: "names", type: "array", fields: [{ name: "name", type: "text", required: true }] },
      ],
    },
    {
      name: "testimonialConsentConfirmed",
      type: "checkbox",
      defaultValue: false,
      admin: { description: "Written consent from every quoted client is on file. Until this is checked, the testimonial section does not render anywhere, whatever is entered below." },
    },
    {
      name: "testimonials",
      type: "array",
      admin: { description: "Real, named, consented. The date is the date of the written consent." },
      fields: [
        { name: "quote", type: "textarea", required: true },
        { name: "name", type: "text", required: true },
        { name: "consentDate", type: "date", required: true },
      ],
    },
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
