import { Bell, Menu } from "lucide-react";
import { useLocation } from "react-router-dom";
import type { ReactNode } from "react";

import { Button } from "@/shared/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/shared/ui/sheet";

import Sidebar from "./Sidebar";
import UserMenu from "./UserMenu";

import type { SidebarItem } from "@/shared/types/sidebar";

interface TopbarProps {
  pageTitles: Record<string, string>;
  sidebarItems: SidebarItem[];
  dashboardPath: string;
  children?: ReactNode;
  fallbackTitle?: string;
}

export default function Topbar({
  pageTitles,
  sidebarItems,
  dashboardPath,
  children,
  fallbackTitle = "Dashboard",
}: TopbarProps) {
  const { pathname } = useLocation();

  const title = pageTitles[pathname] ?? fallbackTitle;

  return (
    <header className="flex h-16 items-center justify-between border-b bg-background px-6">
      <div className="flex items-center gap-3">
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="ghost" size="icon" className="lg:hidden">
              <Menu className="h-5 w-5" />
            </Button>
          </SheetTrigger>

          <SheetContent side="left" className="w-64 p-0">
            <Sidebar
              items={sidebarItems}
              dashboardPath={dashboardPath}
            />
          </SheetContent>
        </Sheet>

        <h1 className="text-xl font-semibold">{title}</h1>
      </div>

      <div className="flex items-center gap-4">
        {children}

        <Button variant="ghost" size="icon">
          <Bell className="h-5 w-5" />
        </Button>

        <UserMenu />
      </div>
    </header>
  );
}