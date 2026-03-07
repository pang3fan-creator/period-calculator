import { Metadata } from "next";
import { JsonLd } from "@/components/seo/json-ld";

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

  return {
    title: "Period Calculator vs Flo vs Clue - Which is Best?",
    description:
      "Compare Period Calculator with Flo, Clue, and Natural Cycles. Privacy-focused, free, and accurate menstrual cycle tracking without data collection.",
    openGraph: {
      title: "Period Calculator vs Flo vs Clue - Which is Best?",
      description:
        "Compare Period Calculator with Flo, Clue, and Natural Cycles. Privacy-focused, free, and accurate menstrual cycle tracking without data collection.",
      url: `${baseUrl}/${locale === "en" ? "" : locale}/period-calculator-vs-flo-clue`,
      siteName: "Period Calculator",
      locale: localeNames[locale],
      alternateLocale: locales.filter((l) => l !== locale).map((l) => localeNames[l]),
      type: "article",
      images: [
        {
          url: `${baseUrl}/og-image.png`,
          width: 1200,
          height: 630,
          alt: "Period Calculator vs Flo vs Clue Comparison",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: "Period Calculator vs Flo vs Clue - Which is Best?",
      description:
        "Compare Period Calculator with Flo, Clue, and Natural Cycles. Privacy-focused, free, and accurate menstrual cycle tracking without data collection.",
      images: [`${baseUrl}/og-image.png`],
    },
    alternates: {
      canonical: `${baseUrl}/${locale === "en" ? "" : locale}/period-calculator-vs-flo-clue`,
      languages: locales.reduce(
        (acc, loc) => {
          acc[localeNames[loc]] =
            `${baseUrl}/${loc === "en" ? "" : loc}/period-calculator-vs-flo-clue`;
          return acc;
        },
        {} as Record<string, string>,
      ),
    },
  };
}

// Comparison data for structured markup
const comparisons = [
  {
    feature: "Price",
    periodCalculator: "100% Free",
    flo: "Freemium ($9.99/mo premium)",
    clue: "Freemium ($5.99/mo premium)",
    naturalCycles: "$9.99/mo",
  },
  {
    feature: "Data Storage",
    periodCalculator: "100% Local (on device)",
    flo: "Cloud (requires account)",
    clue: "Cloud (requires account)",
    naturalCycles: "Cloud (requires account)",
  },
  {
    feature: "Privacy",
    periodCalculator: "Zero data collection",
    flo: "Data collected & shared",
    clue: "Data collected & shared",
    naturalCycles: "Data collected & shared",
  },
  {
    feature: "Irregular Cycles",
    periodCalculator: "Advanced algorithm with confidence levels",
    flo: "Basic predictions",
    clue: "Basic predictions",
    naturalCycles: "Uses basal temperature",
  },
  {
    feature: "Calendar Export",
    periodCalculator: "Free .ics export",
    flo: "Premium only",
    clue: "Premium only",
    naturalCycles: "Included",
  },
  {
    feature: "No Login Required",
    periodCalculator: "Yes - instant use",
    flo: "No - account required",
    clue: "No - account required",
    naturalCycles: "No - account required",
  },
];

export default async function ComparisonPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  // JSON-LD Schema for Comparison article
  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: "Period Calculator vs Flo vs Clue - Which is Best in 2025?",
    description:
      "Comprehensive comparison of top period tracking apps. Privacy-focused Period Calculator vs popular alternatives Flo, Clue, and Natural Cycles.",
    url: `${baseUrl}/period-calculator-vs-flo-clue`,
    inLanguage: locale,
    image: `${baseUrl}/og-image.png`,
    author: {
      "@type": "Organization",
      name: "Period Calculator",
    },
    datePublished: new Date().toISOString(),
    dateModified: new Date().toISOString(),
    articleSection: "Health",
  };

  // FAQ Schema for comparison page
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: "Is Period Calculator better than Flo for privacy?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Yes, Period Calculator is 100% privacy-focused. Unlike Flo, Clue, and Natural Cycles which require accounts and store data in the cloud, Period Calculator keeps all data on your device. We never collect, store, or share any personal information.",
        },
      },
      {
        "@type": "Question",
        name: "Does Period Calculator cost money?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "No, Period Calculator is completely free with no premium tier. All features including irregular cycle calculations, calendar export, and fertility window predictions are available at no cost.",
        },
      },
      {
        "@type": "Question",
        name: "Can I use Period Calculator without creating an account?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Yes, unlike Flo, Clue, and Natural Cycles which require account creation, Period Calculator works instantly without any login. Your data never leaves your device.",
        },
      },
    ],
  };

  return (
    <>
      <JsonLd data={articleSchema} />
      <JsonLd data={faqSchema} />
      <main className="flex flex-col items-center px-4 py-16">
        <h1 className="text-primary-400 text-center text-3xl font-bold md:text-4xl">
          Period Calculator vs Flo vs Clue
        </h1>
        <p className="mt-4 max-w-2xl text-center text-lg text-gray-600 dark:text-gray-300">
          A comprehensive privacy-focused comparison of the best period tracking apps in 2025.
        </p>

        {/* Comparison Table */}
        <div className="mt-12 w-full max-w-4xl overflow-x-auto">
          <table className="w-full border-collapse text-left">
            <thead>
              <tr className="bg-primary-100 dark:bg-primary-900">
                <th className="border border-gray-200 p-4 font-bold">Feature</th>
                <th className="border border-gray-200 p-4 font-bold text-primary-600">
                  Period Calculator
                </th>
                <th className="border border-gray-200 p-4 font-bold">Flo</th>
                <th className="border border-gray-200 p-4 font-bold">Clue</th>
                <th className="border border-gray-200 p-4 font-bold">Natural Cycles</th>
              </tr>
            </thead>
            <tbody>
              {comparisons.map((row, index) => (
                <tr
                  key={index}
                  className={index % 2 === 0 ? "bg-gray-50 dark:bg-gray-800" : ""}
                >
                  <td className="border border-gray-200 p-4 font-medium">{row.feature}</td>
                  <td className="border border-gray-200 p-4 font-bold text-primary-600">
                    {row.periodCalculator}
                  </td>
                  <td className="border border-gray-200 p-4">{row.flo}</td>
                  <td className="border border-gray-200 p-4">{row.clue}</td>
                  <td className="border border-gray-200 p-4">{row.naturalCycles}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Key Takeaways */}
        <div className="mt-16 w-full max-w-4xl">
          <h2 className="mb-6 text-2xl font-bold">Why Choose Period Calculator?</h2>
          <div className="grid gap-6 md:grid-cols-3">
            <div className="rounded-lg bg-green-50 p-6 dark:bg-green-900/20">
              <h3 className="mb-2 text-lg font-bold text-green-700 dark:text-green-400">
                100% Private
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-300">
                Your data never leaves your device. No accounts, no cloud storage, no data collection.
              </p>
            </div>
            <div className="rounded-lg bg-blue-50 p-6 dark:bg-blue-900/20">
              <h3 className="mb-2 text-lg font-bold text-blue-700 dark:text-blue-400">
                Completely Free
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-300">
                All features included. No premium upsells, no subscription required.
              </p>
            </div>
            <div className="rounded-lg bg-purple-50 p-6 dark:bg-purple-900/20">
              <h3 className="mb-2 text-lg font-bold text-purple-700 dark:text-purple-400">
                Advanced Algorithm
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-300">
                Uses weighted averages and standard deviation for accurate irregular cycle predictions.
              </p>
            </div>
          </div>
        </div>

        {/* Disclaimer */}
        <div className="mt-12 w-full max-w-4xl rounded-lg bg-gray-100 p-6 dark:bg-gray-800">
          <p className="text-sm text-gray-600 dark:text-gray-400">
            <strong>Disclaimer:</strong> This comparison is based on publicly available information as of 2025.
            Period Calculator is designed for informational purposes only and is not a medical device.
            Always consult healthcare professionals for medical advice.
          </p>
        </div>
      </main>
    </>
  );
}
