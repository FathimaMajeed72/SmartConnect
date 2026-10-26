import { useState } from "react";
import { MoreHorizontal } from "lucide-react";

import { Button } from "@/shared/ui/button";
import { Input } from "@/shared/ui/input";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/shared/ui/dropdown-menu";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/shared/ui/select";

import DataTable, { type DataTableColumn } from "@/shared/components/DataTable";

import AddStudentDialog from "../student-management/components/AddStudentDialog";
import { useStudents } from "../student-management/hooks/useStudents";

import type { StudentListItem } from "../student-management/types/student.type";
import type { StudentStatus } from "../student-management/types/student-status";
import StudentStatusBadge from "../student-management/components/StudentStatusBadge";

import { toast } from "sonner";
import { getErrorMessage } from "@/core/utils/getErrorMessage";

import { useUpdateStudentStatus } from "../student-management/hooks/useUpdateStudentStatus";
import UpdateStudentStatusDialog from "../student-management/components/UpdateStudentStatusDialog";
import ViewStudentDialog from "../student-management/components/ViewStudentDialog";

export default function StudentManagement() {
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState<StudentStatus | "ALL">(
    "ALL",
  );
  const [isStatusDialogOpen, setIsStatusDialogOpen] = useState(false);

  const [selectedStudentForStatus, setSelectedStudentForStatus] =
    useState<StudentListItem | null>(null);

  const [selectedStatus, setSelectedStatus] = useState<StudentStatus | null>(
    null,
  );

  const [isDetailsOpen, setIsDetailsOpen] = useState(false);
  const [selectedStudentId, setSelectedStudentId] = useState("");

  const updateStatusMutation = useUpdateStudentStatus();

  const limit = 10;

  const { data, isPending, isFetching, isError, error } = useStudents({
    page,
    limit,
    search,
    status: statusFilter === "ALL" ? undefined : statusFilter,
  });

  const students = data?.students ?? [];
  const total = data?.total ?? 0;
  const totalPages = Math.max(data?.totalPages ?? 1, 1);

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(event.target.value);
    setPage(1);
  };

  const handleStatusFilterChange = (value: string) => {
    setStatusFilter(value as StudentStatus | "ALL");
    setPage(1);
  };

  const handleStatusAction = (
    student: StudentListItem,
    status: StudentStatus,
  ) => {
    setSelectedStudentForStatus(student);
    setSelectedStatus(status);
    setIsStatusDialogOpen(true);
  };

  const handleConfirmStatus = async () => {
    if (!selectedStudentForStatus || !selectedStatus) {
      return;
    }

    try {
      await updateStatusMutation.mutateAsync({
        id: selectedStudentForStatus.id,
        data: {
          status: selectedStatus,
        },
      });

      setIsStatusDialogOpen(false);
      setSelectedStudentForStatus(null);
      setSelectedStatus(null);
    } catch (error) {
      console.error("Failed to update student status:", error);
      toast.error(getErrorMessage(error));
    }
  };

  const handleViewStudent = (studentId: string) => {
    setSelectedStudentId(studentId);
    setIsDetailsOpen(true);
  };

  const studentColumns: DataTableColumn<StudentListItem>[] = [
    {
      header: "Admission No.",
      cell: (student) => (
        <span className="font-medium">{student.admissionNumber}</span>
      ),
    },
    {
      header: "Student Name",
      cell: (student) => (
        <span className="font-medium">
          {student.firstName} {student.lastName}
        </span>
      ),
    },
    {
      header: "Gender",
      cell: (student) => student.gender,
    },
    {
      header: "Date of Birth",
      cell: (student) => student.dateOfBirth.slice(0, 10),
    },
    {
      header: "Status",
      cell: (student) => <StudentStatusBadge status={student.status} />,
    },
    {
      header: "Actions",
      className: "text-right",
      cell: (student) => (
        <div className="flex justify-end">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon">
                <MoreHorizontal />
                <span className="sr-only">Open actions</span>
              </Button>
            </DropdownMenuTrigger>

            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={() => handleViewStudent(student.id)}>
                View
              </DropdownMenuItem>

              {student.status === "ACTIVE" && (
                <DropdownMenuItem
                  onClick={() => handleStatusAction(student, "INACTIVE")}
                >
                  Deactivate
                </DropdownMenuItem>
              )}

              {student.status === "INACTIVE" && (
                <DropdownMenuItem
                  onClick={() => handleStatusAction(student, "ACTIVE")}
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
          Student Management
        </h2>

        <p className="text-muted-foreground">
          Manage students and their information.
        </p>
      </div>

      {/* Add Student */}
      <div className="flex items-center justify-end">
        <AddStudentDialog />
      </div>

      {/* Search and Filter */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <Input
          placeholder="Search students..."
          value={search}
          onChange={handleSearchChange}
          className="sm:max-w-sm"
        />

        <Select value={statusFilter} onValueChange={handleStatusFilterChange}>
          <SelectTrigger className="w-full sm:w-40">
            <SelectValue placeholder="Filter status" />
          </SelectTrigger>

          <SelectContent>
            <SelectItem value="ALL">All Status</SelectItem>

            <SelectItem value="ACTIVE">Active</SelectItem>

            <SelectItem value="INACTIVE">Inactive</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Error */}
      {isError && (
        <p className="text-sm text-destructive">
          {error.message || "Failed to load students."}
        </p>
      )}

      {/* Students Table */}
      <DataTable
        columns={studentColumns}
        data={students}
        isLoading={isPending}
        loadingMessage="Loading students..."
        emptyMessage="No students found."
        getRowKey={(student) => student.id}
      />

      {/* Pagination */}
      <div className="flex items-center justify-between">
        <p className="text-sm text-muted-foreground">Total: {total}</p>

        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            disabled={page === 1 || isFetching}
            onClick={() => setPage(page - 1)}
          >
            Previous
          </Button>

          <span className="text-sm">
            Page {page} of {totalPages}
          </span>

          <Button
            variant="outline"
            disabled={page >= totalPages || isFetching}
            onClick={() => setPage(page + 1)}
          >
            Next
          </Button>
        </div>
      </div>

      {selectedStudentForStatus && selectedStatus && (
        <UpdateStudentStatusDialog
          open={isStatusDialogOpen}
          onOpenChange={(open) => {
            setIsStatusDialogOpen(open);

            if (!open) {
              setSelectedStudentForStatus(null);
              setSelectedStatus(null);
            }
          }}
          studentName={`${selectedStudentForStatus.firstName} ${selectedStudentForStatus.lastName}`}
          status={selectedStatus}
          onConfirm={handleConfirmStatus}
        />
      )}

      <ViewStudentDialog
        open={isDetailsOpen}
        onOpenChange={(open) => {
          setIsDetailsOpen(open);

          if (!open) {
            setSelectedStudentId("");
          }
        }}
        studentId={selectedStudentId}
      />

    </div>
  );
}
