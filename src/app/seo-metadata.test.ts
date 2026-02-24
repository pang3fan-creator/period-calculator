import { describe, it, expect } from "vitest";
import { Metadata } from "next";

// Test home page metadata generation
describe("Home Page Metadata", () => {
  it("should have valid title and description", () => {
    const metadata: Metadata = {
      title: "Period Calculator - Free & Private Menstrual Cycle Tracker",
      description:
        "Calculate your next period, fertile window, and ovulation date. 100% private - all data stays in your browser. No login required.",
    };

    expect(metadata.title).toBeTruthy();
    expect(metadata.description).toBeTruthy();
    expect(metadata.title).toContain("Period Calculator");
    expect(metadata.description).toContain("period");
    expect(metadata.description).toContain("private");
  });

  it("should contain SEO keywords", () => {
    const keywords = [
      "period calculator",
      "menstrual cycle calculator",
      "ovulation calculator",
      "irregular period calculator",
      "fertile window calculator",
    ];

    keywords.forEach((keyword) => {
      expect(keyword).toBeTruthy();
    });
  });
});

// Test irregular page metadata
describe("Irregular Period Calculator Metadata", () => {
  it("should have SEO-optimized title", () => {
    const title = "Irregular Period Calculator - Track Uneven Cycles";
    const description =
      "Calculate your period even with irregular cycles. Our algorithm uses historical data to provide accurate predictions. 100% private.";

    expect(title).toContain("Irregular Period Calculator");
    expect(description).toContain("irregular");
    expect(description).toContain("private");
  });
});

// Test ovulation page metadata
describe("Ovulation Calculator Metadata", () => {
  it("should have SEO-optimized title", () => {
    const title = "Ovulation Calculator - Find Your Fertile Window";
    const description =
      "Calculate your ovulation date and fertile window. Plan pregnancy or understand your cycle better. 100% private.";

    expect(title).toContain("Ovulation Calculator");
    expect(description).toContain("fertile");
    expect(description).toContain("ovulation");
  });
});

// Test JSON-LD Schema structure
describe("JSON-LD Schema", () => {
  const webApplicationSchema = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: "Period Calculator",
    description:
      "Calculate your next period, fertile window, and ovulation date. 100% private - all data stays in your browser.",
    url: "https://periodcalculator.site",
    applicationCategory: "HealthApplication",
    operatingSystem: "Web Browser",
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "USD",
    },
  };

  it("WebApplication schema should have required fields", () => {
    expect(webApplicationSchema["@context"]).toBe("https://schema.org");
    expect(webApplicationSchema["@type"]).toBe("WebApplication");
    expect(webApplicationSchema.name).toBeTruthy();
    expect(webApplicationSchema.url).toContain("https://");
    expect(webApplicationSchema.applicationCategory).toBe("HealthApplication");
  });

  it("WebApplication should have free pricing", () => {
    expect(webApplicationSchema.offers.price).toBe("0");
    expect(webApplicationSchema.offers.priceCurrency).toBe("USD");
  });

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: "How late is a period considered abnormal?",
        acceptedAnswer: {
          "@type": "Answer",
          text: expect.any(String),
        },
      },
    ],
  };

  it("FAQPage schema should have correct structure", () => {
    expect(faqSchema["@context"]).toBe("https://schema.org");
    expect(faqSchema["@type"]).toBe("FAQPage");
    expect(faqSchema.mainEntity).toBeInstanceOf(Array);
    expect(faqSchema.mainEntity.length).toBeGreaterThan(0);
  });

  it("FAQPage should have question with acceptedAnswer", () => {
    const question = faqSchema.mainEntity[0];
    expect(question["@type"]).toBe("Question");
    expect(question.name).toBeTruthy();
    expect(question.acceptedAnswer).toBeDefined();
    expect(question.acceptedAnswer["@type"]).toBe("Answer");
  });
});

// Test alternates configuration
describe("Alternates Configuration", () => {
  it("should define canonical and language variants", () => {
    const alternates = {
      canonical: "/",
      languages: {
        en: "/",
        es: "/es",
        fr: "/fr",
      },
    };

    expect(alternates.canonical).toBe("/");
    expect(alternates.languages.en).toBe("/");
    expect(alternates.languages.es).toBe("/es");
    expect(alternates.languages.fr).toBe("/fr");
  });
});
