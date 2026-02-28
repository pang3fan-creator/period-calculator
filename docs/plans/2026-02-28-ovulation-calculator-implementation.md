# Ovulation Calculator Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Implement a complete `/ovulation-calculator` page with purpose toggle (trying to conceive / avoiding pregnancy), fertility-focused results display, and contraception warning tooltip.

**Architecture:** Extend existing calculator components with new ovulation-specific components. Reuse `calculateCycle()` algorithm. Add new form toggle and tooltip for purpose selection.

**Tech Stack:** Next.js 16, React, Tailwind CSS, next-intl, date-fns

---

## Task Overview

| Task | Component | Complexity |
|------|-----------|------------|
| 1 | Add translation keys (en) | Simple |
| 2 | Add translation keys (es, fr) | Simple |
| 3 | Create OvulationCalculatorForm | Medium |
| 4 | Create OvulationPredictionCards | Medium |
| 5 | Create OvulationResultsDisplay | Medium |
| 6 | Create OvulationPeriodCalculator | Medium |
| 7 | Update page.tsx | Simple |
| 8 | Add footer navigation link | Simple |
| 9 | Test and verify | Simple |

---

## Task 1: Add English Translation Keys

**Files:**
- Modify: `messages/en.json`

**Step 1: Add ovulationCalculator translation block**

Find the `"irregularCalculator"` block ending around line 128, add after it:

```json
"ovulationCalculator": {
  "title": "Ovulation Calculator",
  "subtitle": "Find your most fertile days",
  "purpose": "I'm using this for",
  "tryingToConceive": "Trying to conceive",
  "avoidingPregnancy": "Avoiding pregnancy",
  "contraceptionWarning": "Important disclaimer",
  "contraceptionWarningText": "This calculator is not a reliable method of contraception. Cycle tracking alone has a high failure rate. Please consult a healthcare provider for effective birth control options.",
  "ovulationDay": "Ovulation Day",
  "fertileWindow": "Fertile Window",
  "mostFertile": "Most Fertile",
  "calculateButton": "Calculate",
  "resetButton": "Reset"
}
```

**Step 2: Verify JSON is valid**

Run: `node -e "JSON.parse(require('fs').readFileSync('messages/en.json'))"`
Expected: No error (valid JSON)

---

## Task 2: Add Spanish and French Translation Keys

**Files:**
- Modify: `messages/es.json`
- Modify: `messages/fr.json`

**Step 1: Add Spanish translations**

Find the `"irregularCalculator"` block in `messages/es.json`, add after it:

```json
"ovulationCalculator": {
  "title": "Calculadora de Ovulación",
  "subtitle": "Encuentra tus días más fértiles",
  "purpose": "Estoy usando esto para",
  "tryingToConceive": "Intentando quedar embarazada",
  "avoidingPregnancy": "Evitar embarazo",
  "contraceptionWarning": "Aviso importante",
  "contraceptionWarningText": "Esta calculadora no es un método anticonceptivo fiable. El seguimiento del ciclo por sí solo tiene una alta tasa de fracaso. Por favor, consulte a un proveedor de atención médica para opciones anticonceptivas efectivas.",
  "ovulationDay": "Día de Ovulación",
  "fertileWindow": "Ventana Fértil",
  "mostFertile": "Más Fértil",
  "calculateButton": "Calcular",
  "resetButton": "Reiniciar"
}
```

**Step 2: Add French translations**

Find the `"irregularCalculator"` block in `messages/fr.json`, add after it:

```json
"ovulationCalculator": {
  "title": "Calculateur d'Ovulation",
  "subtitle": "Trouvez vos jours les plus fertiles",
  "purpose": "J'utilise ceci pour",
  "tryingToConceive": "Essayer de concevoir",
  "avoidingPregnancy": "Éviter la grossesse",
  "contraceptionWarning": "Avertissement important",
  "contraceptionWarningText": "Ce calculateur n'est pas une méthode de contraception fiable. Le suivi du cycle seul a un taux d'échec élevé. Veuillez consulter un professionnel de santé pour des options contraceptives efficaces.",
  "ovulationDay": "Jour d'Ovulation",
  "fertileWindow": "Fenêtre Fertile",
  "mostFertile": "Plus Fertile",
  "calculateButton": "Calculer",
  "resetButton": "Réinitialiser"
}
```

