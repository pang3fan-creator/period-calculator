import { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { JsonLd } from "@/components/seo/json-ld";
import { OvulationPeriodCalculator } from "@/components/calculator/ovulation-period-calculator";
import { OvulationFAQ } from "@/components/calculator/ovulation-faq";
import { OvulationAlgorithmTransparency } from "@/components/calculator/ovulation-algorithm-transparency";
import { OvulationHowToCalculate } from "@/components/calculator/ovulation-how-to-calculate";
import { OvulationDeepKnowledge } from "@/components/calculator/ovulation-deep-knowledge";
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

  // Multi-language title and description (optimized for SEO)
  const titles: Record<string, string> = {
    en: "Ovulation Period Calculator: Accurate Fertile Window Tracker",
    es: "Calculadora del Periodo de Ovulación: Días Fértiles y Ciclo",
    fr: "Calculateur de période d'ovulation : Fenêtre de Fertilité",
  };

  const descriptions: Record<string, string> = {
    en: "Find your peak fertility days with our Ovulation Period Calculator. Accurate tracking of your fertile window for pregnancy. 100% private, no signup required.",
    es: "Predice tus días más fértiles con nuestra Calculadora del Periodo de Ovulación. Rastrea tu ventana de fertilidad para el embarazo. 100% privado y sin registro.",
    fr: "Prédisez vos jours fertiles avec notre Calculateur de période d'ovulation. Suivez votre fenêtre de fertilité et grossesse. 100% privé, sans inscription requise.",
  };

  const title = titles[locale] || titles.en;
  const description = descriptions[locale] || descriptions.en;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
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
      title,
      description,
      images: [`${baseUrl}/og-image.png`],
    },
    alternates: {
      canonical: `${baseUrl}/${locale === "en" ? "" : locale}/ovulation-period-calculator`,
      languages: {
        en: `${baseUrl}/ovulation-period-calculator`,
        es: `${baseUrl}/es/ovulation-period-calculator`,
        fr: `${baseUrl}/fr/ovulation-period-calculator`,
        "x-default": `${baseUrl}/ovulation-period-calculator`,
      },
    },
  };
}

