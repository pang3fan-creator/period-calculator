"use client";

import { useTranslations } from "next-intl";
import { format, type Locale as DateFnsLocale } from "date-fns";
import { enUS, es, fr } from "date-fns/locale";
import type { PredictionResult } from "@/types";
import type { Locale } from "@/i18n/config";

// Locale mapping for date-fns
const DATE_FNS_LOCALE_MAP: Record<string, DateFnsLocale> = {
  en: enUS,
  es: es,
  fr: fr,
};

// SVG icons defined outside component to prevent re-creation
const CalendarIcon = () => (
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
    className="h-6 w-6"
    aria-hidden="true"
  >
    <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
    <line x1="16" y1="2" x2="16" y2="6" />
    <line x1="8" y1="2" x2="8" y2="6" />
    <line x1="3" y1="10" x2="21" y2="10" />
  </svg>
);

const SparklesIcon = () => (
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
    className="h-6 w-6"
    aria-hidden="true"
  >
    <path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z" />
  </svg>
);

const HeartIcon = () => (
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
    className="h-6 w-6"
    aria-hidden="true"
  >
    <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />
  </svg>
);

const SunIcon = () => (
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
    className="h-6 w-6"
    aria-hidden="true"
  >
    <circle cx="12" cy="12" r="4" />
    <path d="M12 2v2" />
    <path d="M12 20v2" />
    <path d="m4.93 4.93 1.41 1.41" />
    <path d="m17.66 17.66 1.41 1.41" />
    <path d="M2 12h2" />
    <path d="M20 12h2" />
    <path d="m6.34 17.66-1.41 1.41" />
    <path d="m19.07 4.93-1.41 1.41" />
  </svg>
);

interface PredictionCardsProps {
  result: PredictionResult;
  locale: Locale;
}

/**
 * Format date range based on prediction result
 * Returns a single date if start and end are the same, or a range string
 */
function formatDateRange(
  startDate: Date,
  endDate: Date,
  dateFnsLocale: DateFnsLocale,
): string {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const formattedStart = format(startDate, "MMM dd, yyyy", {
    locale: dateFnsLocale as any,
  });
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const formattedEnd = format(endDate, "MMM dd, yyyy", {
    locale: dateFnsLocale as any,
  });

  // Check if dates are the same (compare timestamps)
  if (startDate.getTime() === endDate.getTime()) {
    return formattedStart;
  }

  return `${formattedStart} - ${formattedEnd}`;
}

/**
 * PredictionCards Component
 *
 * Displays 4 prediction cards showing key dates from the cycle calculation:
 * - Next Period: red border + light red background
 * - Ovulation Day: blue border + light blue background
 * - Fertile Window: blue border + light blue background
 * - PMS Period: yellow border + light yellow background
 *
 * @param result - Prediction result from calculateCycle()
 * @param locale - Current locale for date formatting
 */
export function PredictionCards({ result, locale }: PredictionCardsProps) {
  const t = useTranslations("calculator.predictions");
  const dateFnsLocale = DATE_FNS_LOCALE_MAP[locale] || enUS;

  const {
    nextPeriodStart,
    nextPeriodEnd,
    ovulationDate,
    fertileWindowStart,
    fertileWindowEnd,
    pmsStart,
  } = result;

  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
      {/* Next Period Card */}
      <div className="flex items-center gap-4 rounded-2xl border-2 border-red-300 bg-red-50 p-5 shadow-sm transition-shadow hover:shadow-md dark:border-red-700/50 dark:bg-red-950/30">
        <div className="flex-shrink-0 text-red-600 dark:text-red-400">
          <CalendarIcon />
        </div>
        <div className="min-w-0 flex-1">
          <p className="mb-1 text-sm font-medium text-gray-600 dark:text-gray-400">
            {t("nextPeriod")}
          </p>
          <p className="truncate text-base font-semibold text-gray-900 dark:text-gray-100">
            {formatDateRange(nextPeriodStart, nextPeriodEnd, dateFnsLocale)}
          </p>
        </div>
      </div>

      {/* Ovulation Day Card */}
      <div className="flex items-center gap-4 rounded-2xl border-2 border-blue-300 bg-blue-50 p-5 shadow-sm transition-shadow hover:shadow-md dark:border-blue-700/50 dark:bg-blue-950/30">
        <div className="flex-shrink-0 text-blue-600 dark:text-blue-400">
          <SparklesIcon />
        </div>
        <div className="min-w-0 flex-1">
          <p className="mb-1 text-sm font-medium text-gray-600 dark:text-gray-400">
            {t("ovulationDay")}
          </p>
          <p className="truncate text-base font-semibold text-gray-900 dark:text-gray-100">
            {format(ovulationDate, "MMM dd, yyyy", { locale: dateFnsLocale })}
          </p>
        </div>
      </div>

      {/* Fertile Window Card */}
      <div className="flex items-center gap-4 rounded-2xl border-2 border-blue-300 bg-blue-50 p-5 shadow-sm transition-shadow hover:shadow-md dark:border-blue-700/50 dark:bg-blue-950/30">
        <div className="flex-shrink-0 text-blue-600 dark:text-blue-400">
          <HeartIcon />
        </div>
        <div className="min-w-0 flex-1">
          <p className="mb-1 text-sm font-medium text-gray-600 dark:text-gray-400">
            {t("fertileWindow")}
          </p>
          <p className="truncate text-base font-semibold text-gray-900 dark:text-gray-100">
            {formatDateRange(
              fertileWindowStart,
              fertileWindowEnd,
              dateFnsLocale,
            )}
          </p>
        </div>
      </div>

      {/* PMS Period Card */}
      <div className="flex items-center gap-4 rounded-2xl border-2 border-yellow-300 bg-yellow-50 p-5 shadow-sm transition-shadow hover:shadow-md dark:border-yellow-700/50 dark:bg-yellow-950/30">
        <div className="flex-shrink-0 text-yellow-600 dark:text-yellow-400">
          <SunIcon />
        </div>
        <div className="min-w-0 flex-1">
          <p className="mb-1 text-sm font-medium text-gray-600 dark:text-gray-400">
            {t("pmsPeriod")}
          </p>
          <p className="truncate text-base font-semibold text-gray-900 dark:text-gray-100">
            {format(pmsStart, "MMM dd, yyyy", { locale: dateFnsLocale })}
          </p>
        </div>
      </div>
    </div>
  );
}
