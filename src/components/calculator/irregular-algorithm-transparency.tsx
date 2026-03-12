"use client";

import { useTranslations } from "next-intl";
import { Link } from "@/i18n/routing";

/**
 * IrregularAlgorithmTransparency Section Component
 *
 * Displays statistical methods used for irregular period prediction:
 * - Average Cycle calculation
 * - Standard Deviation for variability
 * - Confidence Level determination
 * - Prediction Window visualization
 *
 * Layout:
 * - Desktop: 3 cards in a row + prediction window bar
 * - Mobile: Stacked cards + prediction window
 */
export function IrregularAlgorithmTransparency() {
  const t = useTranslations("irregularAlgorithmTransparency");

  return (
    <section className="w-full">
      {/* Section Header */}
      <div className="mb-8 text-center">
        <h2 className="text-2xl font-bold text-gray-800 md:text-3xl dark:text-white">
          {t("title")}
        </h2>
      </div>

      {/* Container */}
      <div className="border-warmbeige-200 dark:border-dark-border dark:bg-dark-card overflow-hidden rounded-3xl border bg-white p-6 md:p-8">
        {/* Statistical Cards - Desktop */}
        <div className="hidden md:grid md:grid-cols-3 md:gap-6">
          <StatCard
            icon="📊"
            title={t("cards.averageCycle.title")}
            formula={t("cards.averageCycle.formula")}
          />
          <StatCard
            icon="📏"
            title={t("cards.standardDeviation.title")}
            formula={t("cards.standardDeviation.formula")}
          />
          <StatCard
            icon="🎯"
            title={t("cards.confidence.title")}
            rules={[
              t("cards.confidence.ruleHigh"),
              t("cards.confidence.ruleMedium"),
              t("cards.confidence.ruleLow"),
            ]}
          />
        </div>

        {/* Statistical Cards - Mobile */}
        <div className="space-y-4 md:hidden">
          <MobileStatCard
            icon="📊"
            title={t("cards.averageCycle.title")}
            formula={t("cards.averageCycle.formula")}
          />
          <MobileStatCard
            icon="📏"
            title={t("cards.standardDeviation.title")}
            formula={t("cards.standardDeviation.formula")}
          />
          <MobileConfidenceCard
            icon="🎯"
            title={t("cards.confidence.title")}
            rules={[
              t("cards.confidence.ruleHigh"),
              t("cards.confidence.ruleMedium"),
              t("cards.confidence.ruleLow"),
            ]}
          />
        </div>

        {/* Prediction Window */}
        <div className="mt-8 rounded-2xl bg-gray-50 p-4 dark:bg-gray-800/50 md:mt-10 md:p-6">
          <h3 className="mb-4 text-center text-sm font-semibold text-gray-700 dark:text-gray-300">
            📅 {t("predictionWindow.title")}
          </h3>

          {/* Desktop: Horizontal Timeline */}
          <div className="hidden md:block">
            <div className="relative">
              {/* Timeline Line */}
              <div className="absolute top-6 right-0 left-0 h-0.5 bg-gradient-to-r from-amber-300 via-primary-400 to-amber-300 dark:from-amber-600 dark:via-primary-500 dark:to-amber-600" />

              {/* Nodes */}
              <div className="relative grid grid-cols-3 gap-4">
                <PredictionNode
                  label={t("predictionWindow.earliest")}
                  variant="edge"
                />
                <PredictionNode
                  label={t("predictionWindow.mostLikely")}
                  variant="center"
                />
                <PredictionNode
                  label={t("predictionWindow.latest")}
                  variant="edge"
                />
              </div>
            </div>
          </div>

          {/* Mobile: Simple Row */}
          <div className="flex items-center justify-between gap-2 md:hidden">
            <MobilePredictionNode
              label={t("predictionWindow.earliest")}
              variant="edge"
            />
            <div className="h-0.5 flex-1 bg-gradient-to-r from-amber-300 via-primary-400 to-amber-300 dark:from-amber-600 dark:via-primary-500 dark:to-amber-600" />
            <MobilePredictionNode
              label={t("predictionWindow.mostLikely")}
              variant="center"
            />
            <div className="h-0.5 flex-1 bg-gradient-to-r from-amber-300 via-primary-400 to-amber-300 dark:from-amber-600 dark:via-primary-500 dark:to-amber-600" />
            <MobilePredictionNode
              label={t("predictionWindow.latest")}
              variant="edge"
            />
          </div>
        </div>

        {/* Learn More Link */}
        <div className="mt-8 border-t border-gray-100 pt-6 dark:border-gray-700">
          <div className="text-center">
            <Link
              href="/editorial-policy"
              className="text-primary-500 hover:text-primary-600 dark:text-primary-400 dark:hover:text-primary-300 text-sm font-medium transition-colors"
            >
              {t("learnMore")} →
            </Link>
          </div>

          {/* Disclaimer */}
          <p className="mt-4 text-center text-xs text-gray-500 dark:text-gray-400">
            {t("disclaimer")}
          </p>
        </div>
      </div>
    </section>
  );
}

