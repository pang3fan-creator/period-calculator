import { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { JsonLd } from "@/components/seo/json-ld";
import { OvulationPeriodCalculator } from "@/components/calculator/ovulation-period-calculator";
import { OvulationFAQ } from "@/components/calculator/ovulation-faq";
import { OvulationAlgorithmTransparency } from "@/components/calculator/ovulation-algorithm-transparency";
import { OvulationHowToCalculate } from "@/components/calculator/ovulation-how-to-calculate";
import { DeepKnowledge } from "@/components/home/deep-knowledge";
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
    openGraph: {
      title: "Ovulation Calculator - Find Your Fertile Window",
      description:
        "Calculate your ovulation date and fertile window. Plan pregnancy or understand your cycle better. 100% private.",
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
      title: "Ovulation Calculator - Find Your Fertile Window",
      description:
        "Calculate your ovulation date and fertile window. Plan pregnancy or understand your cycle better. 100% private.",
      images: [`${baseUrl}/og-image.png`],
    },
    alternates: {
      canonical: `${baseUrl}/${locale === "en" ? "" : locale}/ovulation-period-calculator`,
      languages: locales.reduce(
        (acc, loc) => {
          acc[localeNames[loc]] =
            `${baseUrl}/${loc === "en" ? "" : loc}/ovulation-period-calculator`;
          return acc;
        },
        {} as Record<string, string>,
      ),
    },
  };
}

export default async function OvulationCalculatorPage() {
  const t = await getTranslations("ovulationCalculator");
  const tOtherTools = await getTranslations("ovulationCalculator.otherTools");
  // JSON-LD Schema for WebApplication (Ovulation Calculator)
  const webApplicationSchema = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: "Ovulation Calculator",
    description:
      "Calculate your ovulation date and fertile window. Plan pregnancy or understand your cycle better. 100% private - all data stays in your browser.",
    url: `${baseUrl}/ovulation-period-calculator`,
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
        item: `${baseUrl}/ovulation-period-calculator`,
      },
    ],
  };

  // JSON-LD Schema for FAQPage (Ovulation)
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: "What is ovulation and why is it important?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Ovulation is the process where a mature egg is released from the ovary. It's the most fertile time of your cycle and is crucial for conception. Understanding your ovulation helps you identify your fertile window.",
        },
      },
      {
        "@type": "Question",
        name: "How accurate is the ovulation calculator?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "The calculator provides estimates based on your cycle data. For regular cycles, it's quite accurate. For irregular cycles, the prediction may be less precise. For best results, track your cycles over several months.",
        },
      },
      {
        "@type": "Question",
        name: "What is the fertile window?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "The fertile window is the 6-day period when conception is most likely: the 5 days before ovulation and the day of ovulation itself. Sperm can survive up to 5 days in the reproductive tract.",
        },
      },
    ],
  };

  // JSON-LD Schema for HowTo (Ovulation calculation steps)
  const howToSchema = {
    "@context": "https://schema.org",
    "@type": "HowTo",
    name: "How to Calculate Your Ovulation Date",
    description:
      "Learn how to use our ovulation calculator to find your most fertile days.",
    step: [
      {
        "@type": "HowToStep",
        name: "Enter your last period start date",
        text: "Input the first day of your most recent menstrual period.",
      },
      {
        "@type": "HowToStep",
        name: "Set your cycle length",
        text: "Enter your average cycle length (typically 21-35 days).",
      },
      {
        "@type": "HowToStep",
        name: "Choose your purpose",
        text: "Select whether you're trying to conceive or trying to avoid pregnancy.",
      },
      {
        "@type": "HowToStep",
        name: "View your results",
        text: "See your ovulation date, fertile window, and next period start date.",
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
          {t("h1Title")}
        </h1>
        <p className="mt-4 max-w-2xl text-center text-lg text-gray-600 dark:text-gray-300">
          Find your fertile window and ovulation date. Plan pregnancy or
          understand your cycle better with accurate predictions.
        </p>
        <div className="mt-12 w-full max-w-2xl">
          <OvulationPeriodCalculator />
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
          <DeepKnowledge />
        </div>

        {/* FAQ */}
        <div className="mt-24 w-full max-w-4xl">
          <OvulationFAQ />
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
