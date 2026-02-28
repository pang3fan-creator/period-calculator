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

type OvulationPurpose = "conceive" | "avoid";

function parseLocalDate(dateStr: string): Date {
  const [year, month, day] = dateStr.split("-").map(Number);
  return new Date(year, month - 1, day);
}

const getDefaultLastPeriodDate = (): string => {
  const date = addDays(new Date(), -DEFAULT_CYCLE_LENGTH);
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
};

interface OvulationCalculatorFormProps {
  initialData?: CycleData;
  onSubmit: (data: CycleData, purpose: OvulationPurpose) => void;
  initialPurpose?: OvulationPurpose;
}

interface FormState {
  lastPeriodStart: string;
  cycleLength: number;
  periodLength: number;
  purpose: OvulationPurpose;
}

export function OvulationCalculatorForm({
  initialData,
  onSubmit,
  initialPurpose = "conceive",
}: OvulationCalculatorFormProps) {
  const t = useTranslations("ovulationCalculator");
  const tForm = useTranslations("calculator.form");

  const [formData, setFormData] = useState<FormState>(() => {
    if (initialData) {
      return {
        lastPeriodStart: formatDateForInput(initialData.lastPeriodStart),
        cycleLength: initialData.cycleLength,
        periodLength: initialData.periodLength,
        purpose: initialPurpose,
      };
    }
    return {
      lastPeriodStart: getDefaultLastPeriodDate(),
      cycleLength: DEFAULT_CYCLE_LENGTH,
      periodLength: DEFAULT_PERIOD_LENGTH,
      purpose: initialPurpose,
    };
  });

  const getTodayDate = useCallback(() => {
    return new Date().toISOString().split("T")[0];
  }, []);

  const handleDateChange = useCallback((value: string) => {
    setFormData((prev) => ({ ...prev, lastPeriodStart: value }));
  }, []);

  const handleCycleLengthChange = useCallback((value: number) => {
    const clampedValue = Math.max(MIN_CYCLE_LENGTH, Math.min(MAX_CYCLE_LENGTH, value));
    setFormData((prev) => ({ ...prev, cycleLength: clampedValue }));
  }, []);

  const handlePeriodLengthChange = useCallback((value: number) => {
    const clampedValue = Math.max(MIN_PERIOD_LENGTH, Math.min(MAX_PERIOD_LENGTH, value));
    setFormData((prev) => ({ ...prev, periodLength: clampedValue }));
  }, []);

  const handlePurposeChange = useCallback((purpose: OvulationPurpose) => {
    setFormData((prev) => ({ ...prev, purpose }));
  }, []);

  const handleSubmit = useCallback(
    (e: FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      if (!formData.lastPeriodStart) return;

      const cycleData: CycleData = {
        lastPeriodStart: parseLocalDate(formData.lastPeriodStart),
        cycleLength: formData.cycleLength,
        periodLength: formData.periodLength,
      };

      onSubmit(cycleData, formData.purpose);
    },
    [formData, onSubmit],
  );

  const handleReset = useCallback(() => {
    setFormData({
      lastPeriodStart: getDefaultLastPeriodDate(),
      cycleLength: DEFAULT_CYCLE_LENGTH,
      periodLength: DEFAULT_PERIOD_LENGTH,
      purpose: initialPurpose,
    });
  }, [initialPurpose]);

  const isFormValid = formData.lastPeriodStart !== "";

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      {/* Purpose Toggle */}
      <div className="space-y-3">
        <label className="block text-lg font-semibold text-gray-800 dark:text-gray-100">
          {t("purpose")}
        </label>
        <div className="flex gap-3">
          <button
            type="button"
            onClick={() => handlePurposeChange("conceive")}
            onKeyDown={(e) => (e.key === "Enter" || e.key === " ") && handlePurposeChange("conceive")}
            className={`flex-1 rounded-2xl border-2 px-4 py-3 text-base font-semibold transition-colors ${
              formData.purpose === "conceive"
                ? "border-blue-400 bg-blue-50 text-blue-700 dark:border-blue-600 dark:bg-blue-900/30 dark:text-blue-300"
                : "border-gray-200 bg-white text-gray-700 hover:border-gray-300 dark:border-gray-600 dark:bg-dark-card dark:text-gray-300"
            }`}
          >
            {t("tryingToConceive")}
          </button>
          <button
            type="button"
            onClick={() => handlePurposeChange("avoid")}
            onKeyDown={(e) => (e.key === "Enter" || e.key === " ") && handlePurposeChange("avoid")}
            className={`flex-1 rounded-2xl border-2 px-4 py-3 text-base font-semibold transition-colors ${
              formData.purpose === "avoid"
                ? "border-orange-400 bg-orange-50 text-orange-700 dark:border-orange-600 dark:bg-orange-900/30 dark:text-orange-300"
                : "border-gray-200 bg-white text-gray-700 hover:border-gray-300 dark:border-gray-600 dark:bg-dark-card dark:text-gray-300"
            }`}
          >
            {t("avoidingPregnancy")}
          </button>
        </div>
      </div>

      {/* Last Period Date */}
      <div className="space-y-3">
        <label htmlFor="lastPeriodStart" className="block text-lg font-semibold text-gray-800 dark:text-gray-100">
          {tForm("lastPeriodLabel")}
        </label>
        <input
          id="lastPeriodStart"
          name="lastPeriodStart"
          type="date"
          value={formData.lastPeriodStart}
          onChange={(e) => handleDateChange(e.target.value)}
          max={getTodayDate()}
          className="border-primary-200 dark:bg-dark-card dark:border-dark-border focus:border-primary-400 focus:ring-primary-100 dark:focus:ring-primary-900/30 min-h-[48px] w-full cursor-pointer rounded-xl border-2 bg-white px-4 py-3 text-gray-800 transition-colors focus:ring-4 dark:text-gray-100"
          required
        />
      </div>

      {/* Cycle Length */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <label htmlFor="cycleLength" className="block text-lg font-semibold text-gray-800 dark:text-gray-100">
            {tForm("cycleLengthLabel")}
          </label>
          <span className="text-sm text-gray-500 dark:text-gray-400">{tForm("cycleLengthHelp")}</span>
        </div>
        <input
          type="range"
          id="cycleLengthSlider"
          min={MIN_CYCLE_LENGTH}
          max={MAX_CYCLE_LENGTH}
          value={formData.cycleLength}
          onChange={(e) => handleCycleLengthChange(parseInt(e.target.value, 10))}
          className="bg-primary-100 dark:bg-dark-border accent-primary-400 h-2 w-full cursor-pointer appearance-none rounded-full"
        />
        <div className="flex items-center gap-3">
          <input
            type="number"
            id="cycleLength"
            name="cycleLength"
            min={MIN_CYCLE_LENGTH}
            max={MAX_CYCLE_LENGTH}
            value={formData.cycleLength}
            onChange={(e) => handleCycleLengthChange(parseInt(e.target.value, 10) || DEFAULT_CYCLE_LENGTH)}
            className="border-primary-200 dark:bg-dark-card dark:border-dark-border focus:border-primary-400 focus:ring-primary-100 dark:focus:ring-primary-900/30 min-h-[48px] w-24 rounded-xl border-2 bg-white px-4 py-3 text-center text-gray-800 focus:ring-4 dark:text-gray-100"
          />
          <span className="font-medium text-gray-600 dark:text-gray-300">{tForm("cycleLengthUnit")}</span>
        </div>
      </div>

      {/* Period Length */}
      <div className="space-y-4">
        <label htmlFor="periodLength" className="block text-lg font-semibold text-gray-800 dark:text-gray-100">
          {tForm("periodLengthLabel")}
        </label>
        <input
          type="range"
          id="periodLengthSlider"
          min={MIN_PERIOD_LENGTH}
          max={MAX_PERIOD_LENGTH}
          value={formData.periodLength}
          onChange={(e) => handlePeriodLengthChange(parseInt(e.target.value, 10))}
          className="bg-primary-100 dark:bg-dark-border accent-primary-400 h-2 w-full cursor-pointer appearance-none rounded-full"
        />
        <div className="flex items-center gap-3">
          <input
            type="number"
            id="periodLength"
            name="periodLength"
            min={MIN_PERIOD_LENGTH}
            max={MAX_PERIOD_LENGTH}
            value={formData.periodLength}
            onChange={(e) => handlePeriodLengthChange(parseInt(e.target.value, 10) || DEFAULT_PERIOD_LENGTH)}
            className="border-primary-200 dark:bg-dark-card dark:border-dark-border focus:border-primary-400 focus:ring-primary-100 dark:focus:ring-primary-900/30 min-h-[48px] w-24 rounded-xl border-2 bg-white px-4 py-3 text-center text-gray-800 focus:ring-4 dark:text-gray-100"
          />
          <span className="font-medium text-gray-600 dark:text-gray-300">{tForm("periodLengthUnit")}</span>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex flex-col gap-4 pt-4 sm:flex-row">
        <button
          type="submit"
          disabled={!isFormValid}
          className="bg-primary-400 hover:bg-primary-500 shadow-warm focus:ring-primary-300 dark:focus:ring-primary-700 disabled:bg-primary-300 dark:disabled:bg-primary-800 min-h-[48px] flex-1 rounded-2xl px-6 py-3 text-lg font-semibold text-white transition-colors focus:ring-4 focus:outline-none disabled:cursor-not-allowed disabled:opacity-50"
        >
          {t("calculateButton")}
        </button>
        <button
          type="button"
          onClick={handleReset}
          className="border-primary-200 hover:border-primary-300 hover:bg-primary-50 dark:hover:bg-dark-card focus:ring-primary-100 dark:focus:ring-primary-900/30 min-h-[48px] rounded-2xl border-2 px-6 py-3 text-lg font-semibold text-gray-700 transition-colors dark:text-gray-300"
        >
          {t("resetButton")}
        </button>
      </div>
    </form>
  );
}

function formatDateForInput(date: Date): string {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}
