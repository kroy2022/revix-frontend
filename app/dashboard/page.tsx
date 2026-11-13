import { Suspense } from "react";
import { CreateStudySet } from "@/components/dashboard/create-study-set";
import { DashboardTitle, DashboardTitleSkeleton } from "@/components/dashboard/dashboard-title";
import { StudyLibrary } from "@/components/dashboard/study-library";
import { mockFolders, mockStudySets } from "@/components/dashboard/mock-data";

export default function DashboardPage() {
    return (
        <div className="mx-auto flex w-full max-w-5xl flex-col gap-12 px-4 py-10 animate-in fade-in-0 slide-in-from-bottom-2 duration-300 motion-reduce:animate-none sm:px-6 lg:px-8 lg:py-14">
            <div className="flex flex-col gap-8">
                <header className="flex flex-col items-center gap-2 text-center">
                    <Suspense fallback={<DashboardTitleSkeleton />}>
                        <DashboardTitle />
                    </Suspense>
                    <p className="text-base text-secondary-foreground">
                        Pick up where you left off, or start something new.
                    </p>
                </header>
                <CreateStudySet />
            </div>
            <StudyLibrary folders={mockFolders} studySets={mockStudySets} />
        </div>
    );
}
