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

    setPurpose(newPurpose);
    setResult(calculatedResult);
  }, []);

  const handleReset = useCallback(() => {
    try {
      localStorage.removeItem(STORAGE_KEY);
    } catch (e) {
      console.error("Failed to clear ovulation calculator data:", e);
    }
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
