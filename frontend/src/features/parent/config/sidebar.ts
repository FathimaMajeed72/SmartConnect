import { LayoutDashboard } from "lucide-react";

import type { SidebarItem } from "@/shared/types/sidebar";

export const sidebarItems: SidebarItem[] = [
  {
    title: "Dashboard",
    path: "/parent/dashboard",
    icon: LayoutDashboard,
  },
];