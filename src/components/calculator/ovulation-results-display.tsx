"use client";

import { useState, useRef, useEffect } from "react";
import { useTranslations } from "next-intl";
import { addDays, format } from "date-fns";
import type { PredictionResult } from "@/types";
import type { Locale } from "@/i18n/config";
import { OvulationPredictionCards } from "./ovulation-prediction-cards";
import { CalendarView } from "./calendar-view";
import {
  generateICS,
  downloadICS,
  type CalendarEvent,
} from "@/lib/calendar/ics-generator";

type OvulationPurpose = "conceive" | "avoid";

interface OvulationResultsDisplayProps {
  result: PredictionResult;
  locale: Locale;
  purpose: OvulationPurpose;
  onReset: () => void;
}

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
    <line x1="12" y1="15" x2="12" y2="3" />
  </svg>
);

const InfoIcon = () => (
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
    <circle cx="12" cy="12" r="10" />
    <path d="M12 16v-4M12 8h.01" />
  </svg>
);

function formatDateForGoogleCalendar(date: Date): string {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}${month}${day}`;
}

export function OvulationResultsDisplay({
  result,
  locale,
  purpose,
  onReset,
}: OvulationResultsDisplayProps) {
  const t = useTranslations("ovulationCalculator");
  const tResults = useTranslations("calculator.results");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isWarningOpen, setIsWarningOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

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

  const handleAddToGoogleCalendar = () => {
    const { ovulationDate, fertileWindowStart, fertileWindowEnd } = result;
    const startDate = formatDateForGoogleCalendar(fertileWindowStart);
    const endDate = formatDateForGoogleCalendar(addDays(fertileWindowEnd, 1));
    const title = encodeURIComponent(t("fertileWindow"));
    const details = encodeURIComponent(
      `Ovulation: ${format(ovulationDate, "MMM dd, yyyy")}\nFertile Window: ${format(fertileWindowStart, "MMM dd")} - ${format(fertileWindowEnd, "MMM dd, yyyy")}\n\nCalculated with Period Calculator`,
    );
    const url = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${title}&dates=${startDate}/${endDate}&details=${details}`;
    window.open(url, "_blank");
    setIsDropdownOpen(false);
  };

  const handleAddToAppleCalendar = () => {
    window.open("https://www.icloud.com/calendar/", "_blank");
    setIsDropdownOpen(false);
  };

  const handleAddToOutlook = () => {
    const { ovulationDate, fertileWindowStart, fertileWindowEnd } = result;
    const title = encodeURIComponent(t("fertileWindow"));
    const details = encodeURIComponent(
      `Ovulation: ${format(ovulationDate, "MMM dd, yyyy")}\nFertile Window: ${format(fertileWindowStart, "MMM dd")} - ${format(fertileWindowEnd, "MMM dd, yyyy")}`,
    );
    const url = `https://outlook.live.com/calendar/0/deeplink/compose?subject=${title}&startdt=${fertileWindowStart.toISOString()}&enddt=${addDays(fertileWindowEnd, 1).toISOString()}&body=${details}`;
    window.open(url, "_blank");
    setIsDropdownOpen(false);
  };

  const handleDownloadICS = () => {
    const { ovulationDate, fertileWindowStart, fertileWindowEnd } = result;
    const events: CalendarEvent[] = [
      {
        title: t("fertileWindow"),
        description: "Fertile window calculated with Period Calculator",
        startDate: fertileWindowStart,
        endDate: fertileWindowEnd,
      },
      {
        title: t("ovulationDay"),
        description: "Ovulation day calculated with Period Calculator",
        startDate: ovulationDate,
        endDate: ovulationDate,
      },
    ];
    const icsContent = generateICS(events);
    downloadICS(icsContent, "ovulation-prediction");
    setIsDropdownOpen(false);
  };

  return (
    <div className="flex w-full flex-col gap-6">
      {/* Contraception Warning - Only show when purpose="avoid" */}
      {purpose === "avoid" && (
        <div className="relative">
          <button
            type="button"
            onClick={() => setIsWarningOpen(!isWarningOpen)}
            className="flex items-center gap-2 rounded-xl border-2 border-orange-300 bg-orange-50 px-4 py-3 text-sm font-medium text-orange-800 dark:border-orange-700 dark:bg-orange-950/30 dark:text-orange-200"
          >
            <InfoIcon />
            {t("contraceptionWarning")}
            <ChevronDownIcon />
          </button>
          {isWarningOpen && (
            <div className="absolute z-50 mt-2 w-full rounded-xl border-2 border-orange-300 bg-orange-50 p-4 text-sm text-orange-800 dark:border-orange-700 dark:bg-orange-950/50 dark:text-orange-200">
              {t("contraceptionWarningText")}
            </div>
          )}
        </div>
      )}

      <OvulationPredictionCards result={result} locale={locale} />
      <CalendarView prediction={result} locale={locale} />

      {/* Action Buttons */}
      <div className="flex flex-col gap-3 sm:flex-row sm:justify-center">
        <div className="relative" ref={dropdownRef}>
          <button
            type="button"
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            aria-label={tResults("addToCalendarMenu")}
            className="dark:bg-dark-card dark:hover:bg-dark-card/80 flex min-h-[48px] items-center justify-center gap-2 rounded-2xl border-2 border-gray-300 bg-white px-6 py-3 text-base font-semibold text-gray-700 transition-colors hover:bg-gray-50 focus:ring-2 focus:ring-gray-300 focus:outline-none dark:border-gray-600 dark:text-gray-200"
          >
            <CalendarPlusIcon />
            {tResults("addToCalendarMenu")}
            <ChevronDownIcon />
          </button>
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
        <button
          type="button"
          onClick={onReset}
          className="flex min-h-[48px] items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-pink-500 to-rose-500 px-6 py-3 text-base font-semibold text-white transition-colors hover:from-pink-600 hover:to-rose-600 focus:ring-2 focus:ring-pink-300 focus:outline-none"
        >
          <RefreshIcon />
          {tResults("recalculate")}
        </button>
      </div>

      <p className="text-center text-sm text-gray-600 dark:text-gray-400">
        {tResults("privacyNote")}
      </p>
    </div>
  );
}
