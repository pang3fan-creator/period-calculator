# Period Calculator P0 Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Build a minimalist, fast menstrual cycle calculator with calendar visualization and Google Calendar integration.

**Architecture:** Client-side React components with LocalStorage persistence. Core algorithm in pure TypeScript, no external dependencies beyond date-fns.

**Tech Stack:** Next.js 16, React 19, TypeScript, Tailwind CSS v4, date-fns, next-intl, next-themes

---

## Task 1: Create Core Algorithm Module

**Files:**
- Create: `src/lib/calculator/cycle-calculator.ts`

**Step 1: Write the algorithm**

```typescript
// src/lib/calculator/cycle-calculator.ts
import { addDays } from "date-fns";
import type { CycleData, PredictionResult } from "@/types";

/**
 * Calculate menstrual cycle predictions based on ACOG guidelines
 * @param data - User input cycle data
 * @returns Prediction results with key dates
 */
export function calculateCycle(data: CycleData): PredictionResult {
  const { lastPeriodStart, cycleLength, periodLength } = data;

  // Next period = last period start + cycle length
  const nextPeriodStart = addDays(lastPeriodStart, cycleLength);

  // Next period end = start + period length - 1 (inclusive)
  const nextPeriodEnd = addDays(nextPeriodStart, periodLength - 1);

  // Ovulation = next period start - 14 days
  const ovulationDate = addDays(nextPeriodStart, -14);

  // Fertile window = 5 days before to 1 day after ovulation
  const fertileWindowStart = addDays(ovulationDate, -5);
  const fertileWindowEnd = addDays(ovulationDate, 1);

  // PMS = 7 days before next period
  const pmsStart = addDays(nextPeriodStart, -7);

  return {
    nextPeriodStart,
    nextPeriodEnd,
    fertileWindowStart,
    fertileWindowEnd,
    ovulationDate,
    pmsStart,
  };
}

/**
 * Determine the type of a given date for calendar visualization
 */
export function getDatePeriodType(
  date: Date,
  prediction: PredictionResult
): "period" | "fertile" | "ovulation" | "pms" | null {
  // Check if date is within period (inclusive range)
  if (
    date >= prediction.nextPeriodStart &&
    date <= prediction.nextPeriodEnd
  ) {
    return "period";
  }

  // Check ovulation day (exact match)
  if (
    date.toDateString() === prediction.ovulationDate.toDateString()
  ) {
    return "ovulation";
  }

  // Check fertile window (inclusive range)
  if (
    date >= prediction.fertileWindowStart &&
    date <= prediction.fertileWindowEnd
  ) {
    return "fertile";
  }

  // Check PMS period (exclusive of next period start)
  if (date >= prediction.pmsStart && date < prediction.nextPeriodStart) {
    return "pms";
  }

  return null;
}
```

**Step 2: Commit**

```bash
git add src/lib/calculator/cycle-calculator.ts
git commit -m "feat: add core menstrual cycle calculation algorithm"
```

---

## Task 2: Create Validation Module

**Files:**
- Create: `src/lib/calculator/validation.ts`

**Step 1: Write the validation functions**

```typescript
// src/lib/calculator/validation.ts
import { differenceInDays } from "date-fns";
import type { CycleData } from "@/types";

export interface ValidationError {
  field: keyof CycleData;
  message: string;
}

/**
 * Validate cycle data input
 * @returns Array of validation errors (empty if valid)
 */
export function validateCycleData(data: CycleData): ValidationError[] {
  const errors: ValidationError[] = [];
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  // Validate lastPeriodStart
  if (!data.lastPeriodStart || !(data.lastPeriodStart instanceof Date)) {
    errors.push({
      field: "lastPeriodStart",
      message: "validation.invalidDate",
    });
  } else {
    const inputDate = new Date(data.lastPeriodStart);
    inputDate.setHours(0, 0, 0, 0);

    if (differenceInDays(inputDate, today) > 0) {
      errors.push({
        field: "lastPeriodStart",
        message: "validation.futureDate",
      });
    }
  }

  // Validate cycleLength
  if (
    !data.cycleLength ||
    typeof data.cycleLength !== "number" ||
    data.cycleLength < 21 ||
    data.cycleLength > 35
  ) {
    errors.push({
      field: "cycleLength",
      message: "validation.cycleLengthRange",
    });
  }

  // Validate periodLength
  if (
    !data.periodLength ||
    typeof data.periodLength !== "number" ||
    data.periodLength < 2 ||
    data.periodLength > 7
  ) {
    errors.push({
      field: "periodLength",
      message: "validation.periodLengthRange",
    });
  }

  return errors;
}
```

