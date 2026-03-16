import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { renderToString } from "react-dom/server";
import { OvulationDeepKnowledge } from "./ovulation-deep-knowledge";

// Mock next-intl
vi.mock("next-intl", () => ({
  useTranslations: () => (key: string) => {
    const translations: Record<string, string> = {
      title: "Understanding Ovulation",
      description: "Learn about ovulation and fertility",
      lastUpdated: "Last updated",
      medicallyReviewed: "Medically reviewed",
      "medicalReview.title": "Medical Review",
      "medicalReview.subtitle": "By Dr. Smith",
      "medicalReview.date": "Jan 2024",
      "keyStatistics.stat1.value": "28",
      "keyStatistics.stat1.label": "Days",
      "keyStatistics.stat1.source": "NIH",
      "keyStatistics.stat1.sourceUrl": "https://nih.gov",
      "keyStatistics.stat2.value": "14",
      "keyStatistics.stat2.label": "Ovulation",
      "keyStatistics.stat2.source": "ACOG",
      "keyStatistics.stat2.sourceUrl": "https://acog.org",
      "keyStatistics.stat3.value": "6",
      "keyStatistics.stat3.label": "Fertile Days",
      "keyStatistics.stat3.source": "Mayo",
      "keyStatistics.stat3.sourceUrl": "https://mayoclinic.org",
      "topics.whatIsOvulation.title": "What is Ovulation",
      "topics.whatIsOvulation.description": "Description",
      "topics.fertileWindow.title": "Fertile Window",
      "topics.fertileWindow.description": "Description",
      "topics.trackingSignals.title": "Tracking Signals",
      "topics.trackingSignals.description": "Description",
      "topics.trackingSignals.signals.cervicalMucus.title": "Cervical Mucus",
      "topics.trackingSignals.signals.cervicalMucus.description": "Description",
      "topics.trackingSignals.signals.bbt.title": "BBT",
      "topics.trackingSignals.signals.bbt.description": "Description",
      "topics.trackingSignals.signals.lutealPhase.title": "Luteal Phase",
      "topics.trackingSignals.signals.lutealPhase.description": "Description",
      "topics.precisionMatters.title": "Precision Matters",
      "topics.precisionMatters.description": "Description",
      "topics.professionalAdvice.title": "Professional Advice",
      "topics.professionalAdvice.description": "Description",
      "topics.professionalAdvice.conditions.item1": "Condition 1",
      "topics.professionalAdvice.conditions.item2": "Condition 2",
      "topics.professionalAdvice.conditions.item3": "Condition 3",
      "topics.professionalAdvice.conclusion": "Conclusion",
      "references.title": "Medical References",
      expandImage: "Expand image",
      closeButton: "Close",
      dialogLabel: "Image preview",
    };
    return translations[key] || key;
  },
}));

// Mock @/i18n/routing Link
vi.mock("@/i18n/routing", () => ({
  Link: ({
    children,
    href,
    className,
  }: {
    children: React.ReactNode;
    href: string;
    className?: string;
  }) => (
    <a href={href} className={className}>
      {children}
    </a>
  ),
}));

describe("OvulationDeepKnowledge", () => {
  beforeEach(() => {
    vi.spyOn(console, "error").mockImplementation(() => {});
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  describe("Rendering", () => {
    it("should render section with correct structure", () => {
      const html = renderToString(<OvulationDeepKnowledge />);

      expect(html).toContain("section");
    });

    it("should render title", () => {
      const html = renderToString(<OvulationDeepKnowledge />);

      expect(html).toContain("Understanding Ovulation");
    });

    it("should render description", () => {
      const html = renderToString(<OvulationDeepKnowledge />);

      expect(html).toContain("Learn about ovulation and fertility");
    });

    it("should render references section", () => {
      const html = renderToString(<OvulationDeepKnowledge />);

      expect(html).toContain("Medical References");
    });
  });

  describe("Topics", () => {
    it("should render What is Ovulation topic", () => {
      const html = renderToString(<OvulationDeepKnowledge />);

      expect(html).toContain("What is Ovulation");
    });

    it("should render Fertile Window topic", () => {
      const html = renderToString(<OvulationDeepKnowledge />);

      expect(html).toContain("Fertile Window");
    });

    it("should render Tracking Signals topic", () => {
      const html = renderToString(<OvulationDeepKnowledge />);

      expect(html).toContain("Tracking Signals");
    });

    it("should render Precision Matters topic", () => {
      const html = renderToString(<OvulationDeepKnowledge />);

      expect(html).toContain("Precision Matters");
    });

    it("should render Professional Advice topic", () => {
      const html = renderToString(<OvulationDeepKnowledge />);

      expect(html).toContain("Professional Advice");
    });
  });

  describe("References", () => {
    it("should render external links with proper attributes", () => {
      const html = renderToString(<OvulationDeepKnowledge />);

      expect(html).toContain('target="_blank"');
      expect(html).toContain('rel="noopener noreferrer"');
    });

    it("should link to ACOG resource", () => {
      const html = renderToString(<OvulationDeepKnowledge />);

      expect(html).toContain("acog.org");
    });

    it("should link to Mayo Clinic resource", () => {
      const html = renderToString(<OvulationDeepKnowledge />);

      expect(html).toContain("mayoclinic.org");
    });

    it("should link to NIH resource", () => {
      const html = renderToString(<OvulationDeepKnowledge />);

      expect(html).toContain("nih.gov");
    });
  });

  describe("Medical Review", () => {
    it("should render medical review section", () => {
      const html = renderToString(<OvulationDeepKnowledge />);

      expect(html).toContain("Medical Review");
    });
  });

  describe("Key Statistics", () => {
    it("should render statistics section", () => {
      const html = renderToString(<OvulationDeepKnowledge />);

      expect(html).toContain("28");
      expect(html).toContain("Days");
    });
  });
});