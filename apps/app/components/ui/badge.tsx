import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const badgeVariants = cva(
  "inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-[11px] font-semibold uppercase tracking-wide",
  {
    variants: {
      variant: {
        seafoam: "bg-[var(--seafoam)]/12 border border-[var(--seafoam)]/28 text-[var(--seafoam)]",
        ocean: "bg-[var(--ocean)]/12 border border-[var(--ocean)]/28 text-[var(--ocean-light)]",
        success: "bg-[var(--success)]/12 border border-[var(--success)]/28 text-[var(--success)]",
        warning: "bg-[var(--warning)]/12 border border-[var(--warning)]/28 text-[var(--warning)]",
        danger: "bg-[var(--danger)]/12 border border-[var(--danger)]/28 text-[var(--danger)]",
        muted: "bg-white/5 border border-white/10 text-[var(--muted)]",
      },
    },
    defaultVariants: {
      variant: "muted",
    },
  }
);

export interface BadgeProps
  extends React.HTMLAttributes<HTMLSpanElement>,
    VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
  return <span className={cn(badgeVariants({ variant }), className)} {...props} />;
}

export { Badge, badgeVariants };
