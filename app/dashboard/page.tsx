import { Suspense } from "react";
import { CreateStudySet } from "@/components/dashboard/create-study-set";
import { DashboardNavbar } from "@/components/dashboard/dashboard-navbar";
import { DashboardTitle, DashboardTitleSkeleton } from "@/components/dashboard/dashboard-title";
import { StudyLibrary } from "@/components/dashboard/study-library";
import { mockFolders, mockStudySets, mockUploadFiles } from "@/components/dashboard/mock-data";

export default function DashboardPage() {
    return (
        <>
            <DashboardNavbar />
            <main className="mx-auto flex w-full max-w-5xl flex-1 flex-col gap-10 px-4 py-8 sm:px-6 sm:py-10 lg:px-8">
                <div className="flex flex-col gap-4">
                    <Suspense fallback={<DashboardTitleSkeleton />}>
                        <DashboardTitle />
                    </Suspense>
                    <CreateStudySet initialFiles={mockUploadFiles} />
                </div>
                <StudyLibrary folders={mockFolders} studySets={mockStudySets} />
            </main>
        </>
    );
}