**Step 2: Commit**

```bash
git add src/lib/calculator/validation.ts
git commit -m "feat: add input validation for cycle data"
```

---

## Task 3: Create LocalStorage Manager

**Files:**
- Create: `src/lib/storage/localStorage.ts`

**Step 1: Write the storage functions**

```typescript
// src/lib/storage/localStorage.ts
import type { CycleData } from "@/types";

const STORAGE_KEY = "period_calculator_data";

interface StorageData {
  lastPeriodStart: string;
  cycleLength: number;
  periodLength: number;
  savedAt: string;
}

/**
 * Save cycle data to localStorage
 */
export function saveCycleData(data: CycleData): void {
  if (typeof window === "undefined") return;

  const storageData: StorageData = {
    lastPeriodStart: data.lastPeriodStart.toISOString(),
    cycleLength: data.cycleLength,
    periodLength: data.periodLength,
    savedAt: new Date().toISOString(),
  };

  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(storageData));
  } catch (error) {
    console.warn("Failed to save to localStorage:", error);
  }
}

/**
 * Load cycle data from localStorage
 */
export function loadCycleData(): CycleData | null {
  if (typeof window === "undefined") return null;

  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (!stored) return null;

    const data: StorageData = JSON.parse(stored);

    return {
      lastPeriodStart: new Date(data.lastPeriodStart),
      cycleLength: data.cycleLength,
      periodLength: data.periodLength,
    };
  } catch {
    return null;
  }
}

/**
 * Clear cycle data from localStorage
 */
export function clearCycleData(): void {
  if (typeof window === "undefined") return;

  try {
    localStorage.removeItem(STORAGE_KEY);
  } catch (error) {
    console.warn("Failed to clear localStorage:", error);
  }
}
```

**Step 2: Commit**

```bash
git add src/lib/storage/localStorage.ts
git commit -m "feat: add localStorage manager for cycle data persistence"
```

---

## Task 4: Create Input Form Component

**Files:**
- Create: `src/components/calculator/calculator-form.tsx`

**Step 1: Write the form component**

