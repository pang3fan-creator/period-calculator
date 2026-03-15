import { getTranslations, getLocale } from "next-intl/server";
import { notFound } from "next/navigation";
import Image from "next/image";
import { Link } from "@/i18n/routing";
import { Breadcrumb } from "@/components/layout/breadcrumb";
import { JsonLd } from "@/components/seo/json-ld";
import { getPostBySlug, getAllUniqueSlugs } from "@/lib/blog/posts";
import { MDXRemote } from "next-mdx-remote/rsc";
import { mdxComponents } from "@/components/blog/mdx-components";
import type { Metadata } from "next";

function ArrowLeftIcon({ className }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      className={className}
    >
      <line x1="19" y1="12" x2="5" y2="12" />
      <polyline points="12 19 5 12 12 5" />
    </svg>
  );
}

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const slugs = getAllUniqueSlugs();
  const locales = ["en", "es", "fr"] as const;

  return locales.flatMap((locale) =>
    slugs.map((slug) => ({
      locale,
      slug,
    })),
  );
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const locale = (await getLocale()) as "en" | "es" | "fr";
  const post = getPostBySlug(slug, locale);

  if (!post) {
    return { title: "Not Found" };
  }

  return {
    title: `${post.title} | Period Calculator`,
    description: post.excerpt,
    alternates: {
      canonical: `/${locale === "en" ? "" : locale}blog/${slug}`,
      languages: {
        en: `/blog/${slug}`,
        es: `/es/blog/${slug}`,
        fr: `/fr/blog/${slug}`,
      },
    },
    openGraph: {
      title: post.title,
      description: post.excerpt,
      type: "article",
      publishedTime: post.date,
      authors: [post.author],
    },
  };
}

export default async function BlogPostPage({ params }: PageProps) {
  const { slug } = await params;
  const locale = (await getLocale()) as "en" | "es" | "fr";
  const t = await getTranslations("blog");
  const post = getPostBySlug(slug, locale);

  if (!post) {
    notFound();
  }

  return (
    <main className="flex min-h-screen flex-col items-center px-4 py-12">
      <div className="w-full max-w-3xl">
        <Breadcrumb
          overrides={[
            { segment: "blog", name: t("title"), noLink: true },
            { segment: slug, name: post.title },
          ]}
        />
      </div>

      <article className="w-full max-w-3xl">
        {/* 封面图 */}
        <div className="relative mb-8 aspect-video w-full overflow-hidden rounded-xl">
          <Image
            src="/og-image.png"
            alt={post.title}
            fill
            className="object-cover"
            priority
          />
        </div>

        {/* 标题 */}
        <h1 className="text-primary-400 mb-4 text-center text-4xl font-bold">
          {post.title}
        </h1>

        {/* 元信息 */}
        <div className="mb-8 flex flex-wrap items-center justify-center gap-4 text-sm text-gray-500 dark:text-gray-400">
          <span className="flex items-center gap-1">
            ✍️ {post.author}
          </span>
          <time dateTime={post.date} className="flex items-center gap-1">
            📅{" "}
            {new Date(post.date).toLocaleDateString(locale, {
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </time>
          {post.readingTime && (
            <span className="flex items-center gap-1">
              ⏱️ {post.readingTime}
            </span>
          )}
        </div>

        {/* 正文 */}
        <div className="prose prose-gray dark:prose-invert max-w-none">
          <MDXRemote source={post.content} components={mdxComponents} />
        </div>

        {/* 底部 */}
        <footer className="mt-12 text-center">
          <Link
            href="/"
            className="hover:text-trust-green-500 dark:hover:text-trust-green-400 inline-flex items-center gap-2 rounded-full text-gray-500 transition-colors duration-200 dark:text-gray-400"
          >
            <ArrowLeftIcon className="h-4 w-4" />
            <span className="text-sm">{t("backToHome")}</span>
          </Link>
        </footer>
      </article>

      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "Article",
          headline: post.title,
          description: post.excerpt,
          datePublished: post.date,
          author: {
            "@type": "Person",
            name: post.author,
          },
        }}
      />
    </main>
  );
}
