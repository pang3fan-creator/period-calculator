import { describe, it, expect, vi } from "vitest";
import { renderToString } from "react-dom/server";
import { Breadcrumb } from "./breadcrumb";

// Mock next/navigation
vi.mock("next/navigation", () => ({
  usePathname: () => "/irregular-period-calculator",
}));

// Mock next-intl
vi.mock("next-intl", () => ({
  useTranslations: (namespace: string) => (key: string) => {
    const translations: Record<string, Record<string, string>> = {
      nav: {
        home: "Home",
        irregularPeriodCalculator: "Irregular Period Calculator",
        ovulationPeriodCalculator: "Ovulation Calculator",
      },
      breadcrumb: {
        ariaLabel: "Breadcrumb navigation",
      },
    };
    return translations[namespace]?.[key] || key;
  },
}));

// Mock Link component
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

// Mock breadcrumb config
vi.mock("@/config/breadcrumbs", () => ({
  breadcrumbConfig: {
    "/irregular-period-calculator": "nav.irregularPeriodCalculator",
    "/ovulation-period-calculator": "nav.ovulationPeriodCalculator",
  },
}));

describe("Breadcrumb", () => {
  describe("Rendering", () => {
    it("should render breadcrumb navigation", () => {
      const html = renderToString(<Breadcrumb />);

      expect(html).toContain("nav");
      expect(html).toContain("aria-label");
    });

    it("should render Home link", () => {
      const html = renderToString(<Breadcrumb />);

      expect(html).toContain("Home");
    });

    it("should render current page item", () => {
      const html = renderToString(<Breadcrumb />);

      expect(html).toContain("Irregular Period Calculator");
    });

    it("should render chevron icons between items", () => {
      const html = renderToString(<Breadcrumb />);

      // ChevronRightIcon should be present
      expect(html).toContain("svg");
    });
  });

  describe("Accessibility", () => {
    it("should have aria-label on nav", () => {
      const html = renderToString(<Breadcrumb />);

      expect(html).toContain('aria-label="Breadcrumb navigation"');
    });

    it("should have aria-current on current page", () => {
      const html = renderToString(<Breadcrumb />);

      expect(html).toContain('aria-current="page"');
    });
  });

  describe("ClassName prop", () => {
    it("should apply custom className", () => {
      const html = renderToString(<Breadcrumb className="custom-class" />);

      expect(html).toContain("custom-class");
    });
  });

  describe("Overrides prop", () => {
    it("should render override name for dynamic routes", () => {
      const html = renderToString(
        <Breadcrumb
          overrides={[
            { segment: "irregular-period-calculator", name: "Custom Name" },
          ]}
        />,
      );

      expect(html).toContain("Custom Name");
    });
  });
});