---

## Task 3: Create OvulationCalculatorForm Component

**Files:**
- Create: `src/components/calculator/ovulation-calculator-form.tsx`

**Step 1: Write the component**

```tsx
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
            className={`flex-1 rounded-2xl border-2 px-4 py-3 text-base font-semibold transition-all ${
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
            className={`flex-1 rounded-2xl border-2 px-4 py-3 text-base font-semibold transition-all ${
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
          className="bg-primary-400 hover:bg-primary-500 shadow-warm focus:ring-primary-300 dark:focus:ring-primary-700 disabled:bg-primary-300 dark:disabled:bg-primary-800 min-h-[48px] flex-1 rounded-2xl px-6 py-3 text-lg font-semibold text-white transition-all focus:ring-4 focus:outline-none disabled:cursor-not-allowed disabled:opacity-50"
        >
          {t("calculateButton")}
        </button>
        <button
          type="button"
          onClick={handleReset}
          className="border-primary-200 hover:border-primary-300 hover:bg-primary-50 dark:hover:bg-dark-card focus:ring-primary-100 dark:focus:ring-primary-900/30 min-h-[48px] rounded-2xl border-2 px-6 py-3 text-lg font-semibold text-gray-700 transition-all dark:text-gray-300"
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
```

**Step 2: Verify TypeScript compiles**

Run: `npx tsc --noEmit src/components/calculator/ovulation-calculator-form.tsx`
Expected: No errors

---

## Task 4: Create OvulationPredictionCards Component

**Files:**
- Create: `src/components/calculator/ovulation-prediction-cards.tsx`

**Step 1: Write the component**

```tsx
"use client";

import { useTranslations } from "next-intl";
import { format } from "date-fns";
import { enUS, es, fr } from "date-fns/locale";
import type { PredictionResult } from "@/types";
import type { Locale } from "@/i18n/config";

const DATE_FNS_LOCALE_MAP: Record<string, typeof enUS> = { en: enUS, es: es, fr: fr };

const SparklesIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-6 w-6" aria-hidden="true">
    <path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z" />
  </svg>
);

const HeartIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-6 w-6" aria-hidden="true">
    <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />
  </svg>
);

const CalendarIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-6 w-6" aria-hidden="true">
    <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
    <line x1="16" y1="2" x2="16" y2="6" />
    <line x1="8" y1="2" x2="8" y2="6" />
    <line x1="3" y1="10" x2="21" y2="10" />
  </svg>
);

const SunIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-6 w-6" aria-hidden="true">
    <circle cx="12" cy="12" r="4" />
    <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M6.34 17.66l-1.41 1.41M19.07 4.93l-1.41 1.41" />
  </svg>
);

interface OvulationPredictionCardsProps {
  result: PredictionResult;
  locale: Locale;
}

function formatDateRange(start: Date, end: Date, locale: string) {
  const dateFnsLocale = DATE_FNS_LOCALE_MAP[locale] || enUS;
  if (start.getTime() === end.getTime()) {
    return format(start, "MMM dd, yyyy", { locale: dateFnsLocale });
  }
  return `${format(start, "MMM dd", { locale: dateFnsLocale })} - ${format(end, "MMM dd, yyyy", { locale: dateFnsLocale })}`;
}

export function OvulationPredictionCards({ result, locale }: OvulationPredictionCardsProps) {
  const t = useTranslations("ovulationCalculator");
  const { ovulationDate, fertileWindowStart, fertileWindowEnd, nextPeriodStart, pmsStart, pmsEnd } = result;

  return (
    <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
      {/* Ovulation Day - Featured */}
      <div className="col-span-full flex items-center gap-3 rounded-2xl border-2 border-blue-400 bg-blue-50 p-4 sm:gap-4 sm:p-5 dark:border-blue-600 dark:bg-blue-950/30">
        <div className="flex-shrink-0 text-blue-600 dark:text-blue-400">
          <SparklesIcon />
        </div>
        <div className="min-w-0 flex-1">
          <p className="mb-0.5 text-sm font-medium text-blue-600 dark:text-blue-400">{t("ovulationDay")}</p>
          <p className="text-xl font-bold text-blue-900 dark:text-blue-100">{format(ovulationDate, "MMMM dd, yyyy", { locale: DATE_FNS_LOCALE_MAP[locale] || enUS })}</p>
          <p className="text-sm font-medium text-blue-600 dark:text-blue-400">{t("mostFertile")}</p>
        </div>
      </div>

      {/* Fertile Window */}
      <div className="flex items-center gap-3 rounded-2xl border-2 border-blue-300 bg-blue-50 p-3 sm:gap-4 sm:p-5 dark:border-blue-700/50 dark:bg-blue-950/30">
        <div className="flex-shrink-0 text-blue-600 dark:text-blue-400">
          <HeartIcon />
        </div>
        <div className="min-w-0 flex-1">
          <p className="mb-0.5 text-sm font-medium text-gray-600 dark:text-gray-400">{t("fertileWindow")}</p>
          <p className="text-sm font-semibold text-gray-900 sm:text-base dark:text-gray-100">{formatDateRange(fertileWindowStart, fertileWindowEnd, locale)}</p>
        </div>
      </div>

      {/* Next Period */}
      <div className="flex items-center gap-3 rounded-2xl border-2 border-red-300 bg-red-50 p-3 sm:gap-4 sm:p-5 dark:border-red-700/50 dark:bg-red-950/30">
        <div className="flex-shrink-0 text-red-600 dark:text-red-400">
          <CalendarIcon />
        </div>
        <div className="min-w-0 flex-1">
          <p className="mb-0.5 text-sm font-medium text-gray-600 dark:text-gray-400">{t("nextPeriod")}</p>
          <p className="text-sm font-semibold text-gray-900 sm:text-base dark:text-gray-100">{format(nextPeriodStart, "MMM dd, yyyy", { locale: DATE_FNS_LOCALE_MAP[locale] || enUS })}</p>
        </div>
      </div>

      {/* PMS Period */}
      <div className="flex items-center gap-3 rounded-2xl border-2 border-yellow-300 bg-yellow-50 p-3 sm:gap-4 sm:p-5 dark:border-yellow-700/50 dark:bg-yellow-950/30">
        <div className="flex-shrink-0 text-yellow-600 dark:text-yellow-400">
          <SunIcon />
        </div>
        <div className="min-w-0 flex-1">
          <p className="mb-0.5 text-sm font-medium text-gray-600 dark:text-gray-400">{t("pmsPeriod")}</p>
          <p className="text-sm font-semibold text-gray-900 sm:text-base dark:text-gray-100">{formatDateRange(pmsStart, pmsEnd, locale)}</p>
        </div>
      </div>
    </div>
  );
}
```

---

## Task 5: Create OvulationResultsDisplay Component

**Files:**
- Create: `src/components/calculator/ovulation-results-display.tsx`

**Step 1: Write the component**

This component reuses existing ResultsDisplay logic but adds:
- Contraception warning tooltip (when purpose="avoid")
- Ovulation-focused calendar view

```tsx
"use client";

import { useState, useRef, useEffect } from "react";
import { useTranslations } from "next-intl";
import { addDays, format } from "date-fns";
import type { PredictionResult, CycleData } from "@/types";
import type { Locale } from "@/i18n/config";
import { OvulationPredictionCards } from "./ovulation-prediction-cards";
import { CalendarView } from "./calendar-view";
import { generateICS, downloadICS, type CalendarEvent } from "@/lib/calendar/ics-generator";

type OvulationPurpose = "conceive" | "avoid";

interface OvulationResultsDisplayProps {
  result: PredictionResult;
  cycleData: CycleData;
  locale: Locale;
  purpose: OvulationPurpose;
  onReset: () => void;
}

const CalendarPlusIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5" aria-hidden="true">
    <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
    <line x1="16" y1="2" x2="16" y2="6" />
    <line x1="8" y1="2" x2="8" y2="6" />
    <line x1="3" y1="10" x2="21" y2="10" />
  </svg>
);

const RefreshIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5" aria-hidden="true">
    <path d="M21 12a9 9 0 0 0-9-9 9.75 9.75 0 0 0-6.74 2.74L3 8" />
    <path d="M3 3v5h5" />
    <path d="M3 12a9 9 0 0 0 9 9 9.75 9.75 0 0 0 6.74-2.74L21 16" />
    <path d="M16 21h5v-5" />
  </svg>
);

const ChevronDownIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4" aria-hidden="true">
    <path d="m6 9 6 6 6-6" />
  </svg>
);

const GoogleIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" className="h-5 w-5" aria-hidden="true">
    <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
    <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
    <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
    <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
  </svg>
);

const AppleIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5" aria-hidden="true">
    <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z" />
  </svg>
);

const OutlookIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" className="h-5 w-5" aria-hidden="true">
    <rect width="24" height="24" fill="#0078D4" rx="2" />
    <path d="M12 6.5a4.5 4.5 0 0 0-4.5 4.5v5.5h9v-5.5A4.5 4.5 0 0 0 12 6.5" fill="#fff" />
    <path d="M7.5 11v5.5h4V11H7.5" fill="#fff" opacity="0.7" />
  </svg>
);

const DownloadIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5" aria-hidden="true">
    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
    <polyline points="7 10 12 15 17 10" />
    <line x1="12" y2="15" x2="12" y2="3" />
  </svg>
);

const InfoIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5" aria-hidden="true">
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

export function OvulationResultsDisplay({ result, cycleData, locale, purpose, onReset }: OvulationResultsDisplayProps) {
  const t = useTranslations("ovulationCalculator");
  const tResults = useTranslations("calculator.results");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isWarningOpen, setIsWarningOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
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
    const details = encodeURIComponent(`Ovulation: ${format(ovulationDate, "MMM dd, yyyy")}\nFertile Window: ${format(fertileWindowStart, "MMM dd")} - ${format(fertileWindowEnd, "MMM dd, yyyy")}\n\nCalculated with Period Calculator`);
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
    const details = encodeURIComponent(`Ovulation: ${format(ovulationDate, "MMM dd, yyyy")}\nFertile Window: ${format(fertileWindowStart, "MMM dd")} - ${format(fertileWindowEnd, "MMM dd, yyyy")}`);
    const url = `https://outlook.live.com/calendar/0/deeplink/compose?subject=${title}&startdt=${fertileWindowStart.toISOString()}&enddt=${addDays(fertileWindowEnd, 1).toISOString()}&body=${details}`;
    window.open(url, "_blank");
    setIsDropdownOpen(false);
  };

  const handleDownloadICS = () => {
    const { ovulationDate, fertileWindowStart, fertileWindowEnd } = result;
    const events: CalendarEvent[] = [
      { title: t("fertileWindow"), description: "Fertile window calculated with Period Calculator", startDate: fertileWindowStart, endDate: fertileWindowEnd },
      { title: t("ovulationDay"), description: "Ovulation day calculated with Period Calculator", startDate: ovulationDate, endDate: ovulationDate },
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
              <button type="button" onClick={handleAddToGoogleCalendar} className="flex w-full items-center gap-3 px-4 py-3 text-left text-gray-700 transition-colors hover:bg-gray-100 dark:text-gray-200 dark:hover:bg-gray-800">
                <GoogleIcon /><span>{tResults("googleCalendar")}</span>
              </button>
              <button type="button" onClick={handleAddToAppleCalendar} className="flex w-full items-center gap-3 px-4 py-3 text-left text-gray-700 transition-colors hover:bg-gray-100 dark:text-gray-200 dark:hover:bg-gray-800">
                <AppleIcon /><span>{tResults("appleCalendar")}</span>
              </button>
              <button type="button" onClick={handleAddToOutlook} className="flex w-full items-center gap-3 px-4 py-3 text-left text-gray-700 transition-colors hover:bg-gray-100 dark:text-gray-200 dark:hover:bg-gray-800">
                <OutlookIcon /><span>{tResults("outlook")}</span>
              </button>
              <div className="border-t border-gray-200 dark:border-gray-600">
                <button type="button" onClick={handleDownloadICS} className="flex w-full items-center gap-3 px-4 py-3 text-left text-gray-700 transition-colors hover:bg-gray-100 dark:text-gray-200 dark:hover:bg-gray-800">
                  <DownloadIcon /><span>{tResults("downloadIcs")}</span>
                </button>
              </div>
            </div>
          )}
        </div>
        <button
          type="button"
          onClick={onReset}
          className="flex min-h-[48px] items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-pink-500 to-rose-500 px-6 py-3 text-base font-semibold text-white transition-all hover:from-pink-600 hover:to-rose-600 focus:ring-2 focus:ring-pink-300 focus:outline-none"
        >
          <RefreshIcon />
          {tResults("recalculate")}
        </button>
      </div>

      <p className="text-center text-sm text-gray-600 dark:text-gray-400">{tResults("privacyNote")}</p>
    </div>
  );
}
```

---

## Task 6: Create OvulationPeriodCalculator Container

**Files:**
- Create: `src/components/calculator/ovulation-period-calculator.tsx`

**Step 1: Write the component**

```tsx
"use client";

