"use client";

import { useState, useCallback, type FormEvent } from "react";
import { useTranslations } from "next-intl";
import { addDays } from "date-fns";
import {
  DEFAULT_CYCLE_LENGTH,
  DEFAULT_PERIOD_LENGTH,
  MIN_CYCLE_LENGTH,
  MAX_CYCLE_LENGTH,
  MIN_PERIOD_LENGTH,
  MAX_PERIOD_LENGTH,
} from "@/lib/constants";
import { CycleData } from "@/types";
import { PrivacyPopup } from "./privacy-popup";

/**
 * Parse YYYY-MM-DD string as local time date (not UTC)
 * This fixes the timezone issue where new Date("2026-01-05") is interpreted as UTC
 */
function parseLocalDate(dateStr: string): Date {
  const [year, month, day] = dateStr.split("-").map(Number);
  return new Date(year, month - 1, day);
}

// Helper to get default date (28 days ago for immediate calculation)
const getDefaultLastPeriodDate = (): string => {
  const date = addDays(new Date(), -DEFAULT_CYCLE_LENGTH);
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
};

interface CalculatorFormProps {
  initialData?: CycleData;
  onSubmit: (data: CycleData) => void;
}

// Form state for internal management
interface FormState {
  lastPeriodStart: string; // YYYY-MM-DD for date input
  cycleLength: number;
  periodLength: number;
}

