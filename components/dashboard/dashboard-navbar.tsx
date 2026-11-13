import { Suspense } from "react"
import Link from "next/link"
import { getCurrentUser } from "@/lib/auth"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Skeleton } from "@/components/ui/skeleton"

async function ProfileAvatar() {
  const user = await getCurrentUser()
  const displayName = user.firstName || user.email || "Your profile"
  const initial = (user.firstName || user.email || "?").charAt(0).toUpperCase()

  return (
    <Avatar size="lg" role="img" aria-label={displayName}>
      {user.avatarUrl && <AvatarImage src={user.avatarUrl} alt="" />}
      <AvatarFallback className="bg-accent font-medium text-accent-foreground">
        {initial}
      </AvatarFallback>
    </Avatar>
  )
}

export function DashboardNavbar() {
  return (
    <header className="border-b border-border bg-card">
      <nav
        aria-label="Main"
        className="mx-auto flex h-16 w-full max-w-5xl items-center justify-between gap-4 px-4 sm:px-6 lg:px-8"
      >
        <Link
          href="/dashboard"
          className="rounded-md text-lg font-semibold text-foreground outline-none focus-visible:ring-3 focus-visible:ring-ring/50"
        >
          Revix AI
        </Link>
        <Suspense fallback={<Skeleton className="size-10 rounded-full" />}>
          <ProfileAvatar />
        </Suspense>
      </nav>
    </header>
  )
}
