import { Metadata } from "next";
import { JsonLd } from "@/components/seo/json-ld";
import { IrregularPeriodCalculator } from "@/components/calculator/irregular-period-calculator";
import { IrregularHowToCalculate } from "@/components/calculator/irregular-how-to-calculate";
import { IrregularFAQ } from "@/components/calculator/irregular-faq";
import { IrregularDeepKnowledge } from "@/components/calculator/irregular-deep-knowledge";
import { Breadcrumb } from "@/components/layout/breadcrumb";
import { getTranslations } from "next-intl/server";
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

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations("irregularCalculator");

  return {
    title: t("metaTitle"),
    description: t("metaDescription"),
    openGraph: {
      title: t("metaTitle"),
      description: t("metaDescription"),
      url: `${baseUrl}/${locale === "en" ? "" : locale}/irregular-period-calculator`,
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
          alt: "Irregular Period Calculator",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: "Irregular Period Calculator - Track Uneven Cycles",
      description:
        "Calculate your period even with irregular cycles. Our algorithm uses historical data to provide accurate predictions. 100% private.",
      images: [`${baseUrl}/og-image.png`],
    },
    alternates: {
      canonical: `${baseUrl}/${locale === "en" ? "" : locale}/irregular-period-calculator`,
      languages: locales.reduce(
        (acc, loc) => {
          acc[localeNames[loc]] =
            `${baseUrl}/${loc === "en" ? "" : loc}/irregular-period-calculator`;
          return acc;
        },
        {} as Record<string, string>,
      ),
    },
  };
}

export default async function IrregularPeriodCalculatorPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations("irregularCalculator");
  const tOtherTools = await getTranslations("irregularCalculator.otherTools");

  // JSON-LD Schema for WebApplication (Irregular Period Calculator)
  const webApplicationSchema = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: "Irregular Period Calculator",
    description:
      "Calculate your period even with irregular cycles. Our algorithm uses historical data to provide accurate predictions. 100% private.",
    url: "https://www.aiperiodcalculator.com/irregular-period-calculator",
    applicationCategory: "HealthApplication",
    operatingSystem: "Web Browser",
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "USD",
    },
  };

  // JSON-LD Schema for BreadcrumbList
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: baseUrl,
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Irregular Period Calculator",
        item: `${baseUrl}/irregular-period-calculator`,
      },
    ],
  };

  // JSON-LD Schema for FAQPage (Irregular Period)
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: "How does the irregular period calculator work?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Our irregular period calculator uses historical data from your past cycles to identify patterns. It calculates a weighted average and uses standard deviation to provide a prediction window rather than a single date.",
        },
      },
      {
        "@type": "Question",
        name: "How many months of history do I need?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "For the most accurate predictions, we recommend entering at least 3-6 months of cycle history. The more data you provide, the more accurate your predictions will be.",
        },
      },
      {
        "@type": "Question",
        name: "What does the confidence level mean?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "The confidence level indicates how reliable your prediction is based on the consistency of your cycle history. High confidence means your cycles are relatively regular, while low confidence suggests more variability.",
        },
      },
    ],
  };

  // JSON-LD Schema for HowTo (Irregular calculation steps)
  const howToSchema = {
    "@context": "https://schema.org",
    "@type": "HowTo",
    name: "How to Calculate Irregular Periods",
    description:
      "Learn how to use our irregular period calculator to get accurate predictions despite cycle variations.",
    step: [
      {
        "@type": "HowToStep",
        name: "Enter your cycle history",
        text: "Input the start dates of your last 3-6 menstrual cycles.",
      },
      {
        "@type": "HowToStep",
        name: "Set your typical cycle variation",
        text: "Indicate how many days your cycle typically varies from the average.",
      },
      {
        "@type": "HowToStep",
        name: "View your prediction window",
        text: "See your earliest, most likely, and latest predicted dates for your next period.",
      },
    ],
  };

  // JSON-LD Schema for Organization (E-E-A-T signal)
  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "Period Calculator",
    url: "https://www.aiperiodcalculator.com",
    logo: "https://www.aiperiodcalculator.com/logo.png",
    description:
      "Privacy-first menstrual cycle tracker helping women understand their bodies without compromising personal data security.",
    contactPoint: {
      "@type": "ContactPoint",
      email: "hello@aiperiodcalculator.com",
      contactType: "customer service",
    },
    sameAs: [],
  };

  return (
    <>
      <JsonLd data={webApplicationSchema} />
      <JsonLd data={breadcrumbSchema} />
      <JsonLd data={faqSchema} />
      <JsonLd data={howToSchema} />
      <JsonLd data={organizationSchema} />
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

        {/* How to Calculate */}
        <div className="mt-24 w-full max-w-4xl">
          <IrregularHowToCalculate />
        </div>

        {/* Deep Knowledge */}
        <div className="mt-24 w-full max-w-4xl">
          <IrregularDeepKnowledge />
        </div>

        {/* FAQ */}
        <div className="mt-24 w-full max-w-4xl">
          <IrregularFAQ />
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
                    href="/"
                    className="text-primary-500 hover:text-primary-600 dark:text-primary-400 dark:hover:text-primary-300 font-bold transition-colors"
                  >
                    {tOtherTools("periodCalculator.description")}
                  </Link>
                </p>
              </div>
            </div>
          </section>
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