export function CalculatorForm({ initialData, onSubmit }: CalculatorFormProps) {
  const t = useTranslations("calculator.form");

  // Initialize form state
  const [formData, setFormData] = useState<FormState>(() => {
    if (initialData) {
      return {
        lastPeriodStart: formatDateForInput(initialData.lastPeriodStart),
        cycleLength: initialData.cycleLength,
        periodLength: initialData.periodLength,
      };
    }
    return {
      lastPeriodStart: getDefaultLastPeriodDate(),
      cycleLength: DEFAULT_CYCLE_LENGTH,
      periodLength: DEFAULT_PERIOD_LENGTH,
    };
  });

  // Get today's date in YYYY-MM-DD format for max attribute
  const getTodayDate = useCallback(() => {
    return new Date().toISOString().split("T")[0];
  }, []);

  // Handle date input change
  const handleDateChange = useCallback((value: string) => {
    setFormData((prev) => ({ ...prev, lastPeriodStart: value }));
  }, []);

  // Handle cycle length change (sync slider and number input)
  const handleCycleLengthChange = useCallback((value: number) => {
    const clampedValue = Math.max(
      MIN_CYCLE_LENGTH,
      Math.min(MAX_CYCLE_LENGTH, value),
    );
    setFormData((prev) => ({ ...prev, cycleLength: clampedValue }));
  }, []);

  // Handle period length change (sync slider and number input)
  const handlePeriodLengthChange = useCallback((value: number) => {
    const clampedValue = Math.max(
      MIN_PERIOD_LENGTH,
      Math.min(MAX_PERIOD_LENGTH, value),
    );
    setFormData((prev) => ({ ...prev, periodLength: clampedValue }));
  }, []);

  // Handle form submission
  const handleSubmit = useCallback(
    (e: FormEvent<HTMLFormElement>) => {
      e.preventDefault();

      // Validate date is selected
      if (!formData.lastPeriodStart) {
        return;
      }

      // Convert form data to CycleData (using local time parsing)
      const cycleData: CycleData = {
        lastPeriodStart: parseLocalDate(formData.lastPeriodStart),
        cycleLength: formData.cycleLength,
        periodLength: formData.periodLength,
      };

      onSubmit(cycleData);
    },
    [formData, onSubmit],
  );

  // Handle reset
  const handleReset = useCallback(() => {
    setFormData({
      lastPeriodStart: "",
      cycleLength: DEFAULT_CYCLE_LENGTH,
      periodLength: DEFAULT_PERIOD_LENGTH,
    });
  }, []);

  const isFormValid = formData.lastPeriodStart !== "";

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      {/* Last Period Date Input */}
      <div className="space-y-3">
        <label
          htmlFor="lastPeriodStart"
          className="block text-lg font-semibold text-gray-800 dark:text-gray-100"
        >
          {t("lastPeriodLabel")}
        </label>
        <input
          id="lastPeriodStart"
          type="date"
          value={formData.lastPeriodStart}
          onChange={(e) => handleDateChange(e.target.value)}
          max={getTodayDate()}
          className="border-primary-200 dark:bg-dark-card dark:border-dark-border focus:border-primary-400 focus:ring-primary-100 dark:focus:ring-primary-900/30 min-h-[48px] w-full cursor-pointer rounded-xl border-2 bg-white px-4 py-3 text-gray-800 transition-colors focus:ring-4 dark:text-gray-100"
          required
        />
      </div>

      {/* Cycle Length Slider + Number Input */}
      <div className="space-y-4">
        <div className="flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between">
          <label
            htmlFor="cycleLength"
            className="block text-lg font-semibold text-gray-800 dark:text-gray-100"
          >
            {t("cycleLengthLabel")}
          </label>
          <span className="text-sm text-gray-500 dark:text-gray-400">
            {t("cycleLengthHelp")}
          </span>
        </div>

        {/* Slider */}
        <div className="px-2">
          <input
            type="range"
            id="cycleLengthSlider"
            min={MIN_CYCLE_LENGTH}
            max={MAX_CYCLE_LENGTH}
            value={formData.cycleLength}
            onChange={(e) =>
              handleCycleLengthChange(parseInt(e.target.value, 10))
            }
            className="bg-primary-100 dark:bg-dark-border accent-primary-400 h-2 w-full cursor-pointer appearance-none rounded-full"
            aria-label={t("cycleLengthLabel")}
          />
        </div>

        {/* Number Input + Unit Label */}
        <div className="flex items-center gap-3">
          <input
            type="number"
            id="cycleLength"
            min={MIN_CYCLE_LENGTH}
            max={MAX_CYCLE_LENGTH}
            value={formData.cycleLength}
            onChange={(e) =>
              handleCycleLengthChange(
                parseInt(e.target.value, 10) || DEFAULT_CYCLE_LENGTH,
              )
            }
            className="border-primary-200 dark:bg-dark-card dark:border-dark-border focus:border-primary-400 focus:ring-primary-100 dark:focus:ring-primary-900/30 min-h-[48px] w-24 rounded-xl border-2 bg-white px-4 py-3 text-center text-gray-800 transition-colors focus:ring-4 dark:text-gray-100"
            aria-label={t("cycleLengthLabel")}
          />
          <span className="font-medium text-gray-600 dark:text-gray-300">
            {t("cycleLengthUnit")}
          </span>
        </div>
      </div>

      {/* Period Length Slider + Number Input */}
      <div className="space-y-4">
        <div className="flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between">
          <label
            htmlFor="periodLength"
            className="block text-lg font-semibold text-gray-800 dark:text-gray-100"
          >
            {t("periodLengthLabel")}
          </label>
          <span className="text-sm text-gray-500 dark:text-gray-400">
            {t("periodLengthHelp")}
          </span>
        </div>

        {/* Slider */}
        <div className="px-2">
          <input
            type="range"
            id="periodLengthSlider"
            min={MIN_PERIOD_LENGTH}
            max={MAX_PERIOD_LENGTH}
            value={formData.periodLength}
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
            value={formData.periodLength}
            onChange={(e) =>
              handlePeriodLengthChange(
                parseInt(e.target.value, 10) || DEFAULT_PERIOD_LENGTH,
              )
            }
            className="border-primary-200 dark:bg-dark-card dark:border-dark-border focus:border-primary-400 focus:ring-primary-100 dark:focus:ring-primary-900/30 min-h-[48px] w-24 rounded-xl border-2 bg-white px-4 py-3 text-center text-gray-800 transition-colors focus:ring-4 dark:text-gray-100"
            aria-label={t("periodLengthLabel")}
          />
          <span className="font-medium text-gray-600 dark:text-gray-300">
            {t("periodLengthUnit")}
          </span>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex flex-col gap-4 pt-4 sm:flex-row">
        <button
          type="submit"
          disabled={!isFormValid}
          className="bg-primary-400 hover:bg-primary-500 shadow-warm focus:ring-primary-300 dark:focus:ring-primary-700 disabled:bg-primary-300 dark:disabled:bg-primary-800 min-h-[48px] flex-1 rounded-2xl px-6 py-3 text-lg font-semibold text-white transition-all focus:ring-4 focus:outline-none disabled:cursor-not-allowed disabled:opacity-50 dark:disabled:text-gray-400"
        >
          {t("calculateButton")}
        </button>
        <div className="flex gap-2">
          <button
            type="button"
            onClick={handleReset}
            className="border-primary-200 hover:border-primary-300 hover:bg-primary-50 dark:hover:bg-dark-card focus:ring-primary-100 dark:focus:ring-primary-900/30 min-h-[48px] rounded-2xl border-2 px-6 py-3 text-lg font-semibold text-gray-700 transition-all focus:ring-4 focus:outline-none dark:text-gray-300"
          >
            {t("resetButton")}
          </button>
          <PrivacyPopup />
        </div>
      </div>
    </form>
  );
}

/**
 * Helper function to format Date object as YYYY-MM-DD for date input
 */
function formatDateForInput(date: Date): string {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}
