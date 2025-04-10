import * as React from "react"
import { cn } from "@/lib/utils"

interface ShellProps extends React.HTMLAttributes<HTMLDivElement> {}

export function Shell({ children, className, ...props }: ShellProps) {
  return (
    <div
      className={cn(
        "grid h-screen w-full grid-cols-[280px_1fr] grid-rows-[1fr]",
        className
      )}
      {...props}
    >
      {children}
    </div>
  )
}