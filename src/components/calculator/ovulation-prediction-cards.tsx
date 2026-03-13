"use client";

import { useTranslations } from "next-intl";
import { format } from "date-fns";
import { enUS, es, fr } from "date-fns/locale";
import type { PredictionResult } from "@/types";
import type { Locale } from "@/i18n/config";
import type { OvulationPurpose } from "./ovulation-period-calculator";
import {
  getOvulationTheme,
  buildCardClasses,
  type OvulationTheme,
} from "@/lib/theme/ovulation-theme";

const DATE_FNS_LOCALE_MAP: Record<string, typeof enUS> = {
  en: enUS,
  es: es,
  fr: fr,
};

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
    <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M6.34 17.66l-1.41 1.41M19.07 4.93l-1.41 1.41" />
  </svg>
);

const WarningIcon = () => (
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
    <path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z" />
    <line x1="12" y1="9" x2="12" y2="13" />
    <line x1="12" y1="17" x2="12.01" y2="17" />
  </svg>
);

const ShieldIcon = () => (
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
    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
  </svg>
);

const InfoIcon = () => (
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
    <circle cx="12" cy="12" r="10" />
    <line x1="12" y1="16" x2="12" y2="12" />
    <line x1="12" y1="8" x2="12.01" y2="8" />
  </svg>
);

interface OvulationPredictionCardsProps {
  result: PredictionResult;
  locale: Locale;
  purpose: OvulationPurpose;
}

function formatDateRange(start: Date, end: Date, locale: string) {
  const dateFnsLocale = DATE_FNS_LOCALE_MAP[locale] || enUS;
  if (start.getTime() === end.getTime()) {
    return format(start, "MMM dd, yyyy", { locale: dateFnsLocale });
  }
  return `${format(start, "MMM dd", { locale: dateFnsLocale })} - ${format(end, "MMM dd, yyyy", { locale: dateFnsLocale })}`;
}

function getIconForType(
  theme: OvulationTheme,
  type: "ovulation" | "fertile" | "period" | "pms",
) {
  const iconMap = {
    ovulation:
      theme.textPrefix === "conceive" ? <SparklesIcon /> : <WarningIcon />,
    fertile: theme.textPrefix === "conceive" ? <HeartIcon /> : <ShieldIcon />,
    period: <CalendarIcon />,
    pms: theme.textPrefix === "conceive" ? <SunIcon /> : <InfoIcon />,
  };
  return iconMap[type];
}

export function OvulationPredictionCards({
  result,
  locale,
  purpose,
}: OvulationPredictionCardsProps) {
  const t = useTranslations("ovulationCalculator");
  const theme = getOvulationTheme(purpose);
  const {
    ovulationDate,
    fertileWindowStart,
    fertileWindowEnd,
    nextPeriodStart,
    pmsStart,
    pmsEnd,
  } = result;

  return (
    <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
      {/* Ovulation Day - Featured */}
      <div className={buildCardClasses(theme, "ovulation", true)}>
        <div
          className={`flex-shrink-0 ${theme.colors.ovulation.text} ${theme.colors.ovulation.darkText || ""}`}
        >
          {getIconForType(theme, "ovulation")}
        </div>
        <div className="min-w-0 flex-1">
          <p
            className={`mb-0.5 text-sm font-medium ${theme.colors.ovulation.text} ${theme.colors.ovulation.darkText || ""}`}
          >
            {t(`${theme.textPrefix}.ovulationTitle`)}
          </p>
          <p
            className={`text-xl font-bold ${theme.colors.ovulation.text.replace("700", "900")} dark:text-white`}
          >
            {format(ovulationDate, "MMMM dd, yyyy", {
              locale: DATE_FNS_LOCALE_MAP[locale] || enUS,
            })}
          </p>
          <p
            className={`text-sm font-medium ${theme.colors.ovulation.text} ${theme.colors.ovulation.darkText || ""}`}
          >
            {t(`${theme.textPrefix}.ovulationSubtitle`)}
          </p>
        </div>
      </div>

      {/* Fertile Window / Risk Period */}
      <div className={buildCardClasses(theme, "fertile")}>
        <div
          className={`flex-shrink-0 ${theme.colors.fertile.text} ${theme.colors.fertile.darkText || ""}`}
        >
          {getIconForType(theme, "fertile")}
        </div>
        <div className="min-w-0 flex-1">
          <p className="mb-0.5 text-sm font-medium text-gray-600 dark:text-gray-400">
            {t(`${theme.textPrefix}.fertileTitle`)}
          </p>
          <p className="text-sm font-semibold text-gray-900 sm:text-base dark:text-gray-100">
            {formatDateRange(fertileWindowStart, fertileWindowEnd, locale)}
          </p>
        </div>
      </div>

      {/* Next Period */}
      <div className={buildCardClasses(theme, "period")}>
        <div
          className={`flex-shrink-0 ${theme.colors.period.text} ${theme.colors.period.darkText || ""}`}
        >
          {getIconForType(theme, "period")}
        </div>
        <div className="min-w-0 flex-1">
          <p className="mb-0.5 text-sm font-medium text-gray-600 dark:text-gray-400">
            {t(`${theme.textPrefix}.periodTitle`)}
          </p>
          <p className="text-sm font-semibold text-gray-900 sm:text-base dark:text-gray-100">
            {format(nextPeriodStart, "MMM dd, yyyy", {
              locale: DATE_FNS_LOCALE_MAP[locale] || enUS,
            })}
          </p>
        </div>
      </div>

      {/* PMS Period */}
      <div className={buildCardClasses(theme, "pms")}>
        <div
          className={`flex-shrink-0 ${theme.colors.pms.text} ${theme.colors.pms.darkText || ""}`}
        >
          {getIconForType(theme, "pms")}
        </div>
        <div className="min-w-0 flex-1">
          <p className="mb-0.5 text-sm font-medium text-gray-600 dark:text-gray-400">
            {t(`${theme.textPrefix}.pmsTitle`)}
          </p>
          <p className="text-sm font-semibold text-gray-900 sm:text-base dark:text-gray-100">
            {formatDateRange(pmsStart, pmsEnd, locale)}
          </p>
        </div>
      </div>
    </div>
  );
}
