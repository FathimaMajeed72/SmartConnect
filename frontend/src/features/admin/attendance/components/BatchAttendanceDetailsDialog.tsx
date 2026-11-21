import { Badge } from "@/shared/ui/badge";

import DetailsDialog from "@/shared/components/DetailsDialog";
import DataTable, { type DataTableColumn } from "@/shared/components/DataTable";

import type { AttendanceStatus } from "@/features/teacher/attendance/types/attendance-status";

export interface BatchStudentAttendance {
  studentId: string;
  admissionNumber: string;
  studentName: string;
  status: AttendanceStatus | null;
  remarks?: string;
}

interface BatchAttendanceSummary {
  totalStudents: number;
  present: number;
  absent: number;
  late: number;
  excused: number;
}

interface BatchAttendanceDetailsDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  batchName: string;
  date: string;
  students: BatchStudentAttendance[];
  attendanceSummary: BatchAttendanceSummary;
  isLoading?: boolean;
}

const getStatusVariant = (status: AttendanceStatus | null) => {
  switch (status) {
    case "PRESENT":
      return "default";
    case "ABSENT":
      return "destructive";
    case "LATE":
      return "secondary";
    case "EXCUSED":
      return "outline";
    default:
      return "outline";
  }
};

const BatchAttendanceDetailsDialog = ({
  open,
  onOpenChange,
  batchName,
  date,
  students,
  attendanceSummary,
  isLoading = false,
}: BatchAttendanceDetailsDialogProps) => {
  const columns: DataTableColumn<BatchStudentAttendance>[] = [
    {
      header: "Admission No.",
      cell: (student) => student.admissionNumber,
    },
    {
      header: "Student Name",
      cell: (student) => (
        <span className="font-medium">{student.studentName}</span>
      ),
    },
    {
      header: "Status",
      cell: (student) => (
        <Badge variant={getStatusVariant(student.status)}>
          {student.status ?? "Not Marked"}
        </Badge>
      ),
    },
    {
      header: "Remarks",
      cell: (student) => student.remarks || "—",
    },
  ];

  return (
    <DetailsDialog
      open={open}
      onOpenChange={onOpenChange}
      title={`${batchName} - Attendance`}
      description={`Attendance records for ${date}.`}
      className="w-[95vw]! max-w-6xl!"
    >
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5">
        {[
          {
            label: "Total Students",
            value: attendanceSummary.totalStudents,
            color: "text-foreground",
          },
          {
            label: "Present",
            value: attendanceSummary.present,
            color: "text-green-600",
          },
          {
            label: "Absent",
            value: attendanceSummary.absent,
            color: "text-red-600",
          },
          {
            label: "Late",
            value: attendanceSummary.late,
            color: "text-yellow-600",
          },
          {
            label: "Excused",
            value: attendanceSummary.excused,
            color: "text-foreground",
          },
        ].map((item) => (
          <div
            key={item.label}
            className="flex min-h-25 flex-col justify-between rounded-lg border p-2"
          >
            <p className="min-h-10 text-sm text-muted-foreground">
              {item.label}
            </p>

            <p className={`text-2xl font-semibold ${item.color}`}>
              {item.value}
            </p>
          </div>
        ))}
      </div>

      <div className="w-full overflow-x-auto">
        <DataTable
          columns={columns}
          data={students}
          isLoading={isLoading}
          loadingMessage="Loading student attendance..."
          emptyMessage="No students found in this batch."
          getRowKey={(student) => student.studentId}
        />
      </div>
    </DetailsDialog>
  );
};

export default BatchAttendanceDetailsDialog;
