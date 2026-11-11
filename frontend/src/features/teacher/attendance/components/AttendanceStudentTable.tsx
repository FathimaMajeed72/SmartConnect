import { Card, CardContent } from "@/shared/ui/card";

import AttendanceStatusRadioGroup from "./AttendanceStatusRadioGroup";

import type { AttendanceStudent } from "../types/attendance.types";
import type { AttendanceStatus } from "../types/attendance-status";

interface AttendanceStudentTableProps {
  students: AttendanceStudent[];
  getStudentStatus: (
    studentId: string,
    existingStatus: AttendanceStatus | null,
  ) => AttendanceStatus | "";
  onStatusChange: (
    studentId: string,
    status: AttendanceStatus,
  ) => void;
  attendanceMarked: boolean;
}

const AttendanceStudentTable = ({
  students,
  getStudentStatus,
  onStatusChange,
  attendanceMarked,
}: AttendanceStudentTableProps) => {
  return (
    <Card>
      <CardContent className="space-y-5 p-5">
        {/* Table Header */}
        <div>
          <h2 className="text-lg font-semibold">Student Attendance</h2>

          <p className="text-sm text-muted-foreground">
            {students.length} students in this batch
          </p>
        </div>

        {/* Student List */}
        {students.length === 0 ? (
          <div className="py-10 text-center text-muted-foreground">
            No active students found in this batch.
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b bg-muted/50 text-left">
                  <th className="px-4 py-3 font-medium">Admission No.</th>

                  <th className="px-4 py-3 font-medium">Student Name</th>

                  <th className="px-4 py-3 font-medium">Mark Attendance</th>
                </tr>
              </thead>

              <tbody>
                {students.map((student) => (
                  <tr
                    key={student.studentId}
                    className="border-b last:border-0 hover:bg-muted/30"
                  >
                    <td className="px-4 py-3">
                      {student.admissionNumber}
                    </td>

                    <td className="px-4 py-3 font-medium">
                      {student.firstName} {student.lastName}
                    </td>

                    <td className="px-4 py-3">
                      <AttendanceStatusRadioGroup
                        studentId={student.studentId}
                        value={getStudentStatus(
                          student.studentId,
                          student.status,
                        )}
                        onValueChange={(value) =>
                          onStatusChange(student.studentId, value)
                        }
                        disabled={attendanceMarked}
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default AttendanceStudentTable;