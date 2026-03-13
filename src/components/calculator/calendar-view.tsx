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
import type { OvulationPurpose } from "./ovulation-period-calculator";
import { getDatePeriodType } from "@/lib/calculator/cycle-calculator";
import { ChevronLeftIcon, ChevronRightIcon } from "@/components/icons";
import {
  getOvulationTheme,
  getCalendarDayClasses,
  type OvulationTheme,
} from "@/lib/theme/ovulation-theme";

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
  purpose?: OvulationPurpose;
}

/**
 * Get legend color box classes based on period type and purpose
 */
function getLegendColorClasses(
  theme: OvulationTheme,
  type: "period" | "ovulation" | "fertile" | "pms",
) {
  const color = theme.colors[type];
  const classes = ["h-4 w-4 rounded border-2", color.border, color.bg];

  if (color.darkBorder) classes.push(color.darkBorder);
  if (color.darkBg && !color.darkBg.includes("gradient")) {
    classes.push(color.darkBg);
  } else {
    classes.push("dark:bg-gray-900/40");
  }

  return classes.join(" ");
}

/**
 * CalendarView Component
 *
 * Displays a monthly calendar view with cycle prediction highlighting.
 * Styling varies based on purpose:
 * - conceive: Romantic, warm colors (green fertile, violet ovulation)
 * - avoid: Professional, cautionary colors (red fertile, amber ovulation)
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
 * @param purpose - Purpose mode for styling (conceive/avoid)
 */
export function CalendarView({
  prediction,
  locale,
  purpose,
}: CalendarViewProps) {
  const t = useTranslations("calculator.calendar");
  const dateFnsLocale = DATE_FNS_LOCALE_MAP[locale];
  const theme = getOvulationTheme(purpose);

  // Initialize current month based on purpose:
  // - Ovulation calculator (with purpose): focus on ovulation date
  // - General period calculator (no purpose): focus on next period start
  const [currentMonth, setCurrentMonth] = useState(() => {
    const keyDate = purpose
      ? prediction.ovulationDate
      : prediction.nextPeriodStart;
    return startOfMonth(keyDate);
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
    <div className="dark:bg-dark-card shadow-card flex w-full flex-col gap-6 rounded-3xl bg-white p-6 md:p-8">
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
            className="rounded-xl p-3 text-gray-600 transition-colors hover:text-gray-900 focus:ring-2 focus:ring-gray-300 focus:outline-none dark:text-gray-400 dark:hover:text-gray-100 dark:focus:ring-gray-600"
          >
            <ChevronLeftIcon className="h-5 w-5" />
          </button>

          <span className="min-w-[140px] text-center text-lg font-semibold text-gray-800 dark:text-gray-100">
            {monthTitle}
          </span>

          <button
            type="button"
            onClick={handleNextMonth}
            aria-label={t("nextMonth")}
            className="rounded-xl p-3 text-gray-600 transition-colors hover:text-gray-900 focus:ring-2 focus:ring-gray-300 focus:outline-none dark:text-gray-400 dark:hover:text-gray-100 dark:focus:ring-gray-600"
          >
            <ChevronRightIcon className="h-5 w-5" />
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
              className={getCalendarDayClasses(day.periodType, purpose)}
              style={{
                opacity: day.isCurrentMonth ? 1 : 0.4,
              }}
              tabIndex={day.isCurrentMonth ? 0 : -1}
              role="button"
              aria-label={
                day.isCurrentMonth
                  ? format(day.date, "MMM dd, yyyy", { locale: dateFnsLocale })
                  : undefined
              }
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  e.preventDefault();
                  // Could add click handler here for future features
                }
              }}
            >
              {day.dayNumber}
            </div>
          ))}
        </div>
      </div>

      {/* Legend */}
      <div className="flex flex-wrap items-center justify-center gap-3 text-sm">
        <div className="flex items-center gap-2">
          <div className={getLegendColorClasses(theme, "period")} />
          <span className="text-gray-700 dark:text-gray-300">
            {t("legend.period")}
          </span>
        </div>
        <div className="flex items-center gap-2">
          <div className={getLegendColorClasses(theme, "ovulation")} />
          <span className="text-gray-700 dark:text-gray-300">
            {theme.textPrefix
              ? t(`${theme.textPrefix}.legendOvulation`)
              : t("legend.ovulation")}
          </span>
        </div>
        <div className="flex items-center gap-2">
          <div className={getLegendColorClasses(theme, "fertile")} />
          <span className="text-gray-700 dark:text-gray-300">
            {theme.textPrefix
              ? t(`${theme.textPrefix}.legendFertile`)
              : t("legend.fertile")}
          </span>
        </div>
        <div className="flex items-center gap-2">
          <div className={getLegendColorClasses(theme, "pms")} />
          <span className="text-gray-700 dark:text-gray-300">
            {t("legend.pms")}
          </span>
        </div>
      </div>
    </div>
  );
}
