import { useState } from "react";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/shared/ui/dialog";

import { Card, CardContent } from "@/shared/ui/card";
import { Button } from "@/shared/ui/button";
import { Input } from "@/shared/ui/input";

import { useStudentAttendanceHistory } from "../hooks/use-student-attendance-history";
import { useStudentAttendanceSummary } from "../hooks/use-student-attendance-summary";

interface StudentAttendanceHistoryDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  studentId: string;
  studentName: string;
}

const StudentAttendanceHistoryDialog = ({
  open,
  onOpenChange,
  studentId,
  studentName,
}: StudentAttendanceHistoryDialogProps) => {
  const [page, setPage] = useState(1);
  const limit = 10;
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  const {
    data: summary,
    isLoading: isSummaryLoading,
    isError: isSummaryError,
  } = useStudentAttendanceSummary({
    studentId,
    startDate: startDate || undefined,
    endDate: endDate || undefined,
  });

  const {
    data: history,
    isLoading: isHistoryLoading,
    isError: isHistoryError,
  } = useStudentAttendanceHistory({
    studentId,
    startDate: startDate || undefined,
    endDate: endDate || undefined,
    page,
    limit,
  });

  const getStatusClass = (status: string) => {
    switch (status) {
      case "PRESENT":
        return "bg-green-100 text-green-700";

      case "ABSENT":
        return "bg-red-100 text-red-700";

      case "LATE":
        return "bg-yellow-100 text-yellow-700";

      case "EXCUSED":
        return "bg-blue-100 text-blue-700";

      default:
        return "bg-muted text-muted-foreground";
    }
  };

  return (
    <Dialog
      open={open}
      onOpenChange={(isOpen) => {
        if (isOpen) {
          setPage(1);
        }
        onOpenChange(isOpen);
      }}
    >
      <DialogContent className="max-h-[85vh] overflow-y-auto sm:max-w-3xl">
        <DialogHeader>
          <DialogTitle>Attendance History</DialogTitle>

          <DialogDescription>
            Attendance records for{" "}
            <span className="text-base font-semibold text-primary">
              {studentName}
            </span>
            .
          </DialogDescription>
        </DialogHeader>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div className="space-y-2">
            <label htmlFor="startDate" className="text-sm font-medium">
              From Date
            </label>

            <Input
              id="startDate"
              type="date"
              value={startDate}
              max={endDate || undefined}
              onChange={(event) => {
                setStartDate(event.target.value);
                setPage(1);
              }}
            />
          </div>

          <div className="space-y-2">
            <label htmlFor="endDate" className="text-sm font-medium">
              To Date
            </label>

            <Input
              id="endDate"
              type="date"
              value={endDate}
              min={startDate || undefined}
              onChange={(event) => {
                setEndDate(event.target.value);
                setPage(1);
              }}
            />
          </div>
        </div>

        <div className="flex justify-end">
          <Button
            variant="outline"
            size="sm"
            onClick={() => {
              setStartDate("");
              setEndDate("");
              setPage(1);
            }}
            disabled={!startDate && !endDate}
          >
            Clear Filters
          </Button>
        </div>

        {/* Attendance Summary */}
        {isSummaryLoading ? (
          <p className="text-sm text-muted-foreground">
            Loading attendance summary...
          </p>
        ) : isSummaryError ? (
          <p className="text-sm text-destructive">
            Failed to load attendance summary.
          </p>
        ) : summary ? (
          <div className="space-y-4">
            <Card>
              <CardContent className="p-5">
                <p className="text-sm text-muted-foreground">
                  Attendance Percentage
                </p>

                <p className="text-3xl font-bold text-primary">
                  {summary.attendancePercentage.toFixed(2)}%
                </p>

                <p className="mt-1 text-xs text-muted-foreground">
                  {summary.attendedDays} attended out of{" "}
                  {summary.totalAttendanceDays} attendance days
                </p>
              </CardContent>
            </Card>

            <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
              {[
                {
                  label: "Present",
                  value: summary.present,
                  color: "text-green-600",
                },
                {
                  label: "Absent",
                  value: summary.absent,
                  color: "text-red-600",
                },
                {
                  label: "Late",
                  value: summary.late,
                  color: "text-yellow-600",
                },
                {
                  label: "Excused",
                  value: summary.excused,
                  color: "text-blue-600",
                },
              ].map((item) => (
                <Card key={item.label}>
                  <CardContent className="p-4">
                    <p className="text-sm text-muted-foreground">
                      {item.label}
                    </p>

                    <p className={`text-2xl font-semibold ${item.color}`}>
                      {item.value}
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        ) : null}

        {/* Attendance Records */}
        <div className="space-y-4">
          <h3 className="font-semibold">Attendance Records</h3>

          {isHistoryLoading ? (
            <p className="text-sm text-muted-foreground">
              Loading attendance records...
            </p>
          ) : isHistoryError ? (
            <p className="text-sm text-destructive">
              Failed to load attendance records.
            </p>
          ) : history?.attendance.length ? (
            <>
              <div className="overflow-x-auto rounded-md border">
                <table className="w-full text-sm">
                  <thead className="bg-muted/50">
                    <tr>
                      <th className="p-3 text-left font-medium">Date</th>
                      <th className="p-3 text-left font-medium">Status</th>
                      <th className="p-3 text-left font-medium">Remarks</th>
                    </tr>
                  </thead>

                  <tbody>
                    {history.attendance.map((record) => (
                      <tr key={record.attendanceId} className="border-t">
                        <td className="p-3">
                          {new Date(record.date).toLocaleDateString("en-IN")}
                        </td>

                        <td className="p-3">
                          <span
                            className={`rounded-full px-2 py-1 text-xs font-medium ${getStatusClass(record.status)}`}
                          >
                            {record.status}
                          </span>
                        </td>

                        <td className="p-3">{record.remarks || "-"}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Pagination */}
              <div className="flex items-center justify-between">
                <p className="text-sm text-muted-foreground">
                  Page {history.page} of {history.totalPages}
                </p>

                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    disabled={page <= 1}
                    onClick={() => setPage((previous) => previous - 1)}
                  >
                    Previous
                  </Button>

                  <Button
                    variant="outline"
                    size="sm"
                    disabled={page >= history.totalPages}
                    onClick={() => setPage((previous) => previous + 1)}
                  >
                    Next
                  </Button>
                </div>
              </div>
            </>
          ) : (
            <p className="py-6 text-center text-sm text-muted-foreground">
              No attendance records found.
            </p>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default StudentAttendanceHistoryDialog;
