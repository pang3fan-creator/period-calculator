import { Metadata } from "next";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  return {
    title: "Ovulation Calculator - Find Your Fertile Window",
    description:
      "Calculate your ovulation date and fertile window. Plan pregnancy or understand your cycle better. 100% private.",
  };
}

export default function OvulationCalculatorPage() {
  return (
    <main className="flex min-h-screen flex-col items-center px-4 py-16">
      <h1 className="text-primary-400 text-center text-3xl font-bold">
        Ovulation Calculator
      </h1>
      <p className="mt-4 text-gray-500 dark:text-gray-400">Coming soon.</p>
    </main>
  );
}
