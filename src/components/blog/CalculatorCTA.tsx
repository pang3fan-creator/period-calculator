"use client";

import { Link } from "@/i18n/routing";

interface CalculatorCTAProps {
  toolSlug: "ovulation" | "irregular";
  buttonText: string;
  text: string;
  privateInfo?: string;
}

export function CalculatorCTA({
  toolSlug,
  buttonText,
  text,
  privateInfo,
}: CalculatorCTAProps) {
  const href =
    toolSlug === "ovulation"
      ? "/ovulation-period-calculator"
      : "/irregular-period-calculator";

  return (
    <div className="border-primary-400 bg-primary-50 dark:border-primary-500 dark:bg-primary-900/20 my-8 flex flex-col items-stretch gap-4 rounded-xl border-l-4 p-5 sm:flex-row sm:items-center">
      <div className="flex-1">
        <p className="text-gray-700 dark:text-gray-300">
          {text.split("**").map((part, index) =>
            index % 2 === 1 ? (
              <strong key={index} className="text-primary-500 font-semibold">
                {part}
              </strong>
            ) : (
              part
            ),
          )}
        </p>
        {privateInfo && (
          <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
            🔒 {privateInfo}
          </p>
        )}
      </div>
      <Link
        href={href}
        className="bg-primary-400 hover:bg-primary-500 rounded-lg px-5 py-2.5 text-center text-sm font-medium text-white transition-colors sm:flex-shrink-0"
      >
        {buttonText}
      </Link>
    </div>
  );
}
