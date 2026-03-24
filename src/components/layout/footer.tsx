import Image from "next/image";
import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/routing";
import { getAllPostMetadata } from "@/lib/blog/posts";
import type { Locale } from "@/i18n/config";

interface FooterProps {
  locale: Locale;
}

export async function Footer({ locale }: FooterProps) {
  const t = await getTranslations({ locale, namespace: "footer" });
  const tNav = await getTranslations({ locale, namespace: "nav" });
  const tCommon = await getTranslations({ locale, namespace: "common" });
  const blogPosts = getAllPostMetadata(locale);

  const linkClassName =
    "focus-visible:ring-primary-400 hover:text-primary-400 block rounded-lg text-sm text-gray-500 transition-colors outline-none focus-visible:ring-2 focus-visible:ring-offset-2 dark:text-gray-400";

  return (
    <footer className="border-warmbeige-200 bg-ivory-50 dark:border-dark-border dark:bg-dark-bg border-t">
      <div className="mx-auto max-w-7xl px-4 py-12">
        {/* 四列网格布局: 品牌 | 计算器 | 博客 | 法律 */}
        <div className="grid gap-8 text-center md:grid-cols-4 md:text-left">
          {/* 第一列: 品牌 + 信任徽章 */}
          <div>
            <span className="font-heading text-primary-400 text-lg font-bold">
              {tCommon("appName")}
            </span>
            <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
              {t("tagline")}
            </p>
            {/* 信任徽章 */}
            <div className="mt-4 flex items-start justify-center gap-2 md:justify-start">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="mt-0.5 shrink-0 text-gray-500 dark:text-gray-400"
                aria-hidden="true"
              >
                <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
                <path d="M7 11V7a5 5 0 0 1 10 0v4" />
              </svg>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                {t("trustText")}
              </p>
            </div>
            <a
              href="https://aiagentsdirectory.com/agent/accurate-period-calculator?utm_source=badge&utm_medium=referral&utm_campaign=free_listing&utm_content=accurate-period-calculator"
              target="_blank"
              rel="noopener noreferrer nofollow"
              className="mt-4 inline-block rounded-lg outline-none focus-visible:ring-2 focus-visible:ring-offset-2"
            >
              <Image
                src="https://aiagentsdirectory.com/featured-badge.svg?v=2024"
                alt="Accurate Period Calculator - Featured AI Agent on AI Agents Directory"
                width="200"
                height="50"
              />
            </a>
          </div>

          {/* 第二列: Calculators */}
          <div>
            <h3 className="text-sm font-semibold tracking-wider text-gray-700 uppercase dark:text-gray-300">
              {t("calculators")}
            </h3>
            <ul className="mt-3 space-y-2">
              <li>
                <Link href="/" className={linkClassName}>
                  {tNav("home")}
                </Link>
              </li>
              <li>
                <Link
                  href="/irregular-period-calculator"
                  className={linkClassName}
                >
                  {tNav("irregularCalculator")}
                </Link>
              </li>
              <li>
                <Link
                  href="/ovulation-period-calculator"
                  className={linkClassName}
                >
                  {tNav("ovulationCalculator")}
                </Link>
              </li>
            </ul>
          </div>

          {/* 第三列: Blog */}
          <div>
            <h3 className="text-sm font-semibold tracking-wider text-gray-700 uppercase dark:text-gray-300">
              {t("blog")}
            </h3>
            <ul className="mt-3 space-y-2">
              {blogPosts.map((post) => (
                <li key={post.slug}>
                  <Link href={`/blog/${post.slug}`} className={linkClassName}>
                    {post.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* 第四列: Legal */}
          <div>
            <h3 className="text-sm font-semibold tracking-wider text-gray-700 uppercase dark:text-gray-300">
              {t("legal")}
            </h3>
            <ul className="mt-3 space-y-2">
              <li>
                <Link href="/privacy-policy" className={linkClassName}>
                  {tNav("privacyPolicy")}
                </Link>
              </li>
              <li>
                <Link href="/editorial-policy" className={linkClassName}>
                  {tNav("editorialPolicy")}
                </Link>
              </li>
              <li>
                <Link href="/about" className={linkClassName}>
                  {tNav("about")}
                </Link>
              </li>
              <li>
                <a
                  href="https://dang.ai/"
                  target="_blank"
                  rel="noopener noreferrer nofollow"
                  className={linkClassName}
                >
                  Dang.ai
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Copyright bar */}
        <div className="border-warmbeige-200 dark:border-dark-border mt-8 border-t pt-6 text-center text-xs text-gray-400">
          {t("copyright", { year: new Date().getFullYear() })}
        </div>
      </div>
    </footer>
  );
}
