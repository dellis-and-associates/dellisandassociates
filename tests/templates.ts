/** One representative URL per template family, in traffic order. The e2e suites, lhci and the verifiers all read this. */
export const TEMPLATE_URLS = [
  "/", "/insurance/", "/insurance/auto-insurance/", "/insurance/auto-insurance/coverage/", "/insurance/auto-insurance/discounts-faq/",
  "/insurance/medicare/plans-enrollment-faq/", "/insurance/arizona/", "/insurance/auto-insurance/arizona/", "/insurance/auto-insurance/arizona/chandler/",
  "/insurance/pet-insurance/nevada/", "/locations/", "/resources/", "/resources/guides/auto-insurance-explained-a-beginner-s-guide/",
  "/resources/glossary/", "/resources/glossary/deductible/", "/agents/", "/carriers/", "/claims/", "/quote/1/", "/contact/",
  "/forms/new-client-intake/", "/legal/privacy-policy/", "/legal/licensing/arizona/", "/partners/", "/partners/login/", "/design-system/",
] as const;
export const NOT_FOUND_URL = "/this-route-does-not-exist/";
export const BREAKPOINTS = [320, 768, 1280, 1920] as const;
export const PRINT_URLS = ["/resources/guides/auto-insurance-explained-a-beginner-s-guide/", "/resources/glossary/deductible/", "/insurance/auto-insurance/coverage/"] as const;
/** Routes excluded from Lighthouse by design: the gallery, gated/utility routes and the 404. */
export const LHCI_URLS = TEMPLATE_URLS.filter((u) => !["/design-system/", "/partners/login/", "/quote/1/", "/forms/new-client-intake/"].includes(u));
