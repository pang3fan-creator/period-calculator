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
import {
  CalendarPlusIcon,
  RefreshIcon,
  ChevronDownIcon,
  GoogleIcon,
  AppleIcon,
  OutlookIcon,
  DownloadIcon,
} from "@/components/icons";

const STORAGE_KEY = "irregular-cycle-data";

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
                <CalendarPlusIcon className="h-5 w-5" />
                {tResults("addToCalendarMenu")}
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
                    <span>{tResults("googleCalendar")}</span>
                  </button>
                  <button
                    type="button"
                    onClick={handleAddToAppleCalendar}
                    className="flex w-full items-center gap-3 px-4 py-3 text-left text-gray-700 transition-colors hover:bg-gray-100 dark:text-gray-200 dark:hover:bg-gray-800"
                  >
                    <AppleIcon className="h-5 w-5" />
                    <span>{tResults("appleCalendar")}</span>
                  </button>
                  <button
                    type="button"
                    onClick={handleAddToOutlook}
                    className="flex w-full items-center gap-3 px-4 py-3 text-left text-gray-700 transition-colors hover:bg-gray-100 dark:text-gray-200 dark:hover:bg-gray-800"
                  >
                    <OutlookIcon className="h-5 w-5" />
                    <span>{tResults("outlook")}</span>
                  </button>
                  <div className="border-t border-gray-200 dark:border-gray-600">
                    <button
                      type="button"
                      onClick={handleDownloadICS}
                      className="flex w-full items-center gap-3 px-4 py-3 text-left text-gray-700 transition-colors hover:bg-gray-100 dark:text-gray-200 dark:hover:bg-gray-800"
                    >
                      <DownloadIcon className="h-5 w-5" />
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
              <RefreshIcon className="h-5 w-5" />
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
