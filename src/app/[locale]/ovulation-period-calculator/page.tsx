import { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { JsonLd } from "@/components/seo/json-ld";
import { OvulationPeriodCalculator } from "@/components/calculator/ovulation-period-calculator";
import { OvulationFAQ } from "@/components/calculator/ovulation-faq";
import { OvulationAlgorithmTransparency } from "@/components/calculator/ovulation-algorithm-transparency";
import { OvulationHowToCalculate } from "@/components/calculator/ovulation-how-to-calculate";
import { OvulationDeepKnowledge } from "@/components/calculator/ovulation-deep-knowledge";
import { Breadcrumb } from "@/components/layout/breadcrumb";
import { Link } from "@/i18n/routing";

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

const baseUrl = "https://www.aiperiodcalculator.com";
const locales = ["en", "es", "fr"];
const localeNames: Record<string, string> = {
  en: "en-US",
  es: "es-ES",
  fr: "fr-FR",
};

// FAQ item keys from the translation file
const ovulationFaqItemKeys = [
  "whatIsOvulation",
  "symptoms",
  "howToCalculate",
  "daysAfterPeriod",
  "pregnantAfterOvulation",
  "irregularCycles",
] as const;

// HowTo step keys from the translation file
const ovulationHowToStepKeys = ["step1", "step2", "step3", "step4"] as const;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;

  // Multi-language title and description (optimized for SEO)
  const titles: Record<string, string> = {
    en: "Ovulation Period Calculator: Accurate Fertile Window Tracker",
    es: "Calculadora del Periodo de Ovulación: Días Fértiles y Ciclo",
    fr: "Calculateur de période d'ovulation : Fenêtre de Fertilité",
  };

  const descriptions: Record<string, string> = {
    en: "Find your peak fertility days with our Ovulation Period Calculator. Accurate tracking of your fertile window for pregnancy. 100% private, no signup required.",
    es: "Predice tus días más fértiles con nuestra Calculadora del Periodo de Ovulación. Rastrea tu ventana de fertilidad para el embarazo. 100% privado y sin registro.",
    fr: "Prédisez vos jours fertiles avec notre Calculateur de période d'ovulation. Suivez votre fenêtre de fertilité et grossesse. 100% privé, sans inscription requise.",
  };

  const title = titles[locale] || titles.en;
  const description = descriptions[locale] || descriptions.en;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      url: `${baseUrl}/${locale === "en" ? "" : locale}/ovulation-period-calculator`,
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
          alt: "Ovulation Calculator",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [`${baseUrl}/og-image.png`],
    },
    alternates: {
      canonical: `${baseUrl}/${locale === "en" ? "" : locale}/ovulation-period-calculator`,
      languages: {
        en: `${baseUrl}/ovulation-period-calculator`,
        es: `${baseUrl}/es/ovulation-period-calculator`,
        fr: `${baseUrl}/fr/ovulation-period-calculator`,
        "x-default": `${baseUrl}/ovulation-period-calculator`,
      },
    },
  };
}

export default async function OvulationCalculatorPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations("ovulationCalculator");
  const tMetadata = await getTranslations("metadata.ovulation");
  const tHowTo = await getTranslations("ovulationHowToCalculate");
  const tFaq = await getTranslations("ovulationFaq");
  const tOtherTools = await getTranslations("ovulationCalculator.otherTools");
  const tSchema = await getTranslations("common.schema");
  const tFeatureList = await getTranslations("ovulationCalculator.featureList");

  // Combined JSON-LD Schema using @graph for better semantic relationships
  const combinedSchema = {
    "@context": "https://schema.org",
    "@graph": [
      // Organization Schema (E-E-A-T signal)
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
      // WebSite Schema
      {
        "@type": "WebSite",
        name: "Period Calculator",
        url: baseUrl,
        publisher: {
          "@id": `${baseUrl}/#organization`,
        },
        mainEntity: {
          "@id": `${baseUrl}/ovulation-period-calculator/#webapplication`,
        },
      },
      // WebApplication Schema
      {
        "@type": "WebApplication",
        "@id": `${baseUrl}/ovulation-period-calculator/#webapplication`,
        name: tMetadata("title"),
        description: tMetadata("description"),
        url: `${baseUrl}/ovulation-period-calculator`,
        applicationCategory: "HealthApplication",
        operatingSystem: "Web Browser",
        browserRequirements: "Requires JavaScript",
        inLanguage: locale,
        featureList: [
          tFeatureList("ovulationPrediction"),
          tFeatureList("fertileWindow"),
          tFeatureList("cycleTracking"),
          tFeatureList("calendarIntegration"),
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
          "@id": `${baseUrl}/#organization`,
        },
      },
      // BreadcrumbList Schema
      {
        "@type": "BreadcrumbList",
        inLanguage: locale,
        itemListElement: [
          {
            "@type": "ListItem",
            position: 1,
            name: tSchema("breadcrumbHome"),
            item: baseUrl,
          },
          {
            "@type": "ListItem",
            position: 2,
            name: t("title"),
            item: `${baseUrl}/ovulation-period-calculator`,
          },
        ],
      },
      // HowTo Schema
      {
        "@type": "HowTo",
        name: tHowTo("title"),
        description: tHowTo("steps.step1.description"),
        inLanguage: locale,
        author: {
          "@id": `${baseUrl}/#organization`,
        },
        step: ovulationHowToStepKeys.map((key) => ({
          "@type": "HowToStep",
          name: tHowTo(`steps.${key}.title`),
          text: tHowTo(`steps.${key}.description`),
        })),
      },
      // FAQPage Schema
      {
        "@type": "FAQPage",
        inLanguage: locale,
        mainEntity: ovulationFaqItemKeys.map((key) => ({
          "@type": "Question",
          name: tFaq(`items.${key}.question`),
          acceptedAnswer: {
            "@type": "Answer",
            text: tFaq(`items.${key}.answer`),
          },
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
          {t("h1Title")}
        </h1>
        {/* Independent Answer Block - AI SEO Optimization */}
        <p className="mt-4 max-w-2xl text-center text-lg text-gray-600 dark:text-gray-300">
          An Ovulation Calculator predicts your most fertile days by analyzing
          your menstrual cycle data. It calculates your ovulation date and your
          fertile window—the 6 days when pregnancy is possible. Use this free
          tool to plan pregnancy or understand your cycle—100% private, no
          signup required.
        </p>
        <div className="mt-12 w-full max-w-2xl">
          <OvulationPeriodCalculator />
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
                    href="/irregular-period-calculator"
                    className="text-primary-500 hover:text-primary-600 dark:text-primary-400 dark:hover:text-primary-300 font-bold transition-colors"
                  >
                    {tOtherTools("irregularCalculator.description")}
                  </Link>
                </p>
              </div>
            </div>
          </section>
        </div>

        {/* How to Calculate */}
        <div className="mt-24 w-full max-w-4xl">
          <OvulationHowToCalculate />
        </div>

        {/* Algorithm Transparency */}
        <div className="mt-24 w-full max-w-4xl">
          <OvulationAlgorithmTransparency />
        </div>

        {/* Deep Knowledge */}
        <div className="mt-24 w-full max-w-4xl">
          <OvulationDeepKnowledge />
        </div>

        {/* FAQ */}
        <div className="mt-24 w-full max-w-4xl">
          <OvulationFAQ />
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
