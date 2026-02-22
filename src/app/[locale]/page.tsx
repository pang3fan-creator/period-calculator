import { useTranslations } from "next-intl";
import { PeriodCalculator } from "@/components/calculator";
import { HowToCalculate } from "@/components/home/how-to-calculate";

export default function HomePage() {
  const t = useTranslations("home");

  return (
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
    </div>
  );
}