```tsx
// src/components/calculator/calculator-form.tsx
"use client";

import { useTranslations } from "next-intl";
import { useState, useCallback } from "react";
import type { CycleData } from "@/types";
import { DEFAULT_CYCLE_LENGTH, DEFAULT_PERIOD_LENGTH } from "@/lib/constants";

interface CalculatorFormProps {
  initialData?: CycleData;
  onSubmit: (data: CycleData) => void;
}

export function CalculatorForm({ initialData, onSubmit }: CalculatorFormProps) {
  const t = useTranslations("calculator.form");

  const [lastPeriodStart, setLastPeriodStart] = useState<string>(
    initialData?.lastPeriodStart?.toISOString().split("T")[0] || ""
  );
  const [cycleLength, setCycleLength] = useState<number>(
    initialData?.cycleLength ?? DEFAULT_CYCLE_LENGTH
  );
  const [periodLength, setPeriodLength] = useState<number>(
    initialData?.periodLength ?? DEFAULT_PERIOD_LENGTH
  );

  const handleSubmit = useCallback(
    (e: React.FormEvent) => {
      e.preventDefault();

      const data: CycleData = {
        lastPeriodStart: new Date(lastPeriodStart),
        cycleLength,
        periodLength,
      };

      onSubmit(data);
    },
    [lastPeriodStart, cycleLength, periodLength, onSubmit]
  );

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Last Period Date */}
      <div>
        <label
          htmlFor="lastPeriodStart"
          className="text-gray-700 dark:text-gray-300 mb-2 block text-sm font-medium"
        >
          {t("lastPeriodLabel")}
        </label>
        <input
          id="lastPeriodStart"
          type="date"
          value={lastPeriodStart}
          onChange={(e) => setLastPeriodStart(e.target.value)}
          max={new Date().toISOString().split("T")[0]}
          required
          className="dark:bg-dark-card dark:border-dark-border focus:border-primary-400 dark:focus:border-primary-400 focus:ring-primary-400 w-full rounded-xl border border-gray-300 px-4 py-3 text-gray-900 transition-colors focus:outline-none focus:ring-2"
        />
      </div>

      {/* Cycle Length */}
      <div>
        <label
          htmlFor="cycleLength"
          className="text-gray-700 dark:text-gray-300 mb-2 block text-sm font-medium"
        >
          {t("cycleLengthLabel")}
          <span className="text-gray-500 dark:text-gray-400 ml-2 text-sm">
            {t("days")}
          </span>
        </label>
        <div className="flex items-center gap-4">
          <input
            id="cycleLength"
            type="range"
            min="21"
            max="35"
            value={cycleLength}
            onChange={(e) => setCycleLength(Number(e.target.value))}
            className="flex-1 accent-primary-400"
          />
          <input
            type="number"
            min="21"
            max="35"
            value={cycleLength}
            onChange={(e) => setCycleLength(Number(e.target.value))}
            className="dark:bg-dark-card dark:border-dark-border focus:border-primary-400 dark:focus:border-primary-400 focus:ring-primary-400 w-20 rounded-xl border border-gray-300 px-3 py-2 text-center text-gray-900 transition-colors focus:outline-none focus:ring-2"
          />
        </div>
      </div>

      {/* Period Length */}
      <div>
        <label
          htmlFor="periodLength"
          className="text-gray-700 dark:text-gray-300 mb-2 block text-sm font-medium"
        >
          {t("periodLengthLabel")}
          <span className="text-gray-500 dark:text-gray-400 ml-2 text-sm">
            {t("days")}
          </span>
        </label>
        <div className="flex items-center gap-4">
          <input
            id="periodLength"
            type="range"
            min="2"
            max="7"
            value={periodLength}
            onChange={(e) => setPeriodLength(Number(e.target.value))}
            className="flex-1 accent-primary-400"
          />
          <input
            type="number"
            min="2"
            max="7"
            value={periodLength}
            onChange={(e) => setPeriodLength(Number(e.target.value))}
            className="dark:bg-dark-card dark:border-dark-border focus:border-primary-400 dark:focus:border-primary-400 focus:ring-primary-400 w-20 rounded-xl border border-gray-300 px-3 py-2 text-center text-gray-900 transition-colors focus:outline-none focus:ring-2"
          />
        </div>
      </div>

      {/* Submit Button */}
      <button
        type="submit"
        className="bg-primary-400 hover:bg-primary-500 active:scale-95 dark:bg-primary-500 dark:hover:bg-primary-600 w-full rounded-2xl px-6 py-4 text-lg font-semibold text-white transition-all shadow-lg hover:shadow-xl min-h-[48px]"
      >
        {t("calculateButton")}
      </button>
    </form>
  );
}
```

**Step 2: Commit**

```bash
git add src/components/calculator/calculator-form.tsx
git commit -m "feat: add calculator input form component"
```

---

## Task 5: Create Prediction Cards Component

**Files:**
- Create: `src/components/calculator/prediction-cards.tsx`

**Step 1: Write the prediction cards component**

