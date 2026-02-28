import { Metadata } from "next";
import { JsonLd } from "@/components/seo/json-ld";
import { IrregularPeriodCalculator } from "@/components/calculator/irregular-period-calculator";

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

  return (
    <>
      <JsonLd data={webApplicationSchema} />
      <JsonLd data={breadcrumbSchema} />
      <main className="flex min-h-screen flex-col items-center px-4 py-16">
        <IrregularPeriodCalculator />
      </main>
    </>
  );
}
