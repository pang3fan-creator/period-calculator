"use client";

import { useState, useMemo, useCallback } from "react";
import { useTranslations } from "next-intl";
import {
  format,
  startOfMonth,
  endOfMonth,
  eachDayOfInterval,
  addMonths,
  subMonths,
  getDate,
  startOfWeek,
  type Locale as DateFnsLocale,
} from "date-fns";
import { enUS, es, fr } from "date-fns/locale";
import type { PredictionResult } from "@/types";
import type { Locale } from "@/i18n/config";
import { getDatePeriodType } from "@/lib/calculator/cycle-calculator";

// Locale mapping for date-fns
const DATE_FNS_LOCALE_MAP: Record<Locale, DateFnsLocale> = {
  en: enUS,
  es: es,
  fr: fr,
};

// Week day order starting from Monday
const WEEK_DAYS = ["mon", "tue", "wed", "thu", "fri", "sat", "sun"] as const;

interface CalendarDay {
  date: Date;
  dayNumber: number;
  isCurrentMonth: boolean;
  periodType: ReturnType<typeof getDatePeriodType>;
}

interface CalendarViewProps {
  prediction: PredictionResult;
  locale: Locale;
}

// SVG icons for navigation
const ChevronLeftIcon = () => (
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
    className="h-5 w-5"
    aria-hidden="true"
  >
    <path d="m15 18-6-6 6-6" />
  </svg>
);

const ChevronRightIcon = () => (
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
    className="h-5 w-5"
    aria-hidden="true"
  >
    <path d="m9 18 6-6-6-6" />
  </svg>
);

/**
 * Get calendar styling class names based on period type
 */
function getDayCellStyles(periodType: ReturnType<typeof getDatePeriodType>) {
  const baseStyles =
    "flex h-11 min-h-[44px] items-center justify-center rounded-2xl text-sm font-medium transition-all";

  switch (periodType) {
    case "period":
      return `${baseStyles} border-2 border-red-400 bg-red-50 text-red-700 dark:border-red-500/50 dark:bg-red-950/40 dark:text-red-300`;
    case "ovulation":
      return `${baseStyles} border-2 border-blue-400 bg-blue-50 text-blue-700 font-bold dark:border-blue-500/50 dark:bg-blue-950/40 dark:text-blue-300`;
    case "fertile":
      return `${baseStyles} border-2 border-blue-300 bg-blue-50 text-blue-700 dark:border-blue-600/50 dark:bg-blue-950/40 dark:text-blue-300`;
    case "pms":
      return `${baseStyles} border-2 border-yellow-300 bg-yellow-50 text-yellow-700 dark:border-yellow-600/50 dark:bg-yellow-950/40 dark:text-yellow-300`;
    default:
      return `${baseStyles} text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-800`;
  }
}

/**
 * CalendarView Component
 *
 * Displays a monthly calendar view with cycle prediction highlighting:
 * - Red: Menstruation period
 * - Blue (bold): Ovulation day
 * - Blue: Fertile window
 * - Yellow: PMS period
 *
 * Features:
 * - 7-column grid (Mon-Sun)
 * - Month navigation
 * - Localized date formatting
 * - Dark mode support
 * - Accessible navigation buttons
 *
 * @param prediction - Prediction result from calculateCycle()
 * @param locale - Current locale for date formatting
 */
