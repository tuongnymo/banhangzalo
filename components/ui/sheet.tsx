import * as React from "react"

import { cn } from "@/lib/utils"

const Sheet = ({ children, ...props }: React.HTMLAttributes<HTMLDivElement>) => {
  return (
    <div className={cn("fixed inset-0 z-50", props.className)} {...props}>
      {children}
    </div>
  )
}
Sheet.displayName = "Sheet"

const SheetTrigger = React.forwardRef<HTMLButtonElement, React.ButtonHTMLAttributes<HTMLButtonElement>>(
  ({ className, children, ...props }, ref) => (
    <button ref={ref} className={cn("inline-flex items-center justify-center", className)} {...props}>
      {children}
    </button>
  ),
)
SheetTrigger.displayName = "SheetTrigger"

const SheetContent = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & { side?: "left" | "right" | "top" | "bottom" }
>(({ className, children, side = "right", ...props }, ref) => {
  const sideStyles = {
    top: "inset-x-0 top-0 border-b",
    bottom: "inset-x-0 bottom-0 border-t",
    left: "inset-y-0 left-0 h-full w-3/4 border-r sm:max-w-sm",
    right: "inset-y-0 right-0 h-full w-3/4 border-l sm:max-w-sm",
  }

  return (
    <div ref={ref} className={cn("fixed z-50 bg-background p-6 shadow-lg", sideStyles[side], className)} {...props}>
      {children}
    </div>
  )
})
SheetContent.displayName = "SheetContent"

export { Sheet, SheetTrigger, SheetContent }
