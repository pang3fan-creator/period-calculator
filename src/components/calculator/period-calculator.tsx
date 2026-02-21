"use client";

import { useState, useCallback, useEffect, useRef } from "react";
import type { CycleData, PredictionResult } from "@/types";
import { useLocale } from "next-intl";
import type { Locale } from "@/i18n/config";
import { validateCycleData } from "@/lib/calculator/validation";
import { calculateCycle } from "@/lib/calculator/cycle-calculator";
import {
  saveCycleData,
  loadCycleData,
  clearCycleData,
} from "@/lib/storage/localStorage";
import { CalculatorForm } from "./calculator-form";
import { ResultsDisplay } from "./results-display";
import { Card } from "@/components/ui/card";

/**
 * Main Period Calculator Container Component
 *
 * This is the main container component that coordinates all other components
 * and manages state for the period calculator.
 *
 * It handles:
 * - Loading saved data from localStorage on mount
 * - Form submission with validation
 * - Calculating predictions using the cycle algorithm
 * - Saving/clearing data to/from localStorage
 * - Displaying either the form or results based on state
 *
 * @param locale - Current locale for i18n
 */
export function PeriodCalculator() {
  // Get locale from next-intl
  const locale = useLocale() as Locale;

  // State for cycle data (user input)
  const [cycleData, setCycleData] = useState<CycleData | null>(null);

  // State for calculation result
  const [result, setResult] = useState<PredictionResult | null>(null);

  // State for tracking if component has mounted (client-side only)
  const [isMounted, setIsMounted] = useState(false);

  // Track if data has been loaded to prevent double-loading
  const dataLoadedRef = useRef(false);

  // Use useEffect to load data only on client-side
  useEffect(() => {
    // Prevent double-loading
    if (dataLoadedRef.current) {
      return;
    }
    dataLoadedRef.current = true;

    // Load saved data on mount
    const savedData = loadCycleData();
    if (savedData) {
      const errors = validateCycleData(savedData);
      if (errors.length === 0) {
        setCycleData(savedData);
        setResult(calculateCycle(savedData));
      } else {
        clearCycleData();
      }
    }
    setIsMounted(true);
  }, []);

  /**
   * Handle form submission
   * - Validates input data
   * - Calculates predictions using the cycle algorithm
   * - Saves to localStorage
   * - Updates state
   */
  const handleSubmit = useCallback((data: CycleData) => {
    // Validate the input data
    const errors = validateCycleData(data);

    // If there are validation errors, don't proceed
    if (errors.length > 0) {
      console.error("Validation errors:", errors);
      return;
    }

    // Calculate predictions
    const calculatedResult = calculateCycle(data);

    // Save to localStorage
    saveCycleData(data);

    // Update state
    setCycleData(data);
    setResult(calculatedResult);
  }, []);

  /**
   * Handle reset
   * - Clears all state
   * - Clears localStorage
   */
  const handleReset = useCallback(() => {
    // Clear localStorage
    clearCycleData();

    // Clear state
    setCycleData(null);
    setResult(null);
  }, []);

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
        <ResultsDisplay
          result={result}
          cycleData={cycleData!}
          locale={locale}
          onReset={handleReset}
        />
      ) : (
        <CalculatorForm
          onSubmit={handleSubmit}
          initialData={cycleData || undefined}
        />
      )}
    </Card>
  );
}
