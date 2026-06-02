import * as React from "react";
import { cva } from "class-variance-authority";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-full text-sm font-bold transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 active:scale-[0.97]",
  {
    variants: {
      variant: {
        default:
          "bg-chili text-white shadow-warm hover:bg-[#c92e16] hover:-translate-y-0.5",
        saffron:
          "bg-saffron text-masala shadow-soft hover:bg-[#e58300] hover:-translate-y-0.5",
        outline:
          "border-2 border-masala/20 bg-transparent text-masala hover:bg-masala/5",
        ghost: "text-masala hover:bg-masala/5",
        white: "bg-white text-masala shadow-soft hover:-translate-y-0.5",
        whatsapp:
          "bg-[#25D366] text-white shadow-soft hover:bg-[#1eb858] hover:-translate-y-0.5",
        destructive: "bg-chili text-white hover:bg-[#c92e16]",
      },
      size: {
        default: "h-11 px-6 py-2",
        sm: "h-9 px-4 text-xs",
        lg: "h-14 px-8 text-base",
        icon: "h-10 w-10",
      },
    },
    defaultVariants: { variant: "default", size: "default" },
  }
);

const Button = React.forwardRef(
  ({ className, variant, size, asChild, ...props }, ref) => {
    return (
      <button
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    );
  }
);
Button.displayName = "Button";

export { Button, buttonVariants };
