/**
 * LocalStorage Manager for Cycle Data
 *
 * Provides persistent storage for user's menstrual cycle data.
 * All data remains on the user's device for privacy - nothing is sent to servers.
 *
 * @module localStorage
 */

import type { CycleData } from "@/types";

const STORAGE_KEY = "period_calculator_data";

/**
 * Storage format with timestamp for tracking when data was saved.
 */
interface StorageData {
  lastPeriodStart: string; // ISO 8601 date string
  cycleLength: number;
  periodLength: number;
  savedAt: string; // ISO 8601 timestamp
}

/**
 * Save cycle data to localStorage.
 *
 * Converts Date objects to ISO 8601 strings for serialization.
 * Adds a timestamp to track when the data was saved.
 *
 * @param data - The cycle data to persist
 * @returns void
 *
 * @throws Errors are caught and logged to console, but not re-thrown
 *
 * @example
 * ```ts
 * saveCycleData({
 *   lastPeriodStart: new Date("2024-01-01"),
 *   cycleLength: 28,
 *   periodLength: 5
 * });
 * ```
 */
export function saveCycleData(data: CycleData): void {
  if (typeof window === "undefined") {
    return; // Skip during SSR
  }

  try {
    const storageData: StorageData = {
      lastPeriodStart: data.lastPeriodStart.toISOString(),
      cycleLength: data.cycleLength,
      periodLength: data.periodLength,
      savedAt: new Date().toISOString(),
    };

    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(storageData));
  } catch (error) {
    // Gracefully handle errors (e.g., storage quota exceeded, private mode)
    console.error("Failed to save cycle data to localStorage:", error);
  }
}

/**
 * Load cycle data from localStorage.
 *
 * Parses stored JSON and converts ISO date strings back to Date objects.
 *
 * @returns The parsed cycle data, or null if no data exists or parsing fails
 *
 * @example
 * ```ts
 * const data = loadCycleData();
 * if (data) {
 *   console.log("Last period:", data.lastPeriodStart);
 * }
 * ```
 */
export function loadCycleData(): CycleData | null {
  if (typeof window === "undefined") {
    return null; // Skip during SSR
  }

  try {
    const stored = window.localStorage.getItem(STORAGE_KEY);
    if (!stored) {
      return null;
    }

    const storageData: StorageData = JSON.parse(stored);

    // Convert ISO strings back to Date objects
    return {
      lastPeriodStart: new Date(storageData.lastPeriodStart),
      cycleLength: storageData.cycleLength,
      periodLength: storageData.periodLength,
    };
  } catch (error) {
    // Handle parse errors or corrupted data
    console.error("Failed to load cycle data from localStorage:", error);
    return null;
  }
}

/**
 * Remove cycle data from localStorage.
 *
 * Clears all stored cycle data. Useful for privacy or when user wants to reset.
 *
 * @returns void
 *
 * @throws Errors are caught and logged to console, but not re-thrown
 *
 * @example
 * ```ts
 * clearCycleData(); // User wants to delete their data
 * ```
 */
export function clearCycleData(): void {
  if (typeof window === "undefined") {
    return; // Skip during SSR
  }

  try {
    window.localStorage.removeItem(STORAGE_KEY);
  } catch (error) {
    console.error("Failed to clear cycle data from localStorage:", error);
  }
}

/**
 * Get the timestamp when data was last saved.
 *
 * Useful for showing users how old their saved data is.
 *
 * @returns The ISO timestamp string, or null if no data exists
 *
 * @example
 * ```ts
 * const savedAt = getLastSavedTimestamp();
 * if (savedAt) {
 *   console.log("Data saved on:", new Date(savedAt));
 * }
 * ```
 */
export function getLastSavedTimestamp(): string | null {
  if (typeof window === "undefined") {
    return null;
  }

  try {
    const stored = window.localStorage.getItem(STORAGE_KEY);
    if (!stored) {
      return null;
    }

    const storageData: StorageData = JSON.parse(stored);
    return storageData.savedAt;
  } catch (error) {
    console.error("Failed to get last saved timestamp:", error);
    return null;
  }
}
