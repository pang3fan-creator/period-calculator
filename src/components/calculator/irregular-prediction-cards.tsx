"use client";

import { useTranslations } from "next-intl";
import {
  format,
  differenceInDays,
  type Locale as DateFnsLocale,
} from "date-fns";
import { enUS, es, fr } from "date-fns/locale";
import type { IrregularPredictionResult } from "@/types";
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

const ChartIcon = () => (
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
    <path d="M3 3v18h18" />
    <path d="m19 9-5 5-4-4-3 3" />
  </svg>
);

interface IrregularPredictionCardsProps {
  result: IrregularPredictionResult;
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
  const formattedStart = format(startDate, "MMM dd, yyyy", {
    locale: dateFnsLocale,
  });
  const formattedEnd = format(endDate, "MMM dd, yyyy", {
    locale: dateFnsLocale,
  });

  // Check if dates are the same (compare timestamps)
  if (startDate.getTime() === endDate.getTime()) {
    return formattedStart;
  }

  return `${formattedStart} - ${formattedEnd}`;
}

/**
 * Get confidence color based on confidence level
 */
function getConfidenceColor(
  level: IrregularPredictionResult["confidenceLevel"],
): {
  bg: string;
  border: string;
  text: string;
  fill: string;
} {
  switch (level) {
    case "high":
      return {
        bg: "bg-green-50 dark:bg-green-950/30",
        border: "border-green-300 dark:border-green-700/50",
        text: "text-green-700 dark:text-green-400",
        fill: "fill-green-500",
      };
    case "medium":
      return {
        bg: "bg-yellow-50 dark:bg-yellow-950/30",
        border: "border-yellow-300 dark:border-yellow-700/50",
        text: "text-yellow-700 dark:text-yellow-400",
        fill: "fill-yellow-500",
      };
    case "low":
      return {
        bg: "bg-red-50 dark:bg-red-950/30",
        border: "border-red-300 dark:border-red-700/50",
        text: "text-red-700 dark:text-red-400",
        fill: "fill-red-500",
      };
  }
}

/**
 * Get confidence percentage based on level
 */
function getConfidencePercentage(
  level: IrregularPredictionResult["confidenceLevel"],
): number {
  switch (level) {
    case "high":
      return 90;
    case "medium":
      return 65;
    case "low":
      return 40;
  }
}

/**
 * IrregularPredictionCards Component
 *
 * Displays prediction cards for irregular cycles with:
 * - Predicted window (earliest to latest)
 * - Confidence level indicator
 * - Average cycle and standard deviation
 * - Standard cycle predictions (next period, ovulation, fertile, PMS)
 *
 * @param result - Prediction result from calculateIrregularCycle()
 * @param locale - Current locale for date formatting
 */
