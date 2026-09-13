/** Field validation for forms and the quote flow. Messages say what to do. */
export type FieldError = { field: string; message: string };

export const isEmail = (v: string) => /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v.trim());
export const isPhone = (v: string) => v.replace(/\D/g, "").length >= 10;
export const isZip = (v: string) => /^\d{5}(-\d{4})?$/.test(v.trim());
export const isDate = (v: string) => /^\d{4}-\d{2}-\d{2}$/.test(v) && !Number.isNaN(Date.parse(v));
export const isYear = (v: string) => /^(19|20)\d{2}$/.test(v.trim());

export function validateField(def: { name: string; label: string; type: string; required?: boolean | null }, value: string): FieldError | null {
  const v = (value ?? "").trim();
  if (!v) return def.required ? { field: def.name, message: `Enter ${def.label.toLowerCase()}.` } : null;
  if (def.type === "email" && !isEmail(v)) return { field: def.name, message: `Enter an email address like name@example.com.` };
  if (def.type === "tel" && !isPhone(v)) return { field: def.name, message: `Enter a phone number with at least 10 digits.` };
  if (def.type === "date" && !isDate(v)) return { field: def.name, message: `Enter ${def.label.toLowerCase()} as a date (YYYY-MM-DD).` };
  return null;
}