```tsx
// src/components/calculator/prediction-cards.tsx
"use client";

import { useTranslations } from "next-intl";
import { format } from "date-fns";
import type { PredictionResult, Locale } from "@/types";
import { CalendarIcon, SparklesIcon, HeartIcon, SunIcon } from "./icons";

interface PredictionCardsProps {
  result: PredictionResult;
  locale: Locale;
}

export function PredictionCards({ result, locale }: PredictionCardsProps) {
  const t = useTranslations("calculator.results");

  const formatDate = (date: Date) => format(date, "MMM dd, yyyy", { locale });

  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
      {/* Next Period Card */}
      <div className="border-l-4 border-red-300 bg-red-50 dark:bg-red-900/20 dark:border-red-700 rounded-r-xl p-4">
        <div className="text-red-600 dark:text-red-400 mb-2">
          <CalendarIcon className="w-6 h-6" />
        </div>
        <h3 className="text-gray-700 dark:text-gray-300 text-sm font-medium">
          {t("nextPeriod")}
        </h3>
        <p className="text-gray-900 dark:text-white mt-1 font-semibold">
          {formatDate(result.nextPeriodStart)}
        </p>
        <p className="text-gray-600 dark:text-gray-400 mt-1 text-sm">
          {formatDate(result.nextPeriodEnd)}
        </p>
      </div>

      {/* Ovulation Day Card */}
      <div className="border-l-4 border-blue-300 bg-blue-50 dark:bg-blue-900/20 dark:border-blue-700 rounded-r-xl p-4">
        <div className="text-blue-600 dark:text-blue-400 mb-2">
          <SparklesIcon className="w-6 h-6" />
        </div>
        <h3 className="text-gray-700 dark:text-gray-300 text-sm font-medium">
          {t("ovulationDay")}
        </h3>
        <p className="text-gray-900 dark:text-white mt-1 font-semibold">
          {formatDate(result.ovulationDate)}
        </p>
      </div>

      {/* Fertile Window Card */}
      <div className="border-l-4 border-blue-300 bg-blue-50 dark:bg-blue-900/20 dark:border-blue-700 rounded-r-xl p-4">
        <div className="text-blue-600 dark:text-blue-400 mb-2">
          <HeartIcon className="w-6 h-6" />
        </div>
        <h3 className="text-gray-700 dark:text-gray-300 text-sm font-medium">
          {t("fertileWindow")}
        </h3>
        <p className="text-gray-900 dark:text-white mt-1 font-semibold">
          {formatDate(result.fertileWindowStart)}
        </p>
        <p className="text-gray-600 dark:text-gray-400 mt-1 text-sm">
          {formatDate(result.fertileWindowEnd)}
        </p>
      </div>

      {/* PMS Period Card */}
      <div className="border-l-4 border-yellow-300 bg-yellow-50 dark:bg-yellow-900/20 dark:border-yellow-700 rounded-r-xl p-4">
        <div className="text-yellow-600 dark:text-yellow-400 mb-2">
          <SunIcon className="w-6 h-6" />
        </div>
        <h3 className="text-gray-700 dark:text-gray-300 text-sm font-medium">
          {t("pmsPeriod")}
        </h3>
        <p className="text-gray-900 dark:text-white mt-1 font-semibold">
          {formatDate(result.pmsStart)}
        </p>
      </div>
    </div>
  );
}

// Inline icons to avoid re-creation
const CalendarIcon = ({ className }: { className: string }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
    <line x1="16" y1="2" x2="16" y2="6" />
    <line x1="8" y1="2" x2="8" y2="6" />
    <line x1="3" y1="10" x2="21" y2="10" />
  </svg>
);

const SparklesIcon = ({ className }: { className: string }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
  </svg>
);

const HeartIcon = ({ className }: { className: string }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
  </svg>
);

const SunIcon = ({ className }: { className: string }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <circle cx="12" cy="12" r="5" />
    <line x1="12" y1="1" x2="12" y2="3" />
    <line x1="12" y1="21" x2="12" y2="23" />
    <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
    <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
    <line x1="1" y1="12" x2="3" y2="12" />
    <line x1="21" y1="12" x2="23" y2="12" />
    <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" />
    <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
  </svg>
);
```

