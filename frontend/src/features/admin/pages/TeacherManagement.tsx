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

import DataTable, { type DataTableColumn } from "@/shared/components/DataTable";

import AddTeacherDialog from "@/features/admin/teacher-management/components/AddTeacherDialog";
import TeacherStatusBadge from "@/features/admin/teacher-management/components/TeacherStatusBadge";

import {
  USER_STATUS,
  type UserStatus,
} from "@/features/admin/types/user-status";

import { useTeachers } from "@/features/admin/teacher-management/hooks/useTeachers";

import type { TeacherListItem } from "@/features/admin/teacher-management/types/teacher.types";
import ViewTeacherDialog from "../teacher-management/components/ViewTeacherDialog";
import { useState } from "react";

import EditTeacherDialog from "@/features/admin/teacher-management/components/EditTeacherDialog";
import { toast } from "sonner";
import {
  updateTeacherStatus,
  resendTeacherInvitation,
} from "../teacher-management/services/teacher.service";
import UpdateTeacherStatusDialog from "../teacher-management/components/UpdateTeacherStatusDialog";
import ResendTeacherInvitationDialog from "../teacher-management/components/ResendTeacherInvitationDialog";

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

  const [selectedTeacherId, setSelectedTeacherId] = useState<string | null>(
    null,
  );

  const [isViewTeacherOpen, setIsViewTeacherOpen] = useState(false);

  const [isEditTeacherOpen, setIsEditTeacherOpen] = useState(false);

  const [isStatusDialogOpen, setIsStatusDialogOpen] = useState(false);

  const [selectedTeacherForStatus, setSelectedTeacherForStatus] =
    useState<TeacherListItem | null>(null);

  const [selectedStatus, setSelectedStatus] = useState<UserStatus | null>(null);

  const [isResendInvitationOpen, setIsResendInvitationOpen] = useState(false);

  const [selectedTeacherForResend, setSelectedTeacherForResend] =
    useState<TeacherListItem | null>(null);

  const handleStatusAction = (teacher: TeacherListItem, status: UserStatus) => {
    setSelectedTeacherForStatus(teacher);
    setSelectedStatus(status);
    setIsStatusDialogOpen(true);
  };

  const handleConfirmStatus = async () => {
    if (!selectedTeacherForStatus || !selectedStatus) {
      return;
    }

    try {
      await updateTeacherStatus(selectedTeacherForStatus.id, {
        status: selectedStatus,
      });

      toast.success("Teacher status updated successfully.");

      setIsStatusDialogOpen(false);
      setSelectedTeacherForStatus(null);
      setSelectedStatus(null);

      await fetchTeachers();
    } catch (error) {
      console.error(error);
      toast.error("Failed to update teacher status.");
    }
  };


  const handleOpenResendInvitation = (teacher: TeacherListItem) => {
    setSelectedTeacherForResend(teacher);
    setIsResendInvitationOpen(true);
  };

  const handleConfirmResendInvitation = async () => {
    if (!selectedTeacherForResend) {
      return;
    }

    try {
      await resendTeacherInvitation(selectedTeacherForResend.id);

      toast.success("Teacher invitation resent successfully.");

      setIsResendInvitationOpen(false);
      setSelectedTeacherForResend(null);

      await fetchTeachers();
    } catch (error) {
      console.error("Failed to resend teacher invitation:", error);

      toast.error("Failed to resend teacher invitation.");
    }
  };

  const teacherColumns: DataTableColumn<TeacherListItem>[] = [
    {
      header: "Teacher ID",
      cell: (teacher) => (
        <span className="font-medium">{teacher.teacherId}</span>
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
      cell: (teacher) => new Date(teacher.joiningDate).toLocaleDateString(),
    },
    {
      header: "Status",
      cell: (teacher) => <TeacherStatusBadge status={teacher.status} />,
    },
    {
      header: "Actions",
      className: "text-right",
      cell: (teacher) => (
        <div className="flex justify-end">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon">
                <MoreHorizontal />
                <span className="sr-only">Open actions</span>
              </Button>
            </DropdownMenuTrigger>

            <DropdownMenuContent align="end">
              <DropdownMenuItem
                onClick={() => {
                  setSelectedTeacherId(teacher.id);
                  setIsViewTeacherOpen(true);
                }}
              >
                View
              </DropdownMenuItem>

              <DropdownMenuItem
                onClick={() => {
                  setSelectedTeacherId(teacher.id);
                  setIsEditTeacherOpen(true);
                }}
              >
                Edit
              </DropdownMenuItem>

              <DropdownMenuSeparator />

              {teacher.status === "ACTIVE" && (
                <>
                  <DropdownMenuItem
                    onClick={() => handleStatusAction(teacher, "INACTIVE")}
                  >
                    Deactivate
                  </DropdownMenuItem>

                  <DropdownMenuItem
                    onClick={() => handleStatusAction(teacher, "BLOCKED")}
                  >
                    Block
                  </DropdownMenuItem>
                </>
              )}

              {teacher.status === "INACTIVE" && (
                <>
                  <DropdownMenuItem
                    onClick={() => handleStatusAction(teacher, "ACTIVE")}
                  >
                    Activate
                  </DropdownMenuItem>

                  <DropdownMenuItem
                    onClick={() => handleStatusAction(teacher, "BLOCKED")}
                  >
                    Block
                  </DropdownMenuItem>
                </>
              )}

              {teacher.status === "BLOCKED" && (
                <DropdownMenuItem
                  onClick={() => handleStatusAction(teacher, "ACTIVE")}
                >
                  Activate
                </DropdownMenuItem>
              )}

              {teacher.status === "INVITED" && (
                <DropdownMenuItem
                  onClick={() => handleOpenResendInvitation(teacher)}
                >
                  Resend Invitation
                </DropdownMenuItem>
              )}
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
        <AddTeacherDialog onSuccess={fetchTeachers} />
      </div>

      {/* Search and Filter */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <Input
          placeholder="Search teachers..."
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
        <p className="text-sm text-muted-foreground">Total: {total}</p>

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
            disabled={page === totalPages || isLoading}
            onClick={() => setPage(page + 1)}
          >
            Next
          </Button>
        </div>
      </div>
      {selectedTeacherId && (
        <ViewTeacherDialog
          teacherId={selectedTeacherId}
          open={isViewTeacherOpen}
          onOpenChange={setIsViewTeacherOpen}
        />
      )}
      {selectedTeacherId && (
        <EditTeacherDialog
          teacherId={selectedTeacherId}
          open={isEditTeacherOpen}
          onOpenChange={setIsEditTeacherOpen}
          onSuccess={fetchTeachers}
        />
      )}
      {selectedTeacherForStatus && selectedStatus && (
        <UpdateTeacherStatusDialog
          open={isStatusDialogOpen}
          onOpenChange={setIsStatusDialogOpen}
          teacherName={`${selectedTeacherForStatus.firstName} ${selectedTeacherForStatus.lastName}`}
          status={selectedStatus}
          onConfirm={handleConfirmStatus}
        />
      )}

      {selectedTeacherForResend && (
        <ResendTeacherInvitationDialog
          open={isResendInvitationOpen}
          onOpenChange={setIsResendInvitationOpen}
          teacherName={`${selectedTeacherForResend.firstName} ${selectedTeacherForResend.lastName}`}
          onConfirm={handleConfirmResendInvitation}
        />
      )}
    </div>
  );
}
