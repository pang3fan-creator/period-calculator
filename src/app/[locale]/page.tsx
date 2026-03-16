import { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { PeriodCalculator } from "@/components/calculator";
import { HowToCalculate } from "@/components/home/how-to-calculate";
import { AlgorithmTransparency } from "@/components/home/algorithm-transparency";
import { DeepKnowledge } from "@/components/home/deep-knowledge";
import { FAQ } from "@/components/home/faq";
import { JsonLd } from "@/components/seo/json-ld";
import { Link } from "@/i18n/routing";

const baseUrl = "https://www.aiperiodcalculator.com";
const locales = ["en", "es", "fr"];
const localeNames: Record<string, string> = {
  en: "en-US",
  es: "es-ES",
  fr: "fr-FR",
};

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations("metadata");

  return {
    title: {
      absolute: t("title"),
    },
    description: t("description"),
    openGraph: {
      title: t("title"),
      description: t("description"),
      url: `${baseUrl}/${locale === "en" ? "" : locale}`,
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
          alt: t("title"),
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: t("title"),
      description: t("description"),
      images: [`${baseUrl}/og-image.png`],
    },
    alternates: {
      canonical: `${baseUrl}/${locale === "en" ? "" : locale}`,
      languages: {
        en: `${baseUrl}/`,
        es: `${baseUrl}/es`,
        fr: `${baseUrl}/fr`,
        "x-default": `${baseUrl}/`,
      },
    },
  };
}

// FAQ item keys from the component
const faqItemKeys = [
  "latePeriod",
  "nextPeriodDate",
  "safePeriod",
  "periodEarly",
  "normalFlow",
  "pregnancyFromLmp",
] as const;

// HowTo step keys
const howToStepKeys = ["step1", "step2", "step3", "step4"] as const;

export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  // Server-side translations
  const tHome = await getTranslations("home");
  const tMetadata = await getTranslations("metadata");
  const tHowTo = await getTranslations("howToCalculate");
  const tFaq = await getTranslations("faq");
  const tOtherTools = await getTranslations("home.otherTools");
  const tSchema = await getTranslations("common.schema");
  const tFeatureList = await getTranslations("home.featureList");

  // Combined JSON-LD Schema using @graph for better organization
  const combinedSchema = {
    "@context": "https://schema.org",
    "@graph": [
      // Organization (E-E-A-T signal)
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
      // WebSite
      {
        "@type": "WebSite",
        name: "Period Calculator",
        url: baseUrl,
        publisher: {
          "@id": `${baseUrl}/#organization`,
        },
        mainEntity: {
          "@id": `${baseUrl}/#webapplication`,
        },
      },
      // WebApplication
      {
        "@type": "WebApplication",
        "@id": `${baseUrl}/#webapplication`,
        name: tMetadata("title"),
        description: tMetadata("description"),
        url: baseUrl,
        applicationCategory: "HealthApplication",
        operatingSystem: "Web Browser",
        browserRequirements: "Requires JavaScript",
        inLanguage: locale,
        featureList: [
          tFeatureList("periodPrediction"),
          tFeatureList("ovulationTracking"),
          tFeatureList("cycleAnalysis"),
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
      // BreadcrumbList (simplified for homepage - single level)
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
        ],
      },
      // FAQPage
      {
        "@type": "FAQPage",
        inLanguage: locale,
        mainEntity: faqItemKeys.map((key) => ({
          "@type": "Question",
          name: tFaq(`items.${key}.question`),
          acceptedAnswer: {
            "@type": "Answer",
            text: tFaq(`items.${key}.answer`),
          },
        })),
      },
      // HowTo (Calculation steps)
      {
        "@type": "HowTo",
        name: tHowTo("title"),
        description: tHowTo("title"),
        inLanguage: locale,
        author: {
          "@id": `${baseUrl}/#organization`,
        },
        step: howToStepKeys.map((key) => ({
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
      <div className="flex flex-col items-center px-4 py-16">
        <h1 className="text-primary-400 text-center text-3xl font-bold md:text-4xl">
          {tHome("title")}
        </h1>
        <p className="mt-4 max-w-2xl text-center text-lg text-gray-600 dark:text-gray-300">
          {tHome("subtitle")}
        </p>
        <div className="mt-12 w-full max-w-2xl">
          <PeriodCalculator />
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
                    href="/irregular-period-calculator"
                    className="text-primary-500 hover:text-primary-600 dark:text-primary-400 dark:hover:text-primary-300 font-bold transition-colors"
                  >
                    {tOtherTools("irregularCalculator.description")}
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

        {/* Second Screen: How to Calculate */}
        <div className="mt-24 w-full max-w-4xl">
          <HowToCalculate />
        </div>

        {/* Algorithm Transparency */}
        <div className="mt-24 w-full max-w-4xl">
          <AlgorithmTransparency />
        </div>

        {/* Third Screen: Deep Knowledge */}
        <div className="mt-24 w-full max-w-4xl">
          <DeepKnowledge />
        </div>

        {/* Bottom Screen: FAQ */}
        <div className="mt-24 w-full max-w-4xl">
          <FAQ />
        </div>
      </div>
    </>
  );
}
