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

import DataTable, {
  type DataTableColumn,
} from "@/shared/components/DataTable";

import AddTeacherDialog from "@/features/admin/teacher-management/components/AddTeacherDialog";
import TeacherStatusBadge from "@/features/admin/teacher-management/components/TeacherStatusBadge";

import {
  USER_STATUS,
  type UserStatus,
} from "@/features/admin/types/user-status";

import { useTeachers } from "@/features/admin/teacher-management/hooks/useTeachers";

import type { TeacherListItem } from "@/features/admin/teacher-management/types/teacher.types";

export default function TeacherManagement() {
  const {
    teachers,
    isLoading,
    total,
    page,
    totalPages,
    search,
    statusFilter,
    setSearch,
    setStatusFilter,
    setPage,
    fetchTeachers,
  } = useTeachers();

  const teacherColumns: DataTableColumn<TeacherListItem>[] = [
    {
      header: "Teacher ID",
      cell: (teacher) => (
        <span className="font-medium">
          {teacher.teacherId}
        </span>
      ),
    },
    {
      header: "Teacher Name",
      cell: (teacher) => (
        <span className="font-medium">
          {teacher.firstName} {teacher.lastName}
        </span>
      ),
    },
    {
      header: "Email",
      cell: (teacher) => teacher.email,
    },
    {
      header: "Phone",
      cell: (teacher) => teacher.phone ?? "—",
    },
    {
      header: "Qualification",
      cell: (teacher) => teacher.qualification,
    },
    {
      header: "Joining Date",
      cell: (teacher) =>
        new Date(teacher.joiningDate).toLocaleDateString(),
    },
    {
      header: "Status",
      cell: (teacher) => (
        <TeacherStatusBadge status={teacher.status} />
      ),
    },
    {
      header: "Actions",
      className: "text-right",
      cell: () => (
        <div className="flex justify-end">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon">
                <MoreHorizontal />
                <span className="sr-only">
                  Open actions
                </span>
              </Button>
            </DropdownMenuTrigger>

            <DropdownMenuContent align="end">
              <DropdownMenuItem>
                View
              </DropdownMenuItem>

              <DropdownMenuItem>
                Edit
              </DropdownMenuItem>

              <DropdownMenuSeparator />

              <DropdownMenuItem className="text-destructive">
                Block
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      ),
    },
  ];

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div>
        <h2 className="text-2xl font-semibold tracking-tight">
          Teacher Management
        </h2>

        <p className="text-muted-foreground">
          Manage teachers and their accounts.
        </p>
      </div>

      {/* Add Teacher */}
      <div className="flex items-center justify-end">
        <AddTeacherDialog
          onSuccess={fetchTeachers}
        />
      </div>

      {/* Search and Filter */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <Input
          placeholder="Search teachers..."
          value={search}
          onChange={(event) =>
            setSearch(event.target.value)
          }
          className="sm:max-w-sm"
        />

        <Select
          value={statusFilter}
          onValueChange={(value) =>
            setStatusFilter(
              value as UserStatus | "ALL",
            )
          }
        >
          <SelectTrigger className="w-full sm:w-40">
            <SelectValue placeholder="Filter status" />
          </SelectTrigger>

          <SelectContent>
            <SelectItem value="ALL">
              All Status
            </SelectItem>

            <SelectItem value={USER_STATUS.INVITED}>
              Invited
            </SelectItem>

            <SelectItem value={USER_STATUS.ACTIVE}>
              Active
            </SelectItem>

            <SelectItem value={USER_STATUS.INACTIVE}>
              Inactive
            </SelectItem>

            <SelectItem value={USER_STATUS.BLOCKED}>
              Blocked
            </SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Teacher Table */}
      <DataTable
        columns={teacherColumns}
        data={teachers}
        isLoading={isLoading}
        loadingMessage="Loading teachers..."
        emptyMessage="No teachers found."
        getRowKey={(teacher) => teacher.id}
      />

      {/* Pagination */}
      <div className="flex items-center justify-between">
        <p className="text-sm text-muted-foreground">
          Total: {total}
        </p>

        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            disabled={page === 1 || isLoading}
            onClick={() => setPage(page - 1)}
          >
            Previous
          </Button>

          <span className="text-sm">
            Page {page} of {totalPages}
          </span>

          <Button
            variant="outline"
            disabled={
              page === totalPages || isLoading
            }
            onClick={() => setPage(page + 1)}
          >
            Next
          </Button>
        </div>
      </div>
    </div>
  );
}