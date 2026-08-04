import { Link } from "react-router-dom";

import { ScrollArea } from "@/shared/ui/scroll-area";
import { Separator } from "@/shared/ui/separator";

import { sidebarItems } from "../config/sidebar";
import SidebarItem from "./SidebarItem";

export default function Sidebar() {
  return (
    <div className="flex h-full flex-col bg-background">
      {/* Logo */}
      <div className="px-6 py-5">
        <Link
          to="/admin/dashboard"
          className="text-xl font-bold tracking-tight"
        >
          SmartConnect
        </Link>
      </div>

      <Separator />

      {/* Navigation */}
      <ScrollArea className="flex-1">
        <nav className="space-y-2 p-4">
          {sidebarItems.map((item) => (
            <SidebarItem
              key={item.path}
              item={item}
            />
          ))}
        </nav>
      </ScrollArea>

      <Separator />

      {/* Footer */}
      <div className="p-4 text-center text-xs text-muted-foreground">
        SmartConnect v1.0
      </div>
    </div>
  );
}