"use client";

import { useState, useEffect, useRef, useSyncExternalStore } from "react";
import { useTheme } from "next-themes";
import { useTranslations } from "next-intl";
import { useLocale } from "next-intl";
import { Link, usePathname, useRouter } from "@/i18n/routing";
import { Locale } from "@/i18n/config";

const languages: { code: Locale; label: string }[] = [
  { code: "en", label: "English" },
  { code: "es", label: "Español" },
  { code: "fr", label: "Français" },
];

export function Header() {
  const t = useTranslations("header");
  const locale = useLocale() as Locale;
  const router = useRouter();
  const pathname = usePathname();

  // Scroll-based hide/show
  const [isHidden, setIsHidden] = useState(false);
  const hideTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    let lastScrollY = window.scrollY;

    function handleScroll() {
      const currentScrollY = window.scrollY;

      if (currentScrollY > lastScrollY && currentScrollY > 100) {
        // Scrolling down and past threshold - hide
        setIsHidden(true);
      } else {
        // Scrolling up - show
        setIsHidden(false);
      }

      // Clear existing timeout when scrolling
      if (hideTimeoutRef.current) {
        clearTimeout(hideTimeoutRef.current);
      }

      // Set timeout to hide navbar after 2 seconds of no scrolling
      hideTimeoutRef.current = setTimeout(() => {
        if (window.scrollY > 100) {
          setIsHidden(true);
        }
      }, 2000);

      lastScrollY = currentScrollY;
    }

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", handleScroll);
      if (hideTimeoutRef.current) {
        clearTimeout(hideTimeoutRef.current);
      }
    };
  }, []);

  // Theme toggle
  const { theme, setTheme } = useTheme();
  const emptySubscribe = () => () => {};
  const mounted = useSyncExternalStore(
    emptySubscribe,
    () => true,
    () => false,
  );

  // Language dropdown
  const [langOpen, setLangOpen] = useState(false);
  const langRef = useRef<HTMLDivElement>(null);

  // Close language dropdown on outside click
  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (langRef.current && !langRef.current.contains(e.target as Node)) {
        setLangOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Close language dropdown on Escape
  useEffect(() => {
    function handleEscape(e: KeyboardEvent) {
      if (e.key === "Escape") {
        setLangOpen(false);
      }
    }
    document.addEventListener("keydown", handleEscape);
    return () => document.removeEventListener("keydown", handleEscape);
  }, []);

  function handleLocaleChange(newLocale: Locale) {
    router.replace(pathname, { locale: newLocale });
    setLangOpen(false);
  }

  return (
    <header
      className={`bg-ivory-50/95 dark:bg-dark-bg/95 shadow-soft fixed top-4 right-4 left-4 z-50 mx-auto rounded-2xl backdrop-blur-md transition-transform duration-300 md:right-auto md:left-1/2 md:w-[900px] md:-translate-x-1/2 ${
        isHidden ? "-translate-y-[150%]" : "translate-y-0"
      }`}
    >
      <nav className="mx-auto flex h-14 w-full items-center justify-between px-5">
        {/* Logo */}
        <Link
          href="/"
          className="focus-visible:ring-primary-400 font-heading text-primary-400 rounded-lg text-xl font-bold outline-none focus-visible:ring-2 focus-visible:ring-offset-2"
        >
          Period Calculator
        </Link>

        {/* Right side controls */}
        <div className="flex items-center gap-4">
          {/* Theme Toggle */}
          <button
            type="button"
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            className="focus-visible:ring-primary-400 hover:bg-warmbeige-100 dark:hover:bg-dark-surface flex min-h-[48px] min-w-[48px] items-center justify-center rounded-xl text-gray-500 transition-colors outline-none hover:text-gray-700 focus-visible:ring-2 focus-visible:ring-offset-2 dark:text-gray-400 dark:hover:text-gray-200"
            aria-label={t("toggleTheme")}
          >
            {mounted ? (
              theme === "dark" ? (
                // Sun icon (show sun in dark mode to switch to light)
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
              ) : (
                // Moon icon (show moon in light mode to switch to dark)
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
                >
                  <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
                </svg>
              )
            ) : (
              // Placeholder to prevent hydration mismatch
              <span className="h-5 w-5" />
            )}
          </button>

          {/* Language Selector */}
          <div className="relative" ref={langRef}>
            <button
              type="button"
              onClick={() => setLangOpen(!langOpen)}
              className="focus-visible:ring-primary-400 flex min-h-[48px] min-w-[48px] items-center justify-center gap-1 rounded-xl px-3 text-sm font-medium text-gray-600 transition-colors outline-none hover:text-gray-800 focus-visible:ring-2 focus-visible:ring-offset-2 dark:text-gray-300 dark:hover:text-gray-100"
              aria-expanded={langOpen}
              aria-haspopup="listbox"
              aria-label={t("selectLanguage")}
            >
              {locale.toUpperCase()}
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
                className={`transition-transform ${langOpen ? "rotate-180" : ""}`}
                aria-hidden="true"
              >
                <polyline points="6 9 12 15 18 9" />
              </svg>
            </button>

            {langOpen && (
              <div className="shadow-soft dark:bg-dark-card absolute top-full right-0 z-50 mt-2 min-w-[160px] rounded-xl bg-white py-1">
                {languages.map((lang) => (
                  <button
                    key={lang.code}
                    type="button"
                    role="option"
                    aria-selected={locale === lang.code}
                    onClick={() => handleLocaleChange(lang.code)}
                    className="focus-visible:ring-primary-400 hover:bg-warmbeige-50 dark:hover:bg-dark-surface flex min-h-[44px] w-full items-center justify-between px-4 text-sm text-gray-700 transition-colors outline-none focus-visible:ring-2 focus-visible:ring-offset-2 dark:text-gray-200"
                  >
                    <span>{lang.label}</span>
                    {locale === lang.code && (
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
                        className="text-primary-400"
                        aria-hidden="true"
                      >
                        <polyline points="20 6 9 17 4 12" />
                      </svg>
                    )}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      </nav>
    </header>
  );
}
