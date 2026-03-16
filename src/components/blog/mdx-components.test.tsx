import { describe, it, expect, vi } from "vitest";
import { renderToString } from "react-dom/server";
import { mdxComponents } from "./mdx-components";

// Mock Link component
vi.mock("@/i18n/routing", () => ({
  Link: ({
    children,
    href,
    className,
  }: {
    children: React.ReactNode;
    href: string;
    className?: string;
  }) => (
    <a href={href} className={className}>
      {children}
    </a>
  ),
}));

describe("mdxComponents", () => {
  describe("Heading components", () => {
    it("should render h1 with correct classes", () => {
      const H1 = mdxComponents.h1!;
      const html = renderToString(<H1>Heading 1</H1>);

      expect(html).toContain("Heading 1");
      expect(html).toContain("text-4xl");
      expect(html).toContain("font-bold");
    });

    it("should render h2 with correct classes", () => {
      const H2 = mdxComponents.h2!;
      const html = renderToString(<H2>Heading 2</H2>);

      expect(html).toContain("Heading 2");
      expect(html).toContain("text-3xl");
      expect(html).toContain("font-semibold");
    });

    it("should render h3 with correct classes", () => {
      const H3 = mdxComponents.h3!;
      const html = renderToString(<H3>Heading 3</H3>);

      expect(html).toContain("Heading 3");
      expect(html).toContain("text-2xl");
    });

    it("should render h4 with correct classes", () => {
      const H4 = mdxComponents.h4!;
      const html = renderToString(<H4>Heading 4</H4>);

      expect(html).toContain("Heading 4");
      expect(html).toContain("text-xl");
    });
  });

  describe("Text components", () => {
    it("should render paragraph with correct classes", () => {
      const P = mdxComponents.p!;
      const html = renderToString(<P>Paragraph text</P>);

      expect(html).toContain("Paragraph text");
      expect(html).toContain("leading-relaxed");
    });

    it("should render code with correct classes", () => {
      const Code = mdxComponents.code!;
      const html = renderToString(<Code>code snippet</Code>);

      expect(html).toContain("code snippet");
      expect(html).toContain("font-mono");
    });

    it("should render pre with correct classes", () => {
      const Pre = mdxComponents.pre!;
      const html = renderToString(<Pre>preformatted text</Pre>);

      expect(html).toContain("preformatted text");
      expect(html).toContain("overflow-x-auto");
    });
  });

  describe("List components", () => {
    it("should render unordered list with correct classes", () => {
      const Ul = mdxComponents.ul!;
      const html = renderToString(<Ul>list item</Ul>);

      expect(html).toContain("list item");
      expect(html).toContain("list-disc");
    });

    it("should render ordered list with correct classes", () => {
      const Ol = mdxComponents.ol!;
      const html = renderToString(<Ol>list item</Ol>);

      expect(html).toContain("list item");
      expect(html).toContain("list-decimal");
    });

    it("should render list item with correct classes", () => {
      const Li = mdxComponents.li!;
      const html = renderToString(<Li>item content</Li>);

      expect(html).toContain("item content");
      expect(html).toContain("leading-relaxed");
    });
  });

  describe("Link component", () => {
    it("should render internal link with Link component", () => {
      const A = mdxComponents.a!;
      const html = renderToString(<A href="/about">About</A>);

      expect(html).toContain("About");
      expect(html).toContain('href="/about"');
    });

    it("should render external link with anchor tag", () => {
      const A = mdxComponents.a!;
      const html = renderToString(
        <A href="https://example.com">External Link</A>,
      );

      expect(html).toContain("External Link");
      expect(html).toContain('href="https://example.com"');
      expect(html).toContain('target="_blank"');
      expect(html).toContain('rel="noopener noreferrer"');
    });
  });

  describe("Image component", () => {
    it("should render img with correct attributes", () => {
      const Img = mdxComponents.img!;
      const html = renderToString(
        <Img src="https://example.com/image.jpg" alt="Test image" />,
      );

      expect(html).toContain('src="https://example.com/image.jpg"');
      expect(html).toContain('alt="Test image"');
      expect(html).toContain('loading="lazy"');
      expect(html).toContain("rounded-xl");
    });
  });

  describe("Blockquote component", () => {
    it("should render blockquote with correct classes", () => {
      const Blockquote = mdxComponents.blockquote!;
      const html = renderToString(<Blockquote>Quote text</Blockquote>);

      expect(html).toContain("Quote text");
      expect(html).toContain("border-l-4");
      expect(html).toContain("italic");
    });
  });
});