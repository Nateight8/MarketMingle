import { AppSidebar } from "@/components/navigations/app-sidebar";
import { AppBar } from "@/components/navigations/appbar";

import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset className="border p-2">
        <AppBar />
        <main>{children}</main>
      </SidebarInset>
    </SidebarProvider>
  );
}
