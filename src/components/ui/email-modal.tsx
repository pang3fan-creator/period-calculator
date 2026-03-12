"use client";

import { useTranslations } from "next-intl";
import { useState, useEffect } from "react";
import { CloseIcon, CheckIcon } from "@/components/icons";

interface EmailModalProps {
  isOpen: boolean;
  onClose: () => void;
  email: string;
  subject?: string;
  body?: string;
  title?: string;
  description?: string;
}

export function EmailModal({
  isOpen,
  onClose,
  email,
  subject,
  body,
  title,
  description,
}: EmailModalProps) {
  const t = useTranslations("emailModal");
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (!isOpen) {
      setCopied(false);
    }
  }, [isOpen]);

  const handleOpenEmail = () => {
    const subjectParam = subject
      ? `?subject=${encodeURIComponent(subject)}`
      : "";
    const bodyParam = body
      ? `${subject ? "&" : "?"}body=${encodeURIComponent(body)}`
      : "";
    window.location.href = `mailto:${email}${subjectParam}${bodyParam}`;
    onClose();
  };

  const handleCopyEmail = async () => {
    try {
      await navigator.clipboard.writeText(email);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Fallback for older browsers
      const textArea = document.createElement("textarea");
      textArea.value = email;
      document.body.appendChild(textArea);
      textArea.select();
      document.execCommand("copy");
      document.body.removeChild(textArea);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4"
      onClick={onClose}
    >
      <div
        className="dark:bg-dark-card relative w-full max-w-sm rounded-2xl bg-white p-6 shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          type="button"
          onClick={onClose}
          className="absolute top-4 right-4 flex h-8 w-8 items-center justify-center rounded-full bg-gray-100 text-gray-500 transition-colors hover:bg-gray-200 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600"
          aria-label={t("close")}
        >
          <CloseIcon className="h-4 w-4" />
        </button>

        {/* Header */}
        <div className="mb-6 text-center">
          <div className="bg-primary-100 text-primary-500 dark:bg-primary-900/30 mb-3 inline-flex h-12 w-12 items-center justify-center rounded-full">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="h-6 w-6"
            >
              <rect width="20" height="16" x="2" y="4" rx="2" />
              <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
            </svg>
          </div>
          <h3 className="text-lg font-bold text-gray-900 dark:text-white">
            {title || t("title")}
          </h3>
          <p className="mt-2 text-sm text-gray-600 dark:text-gray-300">
            {description || t("description")}
          </p>
        </div>

        {/* Email Display */}
        <div className="mb-4 rounded-lg bg-gray-50 p-3 dark:bg-gray-800">
          <p className="text-center text-sm font-medium text-gray-700 dark:text-gray-200">
            {email}
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col gap-3">
          <button
            type="button"
            onClick={handleOpenEmail}
            className="bg-primary-400 hover:bg-primary-500 flex w-full items-center justify-center gap-2 rounded-xl px-4 py-3 text-sm font-medium text-white transition-colors"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="h-5 w-5"
            >
              <rect width="20" height="16" x="2" y="4" rx="2" />
              <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
            </svg>
            {t("openEmail")}
          </button>

          <button
            type="button"
            onClick={handleCopyEmail}
            className="flex w-full items-center justify-center gap-2 rounded-xl border-2 border-gray-200 px-4 py-3 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-50 dark:border-gray-600 dark:text-gray-200 dark:hover:bg-gray-800"
          >
            {copied ? (
              <>
                <CheckIcon className="h-5 w-5 text-green-500" />
                {t("copied")}
              </>
            ) : (
              <>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="h-5 w-5"
                >
                  <rect width="14" height="14" x="8" y="8" rx="2" ry="2" />
                  <path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2" />
                </svg>
                {t("copyEmail")}
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
