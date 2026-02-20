export function MobileNav() {
  return (
    <nav className="border-warmbeige-200 bg-ivory-50/95 dark:border-dark-border dark:bg-dark-bg/95 fixed right-0 bottom-0 left-0 z-50 border-t backdrop-blur-md md:hidden">
      <div className="flex h-16 items-center justify-around">
        {/* Mobile navigation items will be added here */}
        <span className="text-xs text-gray-500">Home</span>
        <span className="text-xs text-gray-500">Irregular</span>
        <span className="text-xs text-gray-500">Ovulation</span>
      </div>
    </nav>
  );
}
