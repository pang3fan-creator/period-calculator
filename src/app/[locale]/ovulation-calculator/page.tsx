import { Metadata } from "next";
import { JsonLd } from "@/components/seo/json-ld";
import { OvulationPeriodCalculator } from "@/components/calculator/ovulation-period-calculator";

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
    title: "Ovulation Calculator - Find Your Fertile Window",
    description:
      "Calculate your ovulation date and fertile window. Plan pregnancy or understand your cycle better. 100% private.",
    alternates: {
      canonical: `${baseUrl}/${locale === "en" ? "" : locale}/ovulation-calculator`,
      languages: locales.reduce(
        (acc, loc) => {
          acc[localeNames[loc]] =
            `${baseUrl}/${loc === "en" ? "" : loc}/ovulation-calculator`;
          return acc;
        },
        {} as Record<string, string>,
      ),
    },
  };
}

export default function OvulationCalculatorPage() {
  // JSON-LD Schema for WebApplication (Ovulation Calculator)
  const webApplicationSchema = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: "Ovulation Calculator",
    description:
      "Calculate your ovulation date and fertile window. Plan pregnancy or understand your cycle better. 100% private - all data stays in your browser.",
    url: `${baseUrl}/ovulation-calculator`,
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
        name: "Ovulation Calculator",
        item: `${baseUrl}/ovulation-calculator`,
      },
    ],
  };

  return (
    <>
      <JsonLd data={webApplicationSchema} />
      <JsonLd data={breadcrumbSchema} />
      <main className="flex min-h-screen flex-col items-center px-4 py-16">
        <OvulationPeriodCalculator />
      </main>
    </>
  );
}
