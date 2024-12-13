"use client";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import {
  IconAutomation,
  IconBasketDown,
  IconBuildingStore,
  IconCalendar,
  IconChartPie,
  IconDiamond,
  IconHelp,
  IconLayoutDashboard,
  IconPlugConnected,
  IconSettings,
  IconTags,
  IconTruckLoading,
  IconUsers,
} from "@tabler/icons-react";
import { usePathname } from "next/navigation";

// Menu items.
const items = [
  {
    title: "Dashboard",
    url: "/dashboard",
    icon: IconLayoutDashboard,
  },
  {
    title: "Products",
    url: "/products",
    icon: IconBuildingStore,
  },
  {
    title: "Order",
    url: "/order",
    icon: IconTruckLoading,
  },
  {
    title: "Customers",
    url: "/customer",
    icon: IconUsers,
  },
  {
    title: "Sales & Analytics",
    url: "/sales",
    icon: IconChartPie,
  },
  {
    title: "Inventory",
    url: "/inventory",
    icon: IconBasketDown,
  },
  {
    title: "Marketing ",
    url: "/marketing",
    icon: IconTags,
  },
  {
    title: "Go Premium ",
    url: "/billing",
    icon: IconDiamond,
  },
];

const socialManager = [
  {
    title: "Automations",
    url: "/automations",
    icon: IconAutomation,
  },
  {
    title: "Social Accounts",
    url: "/connect",
    icon: IconPlugConnected,
  },

  {
    title: "Schedule Posts",
    url: "/schedule",
    icon: IconCalendar,
  },
];

export function AppSidebar() {
  const pathname = usePathname();
  return (
    <Sidebar collapsible="icon" variant="inset">
      <SidebarHeader className="h-14"></SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => {
                const isActive = item.url === pathname ? true : false;

                return (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton
                      className="w-fit pr-6"
                      asChild
                      isActive={isActive}
                    >
                      <a href={item.url}>
                        <item.icon />
                        <span>{item.title}</span>
                      </a>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                );
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        {/* automations */}

        <SidebarGroup>
          <SidebarGroupLabel>Social Manager</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {socialManager.map((item) => {
                const isActive = item.url === pathname ? true : false;

                return (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton
                      className="w-fit pr-6"
                      asChild
                      isActive={isActive}
                    >
                      <a href={item.url}>
                        <item.icon />
                        <span>{item.title}</span>
                      </a>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                );
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        {/* footer */}
      </SidebarContent>
      <SidebarFooter>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton asChild>
              <button>
                <IconHelp />
                Help
              </button>
            </SidebarMenuButton>
          </SidebarMenuItem>
          <SidebarMenuItem>
            <SidebarMenuButton asChild>
              <button>
                <IconSettings />
                Settings
              </button>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  );
}
