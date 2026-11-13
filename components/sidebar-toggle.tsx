"use client"

import { AppTooltip } from "@/components/app-tooltip"
import { SidebarTrigger, useSidebar } from "@/components/ui/sidebar"

export function SidebarToggle() {
  const { state, isMobile, openMobile } = useSidebar()
  const isOpen = isMobile ? openMobile : state === "expanded"
  const label = isOpen ? "Close sidebar" : "Open sidebar"

  return (
    <AppTooltip label={label} side="bottom" align="start">
      <SidebarTrigger aria-label={label} className="size-9 text-secondary-foreground" />
    </AppTooltip>
  )
}
