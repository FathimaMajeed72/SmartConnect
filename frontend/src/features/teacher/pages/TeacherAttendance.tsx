import { useState } from "react";
import { useQueryClient } from "@tanstack/react-query";

import { ClipboardCheck } from "lucide-react";

import { Button } from "@/shared/ui/button";
import { useMyBatch } from "../attendance/hooks/use-my-batch";
import { useBatchAttendance } from "../attendance/hooks/use-batch-attendance";

import { ATTENDANCE_STATUS } from "../attendance/types/attendance-status";
import type { AttendanceStatus } from "../attendance/types/attendance-status";

import { useMarkAttendance } from "../attendance/hooks/use-mark-attendance";
import type { MarkAttendanceRequest } from "../attendance/types/attendance.types";
import { toast } from "sonner";
import AttendanceFilterCard from "../attendance/components/AttendanceFilterCard";
import AttendanceSummaryCards from "../attendance/components/AttendanceSummaryCards";
import type { AttendanceSummary } from "../attendance/components/AttendanceSummaryCards";
import AttendanceStudentTable from "../attendance/components/AttendanceStudentTable";
import AttendanceConfirmationDialog from "../attendance/components/AttendanceConfirmationDialog";
import { useUpdateAttendance } from "../attendance/hooks/use-update-attendance";
import { getErrorMessage } from "@/core/utils/getErrorMessage";
import StudentAttendanceHistoryDialog from "../attendance/components/StudentAttendanceHistoryDialog";

