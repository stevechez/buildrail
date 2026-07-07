import * as React from "react";

import { cn } from "@/lib/utils";

const Input = React.forwardRef<HTMLInputElement, React.InputHTMLAttributes<HTMLInputElement>>(
  ({ className, type, ...props }, ref) => {
    return (
      <input
        type={type}
        className={cn(
          "flex h-12 w-full rounded-xl border border-white/10 bg-white/[0.03] px-4 text-sm text-[var(--white)] placeholder:text-[var(--slate)] backdrop-blur-sm transition-all duration-150 ease-in-out outline-none",
          "focus:border-[var(--amber)]/50 focus:bg-white/[0.05] focus:ring-2 focus:ring-[var(--amber)]/20",
          "disabled:cursor-not-allowed disabled:opacity-50",
          className
        )}
        ref={ref}
        {...props}
      />
    );
  }
);
Input.displayName = "Input";

export { Input };
