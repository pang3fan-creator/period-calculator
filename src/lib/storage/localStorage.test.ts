import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import {
  saveCycleData,
  loadCycleData,
  clearCycleData,
  getLastSavedTimestamp,
} from "./localStorage";
import type { CycleData } from "@/types";

// Mock localStorage
const mockLocalStorage = {
  data: {} as Record<string, string>,
  getItem: vi.fn((key: string) => mockLocalStorage.data[key] || null),
  setItem: vi.fn((key: string, value: string) => {
    mockLocalStorage.data[key] = value;
  }),
  removeItem: vi.fn((key: string) => {
    delete mockLocalStorage.data[key];
  }),
};

describe("localStorage", () => {
  beforeEach(() => {
    vi.stubGlobal("window", {
      localStorage: mockLocalStorage,
    });
    mockLocalStorage.data = {};
    vi.clearAllMocks();
  });

  afterEach(() => {
    vi.unstubAllGlobals();
  });

  describe("SSR environment handling", () => {
    it("saveCycleData should return early when window is undefined", () => {
      vi.stubGlobal("window", undefined);

      const data: CycleData = {
        lastPeriodStart: new Date("2024-01-15"),
        cycleLength: 28,
        periodLength: 5,
      };

      // Should not throw
      expect(() => saveCycleData(data)).not.toThrow();
      expect(mockLocalStorage.setItem).not.toHaveBeenCalled();
    });

    it("loadCycleData should return null when window is undefined", () => {
      vi.stubGlobal("window", undefined);

      const result = loadCycleData();

      expect(result).toBeNull();
    });

    it("clearCycleData should return early when window is undefined", () => {
      vi.stubGlobal("window", undefined);

      expect(() => clearCycleData()).not.toThrow();
      expect(mockLocalStorage.removeItem).not.toHaveBeenCalled();
    });

    it("getLastSavedTimestamp should return null when window is undefined", () => {
      vi.stubGlobal("window", undefined);

      const result = getLastSavedTimestamp();

      expect(result).toBeNull();
    });
  });

  describe("saveCycleData", () => {
    it("should save cycle data to localStorage", () => {
      const data: CycleData = {
        lastPeriodStart: new Date("2024-01-15"),
        cycleLength: 28,
        periodLength: 5,
      };

      saveCycleData(data);

      expect(mockLocalStorage.setItem).toHaveBeenCalledWith(
        "period_calculator_data",
        expect.any(String),
      );
    });

    it("should serialize Date as YYYY-MM-DD string", () => {
      const data: CycleData = {
        lastPeriodStart: new Date("2024-01-15"),
        cycleLength: 28,
        periodLength: 5,
      };

      saveCycleData(data);

      const storedData = mockLocalStorage.data["period_calculator_data"];
      const parsed = JSON.parse(storedData);

      expect(parsed.lastPeriodStart).toBe("2024-01-15");
    });

    it("should add savedAt timestamp", () => {
      const data: CycleData = {
        lastPeriodStart: new Date("2024-01-15"),
        cycleLength: 28,
        periodLength: 5,
      };

      saveCycleData(data);

      const storedData = mockLocalStorage.data["period_calculator_data"];
      const parsed = JSON.parse(storedData);

      expect(parsed.savedAt).toBeDefined();
      expect(new Date(parsed.savedAt).getTime()).not.toBeNaN();
    });

    it("should handle errors gracefully", () => {
      mockLocalStorage.setItem.mockImplementationOnce(() => {
        throw new Error("Storage full");
      });

      const data: CycleData = {
        lastPeriodStart: new Date("2024-01-15"),
        cycleLength: 28,
        periodLength: 5,
      };

      // Should not throw
      expect(() => saveCycleData(data)).not.toThrow();
    });
  });

  describe("loadCycleData", () => {
    it("should load cycle data from localStorage", () => {
      const storedData = {
        lastPeriodStart: "2024-01-15",
        cycleLength: 28,
        periodLength: 5,
        savedAt: "2024-01-15T10:00:00.000Z",
      };
      mockLocalStorage.data["period_calculator_data"] =
        JSON.stringify(storedData);

      const result = loadCycleData();

      expect(result).not.toBeNull();
      expect(result?.cycleLength).toBe(28);
      expect(result?.periodLength).toBe(5);
    });

    it("should deserialize date string to Date object", () => {
      const storedData = {
        lastPeriodStart: "2024-01-15",
        cycleLength: 28,
        periodLength: 5,
        savedAt: "2024-01-15T10:00:00.000Z",
      };
      mockLocalStorage.data["period_calculator_data"] =
        JSON.stringify(storedData);

      const result = loadCycleData();

      expect(result?.lastPeriodStart).toBeInstanceOf(Date);
      expect(result?.lastPeriodStart?.getDate()).toBe(15);
    });

    it("should return null when no data exists", () => {
      const result = loadCycleData();

      expect(result).toBeNull();
    });

    it("should return null when data is corrupted", () => {
      mockLocalStorage.data["period_calculator_data"] = "invalid json";

      const result = loadCycleData();

      expect(result).toBeNull();
    });

    it("should handle errors gracefully", () => {
      mockLocalStorage.getItem.mockImplementationOnce(() => {
        throw new Error("Access denied");
      });

      const result = loadCycleData();

      expect(result).toBeNull();
    });
  });

  describe("clearCycleData", () => {
    it("should remove data from localStorage", () => {
      mockLocalStorage.data["period_calculator_data"] = '{"test": true}';

      clearCycleData();

      expect(mockLocalStorage.removeItem).toHaveBeenCalledWith(
        "period_calculator_data",
      );
    });

    it("should handle errors gracefully", () => {
      mockLocalStorage.removeItem.mockImplementationOnce(() => {
        throw new Error("Access denied");
      });

      // Should not throw
      expect(() => clearCycleData()).not.toThrow();
    });
  });

  describe("getLastSavedTimestamp", () => {
    it("should return timestamp when data exists", () => {
      const storedData = {
        lastPeriodStart: "2024-01-15",
        cycleLength: 28,
        periodLength: 5,
        savedAt: "2024-01-15T10:00:00.000Z",
      };
      mockLocalStorage.data["period_calculator_data"] =
        JSON.stringify(storedData);

      const result = getLastSavedTimestamp();

      expect(result).toBe("2024-01-15T10:00:00.000Z");
    });

    it("should return null when no data exists", () => {
      const result = getLastSavedTimestamp();

      expect(result).toBeNull();
    });

    it("should return null when data is corrupted", () => {
      mockLocalStorage.data["period_calculator_data"] = "invalid json";

      const result = getLastSavedTimestamp();

      expect(result).toBeNull();
    });

    it("should handle errors gracefully", () => {
      mockLocalStorage.getItem.mockImplementationOnce(() => {
        throw new Error("Access denied");
      });

      const result = getLastSavedTimestamp();

      expect(result).toBeNull();
    });
  });
});
