import { describe, it, expect } from "vitest";
import sitemap from "./sitemap";

describe("sitemap", () => {
  it("should generate correct number of URLs", () => {
    const sitemapEntries = sitemap();
    // 3 main pages + 6 tool pages + 6 policy pages + 3 about pages = 18 entries
    expect(sitemapEntries).toHaveLength(18);
  });

  it("should include main pages with correct priority", () => {
    const sitemapEntries = sitemap();
    const baseUrl = "https://periodcalculator.site";

    const homePage = sitemapEntries.find((entry) => entry.url === baseUrl);
    expect(homePage).toBeDefined();
    expect(homePage?.priority).toBe(1.0);
    expect(homePage?.changeFrequency).toBe("weekly");
  });

  it("should include all multilingual variants", () => {
    const sitemapEntries = sitemap();
    const baseUrl = "https://periodcalculator.site";

    const urls = sitemapEntries.map((entry) => entry.url);

    // Check Spanish pages
    expect(urls).toContain(`${baseUrl}/es`);
    expect(urls).toContain(`${baseUrl}/es/irregular-period-calculator`);
    expect(urls).toContain(`${baseUrl}/es/ovulation-calculator`);
    expect(urls).toContain(`${baseUrl}/es/privacy-policy`);

    // Check French pages
    expect(urls).toContain(`${baseUrl}/fr`);
    expect(urls).toContain(`${baseUrl}/fr/irregular-period-calculator`);
    expect(urls).toContain(`${baseUrl}/fr/ovulation-calculator`);
    expect(urls).toContain(`${baseUrl}/fr/privacy-policy`);
  });

  it("should include tool pages with correct priority", () => {
    const sitemapEntries = sitemap();
    const baseUrl = "https://periodcalculator.site";

    const irregularPage = sitemapEntries.find(
      (entry) => entry.url === `${baseUrl}/irregular-period-calculator`,
    );
    const ovulationPage = sitemapEntries.find(
      (entry) => entry.url === `${baseUrl}/ovulation-calculator`,
    );

    expect(irregularPage?.priority).toBe(0.8);
    expect(ovulationPage?.priority).toBe(0.8);
    expect(irregularPage?.changeFrequency).toBe("monthly");
  });

  it("should include policy pages", () => {
    const sitemapEntries = sitemap();
    const baseUrl = "https://periodcalculator.site";

    const urls = sitemapEntries.map((entry) => entry.url);

    expect(urls).toContain(`${baseUrl}/privacy-policy`);
    expect(urls).toContain(`${baseUrl}/editorial-policy`);
  });

  it("should include about page", () => {
    const sitemapEntries = sitemap();
    const baseUrl = "https://periodcalculator.site";

    const urls = sitemapEntries.map((entry) => entry.url);

    expect(urls).toContain(`${baseUrl}/about`);
    expect(urls).toContain(`${baseUrl}/es/about`);
    expect(urls).toContain(`${baseUrl}/fr/about`);
  });

  it("should have valid lastModified dates", () => {
    const sitemapEntries = sitemap();

    sitemapEntries.forEach((entry) => {
      expect(entry.lastModified).toBeDefined();
      const lastMod = entry.lastModified as Date;
      expect(lastMod).toBeInstanceOf(Date);
      expect(lastMod.getTime()).toBeLessThanOrEqual(Date.now());
    });
  });
});
