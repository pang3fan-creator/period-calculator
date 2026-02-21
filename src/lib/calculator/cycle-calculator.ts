/**
 * Period Calculator Core Algorithm
 *
 * Based on ACOG (American College of Obstetricians and Gynecologists) guidelines:
 * - The luteal phase is relatively constant at approximately 14 days
 * - Ovulation typically occurs 14 days before the next menstrual period
 * - The fertile window extends from 5 days before ovulation to 1 day after
 * - PMS (Premenstrual Syndrome) symptoms typically begin 7 days before menstruation
 *
 * Reference:
 * - ACOG Practice Bulletin No. 206: Predicting the Date of Delivery
 * - https://www.acog.org/clinical/clinical-guidance/practice-bulletins/articles/2019/02/predicting-the-date-of-delivery
 */

import type { CycleData, PredictionResult } from "@/types";
import { addDays, differenceInDays, isSameDay } from "date-fns";

export type PeriodType = "period" | "ovulation" | "fertile" | "pms";

/**
 * Calculate menstrual cycle predictions based on user input.
 *
 * @param data - User's cycle data including last period start, cycle length, and period length
 * @returns Prediction result with key dates for the next cycle
 *
 * @remarks
 * - nextPeriodStart: Calculated by adding cycleLength days to lastPeriodStart
 * - nextPeriodEnd: Calculated by adding (periodLength - 1) days to nextPeriodStart (inclusive range)
 * - ovulationDate: Calculated as 14 days before nextPeriodStart (ACOG standard)
 * - fertileWindowStart: 5 days before ovulation (sperm survival period)
 * - fertileWindowEnd: 1 day after ovulation (egg viability window)
 * - pmsStart: 7 days before nextPeriodStart (typical PMS onset)
 */
export function calculateCycle(data: CycleData): PredictionResult {
  const { lastPeriodStart, cycleLength, periodLength } = data;

  // Calculate next period dates
  const nextPeriodStart = addDays(lastPeriodStart, cycleLength);
  const nextPeriodEnd = addDays(nextPeriodStart, periodLength - 1);

  // Calculate ovulation date (14 days before next period, per ACOG)
  const ovulationDate = addDays(nextPeriodStart, -14);

  // Calculate fertile window (5 days before to 1 day after ovulation)
  const fertileWindowStart = addDays(ovulationDate, -5);
  const fertileWindowEnd = addDays(ovulationDate, 1);

  // Calculate PMS start (7 days before next period)
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
 * Determine the period type for a given date based on cycle prediction.
 *
 * Priority order (as per medical importance):
 * 1. Period (menstruation) - highest priority
 * 2. Ovulation day
 * 3. Fertile window
 * 4. PMS (premenstrual syndrome)
 *
 * @param date - The date to check
 * @param prediction - Prediction result from calculateCycle()
 * @returns The period type or null if the date doesn't fall within any category
 *
 * @remarks
 * - Period: Inclusive range from nextPeriodStart to nextPeriodEnd
 * - Ovulation: Exact match with ovulationDate
 * - Fertile: Inclusive range from fertileWindowStart to fertileWindowEnd
 * - PMS: Inclusive range from pmsStart to (nextPeriodStart - 1), excludes the actual period
 */
export function getDatePeriodType(
  date: Date,
  prediction: PredictionResult
): PeriodType | null {
  const {
    nextPeriodStart,
    nextPeriodEnd,
    ovulationDate,
    fertileWindowStart,
    fertileWindowEnd,
    pmsStart,
  } = prediction;

  // Check period first (highest priority)
  const daysFromStart = differenceInDays(date, nextPeriodStart);
  const daysFromEnd = differenceInDays(nextPeriodEnd, date);
  if (daysFromStart >= 0 && daysFromEnd >= 0) {
    return "period";
  }

  // Check ovulation (exact match)
  if (isSameDay(date, ovulationDate)) {
    return "ovulation";
  }

  // Check fertile window (inclusive range)
  const daysFromFertileStart = differenceInDays(date, fertileWindowStart);
  const daysFromFertileEnd = differenceInDays(fertileEnd, date);
  if (daysFromFertileStart >= 0 && daysFromFertileEnd >= 0) {
    return "fertile";
  }

  // Check PMS (7 days before period, but not including the period itself)
  const daysFromPmsStart = differenceInDays(date, pmsStart);
  const daysBeforePeriod = differenceInDays(nextPeriodStart, date);
  if (daysFromPmsStart >= 0 && daysBeforePeriod > 0) {
    return "pms";
  }

  return null;
}