**Step 2: Commit**

```bash
git add src/components/calculator/prediction-cards.tsx
git commit -m "feat: add prediction cards component"
```

---

## Task 6: Create Calendar View Component

**Files:**
- Create: `src/components/calculator/calendar-view.tsx`

**Step 1: Write the calendar view component**

```tsx
// src/components/calculator/calendar-view.tsx
"use client";

import { useState, useMemo } from "react";
import { format, startOfMonth, endOfMonth, eachDayOfInterval, addMonths, subMonths } from "date-fns";
import { useTranslations } from "next-intl";
import type { PredictionResult, Locale } from "@/types";
import { getDatePeriodType } from "@/lib/calculator/cycle-calculator";

interface CalendarViewProps {
  prediction: PredictionResult;
  locale: Locale;
}

export function CalendarView({ prediction, locale }: CalendarViewProps) {
  const t = useTranslations("calculator.calendar");
  const [currentMonth, setCurrentMonth] = useState(() => {
    // Start from today's month
    return new Date();
  });

  // Generate calendar days
  const calendarDays = useMemo(() => {
    const monthStart = startOfMonth(currentMonth);
    const monthEnd = endOfMonth(currentMonth);
    return eachDayOfInterval({ start: monthStart, end: monthEnd });
  }, [currentMonth]);

  // Week day labels
  const weekDays = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

  // Get day styling based on period type
  const getDayStyles = (date: Date) => {
    const periodType = getDatePeriodType(date, prediction);

    if (!periodType) {
      return "bg-white dark:bg-gray-800 text-gray-900 dark:text-white hover:bg-gray-50 dark:hover:bg-gray-700";
    }

    switch (periodType) {
      case "period":
        return "border-2 border-red-300 bg-red-50 text-gray-900 dark:border-red-700 dark:bg-red-900/30";
      case "ovulation":
        return "border-2 border-blue-400 bg-blue-50 text-gray-900 dark:border-blue-500 dark:bg-blue-900/30 font-semibold";
      case "fertile":
        return "border-2 border-blue-300 bg-blue-50 text-gray-900 dark:border-blue-700 dark:bg-blue-900/30";
      case "pms":
        return "border-2 border-yellow-300 bg-yellow-50 text-gray-900 dark:border-yellow-700 dark:bg-yellow-900/30";
      default:
        return "bg-white dark:bg-gray-800";
    }
  };

  const previousMonth = () => setCurrentMonth(subMonths(currentMonth, 1));
  const nextMonth = () => setCurrentMonth(addMonths(currentMonth, 1));

  return (
    <div className="dark:bg-dark-card rounded-3xl bg-white p-6 shadow-lg">
      {/* Month Navigation */}
      <div className="mb-4 flex items-center justify-between">
        <button
          type="button"
          onClick={previousMonth}
          className="hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg p-2 transition-colors"
          aria-label={t("previousMonth")}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="text-gray-600 dark:text-gray-400 h-5 w-5"
          >
            <polyline points="15 18 9 12 15 6" />
          </svg>
        </button>

        <h3 className="text-gray-900 dark:text-white text-lg font-semibold">
          {format(currentMonth, "MMMM yyyy", { locale })}
        </h3>

        <button
          type="button"
          onClick={nextMonth}
          className="hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg p-2 transition-colors"
          aria-label={t("nextMonth")}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="text-gray-600 dark:text-gray-400 h-5 w-5"
          >
            <polyline points="9 18 15 12 9 6" />
          </svg>
        </button>
      </div>

      {/* Week Day Headers */}
      <div className="grid grid-cols-7 gap-1 mb-2">
        {weekDays.map((day) => (
          <div
            key={day}
            className="text-gray-500 dark:text-gray-400 text-center text-sm font-medium"
          >
            {day}
          </div>
        ))}
      </div>

      {/* Calendar Grid */}
      <div className="grid grid-cols-7 gap-1">
        {calendarDays.map((date) => (
          <div
            key={date.toISOString()}
            className={`${getDayStyles(date)} min-h-[44px] flex items-center justify-center rounded-lg text-sm transition-colors`}
          >
            {format(date, "d")}
          </div>
        ))}
      </div>
    </div>
  );
}
```

