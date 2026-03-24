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
  coverImage?: string;
}

export interface Post extends PostMetadata {
  content: string;
}

const postMetadataCache = new Map<Locale, PostMetadata[]>();
const postCache = new Map<string, Post | null>();
let postSlugsCache: { slug: string; locale: Locale }[] | null = null;

function getBlogDir(locale: Locale): string {
  return path.join(BLOG_DIR, locale);
}

function getPostCacheKey(slug: string, locale: Locale): string {
  return `${locale}:${slug}`;
}

function parsePostMetadata(file: string, fileContent: string): PostMetadata {
  const slug = file.replace(/\.mdx$/, "");
  const { data } = matter(fileContent);

  return {
    slug,
    title: data.title || "",
    excerpt: data.excerpt || "",
    date: data.date || "",
    author: data.author || "",
    coverImage: data.coverImage,
  };
}

export function getAllPostMetadata(locale: Locale): PostMetadata[] {
  const cachedPosts = postMetadataCache.get(locale);

  if (cachedPosts) {
    return cachedPosts;
  }

  const blogDir = getBlogDir(locale);

  if (!fs.existsSync(blogDir)) {
    return [];
  }

  const files = fs.readdirSync(blogDir).filter((file) => file.endsWith(".mdx"));

  const posts = files.map((file) => {
    const filePath = path.join(blogDir, file);
    const fileContent = fs.readFileSync(filePath, "utf-8");
    return parsePostMetadata(file, fileContent);
  });

  const sortedPosts = posts.sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime(),
  );

  postMetadataCache.set(locale, sortedPosts);

  return sortedPosts;
}

export function getAllPosts(locale: Locale): PostMetadata[] {
  return getAllPostMetadata(locale);
}

export function getPostBySlug(slug: string, locale: Locale): Post | null {
  const cacheKey = getPostCacheKey(slug, locale);
  const cachedPost = postCache.get(cacheKey);

  if (cachedPost !== undefined) {
    return cachedPost;
  }

  const filePath = path.join(getBlogDir(locale), `${slug}.mdx`);

  if (!fs.existsSync(filePath)) {
    postCache.set(cacheKey, null);
    return null;
  }

  const fileContent = fs.readFileSync(filePath, "utf-8");
  const { data, content } = matter(fileContent);
  const readingTimeResult = readingTime(content);

  const post = {
    slug,
    title: data.title || "",
    excerpt: data.excerpt || "",
    date: data.date || "",
    author: data.author || "",
    readingTime: data.readTime || readingTimeResult.text,
    coverImage: data.coverImage,
    content,
  };

  postCache.set(cacheKey, post);

  return post;
}

export function getPostSlugs(): { slug: string; locale: Locale }[] {
  if (postSlugsCache) {
    return postSlugsCache;
  }

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

  postSlugsCache = slugs;

  return slugs;
}

export function getAllUniqueSlugs(): string[] {
  const slugs = getPostSlugs();
  const uniqueSlugs = [...new Set(slugs.map((s) => s.slug))];
  return uniqueSlugs;
}