export default async function OvulationCalculatorPage() {
  const t = await getTranslations("ovulationCalculator");
  const tOtherTools = await getTranslations("ovulationCalculator.otherTools");

  // Combined JSON-LD Schema using @graph for better semantic relationships
  const combinedSchema = {
    "@context": "https://schema.org",
    "@graph": [
      // Organization Schema (E-E-A-T signal)
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
      // WebSite Schema
      {
        "@type": "WebSite",
        "@id": `${baseUrl}/#website`,
        url: baseUrl,
        name: "Period Calculator",
        publisher: {
          "@id": `${baseUrl}/#organization`,
        },
      },
      // WebPage Schema
      {
        "@type": "WebPage",
        "@id": `${baseUrl}/ovulation-period-calculator#webpage`,
        url: `${baseUrl}/ovulation-period-calculator`,
        name: "Ovulation Calculator: Track Your Fertile Window",
        description:
          "Use our free Ovulation Calculator to find your peak fertility days. Track your fertile window accurately for pregnancy planning.",
        isPartOf: {
          "@id": `${baseUrl}/#website`,
        },
        about: {
          "@type": "MedicalProcedure",
          name: "Ovulation Prediction",
        },
        mainEntity: {
          "@id": `${baseUrl}/ovulation-period-calculator#webapplication`,
        },
      },
      // WebApplication Schema (Enhanced)
      {
        "@type": "WebApplication",
        "@id": `${baseUrl}/ovulation-period-calculator#webapplication`,
        name: "Ovulation Calculator",
        description:
          "Calculate your ovulation date and fertile window. Plan pregnancy or understand your cycle better. 100% private - all data stays in your browser.",
        url: `${baseUrl}/ovulation-period-calculator`,
        applicationCategory: "HealthApplication",
        applicationSubCategory: "Reproductive Health Application",
        operatingSystem: "Any",
        browserRequirements: "Requires JavaScript. Requires HTML5.",
        softwareVersion: "1.0",
        offers: {
          "@type": "Offer",
          price: "0",
          priceCurrency: "USD",
          availability: "https://schema.org/InStock",
        },
        featureList: [
          "Ovulation date prediction",
          "Fertile window calculation",
          "Cycle tracking",
          "Calendar integration",
          "Privacy-first design",
        ],
      },
      // BreadcrumbList Schema
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
            name: "Ovulation Calculator",
            item: `${baseUrl}/ovulation-period-calculator`,
          },
        ],
      },
      // HowTo Schema (Enhanced)
      {
        "@type": "HowTo",
        name: "How to Calculate Your Ovulation Date",
        description:
          "Learn how to use our ovulation calculator to find your most fertile days.",
        totalTime: "PT2M",
        estimatedCost: {
          "@type": "MonetaryAmount",
          currency: "USD",
          value: "0",
        },
        step: [
          {
            "@type": "HowToStep",
            position: 1,
            name: "Enter your last period start date",
            text: "Input the first day of your most recent menstrual period.",
          },
          {
            "@type": "HowToStep",
            position: 2,
            name: "Set your cycle length",
            text: "Enter your average cycle length (typically 21-35 days).",
          },
          {
            "@type": "HowToStep",
            position: 3,
            name: "Choose your purpose",
            text: "Select whether you're trying to conceive or trying to avoid pregnancy.",
          },
          {
            "@type": "HowToStep",
            position: 4,
            name: "View your results",
            text: "See your ovulation date, fertile window, and next period start date.",
          },
        ],
      },
      // FAQPage Schema
      {
        "@type": "FAQPage",
        mainEntity: [
          {
            "@type": "Question",
            name: "What is the ovulation period and how is it calculated?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Ovulation is the specific point in your menstrual cycle when a mature egg is released from the ovary, making it available for fertilization. To determine this timing, an Ovulation Period Calculator typically subtracts the length of your luteal phase (the time between ovulation and your next period, usually 14 days) from your total cycle length. By identifying this biological midpoint, an Ovulation Period Calculator helps you understand the brief 12-to-24-hour window when the egg is viable.",
            },
          },
          {
            "@type": "Question",
            name: "What are the symptoms of ovulation?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "While an Ovulation Period Calculator provides a mathematical estimate, your body often signals the event through physical changes. Common symptoms include a change in cervical mucus (becoming clear and stretchy, like egg whites), a mild ache in the lower abdomen known as mittelschmerz, and a heightened sense of smell or increased libido. Many women use an Ovulation Period Calculator in tandem with tracking these symptoms to gain a more comprehensive view of their reproductive health.",
            },
          },
          {
            "@type": "Question",
            name: "How do I calculate my ovulation period?",
            acceptedAnswer: {
              "@type": "Answer",
              text: 'To calculate your window manually, you must know the first day of your last period and your average cycle length. However, the most efficient way to ensure accuracy is to use a dedicated Ovulation Period Calculator. By inputting your dates into an Ovulation Period Calculator, the algorithm analyzes your cycle\'s history to pinpoint your peak fertility. Relying on an Ovulation Period Calculator is especially helpful if you want to identify the "fertile window"—the five days leading up to egg release when sperm can survive in the body.',
            },
          },
          {
            "@type": "Question",
            name: "How many days after my period do I ovulate?",
            acceptedAnswer: {
              "@type": "Answer",
              text: 'In a standard 28-day cycle, ovulation usually occurs around Day 14. However, the exact timing depends entirely on the length of your specific cycle. An Ovulation Period Calculator will show that if you have a shorter cycle (e.g., 21 days), you might ovulate just 7 days after your period starts. Using an Ovulation Period Calculator helps you avoid the "Day 14 myth" by providing a date tailored to your unique biological data.',
            },
          },
          {
            "@type": "Question",
            name: "Can I get pregnant two days after ovulation?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Biologically, the chances of conceiving two days after ovulation are extremely low. Once an egg is released, it only survives for about 12 to 24 hours. An Ovulation Period Calculator focuses on the days leading up to ovulation because sperm can live for five days, but once the egg has disintegrated, the fertile window closes. If your Ovulation Period Calculator indicates that your peak has passed, your body has likely moved into the luteal phase, where pregnancy is no longer possible for that cycle.",
            },
          },
          {
            "@type": "Question",
            name: "Is this ovulation calculator accurate for irregular cycles?",
            acceptedAnswer: {
              "@type": "Answer",
              text: 'If your cycles vary significantly, an Ovulation Period Calculator is still a highly useful tool, though it provides a "predicted window" rather than a single certain date. For those with irregularity, an Ovulation Period Calculator uses moving averages to estimate when your next window might open. While an Ovulation Period Calculator cannot account for sudden lifestyle changes or stress that might delay ovulation, it remains the best way to document trends that you can later share with a healthcare professional for a deeper medical evaluation.',
            },
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
          {t("h1Title")}
        </h1>
        {/* Independent Answer Block - AI SEO Optimization */}
        <p className="mt-4 max-w-2xl text-center text-lg text-gray-600 dark:text-gray-300">
          An Ovulation Calculator predicts your most fertile days by analyzing
          your menstrual cycle data. It calculates your ovulation date and your
          fertile window—the 6 days when pregnancy is possible. Use this free
          tool to plan pregnancy or understand your cycle—100% private, no
          signup required.
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
          <OvulationDeepKnowledge />
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
