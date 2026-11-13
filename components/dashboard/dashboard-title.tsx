import { getCurrentUser } from "@/lib/auth"
import { Skeleton } from "@/components/ui/skeleton"

export async function DashboardTitle() {
  const user = await getCurrentUser()
  const title = user.firstName ? `${user.firstName}’s Dashboard` : "Your dashboard"

  return (
    <h1 className="text-3xl font-semibold tracking-tight text-foreground md:text-4xl">
      {title}
    </h1>
  )
}

export function DashboardTitleSkeleton() {
  return <Skeleton className="h-10 w-64" />
}
