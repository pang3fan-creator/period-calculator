"use client";

import { Component, ReactNode, useState } from "react";
import { useTranslations } from "next-intl";

interface ErrorBoundaryProps {
  children: ReactNode;
  fallback?: ReactNode;
}

interface ErrorBoundaryState {
  hasError: boolean;
  error?: Error;
}

/**
 * Error Boundary Component
 *
 * Catches React errors in child components and displays a fallback UI.
 * This prevents the entire app from crashing due to component errors.
 */
export function ErrorBoundary({ children, fallback }: ErrorBoundaryProps) {
  const [hasError, setHasError] = useState(false);
  const [error, setError] = useState<Error | undefined>();
  const t = useTranslations("errorBoundary");

  const handleReset = () => {
    setHasError(false);
    setError(undefined);
  };

  // Use componentDidCatch equivalent via useEffect
  // This is handled by the class wrapper below for actual error catching

  if (hasError) {
    if (fallback) {
      return <>{fallback}</>;
    }

    return (
      <div className="flex min-h-[400px] flex-col items-center justify-center p-8 text-center">
        <div className="mb-4 rounded-full bg-red-100 p-4 dark:bg-red-900/30">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="48"
            height="48"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="text-red-500"
            aria-hidden="true"
          >
            <circle cx="12" cy="12" r="10" />
            <line x1="12" y1="8" x2="12" y2="12" />
            <line x1="12" y1="16" x2="12.01" y2="16" />
          </svg>
        </div>
        <h2 className="mb-2 text-xl font-semibold text-gray-800 dark:text-gray-200">
          {t("title")}
        </h2>
        <p className="mb-6 max-w-md text-gray-600 dark:text-gray-400">
          {error?.message || t("message")}
        </p>
        <button
          onClick={handleReset}
          className="bg-primary-400 hover:bg-primary-500 rounded-xl px-6 py-3 font-medium text-white transition-colors"
        >
          {t("tryAgain")}
        </button>
      </div>
    );
  }

  return (
    <ErrorBoundaryChild
      onError={(err) => {
        setHasError(true);
        setError(err);
      }}
    >
      {children}
    </ErrorBoundaryChild>
  );
}

// Inner component that uses class for error boundary functionality
class ErrorBoundaryChild extends Component<
  { children: ReactNode; onError: (error: Error) => void },
  ErrorBoundaryState
> {
  constructor(props: { children: ReactNode; onError: (error: Error) => void }) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    this.props.onError(error);
    if (process.env.NODE_ENV === "development") {
      console.error("ErrorBoundary caught an error:", error, errorInfo);
    }
  }

  render() {
    return this.props.children;
  }
}
