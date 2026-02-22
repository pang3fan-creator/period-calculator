"use client";

import { useTranslations } from "next-intl";
import { Link } from "@/i18n/routing";
import { useParams } from "next/navigation";

// Helper function to get items for each section
const sectionItemCounts: Record<string, number> = {
  dataCollection: 4,
  dataStorage: 4,
  dataUsage: 4,
  cookies: 3,
  thirdParty: 3,
  userRights: 4,
};

function getItemsForSection(
  sectionKey: string,
  t: ReturnType<typeof useTranslations>,
): string[] {
  const count = sectionItemCounts[sectionKey] || 0;
  const items: string[] = [];
  for (let i = 0; i < count; i++) {
    items.push(t(`sections.${sectionKey}.item${i}`));
  }
  return items;
}

// Shield icon
function ShieldIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
    </svg>
  );
}

// Check icon
function CheckIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <polyline points="20 6 9 17 4 12" />
    </svg>
  );
}

// Database icon
function DatabaseIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <ellipse cx="12" cy="5" rx="9" ry="3" />
      <path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3" />
      <path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5" />
    </svg>
  );
}

// Usage icon
function UsageIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="12" cy="12" r="10" />
      <path d="M12 16v-4" />
      <path d="M12 8h.01" />
    </svg>
  );
}

// Cookie icon
function CookieIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M12 2a10 10 0 1 0 10 10" />
      <path d="M12 12" />
      <circle cx="12" cy="12" r="2" />
    </svg>
  );
}

// Users icon
function UsersIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
      <circle cx="9" cy="7" r="4" />
      <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
      <path d="M16 3.13a4 4 0 0 1 0 7.75" />
    </svg>
  );
}

// Mail icon
function MailIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect width="20" height="16" x="2" y="4" rx="2" />
      <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
    </svg>
  );
}

const sectionIcons: Record<
  string,
  React.ComponentType<{ className?: string }>
> = {
  dataCollection: DatabaseIcon,
  dataStorage: ShieldIcon,
  dataUsage: UsageIcon,
  cookies: CookieIcon,
  thirdParty: UsersIcon,
  userRights: ShieldIcon,
  contact: MailIcon,
};

export default function PrivacyPolicyPage() {
  const t = useTranslations("privacyPolicy");
  const params = useParams();
  const locale = params.locale as string;

  const sections = [
    "dataCollection",
    "dataStorage",
    "dataUsage",
    "cookies",
    "thirdParty",
    "userRights",
    "contact",
  ] as const;

  const sectionsWithItems = [
    "dataCollection",
    "dataStorage",
    "dataUsage",
    "cookies",
    "thirdParty",
    "userRights",
  ] as const;

  const today = new Date().toLocaleDateString(
    locale === "en" ? "en-US" : locale === "es" ? "es-ES" : "fr-FR",
    {
      year: "numeric",
      month: "long",
      day: "numeric",
    },
  );

  return (
    <main className="bg-ivory-100 dark:bg-dark-bg min-h-screen px-4 py-12 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-4xl">
        {/* Header Section */}
        <div className="mb-12 text-center">
          <div className="bg-trust-blue-50 dark:bg-trust-blue-900/30 mb-6 inline-flex h-16 w-16 items-center justify-center rounded-full">
            <ShieldIcon className="text-trust-blue-500 h-8 w-8" />
          </div>
          <h1 className="font-heading mb-4 text-4xl font-bold text-gray-800 dark:text-white">
            {t("title")}
          </h1>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            {t("lastUpdated", { date: today })}
          </p>
        </div>

        {/* Introduction */}
        <div className="bg-warmbeige-50 dark:bg-dark-card border-warmbeige-200 dark:border-dark-border mb-8 rounded-3xl border p-6 sm:p-8">
          <p className="leading-relaxed text-gray-700 dark:text-gray-200">
            {t("intro")}
          </p>
        </div>

        {/* Content Sections */}
        <div className="space-y-6">
          {sections.map((sectionKey) => {
            const SectionIcon = sectionIcons[sectionKey] || ShieldIcon;
            const sectionTitle = t(`sections.${sectionKey}.title`);
            const sectionDescription = t(`sections.${sectionKey}.description`);
            const sectionItems = (
              sectionsWithItems as readonly string[]
            ).includes(sectionKey)
              ? getItemsForSection(sectionKey, t)
              : [];
            const sectionEmail =
              sectionKey === "contact"
                ? t(`sections.${sectionKey}.email`, {
                    email: "hello@periodcalculator.com",
                  })
                : null;

            return (
              <div
                key={sectionKey}
                className="bg-warmbeige-50 dark:bg-dark-card border-warmbeige-200 dark:border-dark-border hover:border-trust-blue-200 dark:hover:border-trust-blue-700 rounded-3xl border p-6 transition-colors duration-200 sm:p-8"
              >
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0">
                    <div className="bg-trust-blue-50 dark:bg-trust-blue-900/30 inline-flex h-10 w-10 items-center justify-center rounded-lg">
                      <SectionIcon className="text-trust-blue-500 h-5 w-5" />
                    </div>
                  </div>
                  <div className="min-w-0 flex-1">
                    <h2 className="font-heading mb-3 text-xl font-semibold text-gray-900 dark:text-white">
                      {sectionTitle}
                    </h2>
                    <p className="mb-4 leading-relaxed text-gray-600 dark:text-gray-300">
                      {sectionDescription}
                    </p>
                    {sectionItems.length > 0 && (
                      <ul className="space-y-2">
                        {sectionItems.map((item: string, index: number) => (
                          <li key={index} className="flex items-start gap-3">
                            <CheckIcon className="text-trust-green-500 mt-0.5 h-5 w-5 flex-shrink-0" />
                            <span className="text-sm text-gray-600 dark:text-gray-300">
                              {item}
                            </span>
                          </li>
                        ))}
                      </ul>
                    )}
                    {sectionEmail && (
                      <p className="mt-4 text-gray-600 dark:text-gray-300">
                        {sectionEmail}
                      </p>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Footer Navigation */}
        <div className="mt-12 text-center">
          <Link
            href={`/${locale}`}
            className="hover:text-trust-blue-500 dark:hover:text-trust-blue-400 focus-visible:ring-primary-400 inline-flex items-center gap-2 rounded-full text-gray-500 transition-colors duration-200 focus-visible:ring-2 focus-visible:ring-offset-2 dark:text-gray-400"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="m15 18-6-6 6-6" />
            </svg>
            <span className="text-sm">Back to Home</span>
          </Link>
        </div>
      </div>
    </main>
  );
}
