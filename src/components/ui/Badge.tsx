import React from "react";
import { cn } from "@/lib/utils";

export interface BadgeProps {
  children: React.ReactNode;
  className?: string;
  withBrackets?: boolean;
}

export const Badge: React.FC<BadgeProps> = ({ children, className, withBrackets = true }) => {
  return (
    <span
      className={cn(
        "inline-flex items-center text-[11px] font-bold uppercase tracking-wider text-crimson bg-crimson-light px-3 py-1 rounded-full",
        withBrackets && "bracket-accent",
        className
      )}
    >
      {children}
    </span>
  );
};
