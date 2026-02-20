interface SkeletonProps extends React.HTMLAttributes<HTMLDivElement> {
  className?: string;
}

export function Skeleton({ className = "", ...props }: SkeletonProps) {
  return (
    <div
      className={`bg-warmbeige-200 dark:bg-dark-surface animate-pulse rounded-2xl ${className}`}
      {...props}
    />
  );
}
