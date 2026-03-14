import { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/routing";
import { Breadcrumb } from "@/components/layout/breadcrumb";
import { EmailLink } from "@/components/ui/email-link";
import { JsonLd } from "@/components/seo/json-ld";

const baseUrl = "https://www.aiperiodcalculator.com";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const canonicalUrl =
    locale === "en" ? `${baseUrl}/about` : `${baseUrl}/${locale}/about`;

  const titles: Record<string, string> = {
    en: "About Us - Period Calculator",
    es: "Sobre Nosotros - Calculadora de Período",
    fr: "À Propos - Calculateur de Règles",
  };

  const descriptions: Record<string, string> = {
    en: "Learn about Period Calculator - a privacy-first menstrual cycle tracker. Our mission is to help women understand their bodies without compromising privacy.",
    es: "Conoce Period Calculator - un rastreador de ciclo menstrual que prioriza la privacidad. Nuestra misión es ayudar a las mujeres a entender sus cuerpos sin comprometer la privacidad.",
    fr: "Découvrez Period Calculator - un suivi de cycle menstruel axé sur la confidentialité. Notre mission est d'aider les femmes à comprendre leur corps sans compromettre leur vie privée.",
  };

  const localeNames: Record<string, string> = {
    en: "en-US",
    es: "es-ES",
    fr: "fr-FR",
  };
  const locales = ["en", "es", "fr"];

  return {
    title: titles[locale] || titles.en,
    description: descriptions[locale] || descriptions.en,
    openGraph: {
      title: titles[locale] || titles.en,
      description: descriptions[locale] || descriptions.en,
      url: canonicalUrl,
      siteName: "Period Calculator",
      locale: localeNames[locale],
      alternateLocale: locales
        .filter((l) => l !== locale)
        .map((l) => localeNames[l]),
      type: "website",
      images: [
        {
          url: `${baseUrl}/og-image.png`,
          width: 1200,
          height: 630,
          alt: titles[locale] || titles.en,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: titles[locale] || titles.en,
      description: descriptions[locale] || descriptions.en,
      images: [`${baseUrl}/og-image.png`],
    },
    alternates: {
      canonical: canonicalUrl,
      languages: {
        en: `${baseUrl}/about`,
        es: `${baseUrl}/es/about`,
        fr: `${baseUrl}/fr/about`,
        "x-default": `${baseUrl}/about`,
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

export default async function AboutPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations("about");

  // Get today's date for freshness signal
  const today = new Date().toLocaleDateString(
    locale === "en" ? "en-US" : locale === "es" ? "es-ES" : "fr-FR",
    { year: "numeric", month: "long", day: "numeric" },
  );

  // Schema Markup for About page
  const aboutSchema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "@id": `${baseUrl}/#organization`,
        name: "Period Calculator",
        url: baseUrl,
        logo: {
          "@type": "ImageObject",
          url: `${baseUrl}/logo.png`,
          width: 1200,
          height: 630,
        },
        description:
          "Privacy-first menstrual cycle tracker helping women understand their bodies without compromising personal data security.",
        contactPoint: {
          "@type": "ContactPoint",
          email: "hello@aiperiodcalculator.com",
          contactType: "customer service",
        },
        sameAs: [
          "https://twitter.com/aiperiodcalc",
          "https://www.facebook.com/aiperiodcalculator",
        ],
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          {
            "@type": "ListItem",
            position: 1,
            name:
              locale === "en" ? "Home" : locale === "es" ? "Inicio" : "Accueil",
            item: baseUrl,
          },
          {
            "@type": "ListItem",
            position: 2,
            name: "About Us",
            item: `${baseUrl}/about`,
          },
        ],
      },
      {
        "@type": "AboutPage",
        name: t("title"),
        description: t("subtitle"),
        url: `${baseUrl}/about`,
        inLanguage: locale,
        mainEntity: {
          "@id": `${baseUrl}/#organization`,
        },
      },
    ],
  };

  return (
    <>
      <JsonLd data={aboutSchema} />
      <main className="bg-ivory-100 dark:bg-dark-bg min-h-screen px-4 py-12 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-4xl">
          {/* Breadcrumb */}
          <Breadcrumb className="mb-8" />

          {/* Header Section */}
          <div className="mb-12 text-center">
            <h1 className="font-heading mb-4 text-4xl font-bold text-gray-800 dark:text-white">
              {t("title")}
            </h1>
            <p className="mb-2 text-lg text-gray-600 dark:text-gray-300">
              {t("subtitle")}
            </p>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              {t("lastUpdated", { date: today })}
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

            {/* Stats Grid */}
            <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-3">
              <div className="dark:bg-dark-bg/50 rounded-2xl bg-white/50 p-4 text-center">
                <div className="text-trust-green-500 dark:text-trust-green-400 font-heading text-3xl font-bold">
                  10,000+
                </div>
                <div className="mt-1 text-sm text-gray-600 dark:text-gray-400">
                  {t("stats.monthlyUsers")}
                </div>
              </div>
              <div className="dark:bg-dark-bg/50 rounded-2xl bg-white/50 p-4 text-center">
                <div className="text-trust-green-500 dark:text-trust-green-400 font-heading text-3xl font-bold">
                  0
                </div>
                <div className="mt-1 text-sm text-gray-600 dark:text-gray-400">
                  {t("stats.dataSent")}
                </div>
              </div>
              <div className="dark:bg-dark-bg/50 rounded-2xl bg-white/50 p-4 text-center">
                <div className="text-trust-green-500 dark:text-trust-green-400 font-heading text-3xl font-bold">
                  100%
                </div>
                <div className="mt-1 text-sm text-gray-600 dark:text-gray-400">
                  {t("stats.dataOnDevice")}
                </div>
              </div>
            </div>
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

            {/* Authority Sources */}
            <div className="border-trust-green-200 bg-trust-green-50/50 dark:border-trust-green-800 dark:bg-trust-green-900/20 mt-6 rounded-xl border p-4">
              <p className="text-sm text-gray-600 dark:text-gray-300">
                {t("approach.authoritySources.prefix")}{" "}
                <a
                  href="https://www.acog.org"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary-500 hover:text-primary-600 dark:text-primary-400 dark:hover:text-primary-300 font-medium underline underline-offset-2"
                >
                  ACOG
                </a>
                ,{" "}
                <a
                  href="https://www.who.int"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary-500 hover:text-primary-600 dark:text-primary-400 dark:hover:text-primary-300 font-medium underline underline-offset-2"
                >
                  WHO
                </a>
                , {t("approach.authoritySources.and")}{" "}
                <a
                  href="https://www.nhs.uk"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary-500 hover:text-primary-600 dark:text-primary-400 dark:hover:text-primary-300 font-medium underline underline-offset-2"
                >
                  NHS
                </a>
                .
              </p>
            </div>
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
            <EmailLink
              email="hello@aiperiodcalculator.com"
              className="text-primary-500 hover:text-primary-600 inline-flex items-center gap-2 font-medium"
            >
              <MailIcon className="h-5 w-5" />
              hello@aiperiodcalculator.com
            </EmailLink>
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
    </>
  );
}
