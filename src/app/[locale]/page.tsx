import { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { PeriodCalculator } from "@/components/calculator";
import { HowToCalculate } from "@/components/home/how-to-calculate";
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

  // JSON-LD Schema for WebSite with search action
  const webSiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "Period Calculator",
    url: baseUrl,
    potentialAction: {
      "@type": "SearchAction",
      target: {
        "@type": "EntryPoint",
        urlTemplate: `${baseUrl}/?s={search_term_string}`,
      },
      "query-input": "required name=search_term_string",
    },
  };

  // JSON-LD Schema for BreadcrumbList
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    inLanguage: locale,
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: locale === "en" ? "Home" : locale === "es" ? "Inicio" : "Accueil",
        item: baseUrl,
      },
      {
        "@type": "ListItem",
        position: 2,
        name: tHome("title"),
        item: baseUrl,
      },
    ],
  };

  // JSON-LD Schema for SoftwareApplication (enhanced)
  const softwareApplicationSchema = {
    "@context": "https://schema.org",
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
      "@type": "Organization",
      name: "Period Calculator",
      url: baseUrl,
    },
    softwareVersion: "1.0.0",
  };

  // JSON-LD Schema for FAQPage
  const faqSchema = {
    "@context": "https://schema.org",
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
  };

  // JSON-LD Schema for HowTo (Calculation steps)
  const howToSchema = {
    "@context": "https://schema.org",
    "@type": "HowTo",
    name: tHowTo("title"),
    description: tHowTo("title"),
    inLanguage: locale,
    step: howToStepKeys.map((key) => ({
      "@type": "HowToStep",
      name: tHowTo(`steps.${key}.title`),
      text: tHowTo(`steps.${key}.description`),
    })),
  };

  // JSON-LD Schema for Article (Deep Knowledge)
  const today = new Date().toISOString();
  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: tDeepKnowledge("title"),
    description: tDeepKnowledge("description"),
    url: baseUrl,
    inLanguage: locale,
    image: `${baseUrl}/assets/menstrual_cycle.jpg`,
    author: {
      "@type": "Organization",
      name: tMetadata("title"),
    },
    datePublished: today,
    dateModified: today,
    articleSection: "Health",
  };

  return (
    <>
      <JsonLd data={webSiteSchema} />
      <JsonLd data={softwareApplicationSchema} />
      <JsonLd data={breadcrumbSchema} />
      <JsonLd data={faqSchema} />
      <JsonLd data={howToSchema} />
      <JsonLd data={articleSchema} />
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
            <div className="mx-auto max-w-3xl">
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
      </div>
    </>
  );
}
