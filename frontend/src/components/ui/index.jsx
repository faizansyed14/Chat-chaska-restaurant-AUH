import * as React from "react";
import { cn } from "@/lib/utils";

export const Card = React.forwardRef(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      "rounded-3xl border border-border bg-card text-card-foreground shadow-soft",
      className
    )}
    {...props}
  />
));
Card.displayName = "Card";

export const CardHeader = ({ className, ...props }) => (
  <div className={cn("flex flex-col space-y-1.5 p-6", className)} {...props} />
);

export const CardTitle = ({ className, ...props }) => (
  <h3
    className={cn("font-display text-2xl font-bold tracking-tight", className)}
    {...props}
  />
);

export const CardContent = ({ className, ...props }) => (
  <div className={cn("p-6 pt-0", className)} {...props} />
);

export const Input = React.forwardRef(({ className, type, ...props }, ref) => (
  <input
    type={type}
    ref={ref}
    className={cn(
      "flex h-12 w-full rounded-xl border-2 border-input bg-white px-4 py-2 text-sm font-medium transition-colors placeholder:text-muted-foreground focus-visible:outline-none focus-visible:border-saffron disabled:cursor-not-allowed disabled:opacity-50",
      className
    )}
    {...props}
  />
));
Input.displayName = "Input";

export const Textarea = React.forwardRef(({ className, ...props }, ref) => (
  <textarea
    ref={ref}
    className={cn(
      "flex min-h-[100px] w-full rounded-xl border-2 border-input bg-white px-4 py-3 text-sm font-medium transition-colors placeholder:text-muted-foreground focus-visible:outline-none focus-visible:border-saffron",
      className
    )}
    {...props}
  />
));
Textarea.displayName = "Textarea";

export const Label = ({ className, ...props }) => (
  <label
    className={cn("text-sm font-bold text-masala", className)}
    {...props}
  />
);

export const Badge = ({ className, ...props }) => (
  <span
    className={cn(
      "inline-flex items-center rounded-full border border-transparent px-3 py-1 text-xs font-bold",
      className
    )}
    {...props}
  />
);
