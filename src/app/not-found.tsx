import Link from "next/link";

export default function NotFound() {
  return (
    <html lang="en">
      <body className="bg-ivory-100 flex min-h-screen items-center justify-center">
        <div className="text-center">
          <h1 className="text-primary-400 text-6xl font-bold">404</h1>
          <p className="mt-4 text-lg text-gray-500">Page not found.</p>
          <Link
            href="/"
            className="bg-primary-400 hover:bg-primary-500 mt-6 inline-block rounded-2xl px-6 py-3 text-white"
          >
            Go Home
          </Link>
        </div>
      </body>
    </html>
  );
}
