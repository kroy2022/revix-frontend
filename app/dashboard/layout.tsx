import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { DashboardNavbar } from "@/components/dashboard/dashboard-navbar";
import { DashboardSidebar } from "@/components/dashboard/dashboard-sidebar";
import { mockFolders } from "@/components/dashboard/mock-data";

export default function DashboardLayout({ children }: LayoutProps<"/dashboard">) {
    return (
        <SidebarProvider>
            <DashboardSidebar folders={mockFolders} />
            <SidebarInset className="md:peer-data-[variant=inset]:shadow-raised md:peer-data-[variant=inset]:ring-1 md:peer-data-[variant=inset]:ring-sidebar-border">
                <DashboardNavbar />
                {children}
            </SidebarInset>
        </SidebarProvider>
    );
}
