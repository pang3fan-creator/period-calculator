import { MetadataRoute } from "next";
import { getAllUniqueSlugs } from "@/lib/blog/posts";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://www.aiperiodcalculator.com";
  const lastModified = new Date();

  const locales = [
    { code: "", lang: "en" },
    { code: "/es", lang: "es" },
    { code: "/fr", lang: "fr" },
  ];

  // Define all pages with their language variants
  const pages = [
    {
      path: "",
      priority: 1.0,
      changefreq: "weekly" as const,
    },
    {
      path: "/irregular-period-calculator",
      priority: 0.8,
      changefreq: "monthly" as const,
    },
    {
      path: "/ovulation-period-calculator",
      priority: 0.8,
      changefreq: "monthly" as const,
    },
    {
      path: "/privacy-policy",
      priority: 0.5,
      changefreq: "monthly" as const,
    },
    {
      path: "/editorial-policy",
      priority: 0.5,
      changefreq: "monthly" as const,
    },
    {
      path: "/about",
      priority: 0.6,
      changefreq: "monthly" as const,
    },
  ];

  // Get all blog post slugs
  const blogSlugs = getAllUniqueSlugs();

  const sitemapEntries: MetadataRoute.Sitemap = [];

  // Generate sitemap entries with alternate language links
  for (const page of pages) {
    for (const locale of locales) {
      const url = `${baseUrl}${locale.code}${page.path}`;
      const alternateLanguages: Record<string, string> = {};

      // Add all language variants as alternates
      for (const altLocale of locales) {
        alternateLanguages[altLocale.lang] =
          `${baseUrl}${altLocale.code}${page.path}`;
      }

      // Add x-default pointing to English version
      alternateLanguages["x-default"] = `${baseUrl}${page.path}`;

      sitemapEntries.push({
        url,
        lastModified,
        changeFrequency: page.changefreq,
        priority: page.priority,
        alternates: {
          languages: alternateLanguages,
        },
      });
    }
  }

  // Generate blog post entries
  for (const slug of blogSlugs) {
    for (const locale of locales) {
      const url = `${baseUrl}${locale.code}/blog/${slug}`;
      const alternateLanguages: Record<string, string> = {};

      // Add all language variants as alternates
      for (const altLocale of locales) {
        alternateLanguages[altLocale.lang] =
          `${baseUrl}${altLocale.code}/blog/${slug}`;
      }

      // Add x-default pointing to English version
      alternateLanguages["x-default"] = `${baseUrl}/blog/${slug}`;

      sitemapEntries.push({
        url,
        lastModified,
        changeFrequency: "monthly",
        priority: 0.6,
        alternates: {
          languages: alternateLanguages,
        },
      });
    }
  }

  return sitemapEntries;
}
