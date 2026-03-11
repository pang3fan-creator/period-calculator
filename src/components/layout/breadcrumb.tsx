"use client";

import { usePathname } from "next/navigation";
import { useTranslations, useLocale } from "next-intl";
import { Link } from "@/i18n/routing";
import { ChevronRightIcon } from "@/components/icons";
import { breadcrumbConfig } from "@/config/breadcrumbs";

interface BreadcrumbItem {
  path: string;
  name: string;
  isCurrent: boolean;
}

interface BreadcrumbProps {
  /**
   * Override items for dynamic routes (e.g., blog post titles)
   * Each override specifies the path segment to match and the display name
   */
  overrides?: Array<{
    segment: string;
    name: string;
  }>;
  className?: string;
}

// Supported locales - matches i18n config
const SUPPORTED_LOCALES = ["en", "es", "fr"];

/**
 * Breadcrumb Component
 *
 * Automatically generates breadcrumb navigation based on the current path.
 * Uses the breadcrumbConfig for path-to-translation-key mapping.
 */
export function Breadcrumb({ overrides, className = "" }: BreadcrumbProps) {
  const pathname = usePathname();
  const locale = useLocale();
  const tNav = useTranslations("nav");
  const tBreadcrumb = useTranslations("breadcrumb");

  // Don't render on home page
  if (pathname === "/") {
    return null;
  }

  // Parse path segments and filter out locale prefix
  const allSegments = pathname.split("/").filter(Boolean);

  // Remove locale prefix if present (e.g., "es", "fr")
  const segments = allSegments.filter(
    (segment, index) => index !== 0 || !SUPPORTED_LOCALES.includes(segment),
  );

  // Build breadcrumb items
  const items: BreadcrumbItem[] = [];
  let currentPath = "";

  segments.forEach((segment, index) => {
    currentPath += `/${segment}`;
    const isLast = index === segments.length - 1;

    // Check if this segment has an override (for dynamic routes)
    const override = overrides?.find((o) => o.segment === segment);

    // Get the translation key from config
    const translationKey = breadcrumbConfig[currentPath];

    // Determine the display name
    let name: string;
    if (override) {
      name = override.name;
    } else if (translationKey) {
      // Extract the key part after "nav."
      const key = translationKey.replace("nav.", "");
      name = tNav(key);
    } else {
      // Fallback: capitalize the segment
      name = segment
        .split("-")
        .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
        .join(" ");
    }

    items.push({
      path: currentPath,
      name,
      isCurrent: isLast,
    });
  });

  // Always prepend Home
  items.unshift({
    path: "/",
    name: tNav("home"),
    isCurrent: false,
  });

  return (
    <nav aria-label={tBreadcrumb("ariaLabel")} className={`mb-6 ${className}`}>
      <ol className="flex flex-wrap items-center justify-center gap-1 text-sm">
        {items.map((item, index) => (
          <li key={item.path} className="flex items-center">
            {index > 0 && (
              <ChevronRightIcon
                className="h-4 w-4 text-gray-300 dark:text-gray-600"
                aria-hidden="true"
              />
            )}
            {item.isCurrent ? (
              <span
                className="text-primary-500 dark:text-primary-400 ml-1 font-medium"
                aria-current="page"
              >
                {item.name}
              </span>
            ) : (
              <Link
                href={item.path}
                className="hover:text-primary-500 dark:hover:text-primary-400 ml-1 text-gray-500 transition-colors dark:text-gray-400"
              >
                {item.name}
              </Link>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}
