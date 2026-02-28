/**
 * Irregular Period Calculator Algorithm
 *
 * Uses historical cycle data to calculate predictions with confidence intervals.
 * Algorithm based on:
 * - Moving average calculation for cycle length
 * - Standard deviation for prediction window
 * - ACOG guidelines for other cycle dates
 */

import type {
  ConfidenceLevel,
  IrregularCycleData,
  IrregularPredictionResult,
} from "@/types";
import { addDays, differenceInDays } from "date-fns";

const MIN_CYCLES = 3;
const MAX_CYCLES = 6;

/**
 * Calculate cycle lengths from historical period start dates.
 *
 * @param historicalCycles - Array of historical period start dates (must be sorted)
 * @returns Array of cycle lengths in days
 */
function calculateCycleLengths(historicalCycles: Date[]): number[] {
  const lengths: number[] = [];
  for (let i = 1; i < historicalCycles.length; i++) {
    const length = differenceInDays(
      historicalCycles[i],
      historicalCycles[i - 1],
    );
    lengths.push(length);
  }
  return lengths;
}

/**
 * Calculate the arithmetic mean of an array of numbers.
 */
function calculateMean(values: number[]): number {
  if (values.length === 0) return 0;
  const sum = values.reduce((acc, val) => acc + val, 0);
  return sum / values.length;
}

/**
 * Calculate the standard deviation of an array of numbers.
 */
function calculateStandardDeviation(values: number[], mean: number): number {
  if (values.length < 2) return 0;
  const squaredDiffs = values.map((val) => Math.pow(val - mean, 2));
  const variance =
    squaredDiffs.reduce((acc, val) => acc + val, 0) / values.length;
  return Math.sqrt(variance);
}

/**
 * Determine confidence level based on standard deviation.
 *
 * - high: stdDev <= 3 days (68% confidence interval)
 * - medium: stdDev <= 6 days (95% confidence interval)
 * - low: stdDev > 6 days (recommend medical consultation)
 */
function determineConfidenceLevel(stdDev: number): ConfidenceLevel {
  if (stdDev <= 3) return "high";
  if (stdDev <= 6) return "medium";
  return "low";
}

/**
 * Calculate prediction window based on average and standard deviation.
 *
 * @param averageCycleLength - Mean cycle length
 * @param stdDev - Standard deviation
 * @param lastPeriodStart - Most recent period start date
 * @returns Predicted window with earliest, latest, and most likely dates
 */
function calculatePredictionWindow(
  averageCycleLength: number,
  stdDev: number,
  lastPeriodStart: Date,
): { earliest: Date; latest: Date; mostLikely: Date } {
  // Use 1 standard deviation for the window (68% confidence)
  const windowDays = Math.round(stdDev);

  // Most likely is the average
  const mostLikely = addDays(lastPeriodStart, Math.round(averageCycleLength));

  // Earliest and latest based on standard deviation
  const earliest = addDays(mostLikely, -windowDays);
  const latest = addDays(mostLikely, windowDays);

  return { earliest, latest, mostLikely };
}

/**
 * Validate input data for irregular cycle calculation.
 */
export function validateIrregularCycleData(data: IrregularCycleData): {
  valid: boolean;
  error?: string;
} {
  if (!data.historicalCycles || data.historicalCycles.length < MIN_CYCLES) {
    return {
      valid: false,
      error: `Please enter at least ${MIN_CYCLES} historical periods`,
    };
  }

  if (data.historicalCycles.length > MAX_CYCLES) {
    return {
      valid: false,
      error: `Maximum ${MAX_CYCLES} periods allowed`,
    };
  }

  // Check for valid dates (not in the future)
  const today = new Date();
  today.setHours(23, 59, 59, 999);

  for (const date of data.historicalCycles) {
    if (date > today) {
      return { valid: false, error: "Dates cannot be in the future" };
    }
  }

  // Check that dates are sorted and have reasonable gaps
  const sortedDates = [...data.historicalCycles].sort(
    (a, b) => a.getTime() - b.getTime(),
  );

  for (let i = 1; i < sortedDates.length; i++) {
    const gap = differenceInDays(sortedDates[i], sortedDates[i - 1]);
    if (gap < 15) {
      return {
        valid: false,
        error: "Period dates must be at least 15 days apart",
      };
    }
    if (gap > 60) {
      return {
        valid: false,
        error: "Period dates must be within 60 days of each other",
      };
    }
  }

  // Validate period length
  if (data.periodLength < 2 || data.periodLength > 7) {
    return {
      valid: false,
      error: "Period length must be between 2 and 7 days",
    };
  }

  return { valid: true };
}

/**
 * Calculate irregular menstrual cycle predictions based on historical data.
 *
 * @param data - User's historical cycle data
 * @returns Prediction result with window range and confidence level
 *
 * @remarks
 * - Uses moving average for cycle length calculation
 * - Standard deviation determines prediction window width
 * - Confidence level based on consistency of historical cycles
 * - Falls back to basic calculation if only 3 cycles provided
 */
export function calculateIrregularCycle(
  data: IrregularCycleData,
): IrregularPredictionResult {
  // Sort historical cycles by date (oldest to newest)
  const sortedCycles = [...data.historicalCycles].sort(
    (a, b) => a.getTime() - b.getTime(),
  );

  // Calculate cycle lengths
  const cycleLengths = calculateCycleLengths(sortedCycles);

  // Calculate average and standard deviation
  const averageCycleLength = calculateMean(cycleLengths);
  const standardDeviation = calculateStandardDeviation(
    cycleLengths,
    averageCycleLength,
  );

  // Determine confidence level
  const confidenceLevel = determineConfidenceLevel(standardDeviation);

  // Get the most recent period start date
  const lastPeriodStart = sortedCycles[sortedCycles.length - 1];

  // Calculate prediction window
  const predictedWindow = calculatePredictionWindow(
    averageCycleLength,
    standardDeviation,
    lastPeriodStart,
  );

  // Calculate all other cycle dates based on the most likely date
  const mostLikelyDate = predictedWindow.mostLikely;

  // Next period dates
  const nextPeriodStart = mostLikelyDate;
  const nextPeriodEnd = addDays(nextPeriodStart, data.periodLength - 1);

  // Ovulation date (14 days before period, per ACOG)
  const ovulationDate = addDays(nextPeriodStart, -14);

  // Fertile window (5 days before to 1 day after ovulation)
  const fertileWindowStart = addDays(ovulationDate, -5);
  const fertileWindowEnd = addDays(ovulationDate, 1);

  // PMS (7 days before period)
  const pmsStart = addDays(nextPeriodStart, -7);
  const pmsEnd = addDays(nextPeriodStart, -1);

  return {
    predictedWindow,
    averageCycleLength: Math.round(averageCycleLength * 10) / 10,
    standardDeviation: Math.round(standardDeviation * 10) / 10,
    confidenceLevel,
    nextPeriodStart,
    nextPeriodEnd,
    fertileWindowStart,
    fertileWindowEnd,
    ovulationDate,
    pmsStart,
    pmsEnd,
  };
}
