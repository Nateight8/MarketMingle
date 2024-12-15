"use client";
import { Bell } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { SidebarTrigger } from "../ui/sidebar";
import { Separator } from "../ui/separator";
import { usePathname } from "next/navigation";
import { BreadcrumbCollapsed } from "./bread-crumbs-collapsed";

export function AppBar({}: React.HTMLAttributes<HTMLDivElement>) {
  // temporary render page title

  const pathname = usePathname();
  const pathSegments = pathname.split("/").filter(Boolean);

  return (
    <>
      <header className="flex h-16 shrink-0 items-center justify-between gap-2  border-b">
        <div className="flex items-center gap-2 px-4">
          <SidebarTrigger className="-ml-1" />
          <Separator orientation="vertical" className="mr-2 h-4" />

          <div className="flex items-center">
            <h1 className="text-lg font-semibold capitalize">
              {pathSegments[0]}
            </h1>
          </div>
        </div>
        <div className="flex items-center space-x-4 px-4">
          <Button
            variant="outline"
            size="icon"
            className="relative rounded-full"
          >
            <Bell className="h-5 w-5" />
            <span className="sr-only">Notifications</span>
            <span className="absolute right-0 top-0 h-2 w-2 rounded-full bg-destructive" />
          </Button>
          <Avatar>
            <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
        </div>
      </header>
      <BreadcrumbCollapsed />
    </>
  );
}
