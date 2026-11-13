import { getCurrentUser } from "@/lib/auth"
import { Skeleton } from "@/components/ui/skeleton"

export async function DashboardTitle() {
  const user = await getCurrentUser()
  const title = user.firstName ? `${user.firstName}’s Dashboard` : "Your dashboard"

  return (
    <h1 className="text-center text-2xl font-semibold text-foreground">
      {title}
    </h1>
  )
}

export function DashboardTitleSkeleton() {
  return <Skeleton className="mx-auto h-8 w-56" />
}
