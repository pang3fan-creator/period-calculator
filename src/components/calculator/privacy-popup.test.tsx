import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { renderToString } from "react-dom/server";
import { PrivacyPopup } from "./privacy-popup";

// Mock next-intl
vi.mock("next-intl", () => ({
  useTranslations: () => (key: string) => {
    const translations: Record<string, Record<string, string>> = {
      privacyPopup: {
        buttonLabel: "Privacy",
        buttonAriaLabel: "Learn about privacy",
        title: "Your Privacy is Protected",
        description: "Your data stays 100% on your device. We never send any data to servers.",
        step1: "Input",
        step2: "Browser",
        step3: "Result",
        note: "Data never leaves your device",
        closeButton: "Close",
      },
    };
    return translations.privacyPopup[key] || key;
  },
}));

describe("PrivacyPopup", () => {
  beforeEach(() => {
    vi.spyOn(console, "error").mockImplementation(() => {});
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it("should render privacy button with label", () => {
    const html = renderToString(<PrivacyPopup />);

    expect(html).toContain("Privacy");
  });

  it("should render privacy button with aria label", () => {
    const html = renderToString(<PrivacyPopup />);

    expect(html).toContain("Learn about privacy");
  });

  it("should render checkmark icon", () => {
    const html = renderToString(<PrivacyPopup />);

    expect(html).toContain("svg");
  });

  it("should render component without crashing", () => {
    const html = renderToString(<PrivacyPopup />);

    expect(html).toBeDefined();
  });

  it("should have accessible button structure", () => {
    const html = renderToString(<PrivacyPopup />);

    expect(html).toContain("button");
    expect(html).toContain("type=\"button\"");
  });
});
