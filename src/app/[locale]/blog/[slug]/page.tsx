import { Breadcrumb } from "@/components/layout/breadcrumb";

export default function BlogPostPage() {
  return (
    <main className="flex min-h-screen flex-col items-center px-4 py-16">
      <div className="w-full max-w-4xl">
        <Breadcrumb />
      </div>
      <h1 className="text-primary-400 text-center text-3xl font-bold">Blog</h1>
      <p className="mt-4 text-gray-500 dark:text-gray-400">Coming soon.</p>
    </main>
  );
}
