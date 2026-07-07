import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-xl text-sm font-semibold transition-all duration-150 ease-in-out disabled:pointer-events-none disabled:opacity-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--amber)]/50",
  {
    variants: {
      variant: {
        default:
          "bg-gradient-to-br from-[var(--amber)] to-[var(--amber-dark)] text-[var(--navy)] shadow-[0_4px_20px_rgba(245,158,11,0.25)] hover:shadow-[0_8px_28px_rgba(245,158,11,0.4)] hover:-translate-y-0.5 active:translate-y-0",
        outline:
          "border border-white/10 bg-white/[0.02] text-[var(--white)] hover:border-[var(--steel)]/40 hover:bg-[var(--steel)]/10",
        ghost:
          "text-[var(--slate)] hover:text-[var(--white)] hover:bg-white/5",
      },
      size: {
        default: "h-11 px-6",
        sm: "h-9 px-4 text-xs",
        lg: "h-12 px-8 text-base",
        icon: "h-10 w-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    );
  }
);
Button.displayName = "Button";

export { Button, buttonVariants };
