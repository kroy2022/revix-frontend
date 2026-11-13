"use client"

import * as React from "react"
import { SearchIcon } from "lucide-react"
import { cn } from "@/lib/utils"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

type SearchFieldProps = Omit<React.ComponentProps<"input">, "type" | "onChange"> & {
  label: string
  value: string
  onValueChange: (value: string) => void
}

export function SearchField({ label, value, onValueChange, className, id, ...props }: SearchFieldProps) {
  const generatedId = React.useId()
  const inputId = id ?? generatedId

  return (
    <div className={cn("relative", className)}>
      <Label htmlFor={inputId} className="sr-only">
        {label}
      </Label>
      <SearchIcon
        className="pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-muted-foreground"
        aria-hidden="true"
      />
      <Input
        id={inputId}
        type="search"
        value={value}
        onChange={(event) => onValueChange(event.target.value)}
        className="h-10 border-border bg-card pl-9 shadow-raised"
        {...props}
      />
    </div>
  )
}
