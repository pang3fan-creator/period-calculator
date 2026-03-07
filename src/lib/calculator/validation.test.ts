import { describe, it, expect } from "vitest";
import {
  validateCycleData,
  isValidCycleData,
} from "./validation";
import type { CycleData } from "@/types";

describe("validation", () => {
  describe("validateCycleData", () => {
    it("should return empty errors for valid input", () => {
      const validData: CycleData = {
        lastPeriodStart: new Date("2024-01-15"),
        cycleLength: 28,
        periodLength: 5,
      };

      const errors = validateCycleData(validData);
      expect(errors).toHaveLength(0);
    });

    describe("lastPeriodStart validation", () => {
      it("should return error for null lastPeriodStart", () => {
        const data = {
          lastPeriodStart: null as unknown as Date,
          cycleLength: 28,
          periodLength: 5,
        };

        const errors = validateCycleData(data);
        expect(errors).toHaveLength(1);
        expect(errors[0].field).toBe("lastPeriodStart");
      });

      it("should return error for undefined lastPeriodStart", () => {
        const data = {
          lastPeriodStart: undefined as unknown as Date,
          cycleLength: 28,
          periodLength: 5,
        };

        const errors = validateCycleData(data);
        expect(errors).toHaveLength(1);
        expect(errors[0].field).toBe("lastPeriodStart");
      });

      it("should return error for non-Date instance", () => {
        const data = {
          lastPeriodStart: "2024-01-15" as unknown as Date,
          cycleLength: 28,
          periodLength: 5,
        };

        const errors = validateCycleData(data);
        expect(errors).toHaveLength(1);
        expect(errors[0].field).toBe("lastPeriodStart");
      });

      it("should return error for future date", () => {
        const futureDate = new Date();
        futureDate.setFullYear(futureDate.getFullYear() + 1);

        const data: CycleData = {
          lastPeriodStart: futureDate,
          cycleLength: 28,
          periodLength: 5,
        };

        const errors = validateCycleData(data);
        expect(errors).toHaveLength(1);
        expect(errors[0].field).toBe("lastPeriodStart");
        expect(errors[0].message).toBe("validation.futureDate");
      });
    });

    describe("cycleLength validation", () => {
      it("should return error for cycleLength below minimum (20 days)", () => {
        const data: CycleData = {
          lastPeriodStart: new Date("2024-01-15"),
          cycleLength: 20,
          periodLength: 5,
        };

        const errors = validateCycleData(data);
        expect(errors).toHaveLength(1);
        expect(errors[0].field).toBe("cycleLength");
      });

      it("should pass for cycleLength at minimum (21 days)", () => {
        const data: CycleData = {
          lastPeriodStart: new Date("2024-01-15"),
          cycleLength: 21,
          periodLength: 5,
        };

        const errors = validateCycleData(data);
        expect(errors).toHaveLength(0);
      });

      it("should pass for cycleLength at maximum (35 days)", () => {
        const data: CycleData = {
          lastPeriodStart: new Date("2024-01-15"),
          cycleLength: 35,
          periodLength: 5,
        };

        const errors = validateCycleData(data);
        expect(errors).toHaveLength(0);
      });

      it("should return error for cycleLength above maximum (36 days)", () => {
        const data: CycleData = {
          lastPeriodStart: new Date("2024-01-15"),
          cycleLength: 36,
          periodLength: 5,
        };

        const errors = validateCycleData(data);
        expect(errors).toHaveLength(1);
        expect(errors[0].field).toBe("cycleLength");
      });

      it("should return error for NaN cycleLength", () => {
        const data = {
          lastPeriodStart: new Date("2024-01-15"),
          cycleLength: NaN,
          periodLength: 5,
        };

        const errors = validateCycleData(data);
        expect(errors).toHaveLength(1);
        expect(errors[0].field).toBe("cycleLength");
      });
    });

    describe("periodLength validation", () => {
      it("should return error for periodLength below minimum (1 day)", () => {
        const data: CycleData = {
          lastPeriodStart: new Date("2024-01-15"),
          cycleLength: 28,
          periodLength: 1,
        };

        const errors = validateCycleData(data);
        expect(errors).toHaveLength(1);
        expect(errors[0].field).toBe("periodLength");
      });

      it("should pass for periodLength at minimum (2 days)", () => {
        const data: CycleData = {
          lastPeriodStart: new Date("2024-01-15"),
          cycleLength: 28,
          periodLength: 2,
        };

        const errors = validateCycleData(data);
        expect(errors).toHaveLength(0);
      });

      it("should pass for periodLength at maximum (7 days)", () => {
        const data: CycleData = {
          lastPeriodStart: new Date("2024-01-15"),
          cycleLength: 28,
          periodLength: 7,
        };

        const errors = validateCycleData(data);
        expect(errors).toHaveLength(0);
      });

      it("should return error for periodLength above maximum (8 days)", () => {
        const data: CycleData = {
          lastPeriodStart: new Date("2024-01-15"),
          cycleLength: 28,
          periodLength: 8,
        };

        const errors = validateCycleData(data);
        expect(errors).toHaveLength(1);
        expect(errors[0].field).toBe("periodLength");
      });

      it("should return error for NaN periodLength", () => {
        const data = {
          lastPeriodStart: new Date("2024-01-15"),
          cycleLength: 28,
          periodLength: NaN,
        };

        const errors = validateCycleData(data);
        expect(errors).toHaveLength(1);
        expect(errors[0].field).toBe("periodLength");
      });
    });

    it("should return multiple errors for invalid data", () => {
      const futureDate = new Date();
      futureDate.setFullYear(futureDate.getFullYear() + 1);

      const data: CycleData = {
        lastPeriodStart: futureDate,
        cycleLength: 10,
        periodLength: 15,
      };

      const errors = validateCycleData(data);
      expect(errors.length).toBeGreaterThanOrEqual(3);
    });
  });

  describe("isValidCycleData", () => {
    it("should return true for valid data", () => {
      const validData: CycleData = {
        lastPeriodStart: new Date("2024-01-15"),
        cycleLength: 28,
        periodLength: 5,
      };

      expect(isValidCycleData(validData)).toBe(true);
    });

    it("should return false for invalid data", () => {
      const invalidData: CycleData = {
        lastPeriodStart: new Date("2024-01-15"),
        cycleLength: 10,
        periodLength: 5,
      };

      expect(isValidCycleData(invalidData)).toBe(false);
    });
  });
});
