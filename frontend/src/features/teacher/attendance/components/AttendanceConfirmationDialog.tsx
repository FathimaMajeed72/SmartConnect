import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/shared/ui/alert-dialog";

import { Button } from "@/shared/ui/button";

import type { AttendanceSummary } from "./AttendanceSummaryCards";

interface AttendanceConfirmationDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  summary: AttendanceSummary;
  selectedDate: string;
  isSubmitting: boolean;
  onConfirm: () => void;
}

const AttendanceConfirmationDialog = ({
  open,
  onOpenChange,
  summary,
  selectedDate,
  isSubmitting,
  onConfirm,
}: AttendanceConfirmationDialogProps) => {
  return (
    <AlertDialog open={open} onOpenChange={onOpenChange}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>
            Confirm Attendance Submission
          </AlertDialogTitle>

          <AlertDialogDescription>
            Are you sure you want to submit attendance for{" "}
            {summary.total} students on {selectedDate}?
            Once submitted, attendance will be saved.
          </AlertDialogDescription>
        </AlertDialogHeader>

        {/* Attendance Summary */}
        <div className="grid grid-cols-2 gap-4 rounded-lg bg-muted p-4 sm:grid-cols-4">
          <div>
            <p className="text-xs text-muted-foreground">Present</p>
            <p className="text-xl font-semibold text-green-600">
              {summary.present}
            </p>
          </div>

          <div>
            <p className="text-xs text-muted-foreground">Absent</p>
            <p className="text-xl font-semibold text-red-600">
              {summary.absent}
            </p>
          </div>

          <div>
            <p className="text-xs text-muted-foreground">Late</p>
            <p className="text-xl font-semibold text-amber-600">
              {summary.late}
            </p>
          </div>

          <div>
            <p className="text-xs text-muted-foreground">Excused</p>
            <p className="text-xl font-semibold text-blue-600">
              {summary.excused}
            </p>
          </div>
        </div>

        <AlertDialogFooter>
          <AlertDialogCancel disabled={isSubmitting}>
            Cancel
          </AlertDialogCancel>

          <Button
            onClick={onConfirm}
            disabled={isSubmitting}
          >
            {isSubmitting ? "Submitting..." : "Confirm Submission"}
          </Button>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default AttendanceConfirmationDialog;