const getTodayDate = () => {
  return new Intl.DateTimeFormat("en-CA", {
    timeZone: "Asia/Kolkata",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).format(new Date());
};

const TeacherAttendance = () => {
  const [selectedDate, setSelectedDate] = useState(getTodayDate());

  const [isConfirmOpen, setIsConfirmOpen] = useState(false);

  const [isEditing, setIsEditing] = useState(false);

  const [attendanceChanges, setAttendanceChanges] = useState<{
    key: string;
    values: Record<string, AttendanceStatus>;
  }>({
    key: "",
    values: {},
  });

  const [remarksChanges, setRemarksChanges] = useState<{
    key: string;
    values: Record<string, string>;
  }>({
    key: "",
    values: {},
  });

  const [selectedStudentId, setSelectedStudentId] = useState<string | null>(
    null,
  );

  const {
    data: myBatch,
    isLoading: isBatchLoading,
    isError: isBatchError,
    error: batchError,
  } = useMyBatch();

  const {
    data: attendanceData,
    isLoading: isAttendanceLoading,
    isError: isAttendanceError,
    error: attendanceError,
  } = useBatchAttendance(myBatch?.batchId ?? "", selectedDate);

  const markAttendanceMutation = useMarkAttendance();

  const updateAttendanceMutation = useUpdateAttendance();

  const queryClient = useQueryClient();

  const attendanceKey = `${myBatch?.batchId}-${selectedDate}`;

  const currentAttendanceChanges =
    attendanceChanges.key === attendanceKey ? attendanceChanges.values : {};

  const getStudentStatus = (
    studentId: string,
    existingStatus: AttendanceStatus | null,
  ) => {
    return currentAttendanceChanges[studentId] ?? existingStatus ?? "";
  };

  const getStudentRemarks = (studentId: string, existingRemarks?: string) => {
    if (
      remarksChanges.key === attendanceKey &&
      remarksChanges.values[studentId] !== undefined
    ) {
      return remarksChanges.values[studentId];
    }

    return existingRemarks ?? "";
  };

  const attendanceSummary: AttendanceSummary = {
    total: attendanceData?.students.length ?? 0,

    present:
      attendanceData?.students.filter(
        (student) =>
          getStudentStatus(student.studentId, student.status) ===
          ATTENDANCE_STATUS.PRESENT,
      ).length ?? 0,

    absent:
      attendanceData?.students.filter(
        (student) =>
          getStudentStatus(student.studentId, student.status) ===
          ATTENDANCE_STATUS.ABSENT,
      ).length ?? 0,

    late:
      attendanceData?.students.filter(
        (student) =>
          getStudentStatus(student.studentId, student.status) ===
          ATTENDANCE_STATUS.LATE,
      ).length ?? 0,

    excused:
      attendanceData?.students.filter(
        (student) =>
          getStudentStatus(student.studentId, student.status) ===
          ATTENDANCE_STATUS.EXCUSED,
      ).length ?? 0,
  };

  const isAttendanceComplete =
    attendanceData?.students.every((student) =>
      getStudentStatus(student.studentId, student.status),
    ) ?? false;

  const handleSubmitAttendance = () => {
    if (markAttendanceMutation.isPending) return;

    if (!myBatch || !attendanceData) return;

    const missingStudents = attendanceData.students.filter(
      (student) => !getStudentStatus(student.studentId, student.status),
    );

    if (missingStudents.length > 0) {
      toast.error(
        `Please mark attendance for all students. ${missingStudents.length} remaining.`,
      );
      return;
    }

    const requestData: MarkAttendanceRequest = {
      batchId: myBatch.batchId,
      date: selectedDate,
      attendance: attendanceData.students.map((student) => ({
        studentId: student.studentId,
        status: getStudentStatus(
          student.studentId,
          student.status,
        ) as AttendanceStatus,
        remarks:
          getStudentRemarks(student.studentId, student.remarks) || undefined,
      })),
    };

    markAttendanceMutation.mutate(requestData, {
      onSuccess: () => {
        toast.success("Attendance submitted successfully.");
        setAttendanceChanges({ key: "", values: {} });
        setRemarksChanges({ key: "", values: {} });

        setIsConfirmOpen(false);
      },
      onError: (error) => {
        toast.error(getErrorMessage(error));
      },
    });
  };

  const handleStatusChange = (studentId: string, status: AttendanceStatus) => {
    setAttendanceChanges((previous) => ({
      key: attendanceKey,
      values: {
        ...(previous.key === attendanceKey ? previous.values : {}),
        [studentId]: status,
      },
    }));
  };

  const handleRemarksChange = (studentId: string, remarks: string) => {
    setRemarksChanges((previous) => ({
      key: attendanceKey,
      values: {
        ...(previous.key === attendanceKey ? previous.values : {}),
        [studentId]: remarks,
      },
    }));
  };

  const handleEditAttendance = () => {
    setAttendanceChanges({
      key: attendanceKey,
      values: {},
    });

    setRemarksChanges({
      key: attendanceKey,
      values: {},
    });

    setIsEditing(true);
  };

  const handleCancelEdit = () => {
    setAttendanceChanges({
      key: attendanceKey,
      values: {},
    });

    setRemarksChanges({
      key: attendanceKey,
      values: {},
    });

    setIsEditing(false);
  };

  const handleSaveChanges = async () => {
    if (!myBatch || !attendanceData || updateAttendanceMutation.isPending) {
      return;
    }

    const modifiedStudents = attendanceData.students.filter((student) => {
      const currentStatus = getStudentStatus(student.studentId, student.status);

      const currentRemarks = getStudentRemarks(
        student.studentId,
        student.remarks,
      );

      const originalRemarks = student.remarks ?? "";

      return (
        currentStatus !== student.status || currentRemarks !== originalRemarks
      );
    });

    if (modifiedStudents.length === 0) {
      toast.info("No changes to save.");
      setIsEditing(false);
      return;
    }

    try {
      const results = await Promise.allSettled(
        modifiedStudents.map((student) =>
          updateAttendanceMutation.mutateAsync({
            batchId: myBatch.batchId,
            studentId: student.studentId,
            date: selectedDate,
            status: getStudentStatus(
              student.studentId,
              student.status,
            ) as AttendanceStatus,
            remarks: getStudentRemarks(student.studentId, student.remarks),
          }),
        ),
      );

      const failedUpdates = results.filter(
        (result) => result.status === "rejected",
      );

      if (failedUpdates.length > 0) {
        toast.error(
          `${failedUpdates.length} student attendance update(s) failed. Please retry.`,
        );
        return;
      }

      await queryClient.invalidateQueries({
        queryKey: ["attendance", myBatch.batchId, selectedDate],
      });

      toast.success("Attendance updated successfully.");

      setAttendanceChanges({ key: "", values: {} });
      setRemarksChanges({
        key: "",
        values: {},
      });
      setIsEditing(false);
    } catch {
      toast.error("Failed to update attendance. Please try again.");
    }
  };

  const handleDateChange = (date: string) => {
    setSelectedDate(date);
    setIsEditing(false);
    setIsConfirmOpen(false);

    setAttendanceChanges({ key: "", values: {} });
    setRemarksChanges({ key: "", values: {} });
  };

  if (isBatchLoading) {
    return <div>Loading your assigned batch...</div>;
  }

  if (isBatchError) {
    return (
      <div className="text-destructive">
        {batchError?.message || "Failed to retrieve your assigned batch."}
      </div>
    );
  }

  if (!myBatch) {
    return <div>No batch assigned to you.</div>;
  }

  if (isAttendanceLoading) {
    return <div>Loading student attendance...</div>;
  }

  if (isAttendanceError) {
    return <div className="text-destructive">{attendanceError.message}</div>;
  }

  if (!attendanceData) {
    return <div>No attendance data available.</div>;
  }

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex items-center gap-3">
        <div className="rounded-lg bg-primary/10 p-3 text-primary">
          <ClipboardCheck className="h-6 w-6" />
        </div>

        <div>
          <h1 className="text-2xl font-semibold">Attendance Management</h1>

          <p className="text-sm text-muted-foreground">
            Manage and track your students' attendance.
          </p>
        </div>
      </div>

      {/* Attendance Filters */}
      <AttendanceFilterCard
        className={myBatch.className}
        batchName={myBatch.batchName}
        selectedDate={selectedDate}
        maxDate={getTodayDate()}
        onDateChange={handleDateChange}
      />

      {/* Attendance Summary */}
      <AttendanceSummaryCards summary={attendanceSummary} />

      {/* Student Attendance Table */}
      <AttendanceStudentTable
        students={attendanceData.students}
        getStudentStatus={getStudentStatus}
        onStatusChange={handleStatusChange}
        getStudentRemarks={getStudentRemarks}
        onRemarksChange={handleRemarksChange}
        attendanceMarked={attendanceData.attendanceMarked}
        isEditing={isEditing}
        onViewHistory={setSelectedStudentId}
      />

      <div className="flex justify-end gap-3">
        {attendanceData.attendanceMarked ? (
          isEditing ? (
            <>
              <Button
                variant="outline"
                onClick={handleCancelEdit}
                disabled={updateAttendanceMutation.isPending}
              >
                Cancel
              </Button>

              <Button
                onClick={handleSaveChanges}
                disabled={updateAttendanceMutation.isPending}
              >
                {updateAttendanceMutation.isPending
                  ? "Saving..."
                  : "Save Changes"}
              </Button>
            </>
          ) : (
            <Button onClick={handleEditAttendance}>Edit Attendance</Button>
          )
        ) : (
          <Button
            onClick={() => setIsConfirmOpen(true)}
            disabled={
              !isAttendanceComplete ||
              attendanceData.students.length === 0 ||
              markAttendanceMutation.isPending
            }
          >
            {markAttendanceMutation.isPending
              ? "Submitting..."
              : "Submit Attendance"}
          </Button>
        )}
      </div>

      {selectedStudentId && (
        <StudentAttendanceHistoryDialog
          open={Boolean(selectedStudentId)}
          onOpenChange={(open) => {
            if (!open) {
              setSelectedStudentId(null);
            }
          }}
          studentId={selectedStudentId}
          studentName={(() => {
            const student = attendanceData.students.find(
              (item) => item.studentId === selectedStudentId,
            );

            return student
              ? `${student.firstName} ${student.lastName}`
              : "Student";
          })()}
        />
      )}

      <AttendanceConfirmationDialog
        open={isConfirmOpen}
        onOpenChange={setIsConfirmOpen}
        summary={attendanceSummary}
        selectedDate={selectedDate}
        isSubmitting={markAttendanceMutation.isPending}
        onConfirm={handleSubmitAttendance}
      />
    </div>
  );
};

export default TeacherAttendance;
