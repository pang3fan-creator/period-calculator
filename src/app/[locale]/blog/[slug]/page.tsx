import { getTranslations } from "next-intl/server";
import { notFound } from "next/navigation";
import Image from "next/image";
import { Link } from "@/i18n/routing";
import { Breadcrumb } from "@/components/layout/breadcrumb";
import { JsonLd } from "@/components/seo/json-ld";
import { getPostBySlug, getAllUniqueSlugs } from "@/lib/blog/posts";
import { MDXRemote } from "next-mdx-remote/rsc";
import remarkGfm from "remark-gfm";
import { mdxComponents } from "@/components/blog/mdx-components";
import { buildUrl, BASE_URL } from "@/lib/url";
import type { Metadata } from "next";
import type { Locale } from "@/i18n/config";

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
  params: Promise<{ locale: string; slug: string }>;
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
  const { locale, slug } = await params;
  const post = getPostBySlug(slug, locale as Locale);

  if (!post) {
    return { title: "Not Found" };
  }

  const coverImageUrl = post.coverImage || "/og-image.png";

  return {
    title: post.title,
    description: post.excerpt,
    alternates: {
      canonical: buildUrl(locale, `/blog/${slug}`),
      languages: {
        en: `${BASE_URL}/blog/${slug}`,
        es: `${BASE_URL}/es/blog/${slug}`,
        fr: `${BASE_URL}/fr/blog/${slug}`,
        "x-default": `${BASE_URL}/blog/${slug}`,
      },
    },
    openGraph: {
      title: post.title,
      description: post.excerpt,
      type: "article",
      publishedTime: post.date,
      authors: [post.author],
      images: [
        {
          url: coverImageUrl,
          width: 1200,
          height: 630,
          alt: post.title,
        },
      ],
    },
  };
}

export default async function BlogPostPage({ params }: PageProps) {
  const { locale, slug } = await params;
  const t = await getTranslations({ locale, namespace: "blog" });
  const tNav = await getTranslations({ locale, namespace: "nav" });
  const post = getPostBySlug(slug, locale as Locale);

  if (!post) {
    notFound();
  }

  return (
    <main className="flex min-h-screen flex-col items-center px-4 py-12">
      <div className="w-full max-w-3xl">
        <Breadcrumb
          overrides={[{ segment: slug, name: post.title, noLink: true }]}
        />
      </div>

      <article className="w-full max-w-3xl">
        {/* 封面图 */}
        <div className="relative mb-8 aspect-video w-full overflow-hidden rounded-xl">
          <Image
            src={post.coverImage || "/og-image.png"}
            alt={post.title}
            fill
            className="object-cover"
            priority
            unoptimized
          />
        </div>

        {/* 标题 */}
        <h1 className="text-primary-400 mb-4 text-center text-4xl font-bold">
          {post.title}
        </h1>

        {/* 元信息 */}
        <div className="mb-8 flex flex-wrap items-center justify-center gap-4 text-sm text-gray-500 dark:text-gray-400">
          <span className="flex items-center gap-1">✍️ {post.author}</span>
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
          <MDXRemote
            source={post.content}
            components={mdxComponents}
            options={{
              mdxOptions: {
                remarkPlugins: [remarkGfm],
              },
            }}
          />
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
          "@graph": [
            {
              "@type": "BlogPosting",
              headline: post.title,
              description: post.excerpt,
              image: post.coverImage
                ? `${BASE_URL}${post.coverImage}`
                : `${BASE_URL}/og-image.png`,
              datePublished: `${post.date}T00:00:00+00:00`,
              dateModified: `${post.date}T00:00:00+00:00`,
              author: {
                "@type": "Organization",
                name: post.author,
                url: `${BASE_URL}/about`,
              },
              publisher: {
                "@type": "Organization",
                name: "Period Calculator",
                logo: {
                  "@type": "ImageObject",
                  url: `${BASE_URL}/logo.png`,
                },
              },
              mainEntityOfPage: {
                "@type": "WebPage",
                "@id": buildUrl(locale, `/blog/${slug}`),
              },
            },
            {
              "@type": "BreadcrumbList",
              itemListElement: [
                {
                  "@type": "ListItem",
                  position: 1,
                  name: tNav("home"),
                  item: buildUrl(locale, ""),
                },
                {
                  "@type": "ListItem",
                  position: 2,
                  name: post.title,
                },
              ],
            },
          ],
        }}
      />
    </main>
  );
}
