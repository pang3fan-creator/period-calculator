"use client";

import { useTranslations } from "next-intl";
import { Link } from "@/i18n/routing";

/**
 * OvulationAlgorithmTransparency Section Component
 *
 * Displays a visual timeline showing how the ovulation calculator works,
 * with formulas.
 *
 * Layout:
 * - Desktop: Horizontal timeline with formula cards
 * - Mobile: Vertical timeline
 */
export function OvulationAlgorithmTransparency() {
  const t = useTranslations("ovulationAlgorithmTransparency");

  return (
    <section className="w-full">
      {/* Section Header */}
      <div className="mb-8 text-center">
        <h2 className="text-2xl font-bold text-gray-800 md:text-3xl dark:text-white">
          {t("title")}
        </h2>
      </div>

      {/* Timeline Container */}
      <div className="border-warmbeige-200 dark:border-dark-border dark:bg-dark-card overflow-hidden rounded-3xl border bg-white p-6 md:p-8">
        {/* Desktop: Horizontal Timeline */}
        <div className="hidden md:block">
          <div className="relative">
            {/* Timeline Line */}
            <div className="from-primary-200 via-primary-400 to-primary-200 dark:from-primary-700 dark:via-primary-500 dark:to-primary-700 absolute top-[60px] right-0 left-0 h-0.5 bg-gradient-to-r" />

            {/* Timeline Nodes */}
            <div className="relative grid grid-cols-3 gap-6">
              {/* Node 1: Ovulation Day */}
              <TimelineNode
                icon="🥚"
                label={t("timeline.ovulationDay")}
                formula={t("formulas.ovulationDay")}
                position="start"
              />

              {/* Node 2: Fertile Window */}
              <TimelineNode
                icon="🎯"
                label={t("timeline.fertileWindow")}
                formula={t("formulas.fertileWindow")}
                position="middle"
              />

              {/* Node 3: Next Period */}
              <TimelineNode
                icon="📆"
                label={t("timeline.nextPeriod")}
                formula={t("formulas.nextPeriod")}
                position="end"
              />
            </div>
          </div>
        </div>

        {/* Mobile: Vertical Timeline */}
        <div className="md:hidden">
          <div className="relative space-y-6">
            {/* Vertical Line */}
            <div className="from-primary-200 via-primary-400 to-primary-200 dark:from-primary-700 dark:via-primary-500 dark:to-primary-700 absolute top-0 bottom-0 left-5 w-0.5 bg-gradient-to-b" />

            {/* Timeline Items */}
            <MobileTimelineItem
              icon="🥚"
              label={t("timeline.ovulationDay")}
              formula={t("formulas.ovulationDay")}
            />
            <MobileTimelineItem
              icon="🎯"
              label={t("timeline.fertileWindow")}
              formula={t("formulas.fertileWindow")}
            />
            <MobileTimelineItem
              icon="📆"
              label={t("timeline.nextPeriod")}
              formula={t("formulas.nextPeriod")}
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
 * Desktop Timeline Node Component
 */
function TimelineNode({
  icon,
  label,
  formula,
  position,
}: {
  icon: string;
  label: string;
  formula: string;
  position: "start" | "middle" | "end";
}) {
  return (
    <div
      className={`flex flex-col items-center ${position === "start" ? "items-start text-left" : position === "end" ? "items-end text-right" : ""}`}
    >
      {/* Icon Circle */}
      <div className="bg-primary-100 dark:bg-primary-900/50 border-primary-300 dark:border-primary-600 relative z-10 flex h-12 w-12 items-center justify-center rounded-full border-2 text-xl">
        {icon}
      </div>

      {/* Label */}
      <h3 className="mt-3 text-sm font-semibold text-gray-800 dark:text-white">
        {label}
      </h3>

      {/* Formula Card */}
      <div className="mt-2 rounded-lg bg-gray-50 px-3 py-2 dark:bg-gray-800">
        <p className="font-mono text-xs text-gray-700 dark:text-gray-300">
          {formula}
        </p>
      </div>
    </div>
  );
}

/**
 * Mobile Timeline Item Component
 */
function MobileTimelineItem({
  icon,
  label,
  formula,
}: {
  icon: string;
  label: string;
  formula: string;
}) {
  return (
    <div className="relative flex gap-4 pl-2">
      {/* Icon Circle */}
      <div className="bg-primary-100 dark:bg-primary-900/50 border-primary-300 dark:border-primary-600 relative z-10 flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full border-2 text-lg">
        {icon}
      </div>

      {/* Content */}
      <div className="flex-1 pb-2">
        <h3 className="text-sm font-semibold text-gray-800 dark:text-white">
          {label}
        </h3>
        <div className="mt-2 rounded-lg bg-gray-50 px-3 py-2 dark:bg-gray-800">
          <p className="font-mono text-xs text-gray-700 dark:text-gray-300">
            {formula}
          </p>
        </div>
      </div>
    </div>
  );
}
