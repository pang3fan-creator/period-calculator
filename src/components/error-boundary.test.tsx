import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { ErrorBoundary } from "./error-boundary";
import { renderToString } from "react-dom/server";

// Mock next-intl
vi.mock("next-intl", () => ({
  useTranslations: () => (key: string) => {
    const translations: Record<string, Record<string, string>> = {
      errorBoundary: {
        title: "Something went wrong",
        message: "An unexpected error occurred. Please try again.",
        tryAgain: "Try Again",
      },
    };
    return translations.errorBoundary[key] || key;
  },
}));

describe("ErrorBoundary", () => {
  beforeEach(() => {
    vi.spyOn(console, "error").mockImplementation(() => {});
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it("should render children when no error occurs", () => {
    // Create a simple functional component that works with our ErrorBoundary
    const Child = () => <div data-testid="child">Test content</div>;

    // Use renderToString to test server-side rendering
    const html = renderToString(
      <ErrorBoundary>
        <Child />
      </ErrorBoundary>,
    );

    expect(html).toContain("Test content");
  });

  it("should render error boundary component structure", () => {
    // Test that the component can be rendered without crashing
    const html = renderToString(
      <ErrorBoundary>
        <div>Test</div>
      </ErrorBoundary>,
    );

    // Should not contain error messages when there's no error
    expect(html).not.toContain("Something went wrong");
    expect(html).toContain("Test");
  });

  it("should handle component without children gracefully", () => {
    // Test with no children
    const html = renderToString(<ErrorBoundary />);

    // Should render without crashing
    expect(html).toBeDefined();
  });
});
