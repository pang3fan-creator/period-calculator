import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { renderToString } from "react-dom/server";
import { IrregularDeepKnowledge } from "./irregular-deep-knowledge";

// Mock next-intl
vi.mock("next-intl", () => ({
  useTranslations: () => (key: string) => {
    const translations: Record<string, string> = {
      title: "Understanding Irregular Periods",
      lastUpdated: "Last updated",
      medicallyReviewed: "Medically reviewed",
      "medicalReview.title": "Medical Review",
      "medicalReview.subtitle": "By Dr. Smith",
      "medicalReview.date": "Jan 2024",
      "topics.normal.title": "What Is Normal",
      "topics.normal.description": "Description",
      "topics.culprits.title": "Common Culprits",
      "topics.culprits.description": "Description",
      "topics.calculator.title": "Calculator Guide",
      "topics.calculator.description": "Description",
      "topics.doctor.title": "When to See a Doctor",
      "topics.doctor.description": "Description",
      "topics.empowerment.title": "Empowerment",
      "topics.empowerment.description": "Description",
      references: "Medical References",
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

describe("IrregularDeepKnowledge", () => {
  beforeEach(() => {
    vi.spyOn(console, "error").mockImplementation(() => {});
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  describe("Rendering", () => {
    it("should render section with correct structure", () => {
      const html = renderToString(<IrregularDeepKnowledge />);

      expect(html).toContain("section");
    });

    it("should render title", () => {
      const html = renderToString(<IrregularDeepKnowledge />);

      expect(html).toContain("Understanding Irregular Periods");
    });

    it("should render references section", () => {
      const html = renderToString(<IrregularDeepKnowledge />);

      expect(html).toContain("Medical References");
    });
  });

  describe("Topics", () => {
    it("should render What Is Normal topic", () => {
      const html = renderToString(<IrregularDeepKnowledge />);

      expect(html).toContain("What Is Normal");
    });

    it("should render Common Culprits topic", () => {
      const html = renderToString(<IrregularDeepKnowledge />);

      expect(html).toContain("Common Culprits");
    });

    it("should render Calculator Guide topic", () => {
      const html = renderToString(<IrregularDeepKnowledge />);

      expect(html).toContain("Calculator Guide");
    });

    it("should render When to See a Doctor topic", () => {
      const html = renderToString(<IrregularDeepKnowledge />);

      expect(html).toContain("When to See a Doctor");
    });

    it("should render Empowerment topic", () => {
      const html = renderToString(<IrregularDeepKnowledge />);

      expect(html).toContain("Empowerment");
    });
  });

  describe("References", () => {
    it("should render external links with proper attributes", () => {
      const html = renderToString(<IrregularDeepKnowledge />);

      // Check for external link attributes
      expect(html).toContain('target="_blank"');
      expect(html).toContain('rel="noopener noreferrer"');
    });

    it("should link to ACOG resource", () => {
      const html = renderToString(<IrregularDeepKnowledge />);

      expect(html).toContain("acog.org");
    });

    it("should link to Mayo Clinic resource", () => {
      const html = renderToString(<IrregularDeepKnowledge />);

      expect(html).toContain("mayoclinic.org");
    });
  });
});
