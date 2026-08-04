import { NavLink } from "react-router-dom";

import type { SidebarItem as SidebarItemType } from "../types/sidebar";

type SidebarItemProps = {
  item: SidebarItemType;
};

export default function SidebarItem({ item }: SidebarItemProps) {
  const Icon = item.icon;

  return (
    <NavLink
      to={item.path}
      className={({ isActive }) =>
        `flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors ${
          isActive
            ? "bg-primary text-primary-foreground"
            : "text-muted-foreground hover:bg-muted hover:text-foreground"
        }`
      }
    >
      <Icon className="h-5 w-5" />
      <span>{item.title}</span>
    </NavLink>
  );
}