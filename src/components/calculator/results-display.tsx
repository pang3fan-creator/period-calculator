"use client";

import { useState, useRef, useEffect } from "react";
import { useTranslations } from "next-intl";
import { addDays, format } from "date-fns";
import type { PredictionResult, CycleData } from "@/types";
import type { Locale } from "@/i18n/config";
import { PredictionCards } from "./prediction-cards";
import { CalendarView } from "./calendar-view";
import {
  generateICS,
  downloadICS,
  type CalendarEvent,
} from "@/lib/calendar/ics-generator";
import {
  CalendarPlusIcon,
  RefreshIcon,
  ChevronDownIcon,
  GoogleIcon,
  AppleIcon,
  OutlookIcon,
  DownloadIcon,
} from "@/components/icons";

interface ResultsDisplayProps {
  result: PredictionResult;
  cycleData: CycleData;
  locale: Locale;
  onReset: () => void;
}

/**
 * Format date to Google Calendar format (yyyyMMdd)
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
 * - Action buttons: Add to Calendar (with dropdown), Recalculate
 * - Privacy note: reminder about local data storage
 */
export function ResultsDisplay({
  result,
  cycleData,
  locale,
  onReset,
}: ResultsDisplayProps) {
  // cycleData is reserved for future features
  void cycleData;

  const t = useTranslations("calculator.results");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsDropdownOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  /**
   * Handle adding to Google Calendar
   */
  const handleAddToGoogleCalendar = () => {
    const {
      nextPeriodStart,
      nextPeriodEnd,
      ovulationDate,
      fertileWindowStart,
      fertileWindowEnd,
      pmsStart,
      pmsEnd,
    } = result;

    const startDate = formatDateForGoogleCalendar(nextPeriodStart);
    const endDate = formatDateForGoogleCalendar(addDays(nextPeriodEnd, 1));

    const formatReadableDate = (date: Date) => format(date, "MMM dd, yyyy");
    const nextPeriodStartStr = formatReadableDate(nextPeriodStart);
    const nextPeriodEndStr = formatReadableDate(nextPeriodEnd);
    const ovulationStr = formatReadableDate(ovulationDate);
    const fertileStartStr = formatReadableDate(fertileWindowStart);
    const fertileEndStr = formatReadableDate(fertileWindowEnd);
    const pmsStartStr = formatReadableDate(pmsStart);
    const pmsEndStr = formatReadableDate(pmsEnd);

    const title = encodeURIComponent(t("calendarEventTitle"));
    const details = encodeURIComponent(
      t("calendarEventDetails", {
        nextPeriodStart: nextPeriodStartStr,
        nextPeriodEnd: nextPeriodEndStr,
        ovulationDate: ovulationStr,
        fertileStart: fertileStartStr,
        fertileEnd: fertileEndStr,
        pmsStart: pmsStartStr,
        pmsEnd: pmsEndStr,
      }),
    );

    const googleCalendarUrl = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${title}&dates=${startDate}/${endDate}&details=${details}`;

    window.open(googleCalendarUrl, "_blank", "noopener,noreferrer");
    setIsDropdownOpen(false);
  };

  /**
   * Handle adding to Outlook Calendar
   * Uses Outlook.com web calendar to create events
   */
  const handleAddToOutlook = () => {
    const {
      nextPeriodStart,
      nextPeriodEnd,
      ovulationDate,
      fertileWindowStart,
      fertileWindowEnd,
      pmsStart,
      pmsEnd,
    } = result;

    // Format dates for Outlook (ISO 8601 format)
    const startDate = nextPeriodStart.toISOString();
    const endDate = nextPeriodEnd.toISOString();

    // Format dates for human-readable details
    const formatReadableDate = (date: Date) => format(date, "MMM dd, yyyy");
    const nextPeriodStartStr = formatReadableDate(nextPeriodStart);
    const nextPeriodEndStr = formatReadableDate(nextPeriodEnd);
    const ovulationStr = formatReadableDate(ovulationDate);
    const fertileStartStr = formatReadableDate(fertileWindowStart);
    const fertileEndStr = formatReadableDate(fertileWindowEnd);
    const pmsStartStr = formatReadableDate(pmsStart);
    const pmsEndStr = formatReadableDate(pmsEnd);

    const title = encodeURIComponent(t("calendarEventTitle"));
    // Replace \n with %0A for proper line breaks in Outlook
    const details = encodeURIComponent(
      t("calendarEventDetails", {
        nextPeriodStart: nextPeriodStartStr,
        nextPeriodEnd: nextPeriodEndStr,
        ovulationDate: ovulationStr,
        fertileStart: fertileStartStr,
        fertileEnd: fertileEndStr,
        pmsStart: pmsStartStr,
        pmsEnd: pmsEndStr,
      }),
    ).replace(/%0A/g, "%0A");

    const outlookUrl = `https://outlook.live.com/calendar/0/deeplink/compose?subject=${title}&startdt=${startDate}&enddt=${endDate}&body=${details}`;

    window.open(outlookUrl, "_blank", "noopener,noreferrer");
    setIsDropdownOpen(false);
  };

  /**
   * Handle adding to Apple Calendar (iCloud)
   * Uses iCloud web calendar to create events
   */
  const handleAddToAppleCalendar = () => {
    // Apple iCloud Calendar doesn't support web intent for creating events
    // Open iCloud calendar in new tab - user can manually add events
    const appleUrl = "https://www.icloud.com/calendar/";

    window.open(appleUrl, "_blank", "noopener,noreferrer");
    setIsDropdownOpen(false);
  };

  /**
   * Handle downloading ICS file for other calendars (Apple Calendar, Outlook, etc.)
   */
  const handleDownloadICS = () => {
    const {
      nextPeriodStart,
      nextPeriodEnd,
      ovulationDate,
      fertileWindowStart,
      fertileWindowEnd,
      pmsStart,
      pmsEnd,
    } = result;

    const eventDescription = t("eventDescription");

    // Create calendar events
    const events: CalendarEvent[] = [
      {
        title: t("periodEvent"),
        description: eventDescription,
        startDate: nextPeriodStart,
        endDate: nextPeriodEnd,
      },
      {
        title: t("fertileEvent"),
        description: eventDescription,
        startDate: fertileWindowStart,
        endDate: fertileWindowEnd,
      },
      {
        title: t("ovulationEvent"),
        description: eventDescription,
        startDate: ovulationDate,
        endDate: ovulationDate,
      },
      {
        title: t("pmsEvent"),
        description: eventDescription,
        startDate: pmsStart,
        endDate: pmsEnd,
      },
    ];

    // Generate and download ICS file
    const icsContent = generateICS(events);
    downloadICS(icsContent, "period-predictions");
    setIsDropdownOpen(false);
  };

  return (
    <div className="flex w-full flex-col gap-6">
      {/* Prediction Cards */}
      <PredictionCards result={result} locale={locale} />

      {/* Health Standard Trust Badge - French only */}
      {locale === "fr" && (
        <div className="flex justify-center">
          <p className="text-sm text-gray-500 dark:text-gray-400">
            {t("healthStandard")}
          </p>
        </div>
      )}

      {/* Calendar View */}
      <CalendarView prediction={result} locale={locale} />

      {/* Action Buttons */}
      <div className="flex flex-col gap-3 sm:flex-row sm:justify-center">
        {/* Add to Calendar Dropdown */}
        <div className="relative" ref={dropdownRef}>
          <button
            type="button"
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            className="dark:bg-dark-card dark:hover:bg-dark-card/80 flex min-h-[48px] items-center justify-center gap-2 rounded-2xl border-2 border-gray-300 bg-white px-6 py-3 text-base font-semibold text-gray-700 transition-all hover:bg-gray-50 focus:ring-2 focus:ring-gray-300 focus:outline-none dark:border-gray-600 dark:text-gray-200 dark:focus:ring-gray-500"
          >
            <CalendarPlusIcon className="h-5 w-5" />
            {t("addToCalendarMenu")}
            <ChevronDownIcon className="h-4 w-4" />
          </button>

          {/* Dropdown Menu */}
          {isDropdownOpen && (
            <div className="dark:bg-dark-card absolute z-50 mt-2 w-full min-w-[200px] overflow-hidden rounded-2xl border-2 border-gray-200 bg-white shadow-lg dark:border-gray-600">
              <button
                type="button"
                onClick={handleAddToGoogleCalendar}
                className="flex w-full items-center gap-3 px-4 py-3 text-left text-gray-700 transition-colors hover:bg-gray-100 dark:text-gray-200 dark:hover:bg-gray-800"
              >
                <GoogleIcon className="h-5 w-5" />
                <span>{t("googleCalendar")}</span>
              </button>
              <button
                type="button"
                onClick={handleAddToAppleCalendar}
                className="flex w-full items-center gap-3 px-4 py-3 text-left text-gray-700 transition-colors hover:bg-gray-100 dark:text-gray-200 dark:hover:bg-gray-800"
              >
                <AppleIcon className="h-5 w-5" />
                <span>{t("appleCalendar")}</span>
              </button>
              <button
                type="button"
                onClick={handleAddToOutlook}
                className="flex w-full items-center gap-3 px-4 py-3 text-left text-gray-700 transition-colors hover:bg-gray-100 dark:text-gray-200 dark:hover:bg-gray-800"
              >
                <OutlookIcon className="h-5 w-5" />
                <span>{t("outlook")}</span>
              </button>
              <div className="border-t border-gray-200 dark:border-gray-600">
                <button
                  type="button"
                  onClick={handleDownloadICS}
                  className="flex w-full items-center gap-3 px-4 py-3 text-left text-gray-700 transition-colors hover:bg-gray-100 dark:text-gray-200 dark:hover:bg-gray-800"
                >
                  <DownloadIcon className="h-5 w-5" />
                  <span>{t("downloadIcs")}</span>
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Recalculate Button */}
        <button
          type="button"
          onClick={onReset}
          className="flex min-h-[48px] items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-pink-500 to-rose-500 px-6 py-3 text-base font-semibold text-white transition-all hover:from-pink-600 hover:to-rose-600 focus:ring-2 focus:ring-pink-300 focus:outline-none dark:focus:ring-pink-700"
        >
          <RefreshIcon className="h-5 w-5" />
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
