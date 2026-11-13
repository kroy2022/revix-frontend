"use client"

import * as React from "react"
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip"

type AppTooltipProps = {
  label: React.ReactNode
  children: React.ReactElement
  side?: React.ComponentProps<typeof TooltipContent>["side"]
  align?: React.ComponentProps<typeof TooltipContent>["align"]
}

export function AppTooltip({ label, children, side = "top", align = "center" }: AppTooltipProps) {
  return (
    <Tooltip>
      <TooltipTrigger render={children} />
      <TooltipContent side={side} align={align} sideOffset={6}>
        {label}
      </TooltipContent>
    </Tooltip>
  )
}
