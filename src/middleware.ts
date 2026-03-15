import createMiddleware from "next-intl/middleware";
import { routing } from "./i18n/routing";

export default createMiddleware(routing);

export const config = {
  matcher: [
    "/",
    "/(en|es|fr)/:path*",
    "/privacy-policy",
    "/editorial-policy",
    "/irregular-period-calculator",
    "/ovulation-period-calculator",
    "/about",
    "/blog/:slug",
    "/(en|es|fr)/blog/:slug",
  ],
};