import { useState, useCallback, useEffect, useRef } from "react";
import type { CycleData, PredictionResult } from "@/types";
import { useLocale } from "next-intl";
import type { Locale } from "@/i18n/config";
import { validateCycleData } from "@/lib/calculator/validation";
import { calculateCycle } from "@/lib/calculator/cycle-calculator";
import { OvulationCalculatorForm } from "./ovulation-calculator-form";
import { OvulationResultsDisplay } from "./ovulation-results-display";
import { Card } from "@/components/ui/card";

type OvulationPurpose = "conceive" | "avoid";

const STORAGE_KEY = "ovulation-calculator-data";

interface StoredData {
  cycleData: CycleData;
  purpose: OvulationPurpose;
  timestamp: number;
}

export function OvulationPeriodCalculator() {
  const locale = useLocale() as Locale;
  const [cycleData, setCycleData] = useState<CycleData | null>(null);
  const [result, setResult] = useState<PredictionResult | null>(null);
  const [purpose, setPurpose] = useState<OvulationPurpose>("conceive");
  const [isMounted, setIsMounted] = useState(false);
  const dataLoadedRef = useRef(false);

  useEffect(() => {
    if (dataLoadedRef.current) return;
    dataLoadedRef.current = true;

    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        const data: StoredData = JSON.parse(stored);
        const parsedCycleData: CycleData = {
          ...data.cycleData,
          lastPeriodStart: new Date(data.cycleData.lastPeriodStart),
        };
        const errors = validateCycleData(parsedCycleData);
        if (errors.length === 0) {
          setCycleData(parsedCycleData);
          setPurpose(data.purpose);
          setResult(calculateCycle(parsedCycleData));
        }
      }
    } catch (e) {
      console.error("Failed to load ovulation calculator data:", e);
    }
    setIsMounted(true);
  }, []);

  const handleSubmit = useCallback((data: CycleData, newPurpose: OvulationPurpose) => {
    const errors = validateCycleData(data);
    if (errors.length > 0) {
      console.error("Validation errors:", errors);
      return;
    }

    const calculatedResult = calculateCycle(data);

    try {
      const storageData: StoredData = {
        cycleData: data,
        purpose: newPurpose,
        timestamp: Date.now(),
      };
      localStorage.setItem(STORAGE_KEY, JSON.stringify(storageData));
    } catch (e) {
      console.error("Failed to save ovulation calculator data:", e);
    }

    setCycleData(data);
    setPurpose(newPurpose);
    setResult(calculatedResult);
  }, []);

  const handleReset = useCallback(() => {
    try {
      localStorage.removeItem(STORAGE_KEY);
    } catch (e) {
      console.error("Failed to clear ovulation calculator data:", e);
    }
    setCycleData(null);
    setResult(null);
    setPurpose("conceive");
  }, []);

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
        <OvulationResultsDisplay
          result={result}
          cycleData={cycleData!}
          locale={locale}
          purpose={purpose}
          onReset={handleReset}
        />
      ) : (
        <OvulationCalculatorForm
          onSubmit={handleSubmit}
          initialPurpose={purpose}
        />
      )}
    </Card>
  );
}
```

---

## Task 7: Update ovulation-calculator Page

**Files:**
- Modify: `src/app/[locale]/ovulation-calculator/page.tsx`

**Step 1: Replace the page content**

Replace the existing "Coming soon" content with:

```tsx
import { Metadata } from "next";
import { JsonLd } from "@/components/seo/json-ld";
import { OvulationPeriodCalculator } from "@/components/calculator/ovulation-period-calculator";
import { Footer } from "@/components/layout/footer";
import { Header } from "@/components/layout/header";

