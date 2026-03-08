import { useTranslations } from "next-intl";
import { Link } from "@/i18n/routing";

export function Footer() {
  const t = useTranslations("footer");
  const tNav = useTranslations("nav");
  const tCommon = useTranslations("common");

  return (
    <footer className="border-warmbeige-200 bg-ivory-50 dark:border-dark-border dark:bg-dark-bg border-t">
      <div className="mx-auto max-w-7xl px-4 py-12">
        <div className="space-y-8 text-center md:grid md:grid-cols-3 md:gap-8 md:space-y-0 md:text-left">
          {/* Left: Brand */}
          <div>
            <span className="font-heading text-primary-400 text-lg font-bold">
              {tCommon("appName")}
            </span>
            <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
              {t("tagline")}
            </p>
          </div>

          {/* Center: Links */}
          <div>
            <h3 className="text-sm font-semibold tracking-wider text-gray-700 uppercase dark:text-gray-300">
              {t("links")}
            </h3>
            <ul className="mt-3 space-y-2">
              <li>
                <Link
                  href="/"
                  className="focus-visible:ring-primary-400 hover:text-primary-400 block rounded-lg text-sm text-gray-500 transition-colors outline-none focus-visible:ring-2 focus-visible:ring-offset-2 dark:text-gray-400"
                >
                  {tNav("home")}
                </Link>
              </li>
              <li>
                <Link
                  href="/irregular-period-calculator"
                  className="focus-visible:ring-primary-400 hover:text-primary-400 block rounded-lg text-sm text-gray-500 transition-colors outline-none focus-visible:ring-2 focus-visible:ring-offset-2 dark:text-gray-400"
                >
                  {tNav("irregularCalculator")}
                </Link>
              </li>
              <li>
                <Link
                  href="/privacy-policy"
                  className="focus-visible:ring-primary-400 hover:text-primary-400 block rounded-lg text-sm text-gray-500 transition-colors outline-none focus-visible:ring-2 focus-visible:ring-offset-2 dark:text-gray-400"
                >
                  {tNav("privacyPolicy")}
                </Link>
              </li>
              <li>
                <Link
                  href="/editorial-policy"
                  className="focus-visible:ring-primary-400 hover:text-primary-400 block rounded-lg text-sm text-gray-500 transition-colors outline-none focus-visible:ring-2 focus-visible:ring-offset-2 dark:text-gray-400"
                >
                  {tNav("editorialPolicy")}
                </Link>
              </li>
              <li>
                <Link
                  href="/about"
                  className="focus-visible:ring-primary-400 hover:text-primary-400 block rounded-lg text-sm text-gray-500 transition-colors outline-none focus-visible:ring-2 focus-visible:ring-offset-2 dark:text-gray-400"
                >
                  {tNav("about")}
                </Link>
              </li>
            </ul>
          </div>

          {/* Right: Trust */}
          <div className="flex items-start justify-center gap-2 md:justify-start">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="mt-0.5 shrink-0 text-gray-500 dark:text-gray-400"
              aria-hidden="true"
            >
              <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
              <path d="M7 11V7a5 5 0 0 1 10 0v4" />
            </svg>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              {t("trustText")}
            </p>
          </div>
        </div>

        {/* Copyright bar */}
        <div className="border-warmbeige-200 dark:border-dark-border mt-8 border-t pt-6 text-center text-xs text-gray-400">
          {t("copyright", { year: new Date().getFullYear() })}
        </div>
      </div>
    </footer>
  );
}
