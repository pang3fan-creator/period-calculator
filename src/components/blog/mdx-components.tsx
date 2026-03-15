import type { MDXComponents } from "mdx/types";
import { Link } from "@/i18n/routing";

export const mdxComponents: MDXComponents = {
  h1: ({ children }) => (
    <h1 className="text-primary-400 mb-6 text-3xl font-bold">{children}</h1>
  ),
  h2: ({ children }) => (
    <h2 className="text-primary-400 mt-8 mb-4 text-2xl font-semibold">
      {children}
    </h2>
  ),
  h3: ({ children }) => (
    <h3 className="text-primary-400 mt-6 mb-3 text-xl font-medium">
      {children}
    </h3>
  ),
  h4: ({ children }) => (
    <h4 className="text-primary-400 mt-4 mb-2 text-lg font-medium">
      {children}
    </h4>
  ),
  p: ({ children }) => (
    <p className="mb-4 leading-relaxed text-gray-600 dark:text-gray-300">
      {children}
    </p>
  ),
  a: ({ href, children }) => {
    if (href?.startsWith("/")) {
      return (
        <Link
          href={href}
          className="text-primary-400 hover:text-primary-500 underline"
        >
          {children}
        </Link>
      );
    }
    return (
      <a
        href={href}
        className="text-primary-400 hover:text-primary-500 underline"
        target="_blank"
        rel="noopener noreferrer"
      >
        {children}
      </a>
    );
  },
  ul: ({ children }) => (
    <ul className="mb-4 ml-6 list-disc space-y-2 text-gray-600 dark:text-gray-300">
      {children}
    </ul>
  ),
  ol: ({ children }) => (
    <ol className="mb-4 ml-6 list-decimal space-y-2 text-gray-600 dark:text-gray-300">
      {children}
    </ol>
  ),
  li: ({ children }) => <li className="leading-relaxed">{children}</li>,
  blockquote: ({ children }) => (
    <blockquote className="border-primary-300 my-6 border-l-4 bg-gray-50 px-4 py-3 italic dark:bg-gray-800">
      {children}
    </blockquote>
  ),
  pre: ({ children }) => (
    <pre className="my-4 overflow-x-auto rounded-lg bg-gray-800 p-4 text-sm text-gray-100">
      {children}
    </pre>
  ),
  code: ({ children }) => (
    <code className="rounded bg-gray-100 px-1.5 py-0.5 font-mono text-sm dark:bg-gray-800">
      {children}
    </code>
  ),
  img: ({ src, alt }) => (
    <img
      src={src}
      alt={alt}
      className="my-6 rounded-lg shadow-md"
      loading="lazy"
    />
  ),
};
