import { getTranslations, getLocale } from "next-intl/server";
import { notFound } from "next/navigation";
import { Link } from "@/i18n/routing";
import { Breadcrumb } from "@/components/layout/breadcrumb";
import { JsonLd } from "@/components/seo/json-ld";
import { getPostBySlug, getAllUniqueSlugs } from "@/lib/blog/posts";
import { MDXRemote } from "next-mdx-remote/rsc";
import { mdxComponents } from "@/components/blog/mdx-components";
import type { Metadata } from "next";

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
    <main className="flex min-h-screen flex-col items-center px-4 py-16">
      <div className="w-full max-w-4xl">
        <Breadcrumb
          overrides={[
            { segment: "blog", name: t("title"), noLink: true },
            { segment: slug, name: post.title },
          ]}
        />
      </div>

      <article className="w-full max-w-4xl">
        <header className="mb-8">
          <h1 className="text-primary-400 mb-4 text-3xl font-bold">
            {post.title}
          </h1>

          <div className="flex flex-wrap items-center gap-4 text-sm text-gray-500 dark:text-gray-400">
            <time dateTime={post.date}>
              {t("publishedOn")}{" "}
              {new Date(post.date).toLocaleDateString(locale, {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </time>
            <span>{t("byAuthor", { author: post.author })}</span>
            {post.readingTime && <span>{post.readingTime}</span>}
          </div>
        </header>

        <div className="prose prose-gray dark:prose-invert max-w-none">
          <MDXRemote source={post.content} components={mdxComponents} />
        </div>

        <footer className="mt-12 border-t border-gray-200 pt-6 dark:border-gray-700">
          <Link href="/" className="text-primary-400 hover:underline">
            ← {t("backToHome")}
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
