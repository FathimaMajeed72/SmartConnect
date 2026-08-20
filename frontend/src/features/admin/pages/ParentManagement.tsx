
import { MoreHorizontal } from "lucide-react";

import { Button } from "@/shared/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/shared/ui/dropdown-menu";
import { Input } from "@/shared/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/shared/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/shared/ui/table";


import AddParentDialog from "@/features/admin/parent-management/components/AddParentDialog";
import { USER_STATUS, type UserStatus } from "@/features/admin/types/user-status";

import { useParents } from "@/features/admin/parent-management/hooks/useParents";
import ParentStatusBadge from "../parent-management/components/ParentStatusBadge";

export default function ParentManagement() {
  const {
  parents,
  isLoading,
  search,
  statusFilter,
  setSearch,
  setStatusFilter,
  fetchParents,
} = useParents();



  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div>
        <h2 className="text-2xl font-semibold tracking-tight">
          Parent Management
        </h2>

        <p className="text-muted-foreground">
          Manage parents and their accounts.
        </p>
      </div>

      {/* Add Parent */}
      <div className="flex items-center justify-end">
        <AddParentDialog onSuccess={fetchParents} />
      </div>

      {/* Search and Filter */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <Input
          placeholder="Search parents..."
          value={search}
          onChange={(event) => setSearch(event.target.value)}
          className="sm:max-w-sm"
        />

        <Select
          value={statusFilter}
          onValueChange={(value) =>
            setStatusFilter(value as UserStatus | "ALL")
          }
        >
          <SelectTrigger className="w-full sm:w-40">
            <SelectValue placeholder="Filter status" />
          </SelectTrigger>

          <SelectContent>
            <SelectItem value="ALL">All Status</SelectItem>
            <SelectItem value={USER_STATUS.INVITED}>Invited</SelectItem>
            <SelectItem value={USER_STATUS.ACTIVE}>Active</SelectItem>
            <SelectItem value={USER_STATUS.INACTIVE}>Inactive</SelectItem>
            <SelectItem value={USER_STATUS.BLOCKED}>Blocked</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Parents Table */}
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Parent Name</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Phone</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {isLoading ? (
              <TableRow>
                <TableCell colSpan={5} className="h-24 text-center">
                  Loading parents...
                </TableCell>
              </TableRow>
            ) : parents.length > 0 ? (
              parents.map((parent) => (
                <TableRow key={parent.id}>
                  <TableCell className="font-medium">
                    {parent.firstName} {parent.lastName}
                  </TableCell>

                  <TableCell>{parent.email}</TableCell>

                  <TableCell>{parent.phone ?? "—"}</TableCell>

                  <TableCell>
                    
                    <ParentStatusBadge status={parent.status} />
                  </TableCell>

                  <TableCell className="text-right">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon">
                          <MoreHorizontal />
                          <span className="sr-only">Open actions</span>
                        </Button>
                      </DropdownMenuTrigger>

                      <DropdownMenuContent align="end">
                        <DropdownMenuItem>View</DropdownMenuItem>

                        <DropdownMenuItem>Edit</DropdownMenuItem>

                        <DropdownMenuSeparator />

                        <DropdownMenuItem className="text-destructive">
                          Block
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={5} className="h-24 text-center">
                  No parents found.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
