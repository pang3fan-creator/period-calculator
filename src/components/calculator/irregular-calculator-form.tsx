"use client";

import { useState, useCallback, type FormEvent } from "react";
import { useTranslations } from "next-intl";
import { addDays } from "date-fns";
import {
  DEFAULT_PERIOD_LENGTH,
  MIN_PERIOD_LENGTH,
  MAX_PERIOD_LENGTH,
} from "@/lib/constants";
import { IrregularCycleData } from "@/types";

const MIN_CYCLES = 3;
const MAX_CYCLES = 6;

/**
 * Parse YYYY-MM-DD string as local time date (not UTC)
 */
function parseLocalDate(dateStr: string): Date {
  const [year, month, day] = dateStr.split("-").map(Number);
  return new Date(year, month - 1, day);
}

/**
 * Format Date object as YYYY-MM-DD for date input
 */
function formatDateForInput(date: Date): string {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

/**
 * Get default dates for historical periods (last 3 periods)
 */
const getDefaultHistoricalDates = (): string[] => {
  const dates: string[] = [];
  const today = new Date();

  // Default: last 3 periods at 28-day intervals going backwards
  for (let i = 2; i >= 0; i--) {
    const date = addDays(today, -(i + 1) * 28);
    dates.push(formatDateForInput(date));
  }

  return dates;
};

interface IrregularCalculatorFormProps {
  initialData?: IrregularCycleData;
  onSubmit: (data: IrregularCycleData) => void;
  onReset?: () => void;
  error?: string;
}

export function IrregularCalculatorForm({
  initialData,
  onSubmit,
  onReset,
  error,
}: IrregularCalculatorFormProps) {
  const t = useTranslations("irregularCalculator");

  // Initialize form state
  const [historicalDates, setHistoricalDates] = useState<string[]>(() => {
    if (initialData?.historicalCycles) {
      return initialData.historicalCycles.map(formatDateForInput);
    }
    return getDefaultHistoricalDates();
  });

  const [periodLength, setPeriodLength] = useState<number>(() => {
    return initialData?.periodLength ?? DEFAULT_PERIOD_LENGTH;
  });

  // Get today's date in YYYY-MM-DD format for max attribute (local time)
  const getTodayDate = useCallback(() => {
    const now = new Date();
    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, "0");
    const day = String(now.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  }, []);

  // Handle date change for a specific index
  const handleDateChange = useCallback((index: number, value: string) => {
    setHistoricalDates((prev) => {
      const updated = [...prev];
      updated[index] = value;
      return updated;
    });
  }, []);

  // Add another period date
  const addPeriodDate = useCallback(() => {
    if (historicalDates.length < MAX_CYCLES) {
      setHistoricalDates((prev) => [...prev, getTodayDate()]);
    }
  }, [historicalDates.length, getTodayDate]);

  // Remove a period date
  const removePeriodDate = useCallback(
    (index: number) => {
      if (historicalDates.length > MIN_CYCLES) {
        setHistoricalDates((prev) => prev.filter((_, i) => i !== index));
      }
    },
    [historicalDates.length],
  );

  // Handle period length change
  const handlePeriodLengthChange = useCallback((value: number) => {
    const clampedValue = Math.max(
      MIN_PERIOD_LENGTH,
      Math.min(MAX_PERIOD_LENGTH, value),
    );
    setPeriodLength(clampedValue);
  }, []);

  // Handle form reset
  const handleReset = useCallback(() => {
    // Reset form internal state
    setHistoricalDates(getDefaultHistoricalDates());
    setPeriodLength(DEFAULT_PERIOD_LENGTH);
    // Call parent's reset handler
    onReset?.();
  }, [onReset]);

  // Handle form submission
  const handleSubmit = useCallback(
    (e: FormEvent<HTMLFormElement>) => {
      e.preventDefault();

      // Filter out empty dates and sort them
      const validDates = historicalDates
        .filter((d) => d !== "")
        .map(parseLocalDate)
        .sort((a, b) => a.getTime() - b.getTime());

      if (validDates.length < MIN_CYCLES) {
        return;
      }

      const cycleData: IrregularCycleData = {
        historicalCycles: validDates,
        periodLength,
      };

      onSubmit(cycleData);
    },
    [historicalDates, periodLength, onSubmit],
  );

  // Check if form is valid
  const isFormValid =
    historicalDates.filter((d) => d !== "").length >= MIN_CYCLES;

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      {/* Historical Period Dates */}
      <div className="space-y-4">
        <label className="block text-lg font-semibold text-gray-800 dark:text-gray-100">
          {t("periodHistory")}
        </label>
        <p className="text-sm text-gray-500 dark:text-gray-400">
          {t("periodHistoryHelp")}
        </p>

        <div className="space-y-3">
          {historicalDates.map((date, index) => (
            <div
              key={`period-date-${index}`}
              className="flex items-center gap-3"
            >
              <div className="flex-1">
                <label
                  htmlFor={`period-${index}`}
                  className="mb-1 block text-sm font-medium text-gray-700 dark:text-gray-300"
                >
                  {t("periodNumber", { number: index + 1 })}
                </label>
                <input
                  id={`period-${index}`}
                  type="date"
                  value={date}
                  onChange={(e) => handleDateChange(index, e.target.value)}
                  max={getTodayDate()}
                  className="border-primary-200 dark:bg-dark-card dark:border-dark-border focus:border-primary-400 focus:ring-primary-100 dark:focus:ring-primary-900/30 min-h-[48px] w-full cursor-pointer rounded-xl border-2 bg-white px-4 py-3 text-gray-800 transition-colors focus:ring-4 dark:text-gray-100"
                  style={{
                    transitionProperty: "border-color, background-color, color",
                  }}
                  required={index < MIN_CYCLES}
                />
              </div>
              {historicalDates.length > MIN_CYCLES && (
                <button
                  type="button"
                  onClick={() => removePeriodDate(index)}
                  className="mt-6 min-h-[48px] rounded-xl border-2 border-red-200 px-3 py-2 text-red-500 hover:bg-red-50 dark:border-red-800 dark:hover:bg-red-900/20"
                  aria-label={t("removePeriod")}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    aria-hidden="true"
                  >
                    <path
                      fillRule="evenodd"
                      d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                      clipRule="evenodd"
                    />
                  </svg>
                </button>
              )}
            </div>
          ))}
        </div>

        {/* Add Period Button */}
        {historicalDates.length < MAX_CYCLES && (
          <button
            type="button"
            onClick={addPeriodDate}
            className="border-primary-200 hover:border-primary-300 hover:bg-primary-50 dark:hover:bg-dark-card mt-2 flex items-center gap-2 rounded-xl border-2 px-4 py-3 text-gray-700 dark:text-gray-300"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              viewBox="0 0 20 20"
              fill="currentColor"
              aria-hidden="true"
            >
              <path
                fillRule="evenodd"
                d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z"
                clipRule="evenodd"
              />
            </svg>
            {t("addPeriod")}
          </button>
        )}

        <p className="text-sm text-gray-500 dark:text-gray-400">
          {t("minPeriodsRequired", { min: MIN_CYCLES })}
        </p>
      </div>

      {/* Period Length */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <label
            htmlFor="periodLength"
            className="block text-lg font-semibold text-gray-800 dark:text-gray-100"
          >
            {t("periodLengthLabel")}
          </label>
        </div>

        {/* Slider */}
        <div className="px-2">
          <input
            type="range"
            id="periodLengthSlider"
            min={MIN_PERIOD_LENGTH}
            max={MAX_PERIOD_LENGTH}
            value={periodLength}
            onChange={(e) =>
              handlePeriodLengthChange(parseInt(e.target.value, 10))
            }
            className="bg-primary-100 dark:bg-dark-border accent-primary-400 h-2 w-full cursor-pointer appearance-none rounded-full"
            aria-label={t("periodLengthLabel")}
          />
        </div>

        {/* Number Input + Unit Label */}
        <div className="flex items-center gap-3">
          <input
            type="number"
            id="periodLength"
            min={MIN_PERIOD_LENGTH}
            max={MAX_PERIOD_LENGTH}
            value={periodLength}
            onChange={(e) =>
              handlePeriodLengthChange(
                parseInt(e.target.value, 10) || DEFAULT_PERIOD_LENGTH,
              )
            }
            className="border-primary-200 dark:bg-dark-card dark:border-dark-border focus:border-primary-400 focus:ring-primary-100 dark:focus:ring-primary-900/30 min-h-[48px] w-24 rounded-xl border-2 bg-white px-4 py-3 text-center text-gray-800 focus:ring-4 dark:text-gray-100"
            aria-label={t("periodLengthLabel")}
          />
          <span className="font-medium text-gray-600 dark:text-gray-300">
            {t("periodLengthUnit")}
          </span>
        </div>
      </div>

      {/* Error Message */}
      {error && (
        <div className="rounded-xl border-2 border-red-200 bg-red-50 p-4 text-red-600 dark:border-red-800 dark:bg-red-900/20 dark:text-red-400">
          {error}
        </div>
      )}

      {/* Action Buttons */}
      <div className="flex flex-col gap-4 pt-4 sm:flex-row">
        <button
          type="submit"
          disabled={!isFormValid}
          className="bg-primary-400 hover:bg-primary-500 shadow-warm focus:ring-primary-300 dark:focus:ring-primary-700 disabled:bg-primary-300 dark:disabled:bg-primary-800 min-h-[48px] flex-1 rounded-2xl px-6 py-3 text-lg font-semibold text-white transition-all focus:ring-4 focus:outline-none disabled:cursor-not-allowed disabled:opacity-50 dark:disabled:text-gray-400"
        >
          {t("calculateButton")}
        </button>
        {onReset && (
          <button
            type="button"
            onClick={handleReset}
            className="border-primary-200 hover:border-primary-300 hover:bg-primary-50 dark:hover:bg-dark-card focus:ring-primary-100 dark:focus:ring-primary-900/30 min-h-[48px] rounded-2xl border-2 px-6 py-3 text-lg font-semibold text-gray-700 transition-all focus:ring-4 focus:outline-none dark:text-gray-300"
          >
            {t("resetButton")}
          </button>
        )}
      </div>
    </form>
  );
}
