import * as React from "react";

import { cn } from "@/lib/utils";

const Textarea = React.forwardRef<HTMLTextAreaElement, React.TextareaHTMLAttributes<HTMLTextAreaElement>>(
  ({ className, ...props }, ref) => {
    return (
      <textarea
        className={cn(
          "flex min-h-24 w-full rounded-xl border border-white/10 bg-white/[0.03] px-4 py-3 text-sm text-[var(--white)] placeholder:text-[var(--muted)] backdrop-blur-sm transition-all duration-150 ease-in-out outline-none",
          "focus:border-[var(--seafoam)]/50 focus:bg-white/[0.05] focus:ring-2 focus:ring-[var(--seafoam)]/20",
          "disabled:cursor-not-allowed disabled:opacity-50",
          className
        )}
        ref={ref}
        {...props}
      />
    );
  }
);
Textarea.displayName = "Textarea";

export { Textarea };
