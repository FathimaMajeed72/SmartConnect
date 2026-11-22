import {
  LayoutDashboard,
  Users,
  CalendarCheck,
  ClipboardList,
  TrendingUp,
  MessageSquare,
  Bell,
} from "lucide-react";

import type { SidebarItem } from "@/shared/types/sidebar";

export const sidebarItems: SidebarItem[] = [
  {
    title: "Dashboard",
    path: "/teacher/dashboard",
    icon: LayoutDashboard,
  },
  {
    title: "My Batch",
    path: "/teacher/my-batch",
    icon: Users,
  },
  {
    title: "Attendance",
    path: "/teacher/attendance",
    icon: CalendarCheck,
  },
  {
    title: "Exams",
    path: "/teacher/exams",
    icon: ClipboardList,
  },
  {
    title: "Performance",
    path: "/teacher/performance",
    icon: TrendingUp,
  },
  {
    title: "Feedback",
    path: "/teacher/feedback",
    icon: MessageSquare,
  },
  {
    title: "Notifications",
    path: "/teacher/notifications",
    icon: Bell,
  },
];