export function CalendarView({ prediction, locale }: CalendarViewProps) {
  const t = useTranslations("calculator.calendar");
  const dateFnsLocale = DATE_FNS_LOCALE_MAP[locale];

  // Initialize current month to the next period start date
  const [currentMonth, setCurrentMonth] = useState(() => {
    // Start from the month of next period
    return startOfMonth(prediction.nextPeriodStart);
  });

  // Navigate to previous month
  const handlePreviousMonth = useCallback(() => {
    setCurrentMonth((prev) => subMonths(prev, 1));
  }, []);

  // Navigate to next month
  const handleNextMonth = useCallback(() => {
    setCurrentMonth((prev) => addMonths(prev, 1));
  }, []);

  // Generate calendar days for the current month view
  const calendarDays = useMemo(() => {
    const monthStart = startOfMonth(currentMonth);
    const monthEnd = endOfMonth(currentMonth);
    const monthDays = eachDayOfInterval({ start: monthStart, end: monthEnd });

    // Get the first day of the week (Monday) for padding
    const firstDayOfWeek = startOfWeek(monthStart, { weekStartsOn: 1 });
    const paddingDays = eachDayOfInterval({
      start: firstDayOfWeek,
      end: monthStart,
    }).slice(0, -1); // Exclude the month start itself

    const totalPaddingDays = paddingDays.length;

    // Combine padding days and month days
    const allDays: CalendarDay[] = [];

    // Add padding days (from previous month)
    for (let i = 0; i < totalPaddingDays; i++) {
      const date = paddingDays[i];
      allDays.push({
        date,
        dayNumber: getDate(date),
        isCurrentMonth: false,
        periodType: getDatePeriodType(date, prediction),
      });
    }

    // Add current month days
    for (const day of monthDays) {
      allDays.push({
        date: day,
        dayNumber: getDate(day),
        isCurrentMonth: true,
        periodType: getDatePeriodType(day, prediction),
      });
    }

    return allDays;
  }, [currentMonth, prediction]);

  // Format month title
  const monthTitle = format(currentMonth, "MMMM yyyy", {
    locale: dateFnsLocale,
  });

  return (
    <div className="dark:bg-dark-card flex w-full flex-col gap-6 rounded-3xl bg-white p-6 shadow-lg md:p-8">
      {/* Calendar Header */}
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-100">
          {t("title")}
        </h2>

        {/* Month Navigation */}
        <div className="flex items-center gap-4">
          <button
            type="button"
            onClick={handlePreviousMonth}
            aria-label={t("previousMonth")}
            className="rounded-xl p-2 text-gray-600 transition-colors hover:text-gray-900 focus:ring-2 focus:ring-gray-300 focus:outline-none dark:text-gray-400 dark:hover:text-gray-100 dark:focus:ring-gray-600"
          >
            <ChevronLeftIcon />
          </button>

          <span className="min-w-[140px] text-center text-lg font-semibold text-gray-800 dark:text-gray-100">
            {monthTitle}
          </span>

          <button
            type="button"
            onClick={handleNextMonth}
            aria-label={t("nextMonth")}
            className="rounded-xl p-2 text-gray-600 transition-colors hover:text-gray-900 focus:ring-2 focus:ring-gray-300 focus:outline-none dark:text-gray-400 dark:hover:text-gray-100 dark:focus:ring-gray-600"
          >
            <ChevronRightIcon />
          </button>
        </div>
      </div>

      {/* Calendar Grid */}
      <div className="w-full">
        {/* Week Day Headers */}
        <div className="mb-2 grid grid-cols-7 gap-1 md:gap-2">
          {WEEK_DAYS.map((day) => (
            <div
              key={day}
              className="py-2 text-center text-sm font-semibold text-gray-600 dark:text-gray-400"
            >
              {t(`weekDays.${day}`)}
            </div>
          ))}
        </div>

        {/* Calendar Days */}
        <div className="grid grid-cols-7 gap-1 md:gap-2">
          {calendarDays.map((day, index) => (
            <div
              key={index}
              className={getDayCellStyles(day.periodType)}
              style={{
                opacity: day.isCurrentMonth ? 1 : 0.4,
              }}
              aria-label={
                day.isCurrentMonth
                  ? format(day.date, "MMM dd, yyyy", { locale: dateFnsLocale })
                  : undefined
              }
            >
              {day.dayNumber}
            </div>
          ))}
        </div>
      </div>

      {/* Legend */}
      <div className="flex flex-wrap items-center justify-center gap-3 text-sm">
        <div className="flex items-center gap-2">
          <div className="h-4 w-4 rounded border-2 border-red-400 bg-red-50 dark:border-red-500/50 dark:bg-red-950/40" />
          <span className="text-gray-700 dark:text-gray-300">
            {t("legend.period")}
          </span>
        </div>
        <div className="flex items-center gap-2">
          <div className="h-4 w-4 rounded border-2 border-blue-400 bg-blue-50 dark:border-blue-500/50 dark:bg-blue-950/40" />
          <span className="text-gray-700 dark:text-gray-300">
            {t("legend.ovulation")}
          </span>
        </div>
        <div className="flex items-center gap-2">
          <div className="h-4 w-4 rounded border-2 border-blue-300 bg-blue-50 dark:border-blue-600/50 dark:bg-blue-950/40" />
          <span className="text-gray-700 dark:text-gray-300">
            {t("legend.fertile")}
          </span>
        </div>
        <div className="flex items-center gap-2">
          <div className="h-4 w-4 rounded border-2 border-yellow-300 bg-yellow-50 dark:border-yellow-600/50 dark:bg-yellow-950/40" />
          <span className="text-gray-700 dark:text-gray-300">
            {t("legend.pms")}
          </span>
        </div>
      </div>
    </div>
  );
}
