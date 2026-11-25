import { useState } from "react";

import { useParent } from "../context/use-parent";
import { useParentAttendance } from "../attendance/hooks/use-parent-attendance";

import { Card, CardContent, CardHeader, CardTitle } from "@/shared/ui/card";

import { Button } from "@/shared/ui/button";
import { Badge } from "@/shared/ui/badge";

import DataTable, { type DataTableColumn } from "@/shared/components/DataTable";

import type { ParentAttendanceRecord } from "../attendance/types/parent-attendance.types";

const ParentAttendance = () => {
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [page, setPage] = useState(1);

  const limit = 10;

  const { selectedChild } = useParent();

  const { data, isLoading, isError, isFetching } = useParentAttendance({
    studentId: selectedChild?.id ?? "",
    startDate: startDate || undefined,
    endDate: endDate || undefined,
    page,
    limit,
  });

  if (!selectedChild) {
    return <div>Please select a child to view attendance.</div>;
  }

  if (isError) {
    return <div>Unable to load attendance. Please try again.</div>;
  }

  const summary = data?.summary;

  const columns: DataTableColumn<ParentAttendanceRecord>[] = [
    {
      header: "Date",
      cell: (record) =>
        new Date(record.date).toLocaleDateString("en-IN", {
          day: "2-digit",
          month: "short",
          year: "numeric",
        }),
    },
    {
      header: "Status",
      cell: (record) => {
        const statusStyles: Record<string, string> = {
          PRESENT: "bg-green-100 text-green-700",
          ABSENT: "bg-red-100 text-red-700",
          LATE: "bg-yellow-100 text-yellow-700",
          EXCUSED: "bg-blue-100 text-blue-700",
        };

        return (
          <Badge className={statusStyles[record.status]}>{record.status}</Badge>
        );
      },
    },
    {
      header: "Remarks",
      cell: (record) => record.remarks || "-",
    },
  ];

  return (
    <div className="space-y-6">
      {/* Page Heading */}
      <div>
        <h1 className="text-2xl font-semibold">Attendance</h1>
        <p className="text-sm text-muted-foreground">
          Attendance overview for {selectedChild.firstName}{" "}
          {selectedChild.lastName}
        </p>
      </div>

      {/* Attendance Summary */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
        <Card>
          <CardHeader>
            <CardTitle className="text-sm font-medium">
              Attendance Percentage
            </CardTitle>
          </CardHeader>

          <CardContent className="space-y-3">
            <div className="flex items-center justify-between">
              <p className="text-2xl font-bold">
                {summary?.attendancePercentage ?? 0}%
              </p>

              <span className="text-xs text-muted-foreground">
                {summary?.attendedDays ?? 0} /{" "}
                {summary?.totalAttendanceDays ?? 0} days
              </span>
            </div>

            <div
              className="h-2 w-full overflow-hidden rounded-full bg-muted"
              role="progressbar"
              aria-label="Attendance percentage"
              aria-valuenow={summary?.attendancePercentage ?? 0}
              aria-valuemin={0}
              aria-valuemax={100}
            >
              <div
                className="h-full rounded-full bg-primary transition-all duration-300"
                style={{
                  width: `${Math.min(
                    Math.max(summary?.attendancePercentage ?? 0, 0),
                    100,
                  )}%`,
                }}
              />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-sm font-medium">Present</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">{summary?.present ?? 0}</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-sm font-medium">Absent</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">{summary?.absent ?? 0}</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-sm font-medium">Late</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">{summary?.late ?? 0}</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-sm font-medium">Excused</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">{summary?.excused ?? 0}</p>
          </CardContent>
        </Card>
      </div>

      {/* Date Range Filters */}
      <div className="flex flex-wrap items-end gap-4">
        <div className="space-y-2">
          <label htmlFor="attendanceMonth" className="text-sm font-medium">
            Select Month
          </label>

          <input
            id="attendanceMonth"
            type="month"
            value={
              startDate &&
              endDate &&
              startDate.slice(0, 7) === endDate.slice(0, 7) &&
              startDate.endsWith("-01") &&
              Number(endDate.slice(8, 10)) ===
                new Date(
                  Number(endDate.slice(0, 4)),
                  Number(endDate.slice(5, 7)),
                  0,
                ).getDate()
                ? startDate.slice(0, 7)
                : ""
            }
            max={new Date().toISOString().slice(0, 7)}
            onChange={(e) => {
              const month = e.target.value;

              if (!month) return;

              const [year, monthNumber] = month.split("-").map(Number);

              const lastDay = new Date(year, monthNumber, 0).getDate();

              setStartDate(`${month}-01`);
              setEndDate(`${month}-${String(lastDay).padStart(2, "0")}`);
              setPage(1);
            }}
            className="h-10 rounded-md border px-3 text-sm"
          />
        </div>

        <div className="space-y-2">
          <label htmlFor="startDate" className="text-sm font-medium">
            From Date
          </label>
          <input
            id="startDate"
            type="date"
            value={startDate}
            max={endDate || undefined}
            onChange={(e) => {
              setStartDate(e.target.value);
              setPage(1);
            }}
            className="h-10 rounded-md border px-3 text-sm"
          />
        </div>

        <div className="space-y-2">
          <label htmlFor="endDate" className="text-sm font-medium">
            To Date
          </label>
          <input
            id="endDate"
            type="date"
            value={endDate}
            min={startDate || undefined}
            onChange={(e) => {
              setEndDate(e.target.value);
              setPage(1);
            }}
            className="h-10 rounded-md border px-3 text-sm"
          />
        </div>

        <Button
          variant="outline"
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

      {/* Attendance History */}
      <Card>
        <CardHeader>
          <CardTitle>Attendance History</CardTitle>
          <p className="text-sm text-muted-foreground">
            Daily attendance records
          </p>
        </CardHeader>

        <CardContent className="space-y-4">
          <DataTable
            columns={columns}
            data={data?.attendance ?? []}
            isLoading={isLoading}
            loadingMessage="Loading attendance records..."
            emptyMessage="No attendance records found."
            getRowKey={(record) => record.id}
          />

          {/* Pagination */}
          <div className="flex flex-col gap-3 border-t pt-4 sm:flex-row sm:items-center sm:justify-between">
            <p className="text-sm text-muted-foreground">
              Showing {data?.attendance.length ?? 0} of{" "}
              {data?.pagination.total ?? 0} records
            </p>

            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="sm"
                disabled={page <= 1 || isFetching}
                onClick={() => setPage((prev) => prev - 1)}
              >
                Previous
              </Button>

              <span className="text-sm">
                Page {page} of {Math.max(data?.pagination.totalPages ?? 0, 1)}
              </span>

              <Button
                variant="outline"
                size="sm"
                disabled={
                  isFetching || page >= (data?.pagination.totalPages ?? 0)
                }
                onClick={() => setPage((prev) => prev + 1)}
              >
                Next
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ParentAttendance;
