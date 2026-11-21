import { Eye } from "lucide-react";

import { Button } from "@/shared/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/shared/ui/card";

import DataTable, {
  type DataTableColumn,
} from "@/shared/components/DataTable";

export interface BatchAttendanceSummary {
  batchId: string;
  batchName: string;
  className: string;
  totalStudents: number;
  present: number;
  absent: number;
  late: number;
  excused: number;
  attendancePercentage: number;
}

interface BatchAttendanceTableProps {
  batches: BatchAttendanceSummary[];
  isLoading?: boolean;
  onView: (batchId: string) => void;
}

const BatchAttendanceTable = ({
  batches,
  isLoading = false,
  onView,
}: BatchAttendanceTableProps) => {
  const columns: DataTableColumn<BatchAttendanceSummary>[] = [
    {
      header: "Batch",
      cell: (batch) => (
        <span className="font-medium">{batch.batchName}</span>
      ),
    },
    {
      header: "Class",
      cell: (batch) => batch.className,
    },
    {
      header: "Total Students",
      cell: (batch) => batch.totalStudents,
    },
    {
      header: "Present",
      cell: (batch) => batch.present,
    },
    {
      header: "Absent",
      cell: (batch) => batch.absent,
    },
    {
      header: "Late",
      cell: (batch) => batch.late,
    },
    {
      header: "Excused",
      cell: (batch) => batch.excused,
    },
    {
      header: "Attendance %",
      cell: (batch) => (
        <span className="font-medium">
          {batch.attendancePercentage.toFixed(2)}%
        </span>
      ),
    },
    {
      header: "Action",
      className: "text-right",
      cell: (batch) => (
        <div className="flex justify-end">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => onView(batch.batchId)}
          >
            <Eye className="mr-2 h-4 w-4" />
            View
          </Button>
        </div>
      ),
    },
  ];

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">
          Batch-wise Attendance
        </CardTitle>
      </CardHeader>

      <CardContent>
        <DataTable
          columns={columns}
          data={batches}
          isLoading={isLoading}
          loadingMessage="Loading attendance..."
          emptyMessage="No attendance records found."
          getRowKey={(batch) => batch.batchId}
        />
      </CardContent>
    </Card>
  );
};

export default BatchAttendanceTable;