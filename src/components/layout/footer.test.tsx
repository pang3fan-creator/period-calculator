import { describe, it, expect, vi } from "vitest";
import { renderToString } from "react-dom/server";
import { Footer } from "./footer";

vi.mock("next-intl/server", () => ({
  getTranslations: async (namespace: string) => (key: string) => {
    const translations: Record<string, Record<string, string>> = {
      footer: {
        tagline: "Privacy-first period tracking",
        trustText: "Your data stays on your device",
        calculators: "Calculators",
        blog: "Blog",
        legal: "Legal",
        copyright: "Copyright 2026",
      },
      nav: {
        home: "Home",
        irregularCalculator: "Irregular Period Calculator",
        ovulationCalculator: "Ovulation Calculator",
        privacyPolicy: "Privacy Policy",
        editorialPolicy: "Editorial Policy",
        about: "About",
      },
      common: {
        appName: "Period Calculator",
      },
    };

    return translations[namespace]?.[key] || key;
  },
  getLocale: async () => "en",
}));

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

vi.mock("@/lib/blog/posts", () => ({
  getAllPosts: () => [{ slug: "sample-post", title: "Sample Post" }],
}));

describe("Footer", () => {
  it("renders the Dang.ai external link with safe target attributes", async () => {
    const html = renderToString(await Footer());

    expect(html).toContain('href="https://dang.ai/"');
    expect(html).toContain('target="_blank"');
    expect(html).toContain('rel="noopener"');
    expect(html).toContain("Dang.ai");
  });
});
