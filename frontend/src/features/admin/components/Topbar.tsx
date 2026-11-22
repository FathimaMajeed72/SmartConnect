import Topbar from "@/shared/components/Topbar";

import { pageTitles } from "../config/page-titles";
import { sidebarItems } from "../config/sidebar";

export default function AdminTopbar() {
  return (
    <Topbar
      pageTitles={pageTitles}
      sidebarItems={sidebarItems}
      dashboardPath="/admin/dashboard"
      fallbackTitle="Admin"
    />
  );
}