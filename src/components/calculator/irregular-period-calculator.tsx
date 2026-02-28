"use client";

import { useState, useCallback, useEffect, useRef } from "react";
import { useTranslations } from "next-intl";
import { addDays, format } from "date-fns";
import type { IrregularCycleData, IrregularPredictionResult } from "@/types";
import { useLocale } from "next-intl";
import type { Locale } from "@/i18n/config";
import {
  calculateIrregularCycle,
  validateIrregularCycleData,
} from "@/lib/calculator/irregular-calculator";
import {
  generateICS,
  downloadICS,
  type CalendarEvent,
} from "@/lib/calendar/ics-generator";
import { IrregularCalculatorForm } from "./irregular-calculator-form";
import { IrregularPredictionCards } from "./irregular-prediction-cards";
import { CalendarView } from "./calendar-view";
import { Card } from "@/components/ui/card";

const STORAGE_KEY = "irregular-cycle-data";

// SVG icons
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

const ChevronDownIcon = () => (
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
    className="h-4 w-4"
    aria-hidden="true"
  >
    <path d="m6 9 6 6 6-6" />
  </svg>
);

const GoogleIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    className="h-5 w-5"
    aria-hidden="true"
  >
    <path
      fill="#4285F4"
      d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
    />
    <path
      fill="#34A853"
      d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
    />
    <path
      fill="#FBBC05"
      d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
    />
    <path
      fill="#EA4335"
      d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
    />
  </svg>
);

const AppleIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="currentColor"
    className="h-5 w-5"
    aria-hidden="true"
  >
    <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z" />
  </svg>
);

const OutlookIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    className="h-5 w-5"
    aria-hidden="true"
  >
    <rect width="24" height="24" fill="#0078D4" rx="2" />
    <path
      d="M12 6.5a4.5 4.5 0 0 0-4.5 4.5v5.5h9v-5.5A4.5 4.5 0 0 0 12 6.5"
      fill="#fff"
    />
    <path d="M7.5 11v5.5h4V11H7.5" fill="#fff" opacity="0.7" />
  </svg>
);

const DownloadIcon = () => (
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
    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
    <polyline points="7 10 12 15 17 10" />
    <line x1="12" x2="12" y1="15" y2="3" />
  </svg>
);

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
 * Save irregular cycle data to localStorage
 */
function saveIrregularCycleData(data: IrregularCycleData): void {
  if (typeof window === "undefined") return;
  const serialized = JSON.stringify({
    historicalCycles: data.historicalCycles.map((d) => d.toISOString()),
    periodLength: data.periodLength,
  });
  localStorage.setItem(STORAGE_KEY, serialized);
}

/**
 * Load irregular cycle data from localStorage
 */
function loadIrregularCycleData(): IrregularCycleData | null {
  if (typeof window === "undefined") return null;
  const stored = localStorage.getItem(STORAGE_KEY);
  if (!stored) return null;
  try {
    const parsed = JSON.parse(stored);
    return {
      historicalCycles: parsed.historicalCycles.map((d: string) => new Date(d)),
      periodLength: parsed.periodLength,
    };
  } catch {
    return null;
  }
}

/**
 * Clear irregular cycle data from localStorage
 */
function clearIrregularCycleData(): void {
  if (typeof window === "undefined") return;
  localStorage.removeItem(STORAGE_KEY);
}

/**
 * Main Irregular Period Calculator Container Component
 */
