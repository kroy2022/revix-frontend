import * as React from "react"
import { cn } from "@/lib/utils"

type SectionHeaderProps = {
  id: string
  title: string
  description?: React.ReactNode
  actions?: React.ReactNode
  className?: string
}

export function SectionHeader({ id, title, description, actions, className }: SectionHeaderProps) {
  return (
    <div className={cn("flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between", className)}>
      <div className="flex min-w-0 flex-col gap-1">
        <h2 id={id} className="text-xl font-semibold tracking-tight text-foreground">
          {title}
        </h2>
        {description && <div className="text-sm text-muted-foreground">{description}</div>}
      </div>
      {actions && <div className="flex flex-wrap items-center gap-2">{actions}</div>}
    </div>
  )
}
