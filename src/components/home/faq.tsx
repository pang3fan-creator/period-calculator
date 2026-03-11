"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";

const faqItems = [
  "latePeriod",
  "nextPeriodDate",
  "safePeriod",
  "periodEarly",
  "normalFlow",
  "pregnancyFromLmp",
] as const;

/**
 * FAQ Section Component
 *
 * Displays frequently asked questions about menstrual health
 * in an accordion-style layout.
 *
 * Features:
 * - Smooth expand/collapse animation
 * - Single item open at a time
 * - Mobile-friendly touch targets
 */
export function FAQ() {
  const t = useTranslations("faq");
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggle = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="w-full">
      {/* Section Header */}
      <div className="mb-8 text-center">
        <h2 className="mb-3 text-2xl font-bold text-gray-800 md:text-3xl dark:text-white">
          {t("title")}
        </h2>
      </div>

      {/* FAQ Items */}
      <div className="mx-auto max-w-3xl space-y-3">
        {faqItems.map((itemKey, index) => {
          const isOpen = openIndex === index;
          return (
            <div
              key={itemKey}
              className="border-warmbeige-200 dark:border-dark-border dark:bg-dark-card overflow-hidden rounded-3xl border bg-white"
            >
              {/* Question Button */}
              <button
                id={`faq-question-${index}`}
                onClick={() => toggle(index)}
                className="flex min-h-[48px] w-full items-center justify-between p-4 text-left font-medium text-gray-800 transition-colors hover:bg-gray-50 md:p-5 dark:text-white dark:hover:bg-white/5"
                aria-expanded={isOpen}
                aria-controls={`faq-answer-${index}`}
                aria-label={
                  isOpen
                    ? t("collapseLabel", {
                        question: t(`items.${itemKey}.question`),
                      })
                    : t("expandLabel", {
                        question: t(`items.${itemKey}.question`),
                      })
                }
              >
                <span className="pr-4">{t(`items.${itemKey}.question`)}</span>
                <span
                  className={`text-primary-500 shrink-0 transition-transform duration-200 ${
                    isOpen ? "rotate-180" : ""
                  }`}
                >
                  <svg
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <polyline points="6 9 12 15 18 9"></polyline>
                  </svg>
                </span>
              </button>

              {/* Answer */}
              <div
                id={`faq-answer-${index}`}
                role="region"
                aria-labelledby={`faq-question-${index}`}
                className={`overflow-hidden transition-all duration-300 ease-in-out ${
                  isOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
                }`}
              >
                <div className="border-warmbeige-100 dark:border-dark-border bg-gray-50 px-4 pt-2 pb-4 md:px-5 dark:bg-white/5">
                  <p className="text-sm leading-relaxed text-gray-600 dark:text-gray-300">
                    {t(`items.${itemKey}.answer`)}
                  </p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
