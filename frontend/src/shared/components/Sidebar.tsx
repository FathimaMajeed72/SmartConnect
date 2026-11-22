import { Link } from "react-router-dom";

import { ScrollArea } from "@/shared/ui/scroll-area";
import { Separator } from "@/shared/ui/separator";

import type { SidebarItem as SidebarItemType } from "@/shared/types/sidebar";
import SidebarItem from "./SidebarItem";

interface SidebarProps {
  items: SidebarItemType[];
  dashboardPath: string;
}

export default function Sidebar({
  items,
  dashboardPath,
}: SidebarProps) {
  return (
    <div className="flex h-full flex-col bg-background">
      <div className="px-6 py-5">
        <Link
          to={dashboardPath}
          className="text-xl font-bold tracking-tight"
        >
          SmartConnect
        </Link>
      </div>

      <Separator />

      <ScrollArea className="flex-1">
        <nav className="space-y-2 p-4">
          {items.map((item) => (
            <SidebarItem key={item.path} item={item} />
          ))}
        </nav>
      </ScrollArea>

      <Separator />

      <div className="p-4 text-center text-xs text-muted-foreground">
        SmartConnect v1.0
      </div>
    </div>
  );
}