import * as React from "react"

import { cn } from "@/lib/utils"

const RadioGroup = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => {
    return <div className={cn("grid gap-2", className)} ref={ref} {...props} />
  },
)
RadioGroup.displayName = "RadioGroup"

const RadioGroupItem = React.forwardRef<HTMLInputElement, React.InputHTMLAttributes<HTMLInputElement>>(
  ({ className, ...props }, ref) => {
    return (
      <div className="relative">
        <input type="radio" className={cn("peer sr-only", className)} ref={ref} {...props} />
        <span className="absolute inset-0 flex h-full w-full items-center justify-center rounded-full border border-primary text-primary ring-offset-background peer-data-[state=checked]:bg-primary peer-data-[state=checked]:text-primary-foreground peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-ring peer-focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50">
          <span className="h-2.5 w-2.5 rounded-full bg-current opacity-0 peer-data-[state=checked]:opacity-100" />
        </span>
      </div>
    )
  },
)
RadioGroupItem.displayName = "RadioGroupItem"

export { RadioGroup, RadioGroupItem }
