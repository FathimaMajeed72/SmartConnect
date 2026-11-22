import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/shared/ui/dropdown-menu";

import { Avatar, AvatarFallback } from "@/shared/ui/avatar";

import { LogOut, User } from "lucide-react";
import { useAppSelector } from "@/app/store/hooks";

export default function UserMenu() {
  const { user } = useAppSelector((state) => state.auth);
  const initials =
    `${user?.firstName?.[0] ?? ""}${user?.lastName?.[0] ?? ""}`.toUpperCase();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button className="flex items-center gap-3 rounded-lg p-1 hover:bg-muted focus:outline-none focus:ring-2 focus:ring-primary">
          <Avatar>
            <AvatarFallback>{initials}</AvatarFallback>
          </Avatar>

          <div className="hidden flex-col items-start sm:flex">
            <span className="text-sm font-medium">
              {user?.firstName} {user?.lastName}
            </span>
            <span className="text-xs text-muted-foreground">{user?.role}</span>
          </div>
        </button>
      </DropdownMenuTrigger>

      <DropdownMenuContent align="end" className="w-56">
        <DropdownMenuLabel>
          <div className="flex flex-col">
            <span className="font-medium">
              {user?.firstName} {user?.lastName}
            </span>
            <span className="text-xs text-muted-foreground">{user?.email}</span>
          </div>
        </DropdownMenuLabel>

        <DropdownMenuSeparator />

        <DropdownMenuItem>
          <User className="mr-2 h-4 w-4" />
          Profile
        </DropdownMenuItem>

        <DropdownMenuSeparator />

        <DropdownMenuItem className="text-destructive focus:text-destructive">
          <LogOut className="mr-2 h-4 w-4" />
          Logout
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
