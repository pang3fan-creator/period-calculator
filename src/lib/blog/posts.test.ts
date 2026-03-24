import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

const mockExistsSync = vi.fn();
const mockReaddirSync = vi.fn();
const mockReadFileSync = vi.fn();
const mockJoin = vi.fn((...parts: string[]) => parts.join("/"));
const mockMatter = vi.fn();
const mockReadingTime = vi.fn();

vi.mock("fs", () => ({
  default: {
    existsSync: mockExistsSync,
    readdirSync: mockReaddirSync,
    readFileSync: mockReadFileSync,
  },
}));

vi.mock("path", () => ({
  default: {
    join: mockJoin,
  },
}));

vi.mock("gray-matter", () => ({
  default: mockMatter,
}));

vi.mock("reading-time", () => ({
  default: mockReadingTime,
}));

describe("blog posts data loading", () => {
  beforeEach(() => {
    vi.resetModules();
    vi.clearAllMocks();
    mockExistsSync.mockReturnValue(true);
    mockJoin.mockImplementation((...parts: string[]) => parts.join("/"));
  });

  afterEach(() => {
    vi.unstubAllGlobals();
  });

  it("returns lightweight post metadata for footer without computing reading time", async () => {
    mockReaddirSync.mockReturnValue(["first-post.mdx"]);
    mockReadFileSync.mockReturnValue(`---
title: First Post
excerpt: Summary
date: 2024-01-01
author: Team
---

# Hello`);
    mockMatter.mockReturnValue({
      data: {
        title: "First Post",
        excerpt: "Summary",
        date: "2024-01-01",
        author: "Team",
      },
      content: "# Hello",
    });

    const { getAllPostMetadata } = await import("./posts");

    expect(getAllPostMetadata("en")).toEqual([
      {
        slug: "first-post",
        title: "First Post",
        excerpt: "Summary",
        date: "2024-01-01",
        author: "Team",
        coverImage: undefined,
      },
    ]);
    expect(mockReadingTime).not.toHaveBeenCalled();
  });

  it("caches repeated post reads for the same slug and locale", async () => {
    mockReadFileSync.mockReturnValue(`---
title: First Post
excerpt: Summary
date: 2024-01-01
author: Team
---

# Hello`);
    mockMatter.mockReturnValue({
      data: {
        title: "First Post",
        excerpt: "Summary",
        date: "2024-01-01",
        author: "Team",
      },
      content: "# Hello",
    });
    mockReadingTime.mockReturnValue({ text: "2 min read" });

    const { getPostBySlug } = await import("./posts");

    expect(getPostBySlug("first-post", "en")).toMatchObject({
      slug: "first-post",
      title: "First Post",
      readingTime: "2 min read",
    });
    expect(getPostBySlug("first-post", "en")).toMatchObject({
      slug: "first-post",
      title: "First Post",
      readingTime: "2 min read",
    });

    expect(mockReadFileSync).toHaveBeenCalledTimes(1);
    expect(mockReadingTime).toHaveBeenCalledTimes(1);
  });
});
