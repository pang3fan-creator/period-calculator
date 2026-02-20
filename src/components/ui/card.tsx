interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

export function Card({ children, className = "", ...props }: CardProps) {
  return (
    <div
      className={`shadow-card dark:bg-dark-card rounded-3xl bg-white p-6 ${className}`}
      {...props}
    >
      {children}
    </div>
  );
}
