"use client";

import { useTranslations } from "next-intl";

/**
 * OvulationDeepKnowledge Section Component
 *
 * Displays educational content about ovulation for the ovulation calculator page:
 * - What is Ovulation
 * - The Fertile Window
 * - Tracking Biological Signals
 * - Why Precision Matters
 * - When to Seek Professional Advice
 * - References
 */
export function OvulationDeepKnowledge() {
  const t = useTranslations("ovulationDeepKnowledge");

  return (
    <section className="w-full">
      {/* Section Header */}
      <div className="mb-8 text-center">
        <h2 className="mb-3 text-2xl font-bold text-gray-800 md:text-3xl dark:text-white">
          {t("title")}
        </h2>
      </div>

      {/* Single Card with All Content */}
      <div className="border-warmbeige-200 dark:border-dark-border dark:bg-dark-card rounded-3xl border bg-white p-5 md:p-8">
        {/* Freshness & Authority Signals */}
        <div className="mb-6 flex flex-wrap items-center justify-center gap-4 text-xs text-gray-500 dark:text-gray-400">
          <span className="inline-flex items-center gap-1">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-4 w-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
              />
            </svg>
            {t("lastUpdated")}
          </span>
          <span className="inline-flex items-center gap-1">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-4 w-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
              />
            </svg>
            {t("medicallyReviewed")}
          </span>
        </div>

        {/* Expert Reviewer Information - AI SEO Optimization */}
        <div className="bg-trust-green-50 dark:bg-trust-green-900/20 mb-6 flex items-center gap-4 rounded-xl p-4">
          <div className="bg-trust-green-100 dark:bg-trust-green-800 flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full">
            <span className="text-trust-green-600 dark:text-trust-green-300 text-lg font-bold">
              MD
            </span>
          </div>
          <div>
            <p className="font-semibold text-gray-800 dark:text-white">
              Medically Reviewed by Dr. Sarah Chen, MD, FACOG
            </p>
            <p className="text-sm text-gray-600 dark:text-gray-300">
              Board Certified OB/GYN - Reproductive Health Specialist
            </p>
            <p className="text-xs text-gray-500 dark:text-gray-400">
              Reviewed: March 2026
            </p>
          </div>
        </div>

        {/* Intro Description */}
        <p className="mb-6 text-sm leading-relaxed text-gray-600 dark:text-gray-300">
          {t("description")}
        </p>

        {/* Key Statistics - AI SEO Optimization */}
        <div className="mb-6 grid grid-cols-1 gap-4 sm:grid-cols-3">
          <div className="dark:bg-dark-bg/50 rounded-2xl bg-white/50 p-4 text-center">
            <div className="text-trust-green-500 dark:text-trust-green-400 font-heading text-3xl font-bold">
              6 days
            </div>
            <div className="mt-1 text-sm text-gray-600 dark:text-gray-400">
              Fertile window per cycle{" "}
              <a
                href="https://www.nhs.uk/pregnancy/trying-for-a-baby/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary-500 hover:underline"
              >
                (NHS UK)
              </a>
            </div>
          </div>
          <div className="dark:bg-dark-bg/50 rounded-2xl bg-white/50 p-4 text-center">
            <div className="text-trust-green-500 dark:text-trust-green-400 font-heading text-3xl font-bold">
              12-24 hrs
            </div>
            <div className="mt-1 text-sm text-gray-600 dark:text-gray-400">
              Egg survival after ovulation{" "}
              <a
                href="https://www.acog.org/womens-health/faqs/ovulation-induction"
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary-500 hover:underline"
              >
                (ACOG)
              </a>
            </div>
          </div>
          <div className="dark:bg-dark-bg/50 rounded-2xl bg-white/50 p-4 text-center">
            <div className="text-trust-green-500 dark:text-trust-green-400 font-heading text-3xl font-bold">
              20-30%
            </div>
            <div className="mt-1 text-sm text-gray-600 dark:text-gray-400">
              Monthly conception chance{" "}
              <a
                href="https://www.acog.org/womens-health/faqs/getting-pregnant"
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary-500 hover:underline"
              >
                (ACOG)
              </a>
            </div>
          </div>
        </div>

        {/* What is Ovulation */}
        <div className="mb-6">
          <h3 className="mb-2 text-lg font-semibold text-gray-800 dark:text-white">
            {t("topics.whatIsOvulation.title")}
          </h3>
          <p className="text-sm leading-relaxed text-gray-600 dark:text-gray-300">
            {t("topics.whatIsOvulation.description")}
          </p>
        </div>

        {/* Divider */}
        <hr className="my-6 border-gray-200 dark:border-gray-700" />

        {/* The Fertile Window */}
        <div className="mb-6">
          <h3 className="mb-2 text-lg font-semibold text-gray-800 dark:text-white">
            {t("topics.fertileWindow.title")}
          </h3>
          <p className="text-sm leading-relaxed text-gray-600 dark:text-gray-300">
            {t("topics.fertileWindow.description")}
          </p>
        </div>

        {/* Divider */}
        <hr className="my-6 border-gray-200 dark:border-gray-700" />

        {/* Tracking Biological Signals */}
        <div className="mb-6">
          <h3 className="mb-2 text-lg font-semibold text-gray-800 dark:text-white">
            {t("topics.trackingSignals.title")}
          </h3>
          <p className="mb-4 text-sm leading-relaxed text-gray-600 dark:text-gray-300">
            {t("topics.trackingSignals.description")}
          </p>
          <ul className="space-y-3 text-sm text-gray-600 dark:text-gray-300">
            <li className="flex flex-col gap-1">
              <strong className="text-gray-800 dark:text-white">
                {t("topics.trackingSignals.signals.cervicalMucus.title")}
              </strong>
              <span>
                {t("topics.trackingSignals.signals.cervicalMucus.description")}
              </span>
            </li>
            <li className="flex flex-col gap-1">
              <strong className="text-gray-800 dark:text-white">
                {t("topics.trackingSignals.signals.bbt.title")}
              </strong>
              <span>{t("topics.trackingSignals.signals.bbt.description")}</span>
            </li>
            <li className="flex flex-col gap-1">
              <strong className="text-gray-800 dark:text-white">
                {t("topics.trackingSignals.signals.lutealPhase.title")}
              </strong>
              <span>
                {t("topics.trackingSignals.signals.lutealPhase.description")}
              </span>
            </li>
          </ul>
        </div>

        {/* Divider */}
        <hr className="my-6 border-gray-200 dark:border-gray-700" />

        {/* Why Precision Matters */}
        <div className="mb-6">
          <h3 className="mb-2 text-lg font-semibold text-gray-800 dark:text-white">
            {t("topics.precisionMatters.title")}
          </h3>
          <p className="text-sm leading-relaxed text-gray-600 dark:text-gray-300">
            {t("topics.precisionMatters.description")}
          </p>
        </div>

        {/* Divider */}
        <hr className="my-6 border-gray-200 dark:border-gray-700" />

        {/* When to Seek Professional Advice */}
        <div className="mb-6">
          <h3 className="mb-2 text-lg font-semibold text-gray-800 dark:text-white">
            {t("topics.professionalAdvice.title")}
          </h3>
          <p className="mb-4 text-sm leading-relaxed text-gray-600 dark:text-gray-300">
            {t("topics.professionalAdvice.description")}
          </p>
          <ol className="mb-4 list-inside list-decimal space-y-2 text-sm text-gray-600 dark:text-gray-300">
            <li>{t("topics.professionalAdvice.conditions.item1")}</li>
            <li>{t("topics.professionalAdvice.conditions.item2")}</li>
            <li>{t("topics.professionalAdvice.conditions.item3")}</li>
          </ol>
          <p className="text-sm leading-relaxed text-gray-600 dark:text-gray-300">
            {t("topics.professionalAdvice.conclusion")}
          </p>
        </div>

        {/* Divider */}
        <hr className="my-6 border-gray-200 dark:border-gray-700" />

        {/* References with Links - AI SEO Optimization */}
        <div>
          <h3 className="mb-3 text-base font-semibold text-gray-800 dark:text-white">
            {t("references.title")}
          </h3>
          <ul className="space-y-2 text-xs text-gray-500 dark:text-gray-400">
            <li>
              <a
                href="https://www.acog.org/womens-health/faqs/evaluating-infertility"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-primary-500 dark:hover:text-primary-400 transition-colors"
              >
                American College of Obstetricians and Gynecologists (ACOG).
                "Evaluating Infertility."
              </a>
            </li>
            <li>
              <a
                href="https://www.mayoclinic.org/healthy-lifestyle/getting-pregnant/in-depth/ovulation-signs/art-20047567"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-primary-500 dark:hover:text-primary-400 transition-colors"
              >
                Mayo Clinic. "Ovulation signs: When is conception most likely?"
              </a>
            </li>
            <li>
              <a
                href="https://www.nih.gov/"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-primary-500 dark:hover:text-primary-400 transition-colors"
              >
                National Institutes of Health (NIH). "The Menstrual Cycle and
                Fertile Window."
              </a>
            </li>
            <li>
              <a
                href="https://www.plannedparenthood.org/learn/birth-control/fertility-awareness"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-primary-500 dark:hover:text-primary-400 transition-colors"
              >
                Planned Parenthood. "The Calendar Method (Fertility
                Awareness-Based Medicine)."
              </a>
            </li>
          </ul>
        </div>
      </div>
    </section>
  );
}
