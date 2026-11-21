import { Card, CardContent } from "@/shared/ui/card";

import DataTable from "@/shared/components/DataTable";
import type { DataTableColumn } from "@/shared/components/DataTable";

import AttendanceStatusRadioGroup from "./AttendanceStatusRadioGroup";

import type { AttendanceStudent } from "../types/attendance.types";
import type { AttendanceStatus } from "../types/attendance-status";
import { Input } from "@/shared/ui/input";
import { Button } from "@/shared/ui/button";
import { Eye } from "lucide-react";

interface AttendanceStudentTableProps {
  students: AttendanceStudent[];
  getStudentStatus: (
    studentId: string,
    existingStatus: AttendanceStatus | null,
  ) => AttendanceStatus | "";
  onStatusChange: (studentId: string, status: AttendanceStatus) => void;
  getStudentRemarks: (studentId: string, existingRemarks?: string) => string;
  onRemarksChange: (studentId: string, remarks: string) => void;
  attendanceMarked: boolean;
  isEditing: boolean;
  onViewHistory: (studentId: string) => void;
}

const AttendanceStudentTable = ({
  students,
  getStudentStatus,
  onStatusChange,
  getStudentRemarks,
  onRemarksChange,
  attendanceMarked,
  isEditing,
  onViewHistory,
}: AttendanceStudentTableProps) => {
  const isReadOnly = attendanceMarked && !isEditing;

  const columns: DataTableColumn<AttendanceStudent>[] = [
    {
      header: "Admission No.",
      cell: (student) => student.admissionNumber,
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
      header: "Mark Attendance",
      cell: (student) => (
        <AttendanceStatusRadioGroup
          studentId={student.studentId}
          value={getStudentStatus(student.studentId, student.status)}
          onValueChange={(value) => onStatusChange(student.studentId, value)}
          disabled={isReadOnly}
        />
      ),
    },
    {
      header: "Remarks",
      cell: (student) => (
        <Input
          placeholder="Optional remarks"
          value={getStudentRemarks(student.studentId, student.remarks)}
          onChange={(event) =>
            onRemarksChange(student.studentId, event.target.value)
          }
          disabled={isReadOnly}
          maxLength={250}
          className="min-w-45"
        />
      ),
    },
    {
      header: "History",
      cell: (student) => (
        <Button
          variant="outline"
          size="sm"
          onClick={() => onViewHistory(student.studentId)}
        >
          <Eye className="mr-2 h-4 w-4" />
          View History
        </Button>
      ),
    },
  ];

  return (
    <Card>
      <CardContent className="space-y-5 p-5">
        <div>
          <h2 className="text-lg font-semibold">Student Attendance</h2>

          <p className="text-sm text-muted-foreground">
            {students.length} students in this batch
          </p>
        </div>

        <DataTable
          columns={columns}
          data={students}
          getRowKey={(student) => student.studentId}
          emptyMessage="No active students found in this batch."
          headerClassName="bg-muted/50"
        />
      </CardContent>
    </Card>
  );
};

export default AttendanceStudentTable;
