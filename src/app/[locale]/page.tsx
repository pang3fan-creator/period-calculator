import { useTranslations } from "next-intl";
import { Metadata } from "next";
import { PeriodCalculator } from "@/components/calculator";
import { HowToCalculate } from "@/components/home/how-to-calculate";
import { DeepKnowledge } from "@/components/home/deep-knowledge";
import { FAQ } from "@/components/home/faq";
import { JsonLd } from "@/components/seo/json-ld";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  return {
    title: "Period Calculator - Free & Private Menstrual Cycle Tracker",
    description:
      "Calculate your next period, fertile window, and ovulation date. 100% private - all data stays in your browser. No login required.",
  };
}

export default function HomePage() {
  const t = useTranslations("home");

  // JSON-LD Schema for WebApplication
  const webApplicationSchema = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: "Period Calculator",
    description:
      "Calculate your next period, fertile window, and ovulation date. 100% private - all data stays in your browser.",
    url: "https://periodcalculator.site",
    applicationCategory: "HealthApplication",
    operatingSystem: "Web Browser",
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "USD",
    },
  };

  // JSON-LD Schema for FAQPage
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: "How late is a period considered abnormal?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "While occasional delays are normal, if your period is consistently over 35 days apart, or if you experience a sudden change from your regular pattern, it's worth consulting a healthcare provider.",
        },
      },
      {
        "@type": "Question",
        name: "How do I calculate my safe period?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "The safe period is calculated by identifying your fertile window. Your fertile window typically spans 5-6 days ending on the day of ovulation.",
        },
      },
      {
        "@type": "Question",
        name: "How can I prepare for pregnancy with irregular cycles?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Track your cycles for several months to identify patterns. Use ovulation predictor kits or track basal body temperature to pinpoint ovulation.",
        },
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
      <JsonLd data={faqSchema} />
      <JsonLd data={organizationSchema} />
      <div className="flex flex-col items-center px-4 py-16">
        <h1 className="text-primary-400 text-center text-3xl font-bold md:text-4xl">
          {t("title")}
        </h1>
        <p className="mt-4 max-w-2xl text-center text-lg text-gray-600 dark:text-gray-300">
          {t("subtitle")}
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
      </div>
    </>
  );
}
