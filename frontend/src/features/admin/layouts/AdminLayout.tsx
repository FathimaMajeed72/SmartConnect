import { Outlet } from "react-router-dom";

import Sidebar from "../../../shared/components/Sidebar";
import Topbar from "../components/Topbar";
import { sidebarItems } from "../config/sidebar";

export default function AdminLayout() {
  return (
    <div className="flex min-h-screen">
      <div className="hidden w-64 border-r lg:block">
        <Sidebar items={sidebarItems} dashboardPath="/admin/dashboard" />
      </div>

      <div className="flex flex-1 flex-col">
        <Topbar />

        <main className="flex-1 p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
