"use client";

import { useTranslations } from "next-intl";

const topics = [
  "delayedPeriod",
  "irregularCycle",
  "periodsAhead",
  "periodDuration",
] as const;

/**
 * DeepKnowledge Section Component
 *
 * Displays educational content about menstrual health:
 * - Why periods might be delayed
 * - What irregular cycles mean
 * - When to seek medical help
 *
 * Layout:
 * - Single column stack (4 topics vertically)
 */
export function DeepKnowledge() {
  const t = useTranslations("deepKnowledge");

  return (
    <section className="w-full">
      {/* Section Header */}
      <div className="mb-8 text-center">
        <h2 className="mb-3 text-2xl font-bold text-gray-800 md:text-3xl dark:text-white">
          {t("title")}
        </h2>
        <p className="text-gray-600 dark:text-gray-300">{t("description")}</p>
      </div>

      {/* Topics Grid */}
      <div className="flex flex-col gap-4 md:gap-6">
        {topics.map((topicKey) => (
          <div
            key={topicKey}
            className="border-warmbeige-200 dark:border-dark-border dark:bg-dark-card hover:border-primary-200 dark:hover:border-primary-700 flex flex-col gap-4 rounded-3xl border bg-white p-5 transition-colors md:p-6"
          >
            {/* Topic Title */}
            <h3 className="text-lg font-semibold text-gray-800 dark:text-white">
              {t(`topics.${topicKey}.title`)}
            </h3>

            {/* Topic Description */}
            <p className="text-sm leading-relaxed text-gray-600 dark:text-gray-300">
              {t(`topics.${topicKey}.description`)}
            </p>

            {/* Key Points */}
            <ul role="list" className="mt-1 space-y-2">
              {["point1", "point2", "point3"].map((pointKey) => {
                const pointText = t(`topics.${topicKey}.${pointKey}`);
                // Only render if point exists
                if (pointText === `topics.${topicKey}.${pointKey}`) return null;
                return (
                  <li
                    key={pointKey}
                    className="flex items-start gap-2 text-sm text-gray-600 dark:text-gray-300"
                  >
                    <span className="text-primary-500 mt-0.5">•</span>
                    <span>{pointText}</span>
                  </li>
                );
              })}
            </ul>

            {/* When to see a doctor */}
            {topicKey === "delayedPeriod" && (
              <div className="mt-2 rounded-2xl bg-amber-50 p-4 dark:bg-amber-900/20">
                <p className="text-sm font-medium text-amber-800 dark:text-amber-200">
                  {t("topics.delayedPeriod.seeDoctor")}
                </p>
              </div>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}
