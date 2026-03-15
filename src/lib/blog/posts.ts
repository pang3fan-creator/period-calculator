import fs from "fs";
import path from "path";
import matter from "gray-matter";
import readingTime from "reading-time";
import type { Locale } from "@/i18n/config";

const BLOG_DIR = path.join(process.cwd(), "src/content/blog");

export interface PostMetadata {
  slug: string;
  title: string;
  excerpt: string;
  date: string;
  author: string;
  readingTime?: string;
}

export interface Post extends PostMetadata {
  content: string;
}

function getBlogDir(locale: Locale): string {
  return path.join(BLOG_DIR, locale);
}

export function getAllPosts(locale: Locale): PostMetadata[] {
  const blogDir = getBlogDir(locale);

  if (!fs.existsSync(blogDir)) {
    return [];
  }

  const files = fs.readdirSync(blogDir).filter((file) => file.endsWith(".mdx"));

  const posts = files.map((file) => {
    const slug = file.replace(/\.mdx$/, "");
    const filePath = path.join(blogDir, file);
    const fileContent = fs.readFileSync(filePath, "utf-8");
    const { data, content } = matter(fileContent);
    const readingTimeResult = readingTime(content);

    return {
      slug,
      title: data.title || "",
      excerpt: data.excerpt || "",
      date: data.date || "",
      author: data.author || "",
      readingTime: readingTimeResult.text,
    };
  });

  return posts.sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime(),
  );
}

export function getPostBySlug(slug: string, locale: Locale): Post | null {
  const filePath = path.join(getBlogDir(locale), `${slug}.mdx`);

  if (!fs.existsSync(filePath)) {
    return null;
  }

  const fileContent = fs.readFileSync(filePath, "utf-8");
  const { data, content } = matter(fileContent);
  const readingTimeResult = readingTime(content);

  return {
    slug,
    title: data.title || "",
    excerpt: data.excerpt || "",
    date: data.date || "",
    author: data.author || "",
    readingTime: readingTimeResult.text,
    content,
  };
}

export function getPostSlugs(): { slug: string; locale: Locale }[] {
  const locales: Locale[] = ["en", "es", "fr"];
  const slugs: { slug: string; locale: Locale }[] = [];

  for (const locale of locales) {
    const blogDir = getBlogDir(locale);

    if (!fs.existsSync(blogDir)) {
      continue;
    }

    const files = fs
      .readdirSync(blogDir)
      .filter((file) => file.endsWith(".mdx"));

    for (const file of files) {
      const slug = file.replace(/\.mdx$/, "");
      slugs.push({ slug, locale });
    }
  }

  return slugs;
}

export function getAllUniqueSlugs(): string[] {
  const slugs = getPostSlugs();
  const uniqueSlugs = [...new Set(slugs.map((s) => s.slug))];
  return uniqueSlugs;
}
