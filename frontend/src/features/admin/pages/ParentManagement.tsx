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

import AddParentDialog from "@/features/admin/parent-management/components/AddParentDialog";
import {
  USER_STATUS,
  type UserStatus,
} from "@/features/admin/types/user-status";

import { useParents } from "@/features/admin/parent-management/hooks/useParents";
import ParentStatusBadge from "@/features/admin/parent-management/components/ParentStatusBadge";

import type { ParentListItem } from "@/features/admin/parent-management/types/parent.types";
import { useState } from "react";
import { useParentDetails } from "../parent-management/hooks/useParentDetails";
import ViewParentDialog from "../parent-management/components/ViewParentDialog";
import EditParentDialog from "../parent-management/components/EditParentDialog";
import UpdateParentStatusDialog from "../parent-management/components/UpdateParentStatusDialog";
import { toast } from "sonner";
import { getErrorMessage } from "@/core/utils/getErrorMessage";
import {
  resendParentInvitation,
  updateParentStatus,
} from "../parent-management/services/parent.service";
import ResendParentInvitationDialog from "../parent-management/components/ResendParentInvitationDialog";

export default function ParentManagement() {
  const [isDetailsOpen, setIsDetailsOpen] = useState(false);

  const [isEditOpen, setIsEditOpen] = useState(false);
  const [selectedParentId, setSelectedParentId] = useState("");

  const [isStatusDialogOpen, setIsStatusDialogOpen] = useState(false);

  const [selectedParentForStatus, setSelectedParentForStatus] =
    useState<ParentListItem | null>(null);

  const [selectedStatus, setSelectedStatus] = useState<UserStatus | null>(null);

  const [isInvitationDialogOpen, setIsInvitationDialogOpen] = useState(false);

  const [selectedParentForInvitation, setSelectedParentForInvitation] =
    useState<ParentListItem | null>(null);

  const {
    parents,
    isLoading,
    total,
    page,
    totalPages,
    search,
    statusFilter,
    setSearch,
    setStatusFilter,
    setPage,
    fetchParents,
  } = useParents();

  const {
    parent: selectedParent,
    isLoading: isDetailsLoading,
    fetchParent,
    clearParent,
  } = useParentDetails();

  const handleViewParent = async (parentId: string) => {
    setIsDetailsOpen(true);
    await fetchParent(parentId);
  };

  const handleDetailsOpenChange = (open: boolean) => {
    setIsDetailsOpen(open);

    if (!open) {
      clearParent();
    }
  };

  const handleEditParent = (parentId: string) => {
    setSelectedParentId(parentId);
    setIsEditOpen(true);
  };

  const handleEditOpenChange = (open: boolean) => {
    setIsEditOpen(open);

    if (!open) {
      setSelectedParentId("");
    }
  };

  const handleStatusAction = (parent: ParentListItem, status: UserStatus) => {
    setSelectedParentForStatus(parent);
    setSelectedStatus(status);
    setIsStatusDialogOpen(true);
  };

  const handleConfirmStatus = async () => {
    if (!selectedParentForStatus || !selectedStatus) {
      return;
    }

    try {
      await updateParentStatus(selectedParentForStatus.id, {
        status: selectedStatus,
      });

      toast.success("Parent status updated successfully.");

      setIsStatusDialogOpen(false);
      setSelectedParentForStatus(null);
      setSelectedStatus(null);

      await fetchParents();
    } catch (error) {
      console.error("Failed to update parent status:", error);

      toast.error(getErrorMessage(error));
    }
  };

  const handleResendInvitation = (parent: ParentListItem) => {
    setSelectedParentForInvitation(parent);
    setIsInvitationDialogOpen(true);
  };

  const handleConfirmResendInvitation = async () => {
    if (!selectedParentForInvitation) return;

    try {
      await resendParentInvitation(selectedParentForInvitation.id);

      toast.success("Parent invitation resent successfully.");

      setIsInvitationDialogOpen(false);
      setSelectedParentForInvitation(null);

      await fetchParents();
    } catch (error) {
      console.error("Failed to resend parent invitation:", error);

      toast.error(getErrorMessage(error));
    }
  };

  const parentColumns: DataTableColumn<ParentListItem>[] = [
    {
      header: "Parent Name",
      cell: (parent) => (
        <span className="font-medium">
          {parent.firstName} {parent.lastName}
        </span>
      ),
    },
    {
      header: "Email",
      cell: (parent) => parent.email,
    },
    {
      header: "Phone",
      cell: (parent) => parent.phone ?? "—",
    },
    {
      header: "Status",
      cell: (parent) => <ParentStatusBadge status={parent.status} />,
    },
    {
      header: "Actions",
      className: "text-right",
      cell: (parent) => (
        <div className="flex justify-end">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon">
                <MoreHorizontal />
                <span className="sr-only">Open actions</span>
              </Button>
            </DropdownMenuTrigger>

            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={() => handleViewParent(parent.id)}>
                View
              </DropdownMenuItem>

              <DropdownMenuItem onClick={() => handleEditParent(parent.id)}>
                Edit
              </DropdownMenuItem>

              <DropdownMenuSeparator />

              {parent.status === USER_STATUS.ACTIVE && (
                <>
                  <DropdownMenuItem
                    onClick={() =>
                      handleStatusAction(parent, USER_STATUS.INACTIVE)
                    }
                  >
                    Deactivate
                  </DropdownMenuItem>

                  <DropdownMenuItem
                    onClick={() =>
                      handleStatusAction(parent, USER_STATUS.BLOCKED)
                    }
                  >
                    Block
                  </DropdownMenuItem>
                </>
              )}

              {parent.status === USER_STATUS.INACTIVE && (
                <>
                  <DropdownMenuItem
                    onClick={() =>
                      handleStatusAction(parent, USER_STATUS.ACTIVE)
                    }
                  >
                    Activate
                  </DropdownMenuItem>

                  <DropdownMenuItem
                    onClick={() =>
                      handleStatusAction(parent, USER_STATUS.BLOCKED)
                    }
                  >
                    Block
                  </DropdownMenuItem>
                </>
              )}

              {parent.status === USER_STATUS.BLOCKED && (
                <DropdownMenuItem
                  onClick={() => handleStatusAction(parent, USER_STATUS.ACTIVE)}
                >
                  Activate
                </DropdownMenuItem>
              )}

              {parent.status === USER_STATUS.INVITED && (
                <DropdownMenuItem
                  onClick={() => handleResendInvitation(parent)}
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
      <DataTable
        columns={parentColumns}
        data={parents}
        isLoading={isLoading}
        loadingMessage="Loading parents..."
        emptyMessage="No parents found."
        getRowKey={(parent) => parent.id}
      />
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

      <ViewParentDialog
        open={isDetailsOpen}
        onOpenChange={handleDetailsOpenChange}
        parent={selectedParent}
        isLoading={isDetailsLoading}
      />

      <EditParentDialog
        parentId={selectedParentId}
        open={isEditOpen}
        onOpenChange={handleEditOpenChange}
        onSuccess={fetchParents}
      />

      {selectedParentForStatus && selectedStatus && (
        <UpdateParentStatusDialog
          open={isStatusDialogOpen}
          onOpenChange={setIsStatusDialogOpen}
          parentName={`${selectedParentForStatus.firstName} ${selectedParentForStatus.lastName}`}
          status={selectedStatus}
          onConfirm={handleConfirmStatus}
        />
      )}

      {selectedParentForInvitation && (
        <ResendParentInvitationDialog
          open={isInvitationDialogOpen}
          onOpenChange={setIsInvitationDialogOpen}
          parentName={`${selectedParentForInvitation.firstName} ${selectedParentForInvitation.lastName}`}
          onConfirm={handleConfirmResendInvitation}
        />
      )}
    </div>
  );
}
