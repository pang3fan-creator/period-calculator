import { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/routing";

const baseUrl = "https://www.aiperiodcalculator.com";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const canonicalUrl =
    locale === "en" ? `${baseUrl}/about` : `${baseUrl}/${locale}/about`;

  const localeNames: Record<string, string> = {
    en: "en-US",
    es: "es-ES",
    fr: "fr-FR",
  };
  const locales = ["en", "es", "fr"];

  return {
    title: "About Us - Period Calculator",
    description:
      "Learn about Period Calculator - a privacy-first menstrual cycle tracker. Our mission is to help women understand their bodies without compromising privacy.",
    openGraph: {
      title: "About Us - Period Calculator",
      description:
        "Learn about Period Calculator - a privacy-first menstrual cycle tracker. Our mission is to help women understand their bodies without compromising privacy.",
      url: canonicalUrl,
      siteName: "Period Calculator",
      locale: localeNames[locale],
      alternateLocale: locales.filter((l) => l !== locale).map((l) => localeNames[l]),
      type: "website",
      images: [
        {
          url: `${baseUrl}/og-image.png`,
          width: 1200,
          height: 630,
          alt: "About Us - Period Calculator",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: "About Us - Period Calculator",
      description:
        "Learn about Period Calculator - a privacy-first menstrual cycle tracker. Our mission is to help women understand their bodies without compromising privacy.",
      images: [`${baseUrl}/og-image.png`],
    },
    alternates: {
      canonical: canonicalUrl,
      languages: {
        en: `${baseUrl}/about`,
        es: `${baseUrl}/es/about`,
        fr: `${baseUrl}/fr/about`,
      },
    },
  };
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

// Bullet icon
function BulletIcon({ className }: { className?: string }) {
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
      <circle cx="12" cy="12" r="1" />
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

// Back arrow icon
function ArrowLeftIcon({ className }: { className?: string }) {
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
      <path d="m15 18-6-6 6-6" />
    </svg>
  );
}

export default async function AboutPage() {
  const t = await getTranslations("about");

  return (
    <main className="bg-ivory-100 dark:bg-dark-bg min-h-screen px-4 py-12 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-4xl">
        {/* Header Section */}
        <div className="mb-12 text-center">
          <h1 className="font-heading mb-4 text-4xl font-bold text-gray-800 dark:text-white">
            {t("title")}
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-300">
            {t("subtitle")}
          </p>
        </div>

        {/* Our Mission */}
        <section className="bg-warmbeige-50 dark:bg-dark-card border-warmbeige-200 dark:border-dark-border mb-8 rounded-3xl border p-6 sm:p-8">
          <h2 className="font-heading mb-4 text-2xl font-bold text-gray-900 dark:text-white">
            {t("mission.title")}
          </h2>
          <p className="leading-relaxed text-gray-700 dark:text-gray-200">
            {t("mission.description")}
          </p>
        </section>

        {/* Why We Built This */}
        <section className="bg-warmbeige-50 dark:bg-dark-card border-warmbeige-200 dark:border-dark-border mb-8 rounded-3xl border p-6 sm:p-8">
          <h2 className="font-heading mb-4 text-2xl font-bold text-gray-900 dark:text-white">
            {t("whyWeBuilt.title")}
          </h2>
          <p className="mb-4 leading-relaxed text-gray-700 dark:text-gray-200">
            {t("whyWeBuilt.description")}
          </p>
          <ul className="space-y-3">
            <li className="flex items-start gap-3">
              <CheckIcon className="text-trust-green-500 mt-1 h-5 w-5 flex-shrink-0" />
              <span className="text-gray-600 dark:text-gray-300">
                {t("whyWeBuilt.items.privacyFirst")}
              </span>
            </li>
            <li className="flex items-start gap-3">
              <CheckIcon className="text-trust-green-500 mt-1 h-5 w-5 flex-shrink-0" />
              <span className="text-gray-600 dark:text-gray-300">
                {t("whyWeBuilt.items.noAccount")}
              </span>
            </li>
            <li className="flex items-start gap-3">
              <CheckIcon className="text-trust-green-500 mt-1 h-5 w-5 flex-shrink-0" />
              <span className="text-gray-600 dark:text-gray-300">
                {t("whyWeBuilt.items.accurate")}
              </span>
            </li>
            <li className="flex items-start gap-3">
              <CheckIcon className="text-trust-green-500 mt-1 h-5 w-5 flex-shrink-0" />
              <span className="text-gray-600 dark:text-gray-300">
                {t("whyWeBuilt.items.free")}
              </span>
            </li>
          </ul>
        </section>

        {/* Our Approach */}
        <section className="bg-warmbeige-50 dark:bg-dark-card border-warmbeige-200 dark:border-dark-border mb-8 rounded-3xl border p-6 sm:p-8">
          <h2 className="font-heading mb-4 text-2xl font-bold text-gray-900 dark:text-white">
            {t("approach.title")}
          </h2>
          <p className="mb-4 leading-relaxed text-gray-700 dark:text-gray-200">
            {t("approach.description")}
          </p>
          <ul className="space-y-3">
            <li className="flex items-start gap-3">
              <BulletIcon className="text-primary-500 mt-1 h-5 w-5 flex-shrink-0" />
              <span className="text-gray-600 dark:text-gray-300">
                {t("approach.items.reviewed")}
              </span>
            </li>
            <li className="flex items-start gap-3">
              <BulletIcon className="text-primary-500 mt-1 h-5 w-5 flex-shrink-0" />
              <span className="text-gray-600 dark:text-gray-300">
                {t("approach.items.sources")}
              </span>
            </li>
            <li className="flex items-start gap-3">
              <BulletIcon className="text-primary-500 mt-1 h-5 w-5 flex-shrink-0" />
              <span className="text-gray-600 dark:text-gray-300">
                {t("approach.items.updated")}
              </span>
            </li>
          </ul>
        </section>

        {/* Medical Disclaimer */}
        <section className="mb-8 rounded-3xl border border-amber-200 bg-amber-50 p-6 sm:p-8 dark:border-amber-800 dark:bg-amber-900/20">
          <h2 className="font-heading mb-4 text-2xl font-bold text-gray-900 dark:text-white">
            {t("disclaimer.title")}
          </h2>
          <p className="leading-relaxed text-gray-700 dark:text-gray-200">
            {t("disclaimer.description")}
          </p>
        </section>

        {/* Contact */}
        <section className="bg-warmbeige-50 dark:bg-dark-card border-warmbeige-200 dark:border-dark-border rounded-3xl border p-6 sm:p-8">
          <h2 className="font-heading mb-4 text-2xl font-bold text-gray-900 dark:text-white">
            {t("contact.title")}
          </h2>
          <p className="mb-4 leading-relaxed text-gray-700 dark:text-gray-200">
            {t("contact.description")}
          </p>
          <a
            href="mailto:hello@aiperiodcalculator.com"
            className="text-primary-500 hover:text-primary-600 inline-flex items-center gap-2 font-medium"
          >
            <MailIcon className="h-5 w-5" />
            hello@aiperiodcalculator.com
          </a>
        </section>

        {/* Footer Navigation */}
        <div className="mt-12 text-center">
          <Link
            href="/"
            className="hover:text-trust-green-500 dark:hover:text-trust-green-400 inline-flex items-center gap-2 rounded-full text-gray-500 transition-colors duration-200 dark:text-gray-400"
          >
            <ArrowLeftIcon className="h-4 w-4" />
            <span className="text-sm">{t("backToHome")}</span>
          </Link>
        </div>
      </div>
    </main>
  );
}
