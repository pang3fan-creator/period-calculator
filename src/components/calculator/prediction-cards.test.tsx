import { describe, it, expect, vi } from "vitest";
import { renderToString } from "react-dom/server";
import { PredictionCards } from "./prediction-cards";
import type { PredictionResult } from "@/types";

// Mock next-intl
vi.mock("next-intl", () => ({
  useTranslations: () => (key: string) => {
    const translations: Record<string, string> = {
      nextPeriod: "Next Period",
      ovulationDay: "Ovulation Day",
      fertileWindow: "Fertile Window",
      pmsPeriod: "PMS Period",
    };
    return translations[key] || key;
  },
}));

// Mock ovulation-theme
vi.mock("@/lib/theme/ovulation-theme", () => ({
  getOvulationTheme: () => ({
    colors: {
      ovulation: {
        border: "border-violet-400",
        bg: "bg-violet-50",
        text: "text-violet-700",
        darkBorder: "dark:border-violet-500",
        darkBg: "dark:bg-violet-950/30",
        darkText: "dark:text-violet-300",
      },
      fertile: {
        border: "border-emerald-400",
        bg: "bg-emerald-50",
        text: "text-emerald-700",
        darkBorder: "dark:border-emerald-500",
        darkBg: "dark:bg-emerald-950/30",
        darkText: "dark:text-emerald-300",
      },
      period: {
        border: "border-rose-300",
        bg: "bg-rose-50",
        text: "text-rose-700",
        darkBorder: "dark:border-rose-500",
        darkBg: "dark:bg-rose-950/30",
        darkText: "dark:text-rose-300",
      },
      pms: {
        border: "border-amber-300",
        bg: "bg-amber-50",
        text: "text-amber-700",
        darkBorder: "dark:border-amber-500",
        darkBg: "dark:bg-amber-950/30",
        darkText: "dark:text-amber-300",
      },
    },
    rounded: "rounded-3xl",
    shadow: "shadow-lg",
    icons: {
      ovulation: "🥚",
      fertile: "🌸",
      period: "🌙",
      pms: "✨",
    },
    textPrefix: null,
  }),
  buildCardClasses: () =>
    "flex items-center gap-3 p-3 rounded-3xl border-2 bg-rose-50 text-rose-700",
}));

// Create a mock prediction result
const mockResult: PredictionResult = {
  nextPeriodStart: new Date("2024-02-01"),
  nextPeriodEnd: new Date("2024-02-05"),
  ovulationDate: new Date("2024-01-18"),
  fertileWindowStart: new Date("2024-01-13"),
  fertileWindowEnd: new Date("2024-01-19"),
  pmsStart: new Date("2024-01-25"),
  pmsEnd: new Date("2024-01-31"),
  cycleLength: 28,
  periodLength: 5,
};

describe("PredictionCards", () => {
  describe("Rendering", () => {
    it("should render all four prediction cards", () => {
      const html = renderToString(
        <PredictionCards result={mockResult} locale="en" />,
      );

      expect(html).toContain("Next Period");
      expect(html).toContain("Ovulation Day");
      expect(html).toContain("Fertile Window");
      expect(html).toContain("PMS Period");
    });

    it("should render calendar icon for next period", () => {
      const html = renderToString(
        <PredictionCards result={mockResult} locale="en" />,
      );

      expect(html).toContain("svg");
    });

    it("should render grid layout", () => {
      const html = renderToString(
        <PredictionCards result={mockResult} locale="en" />,
      );

      expect(html).toContain("grid");
      expect(html).toContain("grid-cols-1");
      expect(html).toContain("sm:grid-cols-2");
    });
  });

  describe("Date formatting", () => {
    it("should format dates correctly for English locale", () => {
      const html = renderToString(
        <PredictionCards result={mockResult} locale="en" />,
      );

      // Check that dates are formatted
      expect(html).toContain("Jan");
      expect(html).toContain("Feb");
    });

    it("should handle same start and end dates", () => {
      const sameDateResult: PredictionResult = {
        ...mockResult,
        nextPeriodStart: new Date("2024-02-01"),
        nextPeriodEnd: new Date("2024-02-01"),
      };

      const html = renderToString(
        <PredictionCards result={sameDateResult} locale="en" />,
      );

      // Should render single date, not range
      expect(html).toContain("Feb");
    });
  });

  describe("Accessibility", () => {
    it("should have aria-hidden on icons", () => {
      const html = renderToString(
        <PredictionCards result={mockResult} locale="en" />,
      );

      expect(html).toContain('aria-hidden="true"');
    });
  });

  describe("Locale support", () => {
    it("should render with Spanish locale", () => {
      const html = renderToString(
        <PredictionCards result={mockResult} locale="es" />,
      );

      expect(html).toBeDefined();
      expect(html).toContain("Next Period"); // Translation mock returns key
    });

    it("should render with French locale", () => {
      const html = renderToString(
        <PredictionCards result={mockResult} locale="fr" />,
      );

      expect(html).toBeDefined();
    });
  });
});