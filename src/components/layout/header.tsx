export function Header() {
  return (
    <header className="border-warmbeige-200 bg-ivory-50/80 dark:border-dark-border dark:bg-dark-bg/80 sticky top-0 z-50 border-b backdrop-blur-md">
      <nav className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4">
        <span className="font-heading text-primary-400 text-xl font-bold">
          Period Calculator
        </span>
        {/* Theme toggle and language selector will be added here */}
      </nav>
    </header>
  );
}