export function IrregularPeriodCalculator() {
  const tResults = useTranslations("calculator.results");
  // Get locale from next-intl
  const locale = useLocale() as Locale;

  // State for cycle data (user input)
  const [cycleData, setCycleData] = useState<IrregularCycleData | null>(null);

  // State for calculation result
  const [result, setResult] = useState<IrregularPredictionResult | null>(null);

  // State for validation errors
  const [error, setError] = useState<string | undefined>(undefined);

  // State for tracking if component has mounted (client-side only)
  const [isMounted, setIsMounted] = useState(false);

  // Dropdown state
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Track if data has been loaded to prevent double-loading
  const dataLoadedRef = useRef(false);

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

  // Use useEffect to load data only on client-side
  useEffect(() => {
    // Prevent double-loading
    if (dataLoadedRef.current) {
      return;
    }
    dataLoadedRef.current = true;

    // Load saved data on mount
    const savedData = loadIrregularCycleData();
    if (savedData) {
      const validation = validateIrregularCycleData(savedData);
      if (validation.valid) {
        setCycleData(savedData);
        setResult(calculateIrregularCycle(savedData));
      } else {
        clearIrregularCycleData();
      }
    }
    setIsMounted(true);
  }, []);

  /**
   * Handle form submission
   */
  const handleSubmit = useCallback((data: IrregularCycleData) => {
    // Validate the input data
    const validation = validateIrregularCycleData(data);

    // If there are validation errors, show them
    if (!validation.valid) {
      setError(validation.error);
      return;
    }

    // Calculate predictions
    const calculatedResult = calculateIrregularCycle(data);

    // Save to localStorage
    saveIrregularCycleData(data);

    // Update state
    setCycleData(data);
    setResult(calculatedResult);
    setError(undefined);
  }, []);

  /**
   * Handle reset (Recalculate - show form again)
   */
  const handleReset = useCallback(() => {
    // Clear localStorage
    clearIrregularCycleData();

    // Clear state
    setCycleData(null);
    setResult(null);
    setError(undefined);
  }, []);

  /**
   * Handle adding to Google Calendar
   */
  const handleAddToGoogleCalendar = useCallback(() => {
    if (!result) return;

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

    const title = encodeURIComponent(tResults("calendarEventTitle"));
    const details = encodeURIComponent(
      tResults("calendarEventDetails", {
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
  }, [result, tResults]);

  /**
   * Handle adding to Outlook Calendar
   */
  const handleAddToOutlook = useCallback(() => {
    if (!result) return;

    const {
      nextPeriodStart,
      nextPeriodEnd,
      ovulationDate,
      fertileWindowStart,
      fertileWindowEnd,
      pmsStart,
      pmsEnd,
    } = result;

    const startDate = nextPeriodStart.toISOString();
    const endDate = nextPeriodEnd.toISOString();

    const formatReadableDate = (date: Date) => format(date, "MMM dd, yyyy");
    const nextPeriodStartStr = formatReadableDate(nextPeriodStart);
    const nextPeriodEndStr = formatReadableDate(nextPeriodEnd);
    const ovulationStr = formatReadableDate(ovulationDate);
    const fertileStartStr = formatReadableDate(fertileWindowStart);
    const fertileEndStr = formatReadableDate(fertileWindowEnd);
    const pmsStartStr = formatReadableDate(pmsStart);
    const pmsEndStr = formatReadableDate(pmsEnd);

    const title = encodeURIComponent(tResults("calendarEventTitle"));
    const details = encodeURIComponent(
      tResults("calendarEventDetails", {
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
  }, [result, tResults]);

  /**
   * Handle adding to Apple Calendar
   */
  const handleAddToAppleCalendar = useCallback(() => {
    const appleUrl = "https://www.icloud.com/calendar/";
    window.open(appleUrl, "_blank", "noopener,noreferrer");
    setIsDropdownOpen(false);
  }, []);

  /**
   * Handle downloading ICS file
   */
  const handleDownloadICS = useCallback(() => {
    if (!result) return;

    const {
      nextPeriodStart,
      nextPeriodEnd,
      ovulationDate,
      fertileWindowStart,
      fertileWindowEnd,
      pmsStart,
      pmsEnd,
    } = result;

    const eventDescription = tResults("eventDescription");

    const events: CalendarEvent[] = [
      {
        title: tResults("periodEvent"),
        description: eventDescription,
        startDate: nextPeriodStart,
        endDate: nextPeriodEnd,
      },
      {
        title: tResults("fertileEvent"),
        description: eventDescription,
        startDate: fertileWindowStart,
        endDate: fertileWindowEnd,
      },
      {
        title: tResults("ovulationEvent"),
        description: eventDescription,
        startDate: ovulationDate,
        endDate: ovulationDate,
      },
      {
        title: tResults("pmsEvent"),
        description: eventDescription,
        startDate: pmsStart,
        endDate: pmsEnd,
      },
    ];

    const icsContent = generateICS(events);
    downloadICS(icsContent, "irregular-period-predictions");
    setIsDropdownOpen(false);
  }, [result, tResults]);

  // Prevent hydration mismatch by not rendering until mounted
  if (!isMounted) {
    return (
      <Card>
        <div className="flex min-h-[400px] items-center justify-center">
          <div className="border-primary-200 border-t-primary-400 h-8 w-8 animate-spin rounded-full border-4" />
        </div>
      </Card>
    );
  }

  return (
    <Card>
      {result ? (
        <div className="flex w-full flex-col gap-6">
          {/* Prediction Cards */}
          <IrregularPredictionCards result={result} locale={locale} />

          {/* Calendar View */}
          <CalendarView prediction={result} locale={locale} />

          {/* Action Buttons */}
          <div className="flex flex-col gap-3 sm:flex-row sm:justify-center">
            {/* Add to Calendar Dropdown */}
            <div className="relative" ref={dropdownRef}>
              <button
                type="button"
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                aria-label={tResults("addToCalendarMenu")}
                className="dark:bg-dark-card dark:hover:bg-dark-card/80 flex min-h-[48px] items-center justify-center gap-2 rounded-2xl border-2 border-gray-300 bg-white px-6 py-3 text-base font-semibold text-gray-700 transition-colors hover:bg-gray-50 focus:ring-2 focus:ring-gray-300 focus:outline-none dark:border-gray-600 dark:text-gray-200 dark:focus:ring-gray-500"
              >
                <CalendarPlusIcon />
                {tResults("addToCalendarMenu")}
                <ChevronDownIcon />
              </button>

              {/* Dropdown Menu */}
              {isDropdownOpen && (
                <div className="dark:bg-dark-card absolute z-50 mt-2 w-full min-w-[200px] overflow-hidden rounded-2xl border-2 border-gray-200 bg-white shadow-lg dark:border-gray-600">
                  <button
                    type="button"
                    onClick={handleAddToGoogleCalendar}
                    className="flex w-full items-center gap-3 px-4 py-3 text-left text-gray-700 transition-colors hover:bg-gray-100 dark:text-gray-200 dark:hover:bg-gray-800"
                  >
                    <GoogleIcon />
                    <span>{tResults("googleCalendar")}</span>
                  </button>
                  <button
                    type="button"
                    onClick={handleAddToAppleCalendar}
                    className="flex w-full items-center gap-3 px-4 py-3 text-left text-gray-700 transition-colors hover:bg-gray-100 dark:text-gray-200 dark:hover:bg-gray-800"
                  >
                    <AppleIcon />
                    <span>{tResults("appleCalendar")}</span>
                  </button>
                  <button
                    type="button"
                    onClick={handleAddToOutlook}
                    className="flex w-full items-center gap-3 px-4 py-3 text-left text-gray-700 transition-colors hover:bg-gray-100 dark:text-gray-200 dark:hover:bg-gray-800"
                  >
                    <OutlookIcon />
                    <span>{tResults("outlook")}</span>
                  </button>
                  <div className="border-t border-gray-200 dark:border-gray-600">
                    <button
                      type="button"
                      onClick={handleDownloadICS}
                      className="flex w-full items-center gap-3 px-4 py-3 text-left text-gray-700 transition-colors hover:bg-gray-100 dark:text-gray-200 dark:hover:bg-gray-800"
                    >
                      <DownloadIcon />
                      <span>{tResults("downloadIcs")}</span>
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* Recalculate Button */}
            <button
              type="button"
              onClick={handleReset}
              className="flex min-h-[48px] items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-pink-500 to-rose-500 px-6 py-3 text-base font-semibold text-white transition-colors hover:from-pink-600 hover:to-rose-600 focus:ring-2 focus:ring-pink-300 focus:outline-none dark:focus:ring-pink-700"
            >
              <RefreshIcon />
              {tResults("recalculate")}
            </button>
          </div>

          {/* Privacy Note */}
          <p className="text-center text-sm text-gray-600 dark:text-gray-400">
            {tResults("privacyNote")}
          </p>
        </div>
      ) : (
        <IrregularCalculatorForm
          onSubmit={handleSubmit}
          onReset={handleReset}
          initialData={cycleData || undefined}
          error={error}
        />
      )}
    </Card>
  );
}
