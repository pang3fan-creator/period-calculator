import { Metadata } from "next";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  return {
    title: "Irregular Period Calculator - Track Uneven Cycles",
    description:
      "Calculate your period even with irregular cycles. Our algorithm uses historical data to provide accurate predictions. 100% private.",
  };
}

export default function IrregularPeriodCalculatorPage() {
  return (
    <main className="flex min-h-screen flex-col items-center px-4 py-16">
      <h1 className="text-primary-400 text-center text-3xl font-bold">
        Irregular Period Calculator
      </h1>
      <p className="mt-4 text-gray-500 dark:text-gray-400">Coming soon.</p>
    </main>
  );
}
