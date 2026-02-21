"use client";

import { useState, useEffect, useCallback } from "react";
import type { CycleData, PredictionResult } from "@/types";
import type { Locale } from "@/i18n/config";
import { validateCycleData } from "@/lib/calculator/validation";
import { calculateCycle } from "@/lib/calculator/cycle-calculator";
import { saveCycleData, loadCycleData, clearCycleData } from "@/lib/storage/localStorage";
import { CalculatorForm } from "./calculator-form";
import { ResultsDisplay } from "./results-display";
import { Card } from "@/components/ui/card";

interface PeriodCalculatorProps {
  locale: Locale;
}

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
export function PeriodCalculator({ locale }: PeriodCalculatorProps) {
  // State for cycle data (user input)
  const [cycleData, setCycleData] = useState<CycleData | null>(null);

  // State for calculation result
  const [result, setResult] = useState<PredictionResult | null>(null);

  // State for tracking if component has mounted (client-side only)
  const [isMounted, setIsMounted] = useState(false);

  // Load saved data from localStorage on mount
  useEffect(() => {
    setIsMounted(true);

    const savedData = loadCycleData();
    if (savedData) {
      // Validate saved data before using it
      const errors = validateCycleData(savedData);
      if (errors.length === 0) {
        setCycleData(savedData);

        // Calculate result immediately if valid saved data exists
        const calculatedResult = calculateCycle(savedData);
        setResult(calculatedResult);
      } else {
        // Clear invalid saved data
        clearCycleData();
      }
    }
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
          <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary-200 border-t-primary-400" />
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
        <CalculatorForm onSubmit={handleSubmit} initialData={cycleData || undefined} />
      )}
    </Card>
  );
}
