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
    toolSlug === "ovulation" ? "/ovulation-period-calculator" : "/irregular-period-calculator";

  return (
    <div className="my-8 flex items-center gap-4 rounded-xl border-l-4 border-primary-400 bg-primary-50 p-5 dark:border-primary-500 dark:bg-primary-900/20">
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
        className="flex-shrink-0 rounded-lg bg-primary-400 px-5 py-2.5 text-sm font-medium text-white transition-colors hover:bg-primary-500"
      >
        {buttonText}
      </Link>
    </div>
  );
}