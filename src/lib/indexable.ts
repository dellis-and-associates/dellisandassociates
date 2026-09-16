/**
 * Structural indexability, with no environment and no imports that need one:
 * Payload hooks and unit tests load this, while src/lib/seo.ts re-exports it
 * for the page layer.
 *
 * Reviewed, in a wave the site has promoted, not a utility route, and no
 * required fact still a TODO token. `promotedWave` comes from SiteSettings
 * (default 1), so promotion is a field change, not a deploy.
 */
export function isIndexable(doc: { reviewStatus?: string | null; indexWave?: string | null }, extra: { utility?: boolean; hasTodo?: boolean; promotedWave?: number } = {}): boolean {
  const wave = Number(doc.indexWave ?? 3);
  return doc.reviewStatus === "reviewed" && wave <= (extra.promotedWave ?? 1) && !extra.utility && !extra.hasTodo;
}
