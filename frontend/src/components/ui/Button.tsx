import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        default: "bg-white text-black hover:bg-zinc-200 shadow-sm",
        destructive:
          "bg-red-500 text-white hover:bg-red-600 shadow-sm",
        outline:
          "border border-zinc-800 bg-transparent hover:bg-zinc-900 text-white",
        secondary:
          "bg-zinc-800 text-white hover:bg-zinc-700 shadow-sm",
        ghost: "hover:bg-zinc-900 hover:text-white text-zinc-400",
        link: "text-white underline-offset-4 hover:underline",
      },
      size: {
        default: "h-12 px-6 py-3 text-sm",
        sm: "h-10 rounded-md px-4 text-xs",
        lg: "h-14 rounded-md px-8 text-base",
        icon: "h-12 w-12",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button"
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    )
  }
)
Button.displayName = "Button"

export { Button, buttonVariants }
