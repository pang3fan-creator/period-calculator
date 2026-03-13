"use client";

import Image from "next/image";
import { useTranslations } from "next-intl";
import { useState, useEffect, useRef } from "react";

/**
 * IrregularDeepKnowledge Section Component
 *
 * Displays educational content about irregular periods:
 * - What Is Actually "Normal"?
 * - Common Culprits Behind the Chaos
 * - How an Irregular Periods Calculator Bridges the Gap
 * - When to See a Doctor
 * - Empowerment Through Data
 *
 * Layout:
 * - Section with title, description, and five topic cards
 */
export function IrregularDeepKnowledge() {
  const t = useTranslations("irregularDeepKnowledge");
  const [isImageOpen, setIsImageOpen] = useState(false);
  const [openImage, setOpenImage] = useState<string | null>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const triggerButtonRef = useRef<HTMLDivElement>(null);
  const triggerButtonRef2 = useRef<HTMLDivElement>(null);

  // Focus management and keyboard support
  useEffect(() => {
    if (openImage) {
      setTimeout(() => {
        closeButtonRef.current?.focus();
      }, 50);
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
  }, [openImage]);

  // Keyboard support (Escape to close)
  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape" && openImage) {
        setOpenImage(null);
      }
    }
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [openImage]);

  const topics = ["normal", "culprits", "calculator", "doctor", "empowerment"];

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

        {/* Intro Description */}
        <p className="mb-6 text-sm leading-relaxed text-gray-600 dark:text-gray-300">
          {t("description")}
        </p>

        {/* Key Statistics Block - AI SEO Optimized */}
        <div className="bg-primary-50 dark:bg-primary-900/20 mb-8 rounded-2xl p-4">
          <h3 className="mb-4 text-center text-sm font-semibold text-gray-800 dark:text-white">
            {t("keyStatistics.title")}
          </h3>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
            <div className="text-center">
              <p className="text-primary-600 dark:text-primary-400 text-2xl font-bold">
                {t("keyStatistics.stat1.value")}
              </p>
              <p className="mt-1 text-xs text-gray-600 dark:text-gray-400">
                {t("keyStatistics.stat1.description")}
              </p>
            </div>
            <div className="text-center">
              <p className="text-primary-600 dark:text-primary-400 text-2xl font-bold">
                {t("keyStatistics.stat2.value")}
              </p>
              <p className="mt-1 text-xs text-gray-600 dark:text-gray-400">
                {t("keyStatistics.stat2.description")}
              </p>
            </div>
            <div className="text-center">
              <p className="text-primary-600 dark:text-primary-400 text-2xl font-bold">
                {t("keyStatistics.stat3.value")}
              </p>
              <p className="mt-1 text-xs text-gray-600 dark:text-gray-400">
                {t("keyStatistics.stat3.description")}
              </p>
            </div>
          </div>
        </div>

        {/* Topics */}
        {topics.map((topic, index) => (
          <div key={topic}>
            <div className="mb-6 last:mb-0">
              <h3 className="mb-2 text-lg font-semibold text-gray-800 dark:text-white">
                {t(`topics.${topic}.title`)}
              </h3>
              <p
                className={`text-sm leading-relaxed text-gray-600 dark:text-gray-300 ${topic === "culprits" || topic === "doctor" ? "whitespace-pre-wrap" : ""}`}
              >
                {t(`topics.${topic}.description`)}
              </p>

              {/* Image after normal topic */}
              {topic === "normal" && (
                <div
                  ref={triggerButtonRef}
                  className="focus:ring-primary-400 mt-6 cursor-pointer overflow-hidden rounded-2xl focus:ring-2 focus:ring-offset-2 focus:outline-none"
                  onClick={() =>
                    setOpenImage("/assets/Menstrual_infographic.jpg")
                  }
                  onKeyDown={(e) => {
                    if (e.key === "Enter" || e.key === " ") {
                      e.preventDefault();
                      setOpenImage("/assets/Menstrual_infographic.jpg");
                    }
                  }}
                  role="button"
                  tabIndex={0}
                  aria-label="Open menstrual cycle infographic"
                >
                  <Image
                    src="/assets/Menstrual_infographic.jpg"
                    alt="Menstrual cycle infographic showing normal cycle patterns"
                    width={800}
                    height={400}
                    className="h-auto w-full object-cover transition-opacity hover:opacity-95"
                  />
                </div>
              )}

              {/* Image after culprits topic - Endocrine/Metabolic Disorders */}
              {topic === "culprits" && (
                <div
                  ref={triggerButtonRef2}
                  className="focus:ring-primary-400 mt-6 cursor-pointer overflow-hidden rounded-2xl focus:ring-2 focus:ring-offset-2 focus:outline-none"
                  onClick={() =>
                    setOpenImage(
                      "/assets/Endocrine_Function_Metabolic_Disorders.jpg",
                    )
                  }
                  onKeyDown={(e) => {
                    if (e.key === "Enter" || e.key === " ") {
                      e.preventDefault();
                      setOpenImage(
                        "/assets/Endocrine_Function_Metabolic_Disorders.jpg",
                      );
                    }
                  }}
                  role="button"
                  tabIndex={0}
                  aria-label="Open endocrine function and metabolic disorders image"
                >
                  <Image
                    src="/assets/Endocrine_Function_Metabolic_Disorders.jpg"
                    alt="Endocrine function and metabolic disorders affecting menstrual cycles"
                    width={800}
                    height={400}
                    className="h-auto w-full object-cover transition-opacity hover:opacity-95"
                  />
                </div>
              )}
            </div>

            {/* Divider (except after last item) */}
            {index < topics.length - 1 && (
              <hr className="my-6 border-gray-200 dark:border-gray-700" />
            )}
          </div>
        ))}

        {/* References Section */}
        <hr className="my-6 border-gray-200 dark:border-gray-700" />
        <div>
          <h4 className="mb-3 text-base font-semibold text-gray-800 dark:text-white">
            {t("references")}
          </h4>
          <ol className="list-inside list-decimal space-y-1 text-sm text-gray-600 dark:text-gray-400">
            <li>
              <a
                href="https://www.acog.org/womens-health/faqs/abnormal-uterine-bleeding"
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary-500 hover:text-primary-600 dark:text-primary-400 dark:hover:text-primary-300 underline-offset-2 hover:underline"
              >
                American College of Obstetricians and Gynecologists (ACOG).
                "Abnormal Uterine Bleeding."
              </a>
            </li>
            <li>
              <a
                href="https://www.mayoclinic.org/womens-health/menstrual-cycle/expert-answers/faq-20058275"
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary-500 hover:text-primary-600 dark:text-primary-400 dark:hover:text-primary-300 underline-offset-2 hover:underline"
              >
                Mayo Clinic. "Menstrual cycle: What&apos;s normal, what&apos;s
                not."
              </a>
            </li>
            <li>
              <a
                href="https://www.nichd.nih.gov/health/topics/menstruation/conditioninfo/causes"
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary-500 hover:text-primary-600 dark:text-primary-400 dark:hover:text-primary-300 underline-offset-2 hover:underline"
              >
                National Institute of Child Health and Human Development
                (NICHD). "What causes menstrual irregularities?"
              </a>
            </li>
          </ol>
        </div>
      </div>

      {/* Image Lightbox Modal */}
      {openImage && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label="Image preview"
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4"
          onClick={(e) => {
            if (e.target === e.currentTarget) setOpenImage(null);
          }}
        >
          <div
            className="relative max-h-[90vh] w-full max-w-4xl overflow-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              ref={closeButtonRef}
              className="absolute top-4 right-4 z-10 flex h-10 w-10 items-center justify-center rounded-full bg-white/20 text-white transition-colors hover:bg-white/30 focus:ring-2 focus:ring-white/50 focus:outline-none"
              onClick={() => setOpenImage(null)}
              aria-label="Close"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={2}
                stroke="currentColor"
                className="h-6 w-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
            <Image
              src={openImage || ""}
              alt="Image preview"
              width={1200}
              height={600}
              className="h-auto w-full rounded-lg"
              priority
            />
          </div>
        </div>
      )}
    </section>
  );
}
