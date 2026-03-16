"use client";

import { useTranslations } from "next-intl";

interface AuthorBoxProps {
  author?: string;
  medicallyReviewedBy?: string;
  medicallyReviewedDate?: string;
}

export function AuthorBox({
  author = "Site Editorial Team",
  medicallyReviewedBy,
  medicallyReviewedDate,
}: AuthorBoxProps) {
  const t = useTranslations("authorBox");

  return (
    <div className="my-8 rounded-lg border border-gray-200 bg-gray-50 p-6 dark:border-gray-700 dark:bg-gray-800">
      <div className="flex items-start gap-4">
        <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-primary-100 dark:bg-primary-900">
          <span className="text-primary-500 text-xl">✍️</span>
        </div>
        <div>
          <h4 className="font-medium text-gray-900 dark:text-gray-100">
            {author}
          </h4>
          <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
            {t("teamDescription")}
          </p>
          {medicallyReviewedBy && (
            <div className="mt-3 border-t border-gray-200 pt-3 dark:border-gray-700">
              <p className="text-sm text-gray-600 dark:text-gray-300">
                <span className="font-medium">{t("medicallyReviewedBy")}</span>{" "}
                {medicallyReviewedBy}
              </p>
              {medicallyReviewedDate && (
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  {t("reviewedOn")}{" "}
                  {new Date(medicallyReviewedDate).toLocaleDateString(
                    undefined,
                    {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    },
                  )}
                </p>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}