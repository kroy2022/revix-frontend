"use client"

import * as React from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { FolderIcon, FolderPlusIcon, LayoutDashboardIcon } from "lucide-react"
import { cn } from "@/lib/utils"
import { AppTooltip } from "@/components/app-tooltip"
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupAction,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuBadge,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"
import type { Folder } from "./types"

const navItems = [{ title: "Dashboard", href: "/dashboard", icon: LayoutDashboardIcon }]

const menuButtonClassName =
  "font-medium transition-[background-color,color,box-shadow] duration-150 data-active:bg-card data-active:text-foreground data-active:shadow-raised data-active:[&_svg]:text-primary"

type DashboardSidebarProps = React.ComponentProps<typeof Sidebar> & {
  folders: Folder[]
}

export function DashboardSidebar({ folders, ...props }: DashboardSidebarProps) {
  const pathname = usePathname()

  return (
    <Sidebar variant="inset" collapsible="icon" {...props}>
      <SidebarHeader className="pt-3">
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              size="lg"
              tooltip="Revix AI"
              render={<Link href="/dashboard" />}
              className="hover:bg-transparent active:bg-transparent"
            >
              <span className="flex size-8 shrink-0 items-center justify-center rounded-lg bg-primary text-sm font-semibold text-primary-foreground shadow-raised">
                R
              </span>
              <span className="text-base font-semibold tracking-tight text-foreground">Revix AI</span>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>

      <SidebarContent className="gap-2">
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu className="gap-1">
              {navItems.map((item) => (
                <SidebarMenuItem key={item.href}>
                  <SidebarMenuButton
                    isActive={pathname === item.href}
                    tooltip={item.title}
                    render={<Link href={item.href} />}
                    className={cn(menuButtonClassName, "h-9")}
                  >
                    <item.icon aria-hidden="true" />
                    <span>{item.title}</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarGroup className="group-data-[collapsible=icon]:hidden">
          <SidebarGroupLabel className="text-xs font-medium tracking-wider text-muted-foreground uppercase">
            Folders
          </SidebarGroupLabel>
          <AppTooltip label="New folder" side="right">
            <SidebarGroupAction aria-label="New folder" className="top-3 size-6 w-6 text-muted-foreground">
              <FolderPlusIcon aria-hidden="true" />
            </SidebarGroupAction>
          </AppTooltip>
          <SidebarGroupContent>
            <SidebarMenu className="gap-0.5">
              {folders.map((folder) => (
                <SidebarMenuItem key={folder.id}>
                  <SidebarMenuButton
                    render={<Link href={`/folders/${folder.id}`} />}
                    className={cn(menuButtonClassName, "pr-9")}
                  >
                    <FolderIcon aria-hidden="true" />
                    <span>{folder.name}</span>
                  </SidebarMenuButton>
                  <SidebarMenuBadge className="text-muted-foreground tabular-nums">
                    {folder.studySetCount}
                    <span className="sr-only"> {folder.studySetCount === 1 ? "study set" : "study sets"}</span>
                  </SidebarMenuBadge>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  )
}
