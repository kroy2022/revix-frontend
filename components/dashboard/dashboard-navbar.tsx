import { Suspense } from "react"
import { getCurrentUser } from "@/lib/auth"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Skeleton } from "@/components/ui/skeleton"
import { SidebarToggle } from "@/components/sidebar-toggle"

async function ProfileAvatar() {
  const user = await getCurrentUser()
  const displayName = user.firstName || user.email || "Your profile"
  const initial = (user.firstName || user.email || "?").charAt(0).toUpperCase()

  return (
    <Avatar role="img" aria-label={displayName} className="size-9">
      {user.avatarUrl && <AvatarImage src={user.avatarUrl} alt="" />}
      <AvatarFallback className="bg-accent text-sm font-semibold text-accent-foreground">
        {initial}
      </AvatarFallback>
    </Avatar>
  )
}

export function DashboardNavbar() {
  return (
    <header className="flex h-14 shrink-0 items-center gap-2 border-b border-border px-3 sm:px-4">
      <SidebarToggle />
      <div className="ml-auto">
        <Suspense fallback={<Skeleton className="size-9 rounded-full" />}>
          <ProfileAvatar />
        </Suspense>
      </div>
    </header>
  )
}
