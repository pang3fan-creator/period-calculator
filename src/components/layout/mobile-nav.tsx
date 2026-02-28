"use client";

import { useState, useSyncExternalStore } from "react";
import { useTheme } from "next-themes";
import { useTranslations, useLocale } from "next-intl";
import { Link, usePathname, useRouter } from "@/i18n/routing";
import { Locale } from "@/i18n/config";

const languages: { code: Locale; label: string }[] = [
  { code: "en", label: "English" },
  { code: "es", label: "Español" },
  { code: "fr", label: "Français" },
];

export function MobileNav() {
  const [settingsOpen, setSettingsOpen] = useState(false);
  const emptySubscribe = () => () => {};
  const mounted = useSyncExternalStore(
    emptySubscribe,
    () => true,
    () => false,
  );
  const { theme, setTheme } = useTheme();
  const tSettings = useTranslations("settings");
  const pathname = usePathname();
  const router = useRouter();
  const locale = useLocale() as Locale;

  const isHomeActive = pathname === "/";
  const isIrregularActive = pathname === "/irregular-period-calculator";
  const isOvulationActive = pathname === "/ovulation-calculator";

  return (
    <>
      {/* Bottom Tab Bar */}
      <nav
        className="border-warmbeige-200 bg-ivory-50/95 dark:border-dark-border dark:bg-dark-bg/95 fixed right-0 bottom-0 left-0 z-50 border-t backdrop-blur-md md:hidden"
        style={{ paddingBottom: "env(safe-area-inset-bottom)" }}
      >
        <div className="grid h-16 grid-cols-4">
          {/* Home */}
          <Link
            href="/"
            className={`focus-visible:ring-primary-400 flex flex-col items-center justify-center gap-1 rounded-lg outline-none focus-visible:ring-2 focus-visible:ring-offset-2 ${
              isHomeActive
                ? "text-primary-400"
                : "text-gray-400 dark:text-gray-500"
            }`}
            aria-label="Home"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
              <polyline points="9 22 9 12 15 12 15 22" />
            </svg>
          </Link>

          {/* Irregular */}
          <Link
            href="/irregular-period-calculator"
            className={`focus-visible:ring-primary-400 flex flex-col items-center justify-center gap-1 rounded-lg outline-none focus-visible:ring-2 focus-visible:ring-offset-2 ${
              isIrregularActive
                ? "text-primary-400"
                : "text-gray-400 dark:text-gray-500"
            }`}
            aria-label="Irregular Calculator"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <polyline points="2 17 6 13 10 17 14 9 18 13 22 7" />
            </svg>
          </Link>

          {/* Ovulation */}
          <Link
            href="/ovulation-calculator"
            className={`focus-visible:ring-primary-400 flex flex-col items-center justify-center gap-1 rounded-lg outline-none focus-visible:ring-2 focus-visible:ring-offset-2 ${
              isOvulationActive
                ? "text-primary-400"
                : "text-gray-400 dark:text-gray-500"
            }`}
            aria-label="Ovulation Calculator"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
            </svg>
          </Link>

          {/* Settings */}
          <button
            onClick={() => setSettingsOpen(true)}
            className={`focus-visible:ring-primary-400 flex flex-col items-center justify-center gap-1 rounded-lg outline-none focus-visible:ring-2 focus-visible:ring-offset-2 ${
              settingsOpen
                ? "text-primary-400"
                : "text-gray-400 dark:text-gray-500"
            }`}
            aria-label={tSettings("title")}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <circle cx="12" cy="12" r="3" />
              <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z" />
            </svg>
          </button>
        </div>
      </nav>

      {/* Settings Panel Overlay */}
      {/* Backdrop */}
      <div
        className={`fixed inset-0 z-[60] bg-black/40 transition-opacity duration-300 md:hidden ${
          settingsOpen ? "opacity-100" : "pointer-events-none opacity-0"
        }`}
        onClick={() => setSettingsOpen(false)}
      />

      {/* Panel */}
      <div
        className={`dark:bg-dark-surface fixed right-0 bottom-0 left-0 z-[70] rounded-t-2xl bg-white p-6 transition-transform duration-300 ease-out md:hidden ${
          settingsOpen ? "translate-y-0" : "translate-y-full"
        }`}
      >
        {/* Panel Header */}
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-100">
            {tSettings("title")}
          </h2>
          <button
            onClick={() => setSettingsOpen(false)}
            className="focus-visible:ring-primary-400 flex min-h-[48px] min-w-[48px] items-center justify-center rounded-xl text-gray-500 outline-none focus-visible:ring-2 focus-visible:ring-offset-2 dark:text-gray-400"
            aria-label={tSettings("close")}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
        </div>

        {/* Theme Section */}
        <div className="mt-4">
          <p className="mb-2 text-sm font-medium text-gray-700 dark:text-gray-300">
            {tSettings("theme")}
          </p>
          <div className="grid grid-cols-2 gap-2">
            {/* Light Button */}
            <button
              onClick={() => setTheme("light")}
              className={`focus-visible:ring-primary-400 flex min-h-[48px] items-center justify-center gap-2 rounded-xl outline-none focus-visible:ring-2 focus-visible:ring-offset-2 ${
                mounted && theme === "light"
                  ? "bg-primary-400 text-white"
                  : "bg-warmbeige-100 dark:bg-dark-card text-gray-700 dark:text-gray-300"
              }`}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <circle cx="12" cy="12" r="5" />
                <line x1="12" y1="1" x2="12" y2="3" />
                <line x1="12" y1="21" x2="12" y2="23" />
                <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
                <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
                <line x1="1" y1="12" x2="3" y2="12" />
                <line x1="21" y1="12" x2="23" y2="12" />
                <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" />
                <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
              </svg>
              {tSettings("light")}
            </button>

            {/* Dark Button */}
            <button
              onClick={() => setTheme("dark")}
              className={`focus-visible:ring-primary-400 flex min-h-[48px] items-center justify-center gap-2 rounded-xl outline-none focus-visible:ring-2 focus-visible:ring-offset-2 ${
                mounted && theme === "dark"
                  ? "bg-primary-400 text-white"
                  : "bg-warmbeige-100 dark:bg-dark-card text-gray-700 dark:text-gray-300"
              }`}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
              </svg>
              {tSettings("dark")}
            </button>
          </div>
        </div>

        {/* Language Section */}
        <div className="mt-6">
          <p className="mb-2 text-sm font-medium text-gray-700 dark:text-gray-300">
            {tSettings("language")}
          </p>
          <div className="space-y-1">
            {languages.map((lang) => (
              <button
                key={lang.code}
                onClick={() => {
                  router.replace(pathname, { locale: lang.code });
                  setSettingsOpen(false);
                }}
                className="focus-visible:ring-primary-400 hover:bg-warmbeige-50 dark:hover:bg-dark-card flex min-h-[48px] w-full items-center gap-3 rounded-xl px-3 outline-none focus-visible:ring-2 focus-visible:ring-offset-2"
              >
                {/* Radio indicator */}
                <span
                  className={`flex h-5 w-5 items-center justify-center rounded-full border-2 ${
                    locale === lang.code
                      ? "border-primary-400"
                      : "border-gray-300 dark:border-gray-600"
                  }`}
                  aria-hidden="true"
                >
                  {locale === lang.code && (
                    <span className="bg-primary-400 h-2.5 w-2.5 rounded-full" />
                  )}
                </span>
                <span className="text-sm text-gray-700 dark:text-gray-200">
                  {lang.label}
                </span>
              </button>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