const baseUrl = "https://periodcalculator.site";
const locales = ["en", "es", "fr"];
const localeNames: Record<string, string> = {
  en: "en-US",
  es: "es-ES",
  fr: "fr-FR",
};

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;

  return {
    title: "Ovulation Calculator - Find Your Fertile Window",
    description:
      "Calculate your ovulation date and fertile window. Plan pregnancy or understand your cycle better. 100% private.",
    alternates: {
      canonical: `${baseUrl}/${locale === "en" ? "" : locale}/ovulation-calculator`,
      languages: locales.reduce(
        (acc, loc) => {
          acc[localeNames[loc]] =
            `${baseUrl}/${loc === "en" ? "" : loc}/ovulation-calculator`;
          return acc;
        },
        {} as Record<string, string>,
      ),
    },
  };
}

export default function OvulationCalculatorPage() {
  const webApplicationSchema = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: "Ovulation Calculator",
    description:
      "Calculate your ovulation date and fertile window. Plan pregnancy or understand your cycle better. 100% private - all data stays in your browser.",
    url: `${baseUrl}/ovulation-calculator`,
    applicationCategory: "HealthApplication",
    operatingSystem: "Web Browser",
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "USD",
    },
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: baseUrl,
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Ovulation Calculator",
        item: `${baseUrl}/ovulation-calculator`,
      },
    ],
  };

  return (
    <>
      <JsonLd data={webApplicationSchema} />
      <JsonLd data={breadcrumbSchema} />
      <main className="flex min-h-screen flex-col items-center px-4 py-16">
        <OvulationPeriodCalculator />
      </main>
    </>
  );
}
```

---

## Task 8: Add Footer Navigation Link

**Files:**
- Modify: `src/components/layout/footer.tsx`

**Step 1: Add ovulation calculator link**

In the footer links section (after irregular calculator link), add:

```tsx
<li>
  <Link
    href="/ovulation-calculator"
    className="focus-visible:ring-primary-400 hover:text-primary-400 block rounded-lg text-sm text-gray-500 transition-colors outline-none focus-visible:ring-2 focus-visible:ring-offset-2 dark:text-gray-400"
  >
    {tNav("ovulationCalculator")}
  </Link>
</li>
```

**Step 2: Add translation key**

In `messages/en.json`, add to nav section:
```json
"ovulationCalculator": "Ovulation Calculator"
```

---

## Task 9: Test and Verify

**Step 1: Run lint**

Run: `npm run lint`
Expected: No errors

**Step 2: Run tests**

Run: `npm run test`
Expected: All tests pass

**Step 3: Build project**

Run: `npm run build`
Expected: Build succeeds

**Step 4: Verify page loads**

Run: `npm run dev` and visit `/ovulation-calculator`
Expected: Page shows form with purpose toggle

---

## Execution Options

Plan complete and saved to `docs/plans/2026-02-28-ovulation-calculator-design.md`.

**Two execution options:**

**1. Subagent-Driven (this session)** - I dispatch fresh subagent per task, review between tasks, fast iteration

**2. Parallel Session (separate)** - Open new session with executing-plans, batch execution with checkpoints

**Which approach?**
