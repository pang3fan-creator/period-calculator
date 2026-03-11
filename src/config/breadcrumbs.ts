/**
 * Breadcrumb Configuration
 *
 * Maps route paths to translation keys for breadcrumb display.
 * Used by the Breadcrumb component to generate navigation paths.
 */

export const breadcrumbConfig: Record<string, string> = {
  "/": "nav.home",
  "/irregular-period-calculator": "nav.irregularCalculator",
  "/ovulation-calculator": "nav.ovulationCalculator",
  "/about": "nav.about",
  "/privacy-policy": "nav.privacyPolicy",
  "/editorial-policy": "nav.editorialPolicy",
  "/period-calculator-vs-flo-clue": "nav.comparison",
  "/blog": "nav.blog",
};

/**
 * Special path segments that should be treated as dynamic parameters
 * These will be replaced with actual values in the breadcrumb component
 */
export const dynamicPathSegments = ["[slug]", "[id]"];

/**
 * Get the translation key for a given path
 */
export function getBreadcrumbKey(path: string): string | undefined {
  return breadcrumbConfig[path];
}
