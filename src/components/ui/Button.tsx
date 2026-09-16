import React from "react";
import { cn } from "@/lib/utils";

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "outline" | "ghost";
  size?: "sm" | "md" | "lg";
  children: React.ReactNode;
}

export const Button: React.FC<ButtonProps> = ({
  variant = "primary",
  size = "md",
  className,
  children,
  ...props
}) => {
  const baseStyles =
    "inline-flex items-center justify-center font-medium rounded-full transition-all duration-200 focus:outline-none active:scale-[0.98] disabled:opacity-50 disabled:pointer-events-none";

  const variants = {
    primary: "bg-crimson text-white hover:bg-crimson-hover shadow-sm hover:shadow",
    secondary: "bg-charcoal text-white hover:bg-opacity-90",
    outline: "border border-black/10 text-charcoal hover:bg-black/5",
    ghost: "text-charcoal hover:bg-black/5",
  };

  const sizes = {
    sm: "text-xs px-4 py-2",
    md: "text-sm px-6 py-2.5",
    lg: "text-base px-8 py-3.5",
  };

  return (
    <button
      className={cn(baseStyles, variants[variant], sizes[size], className)}
      {...props}
    >
      {children}
    </button>
  );
};
