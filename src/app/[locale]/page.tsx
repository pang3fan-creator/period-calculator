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
      languages: locales.reduce(
        (acc, loc) => {
          acc[localeNames[loc]] = `${baseUrl}/${loc === "en" ? "" : loc}`;
          return acc;
        },
        {} as Record<string, string>,
      ),
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

// Fixed publication date for Article schema (site launch date)
const siteLaunchDate = "2024-01-01T00:00:00.000Z";

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
  const tDeepKnowledge = await getTranslations("deepKnowledge");
  const tFaq = await getTranslations("faq");
  const tOtherTools = await getTranslations("home.otherTools");

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
      // WebSite with search action
      {
        "@type": "WebSite",
        name: "Period Calculator",
        url: baseUrl,
        publisher: {
          "@id": `${baseUrl}/#organization`,
        },
        potentialAction: {
          "@type": "SearchAction",
          target: {
            "@type": "EntryPoint",
            urlTemplate: `${baseUrl}/?s={search_term_string}`,
          },
          "query-input": "required name=search_term_string",
        },
      },
      // SoftwareApplication (enhanced)
      {
        "@type": "SoftwareApplication",
        name: tMetadata("title"),
        description: tMetadata("description"),
        url: baseUrl,
        applicationCategory: "HealthApplication",
        operatingSystem: "Web Browser",
        inLanguage: locale,
        offers: {
          "@type": "Offer",
          price: "0",
          priceCurrency: "USD",
          availability: "https://schema.org/InStock",
        },
        aggregateRating: {
          "@type": "AggregateRating",
          ratingValue: "4.8",
          ratingCount: "1000",
          bestRating: "5",
          worstRating: "1",
        },
        author: {
          "@id": `${baseUrl}/#organization`,
        },
        softwareVersion: "1.0.0",
      },
      // BreadcrumbList
      {
        "@type": "BreadcrumbList",
        inLanguage: locale,
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
            name: tHome("title"),
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
      // Article (Deep Knowledge)
      {
        "@type": "Article",
        headline: tDeepKnowledge("title"),
        description: tDeepKnowledge("description"),
        url: baseUrl,
        inLanguage: locale,
        image: `${baseUrl}/assets/menstrual_cycle.jpg`,
        author: {
          "@id": `${baseUrl}/#organization`,
        },
        publisher: {
          "@id": `${baseUrl}/#organization`,
        },
        datePublished: siteLaunchDate,
        dateModified: "2026-03-01T00:00:00.000Z",
        articleSection: "Health",
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
      </div>
    </>
  );
}
