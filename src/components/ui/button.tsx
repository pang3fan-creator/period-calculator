import { forwardRef } from "react";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "ghost";
  size?: "sm" | "md" | "lg";
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className = "", variant = "primary", size = "md", ...props }, ref) => {
    const baseStyles = "min-h-[48px] rounded-2xl font-body transition-all";

    const variantStyles = {
      primary: "bg-primary-400 text-white hover:bg-primary-500",
      secondary:
        "bg-warmbeige-100 text-gray-800 hover:bg-warmbeige-200 dark:bg-dark-card dark:text-gray-100 dark:hover:bg-dark-surface",
      ghost:
        "bg-transparent text-gray-700 hover:bg-warmbeige-50 dark:text-gray-300 dark:hover:bg-dark-surface",
    };

    const sizeStyles = {
      sm: "px-4 py-2 text-sm",
      md: "px-6 py-3 text-base",
      lg: "px-8 py-4 text-lg",
    };

    return (
      <button
        ref={ref}
        className={`${baseStyles} ${variantStyles[variant]} ${sizeStyles[size]} ${className}`}
        {...props}
      />
    );
  },
);

Button.displayName = "Button";
export { Button };
export type { ButtonProps };
