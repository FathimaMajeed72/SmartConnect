import { Outlet } from "react-router-dom";

import Sidebar from "@/shared/components/Sidebar";
import Topbar from "@/shared/components/Topbar";

import { sidebarItems } from "../config/sidebar";
import { pageTitles } from "../config/page-titles";

export default function TeacherLayout() {
  return (
    <div className="flex min-h-screen">
      <div className="hidden w-64 border-r lg:block">
        <Sidebar
          items={sidebarItems}
          dashboardPath="/teacher/dashboard"
        />
      </div>

      <div className="flex flex-1 flex-col">
        <Topbar
          pageTitles={pageTitles}
          sidebarItems={sidebarItems}
          dashboardPath="/teacher/dashboard"
          fallbackTitle="Teacher"
        />

        <main className="flex-1 p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
}