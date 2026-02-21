import { useTranslations } from "next-intl";

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
      <div className="shadow-soft dark:bg-dark-card mt-12 w-full max-w-2xl rounded-3xl bg-white p-8">
        <p className="text-center text-gray-500 dark:text-gray-400">
          {t("comingSoon")}
        </p>
      </div>
    </div>
  );
}
