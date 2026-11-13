import { CreateStudySet } from "@/components/dashboard/create-study-set";
import { DashboardSidebar } from "@/components/dashboard/dashboard-sidebar";
import { StudyLibrary } from "@/components/dashboard/study-library";
import { mockFolders, mockStudySets } from "@/components/dashboard/mock-data";
import { SidebarToggle } from "@/components/sidebar-toggle";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";

export default function Preview() {
    return (
        <SidebarProvider>
            <DashboardSidebar folders={mockFolders} />
            <SidebarInset className="md:peer-data-[variant=inset]:shadow-raised md:peer-data-[variant=inset]:ring-1 md:peer-data-[variant=inset]:ring-sidebar-border">
                <header className="flex h-14 shrink-0 items-center gap-2 border-b border-border px-3 sm:px-4">
                    <SidebarToggle />
                    <div className="ml-auto">
                        <Avatar className="size-9"><AvatarFallback className="bg-accent text-sm font-semibold text-accent-foreground">K</AvatarFallback></Avatar>
                    </div>
                </header>
                <div className="mx-auto flex w-full max-w-5xl flex-col gap-12 px-4 py-10 sm:px-6 lg:px-8 lg:py-14">
                    <div className="flex flex-col gap-8">
                        <header className="flex flex-col items-center gap-2 text-center">
                            <h1 className="text-3xl font-semibold tracking-tight text-foreground md:text-4xl">Kevin’s Dashboard</h1>
                            <p className="text-base text-secondary-foreground">Pick up where you left off, or start something new.</p>
                        </header>
                        <CreateStudySet />
                    </div>
                    <StudyLibrary folders={mockFolders} studySets={mockStudySets} />
                </div>
            </SidebarInset>
        </SidebarProvider>
    );
}