**Step 2: Commit**

```bash
git add src/components/calculator/calendar-view.tsx
git commit -m "feat: add calendar view component with period highlighting"
```

---

## Task 7: Create Results Display Component

**Files:**
- Create: `src/components/calculator/results-display.tsx`

**Step 1: Write the results display component**

```tsx
// src/components/calculator/results-display.tsx
"use client";

import { useTranslations } from "next-intl";
import { format } from "date-fns";
import type { PredictionResult, CycleData, Locale } from "@/types";
import { PredictionCards } from "./prediction-cards";
import { CalendarView } from "./calendar-view";

interface ResultsDisplayProps {
  result: PredictionResult;
  cycleData: CycleData;
  locale: Locale;
  onReset: () => void;
}

export function ResultsDisplay({
  result,
  cycleData,
  locale,
  onReset,
}: ResultsDisplayProps) {
  const t = useTranslations("calculator.results");

  const addToGoogleCalendar = () => {
    const baseUrl = "https://calendar.google.com/calendar/render?action=TEMPLATE";

    const formatDateICS = (date: Date) => {
      return format(date, "yyyyMMdd'T'HHmmss'Z'");
    };

    const params = new URLSearchParams({
      text: t("calendarEventTitle"),
      dates: `${formatDateICS(result.nextPeriodStart)}/${formatDateICS(
        addDays(result.nextPeriodEnd, 1)
      )}`,
      details: t("calendarEventDescription"),
    });

    window.open(`${baseUrl}&${params.toString()}`, "_blank");
  };

  return (
    <div className="space-y-6 mt-8">
      {/* Prediction Cards */}
      <PredictionCards result={result} locale={locale} />

      {/* Calendar View */}
      <CalendarView prediction={result} locale={locale} />

      {/* Action Buttons */}
      <div className="flex flex-col gap-3 sm:flex-row">
        <button
          type="button"
          onClick={addToGoogleCalendar}
          className="bg-primary-400 hover:bg-primary-500 active:scale-95 dark:bg-primary-500 dark:hover:bg-primary-600 flex flex-1 items-center justify-center gap-2 rounded-2xl px-6 py-4 text-lg font-semibold text-white transition-all shadow-lg hover:shadow-xl min-h-[48px]"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="w-5 h-5"
          >
            <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
            <line x1="16" y1="2" x2="16" y2="6" />
            <line x1="8" y1="2" x2="8" y2="6" />
            <line x1="3" y1="10" x2="21" y2="10" />
          </svg>
          {t("addToCalendar")}
        </button>

        <button
          type="button"
          onClick={onReset}
          className="border-gray-300 text-gray-700 hover:bg-gray-50 dark:border-gray-600 dark:text-gray-300 dark:hover:bg-gray-700 active:scale-95 flex flex-1 items-center justify-center rounded-2xl border-2 px-6 py-4 text-lg font-semibold transition-all min-h-[48px]"
        >
          {t("recalculate")}
        </button>
      </div>

      {/* Privacy Note */}
      <p className="text-gray-500 dark:text-gray-400 text-center text-sm">
        {t("privacyNote")}
      </p>
    </div>
  );
}
```

**Step 2: Commit**

```bash
git add src/components/calculator/results-display.tsx
git commit -m "feat: add results display component with action buttons"
```

---

## Task 8: Create Main Calculator Container

**Files:**
- Create: `src/components/calculator/period-calculator.tsx`
- Create: `src/components/calculator/index.ts`

