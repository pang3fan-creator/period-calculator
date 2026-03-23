/**
 * URL 工具函数 - 统一处理多语言路径拼接
 */

/** 网站基础 URL */
const BASE_URL = "https://www.aiperiodcalculator.com";

/**
 * 获取语言路径前缀
 * @param locale - 语言代码 (en/es/fr)
 * @returns 语言路径前缀
 * @example
 * getLocalePath("en") → ""
 * getLocalePath("fr") → "/fr"
 * getLocalePath("es") → "/es"
 */
export function getLocalePath(locale: string): string {
  return locale === "en" ? "" : `/${locale}`;
}

/**
 * 构建完整 URL
 * @param locale - 语言代码 (en/es/fr)
 * @param path - 页面路径 (以 / 开头)
 * @returns 完整 URL
 * @example
 * buildUrl("fr", "/blog/test") → "https://www.aiperiodcalculator.com/fr/blog/test"
 * buildUrl("en", "/blog/test") → "https://www.aiperiodcalculator.com/blog/test"
 * buildUrl("fr", "") → "https://www.aiperiodcalculator.com/fr"
 */
export function buildUrl(locale: string, path: string): string {
  const localePath = getLocalePath(locale);
  return `${BASE_URL}${localePath}${path}`;
}

export { BASE_URL };