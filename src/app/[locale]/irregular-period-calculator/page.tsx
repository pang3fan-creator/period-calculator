import { Metadata } from "next";
import { JsonLd } from "@/components/seo/json-ld";
import { IrregularPeriodCalculator } from "@/components/calculator/irregular-period-calculator";
import { HowToCalculate } from "@/components/home/how-to-calculate";
import { DeepKnowledge } from "@/components/home/deep-knowledge";
import { FAQ } from "@/components/home/faq";

const baseUrl = "https://periodcalculator.site";
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

  return {
    title: "Irregular Period Calculator - Track Uneven Cycles",
    description:
      "Calculate your period even with irregular cycles. Our algorithm uses historical data to provide accurate predictions. 100% private.",
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

export default function IrregularPeriodCalculatorPage() {
  // JSON-LD Schema for WebApplication (Irregular Period Calculator)
  const webApplicationSchema = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: "Irregular Period Calculator",
    description:
      "Calculate your period even with irregular cycles. Our algorithm uses historical data to provide accurate predictions. 100% private.",
    url: "https://periodcalculator.site/irregular-period-calculator",
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
    url: "https://periodcalculator.site",
    logo: "https://periodcalculator.site/logo.png",
    description:
      "Privacy-first menstrual cycle tracker helping women understand their bodies without compromising personal data security.",
    contactPoint: {
      "@type": "ContactPoint",
      email: "hello@periodcalculator.com",
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
        <h1 className="text-primary-400 text-center text-3xl font-bold md:text-4xl">
          Irregular Period Calculator
        </h1>
        <p className="mt-4 max-w-2xl text-center text-lg text-gray-600 dark:text-gray-300">
          Get accurate predictions even with irregular cycles. Our algorithm uses your cycle history to provide a personalized prediction window.
        </p>
        <div className="mt-12 w-full max-w-2xl">
          <IrregularPeriodCalculator />
        </div>

        {/* How to Calculate */}
        <div className="mt-24 w-full max-w-4xl">
          <HowToCalculate />
        </div>

        {/* Deep Knowledge */}
        <div className="mt-24 w-full max-w-4xl">
          <DeepKnowledge />
        </div>

        {/* FAQ */}
        <div className="mt-24 w-full max-w-4xl">
          <FAQ />
        </div>
      </main>
    </>
  );
}
