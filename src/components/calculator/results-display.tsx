"use client";

import { useTranslations } from "next-intl";
import type { PredictionResult, CycleData } from "@/types";
import type { Locale } from "@/i18n/config";
import { PredictionCards } from "./prediction-cards";
import { CalendarView } from "./calendar-view";

// SVG icons defined outside component to prevent re-creation
const CalendarPlusIcon = () => (
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
    className="h-5 w-5"
    aria-hidden="true"
  >
    <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
    <line x1="16" y1="2" x2="16" y2="6" />
    <line x1="8" y1="2" x2="8" y2="6" />
    <line x1="3" y1="10" x2="21" y2="10" />
    <path d="M8 14h.01" />
    <path d="M12 14h.01" />
    <path d="M16 14h.01" />
    <path d="M8 18h.01" />
    <path d="M12 18h.01" />
    <path d="M16 18h.01" />
  </svg>
);

const RefreshIcon = () => (
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
    className="h-5 w-5"
    aria-hidden="true"
  >
    <path d="M21 12a9 9 0 0 0-9-9 9.75 9.75 0 0 0-6.74 2.74L3 8" />
    <path d="M3 3v5h5" />
    <path d="M3 12a9 9 0 0 0 9 9 9.75 9.75 0 0 0 6.74-2.74L21 16" />
    <path d="M16 21h5v-5" />
  </svg>
);

interface ResultsDisplayProps {
  result: PredictionResult;
  cycleData: CycleData;
  locale: Locale;
  onReset: () => void;
}

/**
 * Format date to Google Calendar ICS format (yyyyMMdd'T'HHmmss'Z')
 */
function formatDateForGoogleCalendar(date: Date): string {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}${month}${day}`;
}

/**
 * ResultsDisplay Component
 *
 * Container component that displays all calculation results:
 * - PredictionCards: shows 4 key date predictions
 * - CalendarView: interactive monthly calendar with highlighted periods
 * - Action buttons: Add to Calendar, Recalculate
 * - Privacy note: reminder about local data storage
 *
 * @param result - Prediction result from calculateCycle()
 * @param cycleData - Original user input (unused but kept for future features)
 * @param locale - Current locale for i18n
 * @param onReset - Callback to reset the calculator form
 */
export function ResultsDisplay({
  result,
  cycleData,
  locale,
  onReset,
}: ResultsDisplayProps) {
  // cycleData is reserved for future features (e.g., data persistence, history)
  void cycleData;

  const t = useTranslations("calculator.results");

  /**
   * Handle adding to Google Calendar
   * Uses Google Calendar Web Intent URL
   */
  const handleAddToGoogleCalendar = () => {
    const { nextPeriodStart, nextPeriodEnd, ovulationDate } = result;

    // Format dates for Google Calendar (yyyyMMdd format)
    const startDate = formatDateForGoogleCalendar(nextPeriodStart);
    const endDate = formatDateForGoogleCalendar(nextPeriodEnd);
    const ovulationDateStr = formatDateForGoogleCalendar(ovulationDate);

    // Build Google Calendar Web Intent URL
    const title = encodeURIComponent(t("calendarEventTitle"));
    const details = encodeURIComponent(
      t("calendarEventDetails", {
        ovulationDate: ovulationDateStr,
      }),
    );

    const googleCalendarUrl = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${title}&dates=${startDate}/${endDate}&details=${details}`;

    // Open in new tab
    window.open(googleCalendarUrl, "_blank", "noopener,noreferrer");
  };

  return (
    <div className="flex w-full flex-col gap-6">
      {/* Prediction Cards */}
      <PredictionCards result={result} locale={locale} />

      {/* Calendar View */}
      <CalendarView prediction={result} locale={locale} />

      {/* Action Buttons */}
      <div className="flex flex-col gap-3 sm:flex-row sm:justify-center">
        <button
          type="button"
          onClick={handleAddToGoogleCalendar}
          className="dark:bg-dark-card dark:hover:bg-dark-card/80 flex min-h-[52px] items-center justify-center gap-2 rounded-2xl border-2 border-gray-300 bg-white px-6 py-3.5 text-base font-semibold text-gray-700 transition-all hover:bg-gray-50 hover:shadow-md focus:ring-2 focus:ring-gray-300 focus:outline-none dark:border-gray-600 dark:text-gray-200 dark:focus:ring-gray-500"
        >
          <CalendarPlusIcon />
          {t("addToCalendar")}
        </button>

        <button
          type="button"
          onClick={onReset}
          className="flex min-h-[52px] items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-pink-500 to-rose-500 px-6 py-3.5 text-base font-semibold text-white transition-all hover:from-pink-600 hover:to-rose-600 hover:shadow-lg focus:ring-2 focus:ring-pink-300 focus:outline-none dark:focus:ring-pink-700"
        >
          <RefreshIcon />
          {t("recalculate")}
        </button>
      </div>

      {/* Privacy Note */}
      <p className="text-center text-sm text-gray-600 dark:text-gray-400">
        {t("privacyNote")}
      </p>
    </div>
  );
}
