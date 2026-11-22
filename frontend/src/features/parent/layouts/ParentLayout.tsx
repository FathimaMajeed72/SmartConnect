import { Outlet } from "react-router-dom";

import Sidebar from "@/shared/components/Sidebar";
import Topbar from "@/shared/components/Topbar";

import { sidebarItems } from "../config/sidebar";
import { pageTitles } from "../config/page-titles";

export default function ParentLayout() {
  return (
    <div className="flex min-h-screen">
      <div className="hidden w-64 border-r lg:block">
        <Sidebar
          items={sidebarItems}
          dashboardPath="/parent/dashboard"
        />
      </div>

      <div className="flex flex-1 flex-col">
        <Topbar
          pageTitles={pageTitles}
          sidebarItems={sidebarItems}
          dashboardPath="/parent/dashboard"
          fallbackTitle="Parent"
        />

        <main className="flex-1 p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
}