export function IrregularPredictionCards({
  result,
  locale,
}: IrregularPredictionCardsProps) {
  const t = useTranslations("irregularCalculator");
  const tPredictions = useTranslations("calculator.predictions");
  const dateFnsLocale = DATE_FNS_LOCALE_MAP[locale] || enUS;

  const {
    predictedWindow,
    averageCycleLength,
    standardDeviation,
    confidenceLevel,
    nextPeriodStart,
    nextPeriodEnd,
    ovulationDate,
    fertileWindowStart,
    fertileWindowEnd,
    pmsStart,
    pmsEnd,
  } = result;

  const confidenceColors = getConfidenceColor(confidenceLevel);
  const confidencePercentage = getConfidencePercentage(confidenceLevel);
  const windowDays = differenceInDays(
    predictedWindow.latest,
    predictedWindow.earliest,
  );

  return (
    <div className="space-y-4">
      {/* Confidence & Stats Row */}
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
        {/* Confidence Card */}
        <div
          className={`flex items-center gap-3 rounded-2xl border-2 p-3 sm:gap-4 sm:p-5 ${confidenceColors.bg} ${confidenceColors.border}`}
        >
          <div className={`flex-shrink-0 ${confidenceColors.text}`}>
            <ChartIcon />
          </div>
          <div className="min-w-0 flex-1">
            <p className="mb-1 text-sm font-medium text-gray-600 dark:text-gray-400">
              {t("confidence")}
            </p>
            <div className="mb-1">
              <div className="flex h-2 w-full overflow-hidden rounded-full bg-gray-200 dark:bg-gray-700">
                <div
                  className={`${confidenceColors.fill} transition-all duration-500`}
                  style={{ width: `${confidencePercentage}%` }}
                />
              </div>
            </div>
            <p className={`text-sm font-semibold ${confidenceColors.text}`}>
              {t(
                `confidence${confidenceLevel.charAt(0).toUpperCase() + confidenceLevel.slice(1)}`,
              )}
              <span className="ml-1 text-xs font-normal text-gray-500 dark:text-gray-400">
                ({confidencePercentage}%)
              </span>
            </p>
          </div>
        </div>

        {/* Average Cycle Card */}
        <div className="flex items-center gap-3 rounded-2xl border-2 border-purple-300 bg-purple-50 p-3 sm:gap-4 sm:p-5 dark:border-purple-700/50 dark:bg-purple-950/30">
          <div className="flex-shrink-0 text-purple-600 dark:text-purple-400">
            <CalendarIcon />
          </div>
          <div className="min-w-0 flex-1">
            <p className="mb-0.5 text-sm font-medium text-gray-600 dark:text-gray-400">
              {t("averageCycle")}
            </p>
            <p className="text-sm font-semibold text-gray-900 sm:text-base dark:text-gray-100">
              {averageCycleLength} {t("days")}
            </p>
            <p className="text-xs text-gray-500 dark:text-gray-400">
              {t("stdDev")}: ±{standardDeviation} {t("days")}
            </p>
          </div>
        </div>
      </div>

      {/* Predicted Window Card */}
      <div className="border-primary-300 bg-primary-50 dark:border-primary-700/50 dark:bg-primary-950/30 rounded-2xl border-2 p-4 sm:p-6">
        <div className="mb-3 flex items-center gap-2">
          <div className="text-primary-600 dark:text-primary-400">
            <CalendarIcon />
          </div>
          <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-100">
            {t("predictedWindow")}
          </h3>
        </div>

        {/* Window visualization */}
        <div className="mb-4">
          <div className="relative mb-2 h-4 rounded-full bg-gray-200 dark:bg-gray-700">
            {/* Earliest marker */}
            <div className="absolute top-1/2 left-0 h-3 w-3 -translate-y-1/2 rounded-full bg-red-400" />
            {/* Most likely marker */}
            <div
              className="bg-primary-500 absolute top-1/2 h-4 w-4 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-white dark:border-gray-800"
              style={{ left: "50%" }}
            />
            {/* Latest marker */}
            <div className="absolute top-1/2 right-0 h-3 w-3 -translate-y-1/2 rounded-full bg-blue-400" />
          </div>
          <div className="flex justify-between text-xs text-gray-500 dark:text-gray-400">
            <span>{t("earliest")}</span>
            <span>{t("mostLikely")}</span>
            <span>{t("latest")}</span>
          </div>
        </div>

        {/* Date range */}
        <p className="text-center text-lg font-bold text-gray-900 dark:text-gray-100">
          {formatDateRange(
            predictedWindow.earliest,
            predictedWindow.latest,
            dateFnsLocale,
          )}
        </p>
        <p className="mt-1 text-center text-sm text-gray-500 dark:text-gray-400">
          {t("windowRange", { days: windowDays })}
        </p>
      </div>

      {/* Standard Predictions Row */}
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
        {/* Next Period Card */}
        <div className="flex items-center gap-3 rounded-2xl border-2 border-red-300 bg-red-50 p-3 sm:gap-4 sm:p-5 dark:border-red-700/50 dark:bg-red-950/30">
          <div className="flex-shrink-0 text-red-600 dark:text-red-400">
            <CalendarIcon />
          </div>
          <div className="min-w-0 flex-1">
            <p className="mb-0.5 text-sm font-medium text-gray-600 dark:text-gray-400">
              {tPredictions("nextPeriod")}
            </p>
            <p className="text-sm font-semibold whitespace-normal text-gray-900 sm:text-base dark:text-gray-100">
              {formatDateRange(nextPeriodStart, nextPeriodEnd, dateFnsLocale)}
            </p>
          </div>
        </div>

        {/* Ovulation Day Card */}
        <div className="flex items-center gap-3 rounded-2xl border-2 border-blue-300 bg-blue-50 p-3 sm:gap-4 sm:p-5 dark:border-blue-700/50 dark:bg-blue-950/30">
          <div className="flex-shrink-0 text-blue-600 dark:text-blue-400">
            <SparklesIcon />
          </div>
          <div className="min-w-0 flex-1">
            <p className="mb-0.5 text-sm font-medium text-gray-600 dark:text-gray-400">
              {tPredictions("ovulationDay")}
            </p>
            <p className="text-sm font-semibold whitespace-normal text-gray-900 sm:text-base dark:text-gray-100">
              {format(ovulationDate, "MMM dd, yyyy", { locale: dateFnsLocale })}
            </p>
          </div>
        </div>

        {/* Fertile Window Card */}
        <div className="flex items-center gap-3 rounded-2xl border-2 border-blue-300 bg-blue-50 p-3 sm:gap-4 sm:p-5 dark:border-blue-700/50 dark:bg-blue-950/30">
          <div className="flex-shrink-0 text-blue-600 dark:text-blue-400">
            <HeartIcon />
          </div>
          <div className="min-w-0 flex-1">
            <p className="mb-0.5 text-sm font-medium text-gray-600 dark:text-gray-400">
              {tPredictions("fertileWindow")}
            </p>
            <p className="text-sm font-semibold whitespace-normal text-gray-900 sm:text-base dark:text-gray-100">
              {formatDateRange(
                fertileWindowStart,
                fertileWindowEnd,
                dateFnsLocale,
              )}
            </p>
          </div>
        </div>

        {/* PMS Period Card */}
        <div className="flex items-center gap-3 rounded-2xl border-2 border-yellow-300 bg-yellow-50 p-3 sm:gap-4 sm:p-5 dark:border-yellow-700/50 dark:bg-yellow-950/30">
          <div className="flex-shrink-0 text-yellow-600 dark:text-yellow-400">
            <SunIcon />
          </div>
          <div className="min-w-0 flex-1">
            <p className="mb-0.5 text-sm font-medium text-gray-600 dark:text-gray-400">
              {tPredictions("pmsPeriod")}
            </p>
            <p className="text-sm font-semibold whitespace-normal text-gray-900 sm:text-base dark:text-gray-100">
              {formatDateRange(pmsStart, pmsEnd, dateFnsLocale)}
            </p>
          </div>
        </div>
      </div>

      {/* Low confidence warning */}
      {confidenceLevel === "low" && (
        <div className="rounded-xl border-2 border-orange-300 bg-orange-50 p-4 text-orange-700 dark:border-orange-700/50 dark:bg-orange-950/30 dark:text-orange-400">
          <p className="font-medium">{t("lowConfidenceWarning")}</p>
          <p className="mt-1 text-sm">{t("lowConfidenceAdvice")}</p>
        </div>
      )}
    </div>
  );
}
