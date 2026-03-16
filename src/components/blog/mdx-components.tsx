import type { MDXComponents } from "mdx/types";
import { Link } from "@/i18n/routing";
import { CalculatorCTA } from "./CalculatorCTA";
import { AuthorBox } from "./AuthorBox";

export const mdxComponents: MDXComponents = {
  h1: ({ children }) => (
    <h1 className="text-primary-400 mt-12 mb-6 text-4xl font-bold">
      {children}
    </h1>
  ),
  h2: ({ children }) => (
    <h2 className="text-primary-400 mt-10 mb-4 text-2xl font-semibold">
      {children}
    </h2>
  ),
  h3: ({ children }) => (
    <h3 className="text-primary-400 mt-8 mb-3 text-2xl font-medium">
      {children}
    </h3>
  ),
  h4: ({ children }) => (
    <h4 className="text-primary-400 mt-6 mb-2 text-xl font-medium">
      {children}
    </h4>
  ),
  p: ({ children }) => (
    <p className="mb-6 leading-relaxed text-gray-700 dark:text-gray-300">
      {children}
    </p>
  ),
  a: ({ href, children }) => {
    if (href?.startsWith("/")) {
      return (
        <Link
          href={href}
          className="text-primary-400 hover:text-primary-500 hover:underline"
        >
          {children}
        </Link>
      );
    }
    return (
      <a
        href={href}
        className="text-primary-400 hover:text-primary-500 hover:underline"
        target="_blank"
        rel="noopener noreferrer"
      >
        {children}
      </a>
    );
  },
  ul: ({ children }) => (
    <ul className="mb-6 ml-8 list-disc space-y-3 text-gray-700 dark:text-gray-300">
      {children}
    </ul>
  ),
  ol: ({ children }) => (
    <ol className="mb-6 ml-8 list-decimal space-y-3 text-gray-700 dark:text-gray-300">
      {children}
    </ol>
  ),
  li: ({ children }) => <li className="leading-relaxed">{children}</li>,
  blockquote: ({ children }) => (
    <blockquote className="border-primary-300 my-6 rounded-r-lg border-l-4 bg-gray-50 px-6 py-4 italic dark:bg-gray-800">
      {children}
    </blockquote>
  ),
  pre: ({ children }) => (
    <pre className="my-6 overflow-x-auto rounded-lg bg-gray-100 p-4 font-mono text-sm dark:bg-gray-800">
      {children}
    </pre>
  ),
  code: ({ children }) => (
    <code className="rounded bg-gray-100 px-1.5 py-0.5 font-mono text-sm dark:bg-gray-700">
      {children}
    </code>
  ),
  img: ({ src, alt }) => (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={src}
      alt={alt}
      className="mx-auto my-6 max-w-2xl rounded-xl shadow-lg"
      loading="lazy"
    />
  ),
  table: ({ children }) => (
    <div className="my-6 overflow-x-auto">
      <table className="min-w-full divide-y divide-gray-200 rounded-lg border border-gray-200 dark:divide-gray-700 dark:border-gray-700">
        {children}
      </table>
    </div>
  ),
  thead: ({ children }) => (
    <thead className="bg-gray-50 dark:bg-gray-800">{children}</thead>
  ),
  tbody: ({ children }) => (
    <tbody className="divide-y divide-gray-200 bg-white dark:divide-gray-700 dark:bg-gray-900">
      {children}
    </tbody>
  ),
  tr: ({ children }) => <tr>{children}</tr>,
  th: ({ children }) => (
    <th className="px-4 py-3 text-left text-sm font-semibold text-gray-900 dark:text-gray-100">
      {children}
    </th>
  ),
  td: ({ children }) => (
    <td className="px-4 py-3 text-sm text-gray-700 dark:text-gray-300">
      {children}
    </td>
  ),
  CalculatorCTA,
  AuthorBox,
};
