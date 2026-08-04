import { Bell } from "lucide-react";

import { Button } from "@/shared/ui/button";
import { pageTitles } from "../config/page-titles";

import { useLocation } from "react-router-dom";
import UserMenu from "./UserMenu";
import { Sheet, SheetContent, SheetTrigger } from "@/shared/ui/sheet";
import Sidebar from "./Sidebar";

import { Menu } from "lucide-react";

export default function Topbar() {
  const { pathname } = useLocation();

  const title = pageTitles[pathname] ?? "Admin";

  return (
    <header className="flex h-16 items-center justify-between border-b bg-background px-6">
      <Sheet>
        <SheetTrigger asChild>
          <Button variant="ghost" size="icon" className="lg:hidden">
            <Menu className="h-5 w-5" />
          </Button>
        </SheetTrigger>

        <SheetContent side="left" className="w-64 p-0">
          <Sidebar />
        </SheetContent>
      </Sheet>
      {/* Page Title */}
      <div>
        <h1 className="text-xl font-semibold">{title}</h1>
      </div>

      {/* Right Section */}
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="icon">
          <Bell className="h-5 w-5" />
        </Button>

        <UserMenu />
      </div>
    </header>
  );
}
