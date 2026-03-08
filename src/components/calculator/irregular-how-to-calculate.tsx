"use client";

import { useTranslations } from "next-intl";

const steps = ["step1", "step2", "step3", "step4"] as const;

// Step number icons
function StepIcon({ number }: { number: number }) {
  return (
    <div className="bg-primary-100 text-primary-600 dark:bg-primary-900/30 dark:text-primary-400 flex h-10 w-10 items-center justify-center rounded-full">
      <span className="text-lg font-bold">{number}</span>
    </div>
  );
}

/**
 * IrregularHowToCalculate Section Component
 *
 * Displays a 4-step explanation of how the irregular period calculator works.
 * Each step includes an icon, title, and description.
 *
 * Layout:
 * - Desktop: 2x2 grid
 * - Mobile: Single column stack
 */
export function IrregularHowToCalculate() {
  const t = useTranslations("irregularHowToCalculate");

  return (
    <section className="w-full">
      {/* Section Header */}
      <div className="mb-8 text-center">
        <h2 className="mb-3 text-2xl font-bold text-gray-800 md:text-3xl dark:text-white">
          {t("title")}
        </h2>
      </div>

      {/* Steps Grid */}
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-6">
        {steps.map((stepKey, index) => {
          const stepNumber = index + 1;
          return (
            <div
              key={stepKey}
              className="border-warmbeige-200 dark:border-dark-border dark:bg-dark-card hover:border-primary-200 dark:hover:border-primary-700 flex items-start gap-4 rounded-3xl border bg-white p-5 transition-colors md:p-6"
            >
              <StepIcon number={stepNumber} />
              <div className="min-w-0 flex-1">
                <h3 className="mb-2 text-lg font-semibold text-gray-800 dark:text-white">
                  {t(`steps.${stepKey}.title`)}
                </h3>
                <p className="text-sm leading-relaxed text-gray-600 dark:text-gray-300">
                  {t(`steps.${stepKey}.description`)}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
