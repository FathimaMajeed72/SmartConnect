import {
  LayoutDashboard,
  GraduationCap,
  Users,
  UserRound,
  School,
  BookOpen,
  ClipboardCheck,
} from "lucide-react";
import type { SidebarItem } from "../../../shared/types/sidebar";

export const sidebarItems: SidebarItem[] = [
  {
    title: "Dashboard",
    path: "/admin/dashboard",
    icon: LayoutDashboard,
  },
  {
    title: "Teachers",
    path: "/admin/teachers",
    icon: GraduationCap,
  },
  {
    title: "Parents",
    path: "/admin/parents",
    icon: Users,
  },
  {
    title: "Students",
    path: "/admin/students",
    icon: UserRound,
  },
  {
    title: "Classes",
    path: "/admin/classes",
    icon: School,
  },
  {
    title: "Subjects",
    path: "/admin/subjects",
    icon: BookOpen,
  },
  {
    title: "Attendance",
    path: "/admin/attendance",
    icon: ClipboardCheck,
  },
];
