import { describe, it, expect, vi } from "vitest";
import { renderToString } from "react-dom/server";
import { Footer } from "./footer";

vi.mock("next-intl/server", () => ({
  getTranslations: async ({
    namespace,
  }: {
    locale: string;
    namespace: string;
  }) => (key: string) => {
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
}));

vi.mock("next/image", () => ({
  default: ({
    alt,
    height,
    src,
    width,
  }: {
    alt: string;
    height: number | string;
    src: string;
    width: number | string;
  }) =>
    // eslint-disable-next-line @next/next/no-img-element
    <img src={src} alt={alt} width={width} height={height} />,
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
  getAllPostMetadata: () => [{ slug: "sample-post", title: "Sample Post" }],
}));

describe("Footer", () => {
  it("renders the AI Agents Directory featured badge in the brand trust area", async () => {
    const html = renderToString(await Footer({ locale: "en" }));

    expect(html).toContain(
      'href="https://aiagentsdirectory.com/agent/accurate-period-calculator?utm_source=badge&amp;utm_medium=referral&amp;utm_campaign=free_listing&amp;utm_content=accurate-period-calculator"',
    );
    expect(html).toContain(
      'src="https://aiagentsdirectory.com/featured-badge.svg?v=2024"',
    );
    expect(html).toContain(
      'alt="Accurate Period Calculator - Featured AI Agent on AI Agents Directory"',
    );
    expect(html).toContain('width="200"');
    expect(html).toContain('height="50"');
    expect(html).toContain('target="_blank"');
    expect(html).toContain('rel="noopener noreferrer nofollow"');
  });

  it("renders the Dang.ai external link with safe target attributes", async () => {
    const html = renderToString(await Footer({ locale: "en" }));

    expect(html).toContain('href="https://dang.ai/"');
    expect(html).toContain('target="_blank"');
    expect(html).toContain('rel="noopener noreferrer nofollow"');
    expect(html).toContain("Dang.ai");
  });
});
