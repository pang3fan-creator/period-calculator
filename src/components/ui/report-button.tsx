"use client";

import { useTranslations } from "next-intl";
import { useState } from "react";
import { AlertTriangleIcon } from "@/components/icons";
import { EmailModal } from "./email-modal";

const FEEDBACK_EMAIL = "hello@aiperiodcalculator.com";

export function ReportButton() {
  const t = useTranslations("reportButton");
  const [isOpen, setIsOpen] = useState(false);

  const pageUrl = typeof window !== "undefined" ? window.location.href : "";
  const subject = `${t("subject")} - ${pageUrl}`;
  const body = `${t("body")}\n\n${pageUrl}`;

  return (
    <>
      {/* Floating Button */}
      <button
        onClick={() => setIsOpen(true)}
        className="bg-primary-400 hover:bg-primary-500 focus:ring-primary-400 dark:bg-primary-400 dark:hover:bg-primary-500 fixed right-4 bottom-4 z-40 flex h-14 w-14 items-center justify-center rounded-full text-white shadow-lg transition-all hover:scale-105 hover:shadow-xl focus:ring-2 focus:ring-offset-2 focus:outline-none"
        aria-label={t("label")}
        title={t("label")}
      >
        <AlertTriangleIcon className="h-6 w-6" />
      </button>

      <EmailModal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        email={FEEDBACK_EMAIL}
        subject={subject}
        body={body}
        title={t("modalTitle")}
        description={t("modalDescription")}
      />
    </>
  );
}
