export function Footer() {
  return (
    <footer className="border-warmbeige-200 bg-ivory-50 dark:border-dark-border dark:bg-dark-bg border-t py-8">
      <div className="mx-auto max-w-7xl px-4 text-center text-sm text-gray-500 dark:text-gray-400">
        <p>
          &copy; {new Date().getFullYear()} Period Calculator. All rights
          reserved.
        </p>
        <p className="mt-2">
          100% Private. Your data never leaves your device.
        </p>
      </div>
    </footer>
  );
}
