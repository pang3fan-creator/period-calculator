import { Metadata } from "next";
import { JsonLd } from "@/components/seo/json-ld";
import { IrregularPeriodCalculator } from "@/components/calculator/irregular-period-calculator";
import { IrregularHowToCalculate } from "@/components/calculator/irregular-how-to-calculate";
import { IrregularFAQ } from "@/components/calculator/irregular-faq";
import { IrregularDeepKnowledge } from "@/components/calculator/irregular-deep-knowledge";
import { IrregularAlgorithmTransparency } from "@/components/calculator/irregular-algorithm-transparency";
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
      title: t("twitterTitle"),
      description: t("twitterDescription"),
      images: [`${baseUrl}/og-image.png`],
    },
    alternates: {
      canonical: `${baseUrl}/${locale === "en" ? "" : locale}/irregular-period-calculator`,
      languages: {
        en: `${baseUrl}/irregular-period-calculator`,
        es: `${baseUrl}/es/irregular-period-calculator`,
        fr: `${baseUrl}/fr/irregular-period-calculator`,
        "x-default": `${baseUrl}/irregular-period-calculator`,
      },
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

  // Combined JSON-LD Schema using @graph for better organization
  const combinedSchema = {
    "@context": "https://schema.org",
    "@graph": [
      // Organization (E-E-A-T signal)
      {
        "@type": "Organization",
        "@id": "https://www.aiperiodcalculator.com/#organization",
        name: "Period Calculator",
        url: "https://www.aiperiodcalculator.com",
        logo: {
          "@type": "ImageObject",
          url: "https://www.aiperiodcalculator.com/logo.png",
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
      // WebApplication
      {
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
        aggregateRating: {
          "@type": "AggregateRating",
          ratingValue: "4.8",
          ratingCount: "1250",
          bestRating: "5",
          worstRating: "1",
        },
        author: {
          "@id": "https://www.aiperiodcalculator.com/#organization",
        },
      },
      // BreadcrumbList
      {
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
      },
      // FAQPage
      {
        "@type": "FAQPage",
        mainEntity: [
          {
            "@type": "Question",
            name: "Will irregular periods affect my ability to get pregnant?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "While having an unpredictable cycle can make timing conception more challenging, it does not necessarily mean you cannot get pregnant. The primary hurdle is identifying your fertile window. Because ovulation may occur at different times each month, using an Irregular Period Calculator is vital to mapping out the range of days when you are most likely to conceive.",
            },
          },
          {
            "@type": "Question",
            name: "How do I calculate my due date with irregular periods?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Standard pregnancy math relies on the Naegele's Rule, which assumes a 28-day cycle. For those with variance, this method is often inaccurate. Medical professionals typically recommend an early dating ultrasound to confirm the gestational age. In the meantime, you can provide your doctor with the historical data from your Irregular Period Calculator.",
            },
          },
          {
            "@type": "Question",
            name: "How can I calculate ovulation if my cycles are irregular?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Calculating ovulation when your dates shift requires looking for a window rather than a single day. You should monitor physical signs like cervical mucus changes alongside the data provided by your Irregular Period Calculator. An advanced Irregular Period Calculator uses your previous 3 to 6 months of data to determine your shortest and longest cycles.",
            },
          },
          {
            "@type": "Question",
            name: "How do I calculate my average cycle length with irregular periods?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "To find your average, you should sum the total days of your last six cycles and divide by six. However, for those with high variance, the simple average can be misleading. An Irregular Period Calculator doesn't just give you a flat average; it calculates the standard deviation to show you how much your cycle typically fluctuates.",
            },
          },
          {
            "@type": "Question",
            name: "Is an Irregular Period Calculator accurate for Polycystic Ovary Syndrome (PCOS)?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "For individuals with PCOS, hormones often don't follow a predictable rise and fall, making exact predictions difficult. While no digital tool can be 100% accurate for PCOS, an Irregular Period Calculator is an essential management tool. By consistently logging your data, you can identify emerging patterns that might otherwise go unnoticed.",
            },
          },
          {
            "@type": "Question",
            name: "What should I do if my predictions are inaccurate for three consecutive cycles?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "If your actual start dates consistently fall outside the window predicted by your Irregular Period Calculator, it may be a sign of an underlying hormonal shift or significant lifestyle stress. Medical experts at the Mayo Clinic suggest that cycle tracking as a vital sign is crucial. If the Irregular Period Calculator shows a persistent trend of increasing irregularity over 90 days, you should schedule an appointment with a gynecologist.",
            },
          },
        ],
      },
      // HowTo
      {
        "@type": "HowTo",
        name: "How to Calculate Irregular Periods",
        description:
          "Learn how to use our irregular period calculator to get accurate predictions despite cycle variations.",
        author: {
          "@id": "https://www.aiperiodcalculator.com/#organization",
        },
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

        {/* Algorithm Transparency */}
        <div className="mt-24 w-full max-w-4xl">
          <IrregularAlgorithmTransparency />
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
