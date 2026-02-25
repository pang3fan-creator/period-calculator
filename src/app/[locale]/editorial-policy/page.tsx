import { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/routing";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const titles: Record<string, string> = {
    en: "Editorial Policy - Medical Sources & Accuracy Commitment",
    es: "Política Editorial - Fuentes Médicas y Compromiso de Precisión",
    fr: "Politique Éditoriale - Sources Médicales et Engagement de Précision",
  };
  const descriptions: Record<string, string> = {
    en: "Read about our editorial process, medical sources, and commitment to accurate health information.",
    es: "Lee sobre nuestro proceso editorial, fuentes médicas y compromiso con información de salud precisa.",
    fr: "Découvrez notre processus éditorial, nos sources médicales et notre engagement envers des informations de santé précises.",
  };
  return {
    title: titles[locale] || titles.en,
    description: descriptions[locale] || descriptions.en,
  };
}

// Helper function to get items for each section
const sectionItemCounts: Record<string, number> = {
  medicalSources: 4,
  reviewProcess: 4,
  updateFrequency: 4,
  accuracyCommitment: 4,
  disclaimer: 4,
};

function getItemsForSection(
  sectionKey: string,
  t: Awaited<ReturnType<typeof getTranslations>>,
): string[] {
  const count = sectionItemCounts[sectionKey] || 0;
  const items: string[] = [];
  for (let i = 0; i < count; i++) {
    items.push(t(`sections.${sectionKey}.item${i}`));
  }
  return items;
}

// Book icon
function BookOpenIcon({ className }: { className?: string }) {
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
      aria-hidden="true"
    >
      <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z" />
      <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z" />
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
      aria-hidden="true"
    >
      <polyline points="20 6 9 17 4 12" />
    </svg>
  );
}

// Clipboard check icon
function ClipboardCheckIcon({ className }: { className?: string }) {
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
      aria-hidden="true"
    >
      <rect width="8" height="4" x="8" y="2" rx="1" ry="1" />
      <path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2" />
      <path d="m9 14 2 2 4-4" />
    </svg>
  );
}

// Refresh icon
function RefreshIcon({ className }: { className?: string }) {
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
      aria-hidden="true"
    >
      <path d="M3 12a9 9 0 0 1 9-9 9.75 9.75 0 0 1 6.74 2.74L21 8" />
      <path d="M21 3v5h-5" />
      <path d="M21 12a9 9 0 0 1-9 9 9.75 9.75 0 0 1-6.74-2.74L3 16" />
      <path d="M8 16H3v5" />
    </svg>
  );
}

// Target icon
function TargetIcon({ className }: { className?: string }) {
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
      aria-hidden="true"
    >
      <circle cx="12" cy="12" r="10" />
      <circle cx="12" cy="12" r="6" />
      <circle cx="12" cy="12" r="2" />
    </svg>
  );
}

// Alert triangle icon
function AlertTriangleIcon({ className }: { className?: string }) {
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
      aria-hidden="true"
    >
      <path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z" />
      <path d="M12 9v4" />
      <path d="M12 17h.01" />
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
      aria-hidden="true"
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
  medicalSources: BookOpenIcon,
  reviewProcess: ClipboardCheckIcon,
  updateFrequency: RefreshIcon,
  accuracyCommitment: TargetIcon,
  disclaimer: AlertTriangleIcon,
  contact: MailIcon,
};

export default async function EditorialPolicyPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations("editorialPolicy");

  const sections = [
    "medicalSources",
    "reviewProcess",
    "updateFrequency",
    "accuracyCommitment",
    "disclaimer",
    "contact",
  ] as const;

  const sectionsWithItems = [
    "medicalSources",
    "reviewProcess",
    "updateFrequency",
    "accuracyCommitment",
    "disclaimer",
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
          <div className="bg-trust-green-50 dark:bg-trust-green-900/30 mb-6 inline-flex h-16 w-16 items-center justify-center rounded-full">
            <BookOpenIcon className="text-trust-green-500 h-8 w-8" />
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
            const SectionIcon = sectionIcons[sectionKey] || BookOpenIcon;
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
                className="bg-warmbeige-50 dark:bg-dark-card border-warmbeige-200 dark:border-dark-border hover:border-trust-green-200 dark:hover:border-trust-green-700 rounded-3xl border p-6 transition-colors duration-200 sm:p-8"
              >
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0">
                    <div className="bg-trust-green-50 dark:bg-trust-green-900/30 inline-flex h-10 w-10 items-center justify-center rounded-lg">
                      <SectionIcon className="text-trust-green-500 h-5 w-5" />
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
            href="/"
            className="hover:text-trust-green-500 dark:hover:text-trust-green-400 focus-visible:ring-primary-400 inline-flex items-center gap-2 rounded-full text-gray-500 transition-colors duration-200 focus-visible:ring-2 focus-visible:ring-offset-2 dark:text-gray-400"
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
              aria-hidden="true"
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
