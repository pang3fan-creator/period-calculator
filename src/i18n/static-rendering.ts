import { locales } from "./config";

export function getStaticLocaleParams() {
  return locales.map((locale) => ({ locale }));
}