**Step 1: Write the main calculator container**

```tsx
// src/components/calculator/period-calculator.tsx
"use client";

import { useState, useEffect, useCallback } from "react";
import { useTranslations } from "next-intl";
import type { CycleData, PredictionResult, Locale } from "@/types";
import { calculateCycle } from "@/lib/calculator/cycle-calculator";
import { validateCycleData } from "@/lib/calculator/validation";
import { saveCycleData, loadCycleData, clearCycleData } from "@/lib/storage/localStorage";
import { CalculatorForm } from "./calculator-form";
import { ResultsDisplay } from "./results-display";

interface PeriodCalculatorProps {
  locale: Locale;
}

export function PeriodCalculator({ locale }: PeriodCalculatorProps) {
  const t = useTranslations("calculator");

  const [cycleData, setCycleData] = useState<CycleData | null>(null);
  const [result, setResult] = useState<PredictionResult | null>(null);

  // Load saved data on mount
  useEffect(() => {
    const saved = loadCycleData();
    if (saved) {
      setCycleData(saved);
      setResult(calculateCycle(saved));
    }
  }, []);

  const handleSubmit = useCallback((data: CycleData) => {
    // Validate
    const errors = validateCycleData(data);
    if (errors.length > 0) {
      console.error("Validation errors:", errors);
      return;
    }

    // Calculate
    const prediction = calculateCycle(data);

    // Update state
    setCycleData(data);
    setResult(prediction);

    // Save to localStorage
    saveCycleData(data);
  }, []);

  const handleReset = useCallback(() => {
    setCycleData(null);
    setResult(null);
    clearCycleData();
  }, []);

  return (
    <div className="dark:bg-dark-card w-full rounded-3xl bg-white p-6 shadow-soft md:p-8">
      {!result ? (
        <>
          <h2 className="text-primary-400 text-center text-2xl font-bold md:text-3xl">
            {t("title")}
          </h2>
          <p className="text-gray-600 dark:text-gray-300 mt-4 text-center">
            {t("subtitle")}
          </p>
          <div className="mt-8">
            <CalculatorForm
              initialData={cycleData ?? undefined}
              onSubmit={handleSubmit}
            />
          </div>
        </>
      ) : (
        <ResultsDisplay
          result={result}
          cycleData={cycleData!}
          locale={locale}
          onReset={handleReset}
        />
      )}
    </div>
  );
}
```

**Step 2: Create index barrel**

```typescript
// src/components/calculator/index.ts
export { PeriodCalculator } from "./period-calculator";
```

**Step 3: Commit**

```bash
git add src/components/calculator/period-calculator.tsx src/components/calculator/index.ts
git commit -m "feat: add main period calculator container component"
```

---

## Task 9: Integrate Calculator into Home Page

**Files:**
- Modify: `src/app/[locale]/page.tsx`

**Step 1: Replace page content with calculator**

```tsx
// src/app/[locale]/page.tsx
import { PeriodCalculator } from "@/components/calculator";

export default function HomePage() {
  return (
    <div className="flex flex-col items-center px-4 py-16">
      <h1 className="text-primary-400 text-center text-3xl font-bold md:text-4xl">
        Period Calculator
      </h1>
      <p className="mt-4 max-w-2xl text-center text-lg text-gray-600 dark:text-gray-300">
        Track your cycle and predict your next period
      </p>
      <div className="mt-12 w-full max-w-2xl">
        <PeriodCalculator locale="en" />
      </div>
    </div>
  );
}
```

**Step 2: Commit**

```bash
git add src/app/[locale]/page.tsx
git commit -m "feat: integrate period calculator into home page"
```

---

## Task 10: Add i18n Translations

**Files:**
- Modify: `messages/en.json`
- Modify: `messages/es.json`
- Modify: `messages/fr.json`

**Step 1: Add English translations to messages/en.json**

