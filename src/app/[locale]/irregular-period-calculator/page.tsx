import { Metadata } from "next";
import { JsonLd } from "@/components/seo/json-ld";
import { IrregularPeriodCalculator } from "@/components/calculator/irregular-period-calculator";
import { IrregularHowToCalculate } from "@/components/calculator/irregular-how-to-calculate";
import { IrregularFAQ } from "@/components/calculator/irregular-faq";
import { IrregularDeepKnowledge } from "@/components/calculator/irregular-deep-knowledge";
import { IrregularAlgorithmTransparency } from "@/components/calculator/irregular-algorithm-transparency";
import { Breadcrumb } from "@/components/layout/breadcrumb";
import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/routing";
import { buildUrl, BASE_URL } from "@/lib/url";

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
      aria-hidden="true"
    >
      <path d="m15 18-6-6 6-6" />
    </svg>
  );
}

const locales = ["en", "es", "fr"];
const localeNames: Record<string, string> = {
  en: "en-US",
  es: "es-ES",
  fr: "fr-FR",
};

// FAQ item keys from the translation file
const irregularFaqItemKeys = [
  "getPregnant",
  "dueDate",
  "ovulation",
  "averageCycle",
  "pcos",
  "inaccurate",
] as const;

// HowTo step keys from the translation file
const irregularHowToStepKeys = ["step1", "step2", "step3", "step4"] as const;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "irregularCalculator" });

  return {
    title: t("metaTitle"),
    description: t("metaDescription"),
    openGraph: {
      title: t("metaTitle"),
      description: t("metaDescription"),
      url: buildUrl(locale, "/irregular-period-calculator"),
      siteName: "Period Calculator",
      locale: localeNames[locale],
      alternateLocale: locales
        .filter((l) => l !== locale)
        .map((l) => localeNames[l]),
      type: "website",
      images: [
        {
          url: `${BASE_URL}/og-image.png`,
          width: 1200,
          height: 630,
          alt: "Irregular Period Calculator",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: t("twitterTitle"),
      description: t("twitterDescription"),
      images: [`${BASE_URL}/og-image.png`],
    },
    alternates: {
      canonical: buildUrl(locale, "/irregular-period-calculator"),
      languages: {
        en: `${BASE_URL}/irregular-period-calculator`,
        es: `${BASE_URL}/es/irregular-period-calculator`,
        fr: `${BASE_URL}/fr/irregular-period-calculator`,
        "x-default": `${BASE_URL}/irregular-period-calculator`,
      },
    },
  };
}

export default async function IrregularPeriodCalculatorPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "irregularCalculator" });
  const tMetadata = await getTranslations({
    locale,
    namespace: "metadata.irregular",
  });
  const tHowTo = await getTranslations({
    locale,
    namespace: "irregularHowToCalculate",
  });
  const tFaq = await getTranslations({ locale, namespace: "irregularFaq" });
  const tOtherTools = await getTranslations({
    locale,
    namespace: "irregularCalculator.otherTools",
  });
  const tSchema = await getTranslations({
    locale,
    namespace: "common.schema",
  });
  const tFeatureList = await getTranslations({
    locale,
    namespace: "irregularCalculator.featureList",
  });

  // Combined JSON-LD Schema using @graph for better organization
  const combinedSchema = {
    "@context": "https://schema.org",
    "@graph": [
      // Organization (E-E-A-T signal)
      {
        "@type": "Organization",
        "@id": `${BASE_URL}/#organization`,
        name: "Period Calculator",
        url: BASE_URL,
        logo: {
          "@type": "ImageObject",
          url: `${BASE_URL}/logo.png`,
          width: 1200,
          height: 630,
        },
        description: tSchema("organizationDescription"),
        contactPoint: {
          "@type": "ContactPoint",
          email: "hello@aiperiodcalculator.com",
          contactType: "customer service",
          availableLanguage: ["English", "Spanish", "French"],
        },
        sameAs: [
          "https://twitter.com/aiperiodcalc",
          "https://www.facebook.com/aiperiodcalculator",
        ],
      },
      // WebSite
      {
        "@type": "WebSite",
        name: "Period Calculator",
        url: BASE_URL,
        publisher: {
          "@id": `${BASE_URL}/#organization`,
        },
        mainEntity: {
          "@id": `${BASE_URL}/irregular-period-calculator/#webapplication`,
        },
      },
      // WebApplication
      {
        "@type": "WebApplication",
        "@id": `${BASE_URL}/irregular-period-calculator/#webapplication`,
        name: tMetadata("title"),
        description: tMetadata("description"),
        url: `${BASE_URL}/irregular-period-calculator`,
        applicationCategory: "HealthApplication",
        operatingSystem: "Web Browser",
        browserRequirements: "Requires JavaScript",
        inLanguage: locale,
        featureList: [
          tFeatureList("irregularPrediction"),
          tFeatureList("cycleVariance"),
          tFeatureList("confidenceScoring"),
          tFeatureList("privacyStorage"),
          tFeatureList("multiLanguage"),
        ],
        offers: {
          "@type": "Offer",
          price: "0",
          priceCurrency: "USD",
          availability: "https://schema.org/InStock",
        },
        author: {
          "@id": `${BASE_URL}/#organization`,
        },
      },
      // BreadcrumbList
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          {
            "@type": "ListItem",
            position: 1,
            name: tSchema("breadcrumbHome"),
            item: BASE_URL,
          },
          {
            "@type": "ListItem",
            position: 2,
            name: t("title"),
            item: `${BASE_URL}/irregular-period-calculator`,
          },
        ],
      },
      // FAQPage
      {
        "@type": "FAQPage",
        inLanguage: locale,
        mainEntity: irregularFaqItemKeys.map((key) => ({
          "@type": "Question",
          name: tFaq(`items.${key}.question`),
          acceptedAnswer: {
            "@type": "Answer",
            text: tFaq(`items.${key}.answer`),
          },
        })),
      },
      // HowTo
      {
        "@type": "HowTo",
        name: tHowTo("title"),
        description: tHowTo("description"),
        inLanguage: locale,
        author: {
          "@id": `${BASE_URL}/#organization`,
        },
        step: irregularHowToStepKeys.map((key) => ({
          "@type": "HowToStep",
          name: tHowTo(`steps.${key}.title`),
          text: tHowTo(`steps.${key}.description`),
        })),
      },
    ],
  };

  return (
    <>
      <JsonLd data={combinedSchema} />
      <main className="flex flex-col items-center px-4 py-16">
        <div className="w-full max-w-4xl">
          <Breadcrumb />
        </div>
        <h1 className="text-primary-400 text-center text-3xl font-bold md:text-4xl">
          {t("title")}
        </h1>
        <p className="mt-4 max-w-2xl text-center text-lg text-gray-600 dark:text-gray-300">
          {t("subtitle")}
        </p>
        <div className="mt-12 w-full max-w-2xl">
          <IrregularPeriodCalculator />
        </div>

        {/* Other Free Tools & Resources */}
        <div className="mt-24 w-full max-w-4xl">
          <section className="w-full">
            <div className="mb-8 text-center">
              <h2 className="mb-3 text-2xl font-bold text-gray-800 md:text-3xl dark:text-white">
                {tOtherTools("title")}
              </h2>
            </div>
            <div className="mx-auto max-w-3xl space-y-4">
              <div className="border-warmbeige-200 dark:border-dark-border dark:bg-dark-card overflow-hidden rounded-3xl border bg-white p-6">
                <p>
                  <Link
                    href="/"
                    className="text-primary-500 hover:text-primary-600 dark:text-primary-400 dark:hover:text-primary-300 font-bold transition-colors"
                  >
                    {tOtherTools("periodCalculator.description")}
                  </Link>
                </p>
              </div>
              <div className="border-warmbeige-200 dark:border-dark-border dark:bg-dark-card overflow-hidden rounded-3xl border bg-white p-6">
                <p>
                  <Link
                    href="/ovulation-period-calculator"
                    className="text-primary-500 hover:text-primary-600 dark:text-primary-400 dark:hover:text-primary-300 font-bold transition-colors"
                  >
                    {tOtherTools("ovulationCalculator.description")}
                  </Link>
                </p>
              </div>
            </div>
          </section>
        </div>

        {/* How to Calculate */}
        <div className="mt-24 w-full max-w-4xl">
          <IrregularHowToCalculate />
        </div>

        {/* Algorithm Transparency */}
        <div className="mt-24 w-full max-w-4xl">
          <IrregularAlgorithmTransparency />
        </div>

        {/* Deep Knowledge */}
        <div className="mt-24 w-full max-w-4xl">
          <IrregularDeepKnowledge />
        </div>

        {/* FAQ */}
        <div className="mt-24 w-full max-w-4xl">
          <IrregularFAQ />
        </div>

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
      </main>
    </>
  );
}
