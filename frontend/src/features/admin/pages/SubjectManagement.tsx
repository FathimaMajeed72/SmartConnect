import { useState } from "react";
import { MoreHorizontal } from "lucide-react";
import { toast } from "sonner";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/shared/ui/dropdown-menu";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/shared/ui/select";

import { Button } from "@/shared/ui/button";
import { Input } from "@/shared/ui/input";

import DataTable, { type DataTableColumn } from "@/shared/components/DataTable";

import ConfirmDialog from "@/shared/components/ConfirmDialog";

import { getErrorMessage } from "@/core/utils/getErrorMessage";

import AddSubjectDialog from "../subject-management/components/AddSubjectDialog";
import EditSubjectDialog from "../subject-management/components/EditSubjectDialog";
import SubjectStatusBadge from "../subject-management/components/SubjectStatusBadge";

import type { SubjectListItem } from "../subject-management/types/subject.types";
import {
  SUBJECT_STATUS,
  type SubjectStatus,
} from "../subject-management/types/subject-status";

import { updateSubjectStatus } from "../subject-management/services/subject.service";

import { useSubjects } from "../subject-management/hooks/use-subjects";

export default function SubjectManagement() {
  const [isAddOpen, setIsAddOpen] = useState(false);

  const [isEditOpen, setIsEditOpen] = useState(false);

  const [selectedSubject, setSelectedSubject] =
    useState<SubjectListItem | null>(null);

  const [isStatusDialogOpen, setIsStatusDialogOpen] = useState(false);

  const [isStatusUpdating, setIsStatusUpdating] = useState(false);

  const [selectedStatus, setSelectedStatus] = useState<SubjectStatus | null>(
    null,
  );

  const {
    subjects,
    isLoading,
    total,
    page,
    totalPages,
    search,
    status,
    setSearch,
    setStatus,
    setPage,
    fetchSubjects,
  } = useSubjects();

  const handleEditSubject = (subject: SubjectListItem) => {
    setSelectedSubject(subject);
    setIsEditOpen(true);
  };

  const handleEditOpenChange = (open: boolean) => {
    setIsEditOpen(open);

    if (!open) {
      setSelectedSubject(null);
    }
  };

  const handleStatusAction = (
    subject: SubjectListItem,
    newStatus: SubjectStatus,
  ) => {
    setSelectedSubject(subject);
    setSelectedStatus(newStatus);
    setIsStatusDialogOpen(true);
  };

  const handleConfirmStatus = async () => {
    if (!selectedSubject || !selectedStatus) {
      return;
    }

    try {
      setIsStatusUpdating(true);

      await updateSubjectStatus(selectedSubject.id, {
        status: selectedStatus,
      });

      toast.success("Subject status updated successfully.");

      setIsStatusDialogOpen(false);
      setSelectedSubject(null);
      setSelectedStatus(null);

      await fetchSubjects();
    } catch (error) {
      console.error("Failed to update subject status:", error);

      toast.error(getErrorMessage(error));
    } finally {
      setIsStatusUpdating(false);
    }
  };

  const subjectColumns: DataTableColumn<SubjectListItem>[] = [
    {
      header: "Subject Name",
      cell: (subject) => <span className="font-medium">{subject.name}</span>,
    },

    {
      header: "Code",
      cell: (subject) => subject.code,
    },

    {
      header: "Status",
      cell: (subject) => <SubjectStatusBadge status={subject.status} />,
    },

    {
      header: "Actions",
      className: "text-right",
      cell: (subject) => (
        <div className="flex justify-end">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon">
                <MoreHorizontal />
                <span className="sr-only">Open actions</span>
              </Button>
            </DropdownMenuTrigger>

            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={() => handleEditSubject(subject)}>
                Edit
              </DropdownMenuItem>

              <DropdownMenuSeparator />

              {subject.status === SUBJECT_STATUS.ACTIVE && (
                <DropdownMenuItem
                  onClick={() =>
                    handleStatusAction(subject, SUBJECT_STATUS.INACTIVE)
                  }
                >
                  Deactivate
                </DropdownMenuItem>
              )}

              {subject.status === SUBJECT_STATUS.INACTIVE && (
                <DropdownMenuItem
                  onClick={() =>
                    handleStatusAction(subject, SUBJECT_STATUS.ACTIVE)
                  }
                >
                  Activate
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
          Subject Management
        </h2>

        <p className="text-muted-foreground">
          Manage subjects and their status.
        </p>
      </div>

      {/* Add Subject */}
      <div className="flex items-center justify-end">
        <Button type="button" onClick={() => setIsAddOpen(true)}>
          + Add Subject
        </Button>
      </div>

      {/* Search and Filter */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <Input
          placeholder="Search subjects..."
          value={search}
          onChange={(event) => setSearch(event.target.value)}
          className="sm:max-w-sm"
        />

        <Select
          value={status ?? "ALL"}
          onValueChange={(value) => {
            setStatus(value === "ALL" ? undefined : (value as SubjectStatus));
          }}
        >
          <SelectTrigger className="w-full sm:w-40">
            <SelectValue placeholder="Filter status" />
          </SelectTrigger>

          <SelectContent>
            <SelectItem value="ALL">All Status</SelectItem>

            <SelectItem value={SUBJECT_STATUS.ACTIVE}>Active</SelectItem>

            <SelectItem value={SUBJECT_STATUS.INACTIVE}>Inactive</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Subjects Table */}
      <DataTable
        columns={subjectColumns}
        data={subjects}
        isLoading={isLoading}
        loadingMessage="Loading subjects..."
        emptyMessage="No subjects found."
        getRowKey={(subject) => subject.id}
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
            disabled={page === totalPages || totalPages === 0 || isLoading}
            onClick={() => setPage(page + 1)}
          >
            Next
          </Button>
        </div>
      </div>

      {/* Add Subject Dialog */}
      <AddSubjectDialog
        open={isAddOpen}
        onOpenChange={setIsAddOpen}
        onSubjectCreated={fetchSubjects}
      />

      {/* Edit Subject Dialog */}
      {selectedSubject && (
        <EditSubjectDialog
          open={isEditOpen}
          onOpenChange={handleEditOpenChange}
          subjectDetails={selectedSubject}
          onSubjectUpdated={async () => {
            await fetchSubjects();
          }}
        />
      )}

      {/* Status Confirmation */}
      {selectedSubject && selectedStatus && (
        <ConfirmDialog
          open={isStatusDialogOpen}
          onOpenChange={setIsStatusDialogOpen}
          title={
            selectedStatus === SUBJECT_STATUS.INACTIVE
              ? "Deactivate Subject"
              : "Activate Subject"
          }
          description={
            selectedStatus === SUBJECT_STATUS.INACTIVE
              ? "Are you sure you want to deactivate this subject?"
              : "Are you sure you want to activate this subject?"
          }
          confirmText={
            selectedStatus === SUBJECT_STATUS.INACTIVE
              ? "Deactivate"
              : "Activate"
          }
          onConfirm={handleConfirmStatus}
          isLoading={isStatusUpdating}
        />
      )}
    </div>
  );
}
