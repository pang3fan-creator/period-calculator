/**
 * Period Calculator Validation Module
 *
 * Validates user input for menstrual cycle calculation to ensure data integrity.
 *
 * Validation Rules:
 * - lastPeriodStart: Must be a valid Date instance, cannot be null/undefined, cannot be in the future
 * - cycleLength: Must be a number between 21-35 days (normal range per ACOG)
 * - periodLength: Must be a number between 2-7 days (normal range per medical guidelines)
 */

import type { CycleData } from "@/types";
import { differenceInDays } from "date-fns";

/**
 * Represents a validation error for a specific field in the cycle data.
 */
export interface ValidationError {
  /** The field that failed validation */
  field: keyof CycleData;
  /** Localized error message describing the validation failure */
  message: string;
}

/**
 * Validates cycle data input according to medical guidelines and data integrity rules.
 *
 * @param data - The cycle data to validate
 * @returns Array of validation errors (empty if all validations pass)
 *
 * @remarks
 * - Returns ALL errors (not just the first one) for better UX
 * - Date comparisons use 00:00:00 time for accurate day comparison
 * - Uses i18n keys for error messages to support localization
 *
 * Validation ranges based on medical guidelines:
 * - Cycle length (21-35 days): ACOG defines normal menstrual cycle as 21-35 days
 * - Period length (2-7 days): Normal menstrual bleeding duration
 *
 * Reference: ACOG Practice Bulletin No. 206
 */
export function validateCycleData(data: CycleData): ValidationError[] {
  const errors: ValidationError[] = [];
  const now = new Date();

  // Set current time to 00:00:00 for accurate day comparison
  now.setHours(0, 0, 0, 0);

  // Validate lastPeriodStart
  if (!data.lastPeriodStart) {
    errors.push({
      field: "lastPeriodStart",
      message: "validation.invalidDate",
    });
  } else if (
    !(data.lastPeriodStart instanceof Date) ||
    isNaN(data.lastPeriodStart.getTime())
  ) {
    errors.push({
      field: "lastPeriodStart",
      message: "validation.invalidDate",
    });
  } else {
    // Create a copy and set time to 00:00:00 for comparison
    const inputDate = new Date(data.lastPeriodStart);
    inputDate.setHours(0, 0, 0, 0);

    // Check if date is in the future
    if (differenceInDays(inputDate, now) > 0) {
      errors.push({
        field: "lastPeriodStart",
        message: "validation.futureDate",
      });
    }
  }

  // Validate cycleLength
  if (typeof data.cycleLength !== "number" || isNaN(data.cycleLength)) {
    errors.push({
      field: "cycleLength",
      message: "validation.cycleLengthRange",
    });
  } else if (data.cycleLength < 21 || data.cycleLength > 35) {
    errors.push({
      field: "cycleLength",
      message: "validation.cycleLengthRange",
    });
  }

  // Validate periodLength
  if (typeof data.periodLength !== "number" || isNaN(data.periodLength)) {
    errors.push({
      field: "periodLength",
      message: "validation.periodLengthRange",
    });
  } else if (data.periodLength < 2 || data.periodLength > 7) {
    errors.push({
      field: "periodLength",
      message: "validation.periodLengthRange",
    });
  }

  return errors;
}

/**
 * Type guard to check if cycle data is valid.
 *
 * @param data - The cycle data to validate
 * @returns true if the data is valid, false otherwise
 */
export function isValidCycleData(data: CycleData): boolean {
  return validateCycleData(data).length === 0;
}