```json
{
  "calculator": {
    "title": "Period Calculator",
    "subtitle": "Track your cycle and predict your next period",
    "form": {
      "lastPeriodLabel": "First day of your last period",
      "cycleLengthLabel": "Average cycle length",
      "periodLengthLabel": "Period length",
      "days": "days",
      "calculateButton": "Calculate My Cycle"
    },
    "results": {
      "nextPeriod": "Next Period",
      "ovulationDay": "Ovulation Day",
      "fertileWindow": "Fertile Window",
      "pmsPeriod": "PMS Period",
      "addToCalendar": "Add to Calendar",
      "recalculate": "Recalculate",
      "privacyNote": "Your data is saved locally on your device and never sent to any server.",
      "calendarEventTitle": "Period Prediction",
      "calendarEventDescription": "Next period predicted by Period Calculator"
    },
    "calendar": {
      "previousMonth": "Previous month",
      "nextMonth": "Next month"
    },
    "validation": {
      "invalidDate": "Please select a valid date",
      "futureDate": "Date cannot be in the future",
      "cycleLengthRange": "Cycle length must be between 21 and 35 days",
      "periodLengthRange": "Period length must be between 2 and 7 days"
    }
  }
}
```

**Step 2: Commit**

```bash
git add messages/en.json
git commit -m "feat: add calculator i18n translations (en)"
```

**Step 3: Add Spanish translations to messages/es.json**

Add the same structure with Spanish translations.

**Step 4: Commit**

```bash
git add messages/es.json
git commit -m "feat: add calculator i18n translations (es)"
```

**Step 5: Add French translations to messages/fr.json**

Add the same structure with French translations.

**Step 6: Commit**

```bash
git add messages/fr.json
git commit -m "feat: add calculator i18n translations (fr)"
```

---

## Task 11: Code Formatting and Linting

**Files:** (Project-wide)

**Step 1: Run Prettier**

```bash
npx prettier --write "src/**/*.{ts,tsx,js,jsx}"
```

**Step 2: Run ESLint**

```bash
npm run lint
```

**Step 3: Fix any lint errors**

If ESLint reports errors, fix them and run again.

**Step 4: Commit**

```bash
git add .
git commit -m "style: format code and fix lint issues"
```

---

## Task 12: Build Verification

**Files:** (Project-wide)

**Step 1: Run production build**

```bash
npm run build
```

**Step 2: Verify build success**

Expected: Build completes without errors.

**Step 3: (Optional) Start dev server for manual testing**

```bash
npm run dev
```

Visit http://localhost:3000 and test:
1. Fill out the form and submit
2. Verify results display correctly
3. Test calendar month navigation
4. Test "Add to Calendar" button
5. Test "Recalculate" button
6. Test dark mode toggle
7. Test language switching

**Step 4: Final commit**

```bash
git add .
git commit -m "feat: complete period calculator P0 implementation"
```

---

## Verification Checklist

After completion, verify:

- [ ] Build succeeds (`npm run build`)
- [ ] No ESLint errors (`npm run lint`)
- [ ] Calculator form accepts valid input
- [ ] Results display correctly after calculation
- [ ] Calendar shows highlighted dates
- [ ] "Add to Calendar" opens Google Calendar
- [ ] "Recalculate" clears results and shows form
- [ ] Data persists across page refreshes
- [ ] Dark mode works correctly
- [ ] Language switching works

---

## Implementation Notes

### Key Dependencies
- `date-fns` - Date manipulation and formatting
- `next-intl` - Internationalization
- `localStorage` - Data persistence

### Design Decisions
- **No .ics file generation** - Using Google Calendar Web Intent for simplicity
- **Prediction window calendar** - Shows from today to after next period
- **Border + light background** - Visual style matches Morandi color scheme
- **Slider + input dual control** - Fast adjustment + precise input

### Future Enhancements
- Irregular cycle mode (historical data input)
- Cycle history tracking
- More calendar export options (.ics, Outlook)
- Cycle insights and analytics
