"use client";

import Image from "next/image";
import { useTranslations } from "next-intl";
import { useState } from "react";

/**
 * DeepKnowledge Section Component
 *
 * Displays educational content about the menstrual cycle phases:
 * - The Follicular Phase
 * - Ovulation
 * - The Luteal Phase
 *
 * Layout:
 * - Single card with intro text, image, and three phases stacked vertically
 */
export function DeepKnowledge() {
  const t = useTranslations("deepKnowledge");
  const [isImageOpen, setIsImageOpen] = useState(false);

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
        {/* Intro Description */}
        <p className="mb-6 text-sm leading-relaxed text-gray-600 dark:text-gray-300">
          {t("description")}
        </p>

        {/* Cycle Image (Clickable) */}
        <div
          className="mb-6 overflow-hidden rounded-2xl cursor-pointer"
          onClick={() => setIsImageOpen(true)}
        >
          <Image
            src="/assets/menstrual_cycle.jpg"
            alt="the menstrual cycle phases including follicular phase, ovulation, and luteal phase"
            width={800}
            height={400}
            className="w-full h-auto object-cover hover:opacity-95 transition-opacity"
          />
        </div>

        {/* Follicular Phase */}
        <div className="mb-6 last:mb-0">
          <h3 className="mb-2 text-lg font-semibold text-gray-800 dark:text-white">
            {t("topics.follicularPhase.title")}
          </h3>
          <p className="text-sm leading-relaxed text-gray-600 dark:text-gray-300">
            {t("topics.follicularPhase.description")}
          </p>
        </div>

        {/* Divider */}
        <hr className="my-6 border-gray-200 dark:border-gray-700" />

        {/* Ovulation */}
        <div className="mb-6 last:mb-0">
          <h3 className="mb-2 text-lg font-semibold text-gray-800 dark:text-white">
            {t("topics.ovulation.title")}
          </h3>
          <p className="text-sm leading-relaxed text-gray-600 dark:text-gray-300">
            {t("topics.ovulation.description")}
          </p>
        </div>

        {/* Divider */}
        <hr className="my-6 border-gray-200 dark:border-gray-700" />

        {/* Luteal Phase */}
        <div className="mb-6 last:mb-0">
          <h3 className="mb-2 text-lg font-semibold text-gray-800 dark:text-white">
            {t("topics.lutealPhase.title")}
          </h3>
          <p className="text-sm leading-relaxed text-gray-600 dark:text-gray-300">
            {t("topics.lutealPhase.description")}
          </p>
        </div>
      </div>

      {/* Image Lightbox Modal */}
      {isImageOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4"
          onClick={() => setIsImageOpen(false)}
        >
          <div className="relative max-w-4xl w-full max-h-[90vh] overflow-auto">
            <button
              className="absolute top-4 right-4 z-10 w-10 h-10 flex items-center justify-center rounded-full bg-white/20 hover:bg-white/30 text-white transition-colors"
              onClick={() => setIsImageOpen(false)}
              aria-label="Close"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={2}
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
            <Image
              src="/assets/menstrual_cycle.jpg"
              alt="the menstrual cycle phases including follicular phase, ovulation, and luteal phase"
              width={1200}
              height={600}
              className="w-full h-auto rounded-lg"
              priority
            />
          </div>
        </div>
      )}
    </section>
  );
}