/**
 * Desktop Stat Card Component
 */
function StatCard({
  icon,
  title,
  formula,
  rules,
}: {
  icon: string;
  title: string;
  formula?: string;
  rules?: string[];
}) {
  return (
    <div className="flex flex-col items-center rounded-2xl bg-gray-50 p-4 dark:bg-gray-800/50">
      {/* Icon */}
      <div className="mb-2 text-2xl" aria-hidden="true">
        {icon}
      </div>

      {/* Title */}
      <h3 className="mb-2 text-sm font-semibold text-gray-800 dark:text-white">
        {title}
      </h3>

      {/* Formula or Rules */}
      {formula && (
        <div className="rounded-lg bg-white px-3 py-2 dark:bg-gray-700">
          <p className="font-mono text-xs text-gray-700 dark:text-gray-300">
            {formula}
          </p>
        </div>
      )}

      {rules && (
        <ul className="space-y-1 text-center">
          {rules.map((rule, index) => (
            <li
              key={index}
              className="text-xs text-gray-600 dark:text-gray-400"
            >
              {rule}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

/**
 * Mobile Stat Card Component
 */
function MobileStatCard({
  icon,
  title,
  formula,
}: {
  icon: string;
  title: string;
  formula: string;
}) {
  return (
    <div className="flex items-center gap-4 rounded-2xl bg-gray-50 p-4 dark:bg-gray-800/50">
      <div className="text-xl" aria-hidden="true">
        {icon}
      </div>
      <div className="flex-1">
        <h3 className="mb-1 text-sm font-semibold text-gray-800 dark:text-white">
          {title}
        </h3>
        <p className="font-mono text-xs text-gray-600 dark:text-gray-400">
          {formula}
        </p>
      </div>
    </div>
  );
}

/**
 * Mobile Confidence Card Component
 */
function MobileConfidenceCard({
  icon,
  title,
  rules,
}: {
  icon: string;
  title: string;
  rules: string[];
}) {
  return (
    <div className="rounded-2xl bg-gray-50 p-4 dark:bg-gray-800/50">
      <div className="flex items-center gap-3">
        <div className="text-xl" aria-hidden="true">
          {icon}
        </div>
        <h3 className="text-sm font-semibold text-gray-800 dark:text-white">
          {title}
        </h3>
      </div>
      <ul className="mt-2 space-y-1 pl-9">
        {rules.map((rule, index) => (
          <li
            key={index}
            className="text-xs text-gray-600 dark:text-gray-400"
          >
            {rule}
          </li>
        ))}
      </ul>
    </div>
  );
}

/**
 * Desktop Prediction Node Component
 */
function PredictionNode({
  label,
  variant,
}: {
  label: string;
  variant: "edge" | "center";
}) {
  const nodeStyles =
    variant === "center"
      ? "bg-primary-100 dark:bg-primary-900/50 border-primary-300 dark:border-primary-600"
      : "bg-amber-100 dark:bg-amber-900/50 border-amber-300 dark:border-amber-600";

  return (
    <div className="flex flex-col items-center">
      {/* Node Circle */}
      <div
        className={`relative z-10 flex h-12 w-12 items-center justify-center rounded-full border-2 ${nodeStyles}`}
        role="img"
        aria-label={label}
      >
        <div
          className={`h-2 w-2 rounded-full ${variant === "center" ? "bg-primary-500 dark:bg-primary-400" : "bg-amber-500 dark:bg-amber-400"}`}
        />
      </div>

      {/* Label */}
      <p className="mt-2 text-xs font-medium text-gray-700 dark:text-gray-300">
        {label}
      </p>
    </div>
  );
}

/**
 * Mobile Prediction Node Component
 */
function MobilePredictionNode({
  label,
  variant,
}: {
  label: string;
  variant: "edge" | "center";
}) {
  const nodeStyles =
    variant === "center"
      ? "bg-primary-100 dark:bg-primary-900/50 border-primary-300 dark:border-primary-600"
      : "bg-amber-100 dark:bg-amber-900/50 border-amber-300 dark:border-amber-600";

  return (
    <div className="flex flex-col items-center">
      <div
        className={`flex h-8 w-8 items-center justify-center rounded-full border-2 ${nodeStyles}`}
        role="img"
        aria-label={label}
      >
        <div
          className={`h-1.5 w-1.5 rounded-full ${variant === "center" ? "bg-primary-500 dark:bg-primary-400" : "bg-amber-500 dark:bg-amber-400"}`}
        />
      </div>
      <p className="mt-1 text-[10px] font-medium text-gray-600 dark:text-gray-400">
        {label}
      </p>
    </div>
  );
}