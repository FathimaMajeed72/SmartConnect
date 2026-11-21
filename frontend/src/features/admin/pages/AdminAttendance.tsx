import { useState } from "react";
import AttendanceFilters, {
  type AttendanceFilterOption,
} from "../attendance/components/AttendanceFilters";
import AttendanceOverviewCards from "../attendance/components/AttendanceOverviewCards";
import BatchAttendanceTable from "../attendance/components/BatchAttendanceTable";
import BatchAttendanceDetailsDialog, {
  type BatchStudentAttendance,
} from "../attendance/components/BatchAttendanceDetailsDialog";
import { useAcademicYears } from "../class-management/hooks/use-academic-years";
import { useClasses } from "../class-management/hooks/use-classes";
import { useBatches } from "../batch-management/hooks/useBatches";
import { useSchoolAttendance } from "../attendance/hooks/useSchoolAttendance";
import { useAdminBatchAttendance } from "../attendance/hooks/useAdminBatchAttendance";

const getTodayDate = () => {
  return new Intl.DateTimeFormat("en-CA", {
    timeZone: "Asia/Kolkata",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).format(new Date());
};

export default function AdminAttendance() {
  const [selectedAcademicYear, setSelectedAcademicYear] = useState("all");
  const [selectedClass, setSelectedClass] = useState("all");
  const [selectedBatch, setSelectedBatch] = useState("all");
  const [selectedDate, setSelectedDate] = useState(getTodayDate());
  const [selectedBatchId, setSelectedBatchId] = useState<string | null>(null);

  const { academicYears } = useAcademicYears();

  const academicYearOptions: AttendanceFilterOption[] = academicYears.map(
    (year) => ({
      id: year,
      name: year,
    }),
  );

  const handleAcademicYearChange = (value: string) => {
    setSelectedAcademicYear(value);
    setSelectedClass("all");
    setSelectedBatch("all");
  };

  const handleClassChange = (value: string) => {
    setSelectedClass(value);
    setSelectedBatch("all");
  };

  const { classes: classList } = useClasses(
    selectedAcademicYear === "all" ? "" : selectedAcademicYear,
    handleAcademicYearChange,
  );

  const classOptions: AttendanceFilterOption[] = classList.map((item) => ({
    id: item.id,
    name: item.name,
  }));

  const { data: batchResponse } = useBatches(
    selectedClass === "all" ? "" : selectedClass,
  );

  const batchList = batchResponse?.batches ?? [];

  const batchOptions: AttendanceFilterOption[] = batchList.map((batch) => ({
    id: batch.id,
    name: batch.name,
  }));

  const attendanceParams = {
    date: selectedDate,
    ...(selectedAcademicYear !== "all" && {
      academicYear: selectedAcademicYear,
    }),
    ...(selectedClass !== "all" && {
      classId: selectedClass,
    }),
    ...(selectedBatch !== "all" && {
      batchId: selectedBatch,
    }),
  };

  const {
    data: attendanceData,
    isLoading: isAttendanceLoading,
    isError: isAttendanceError,
  } = useSchoolAttendance(attendanceParams);

  const { data: batchAttendanceDetails, isLoading: isBatchDetailsLoading } =
    useAdminBatchAttendance(selectedBatchId, selectedDate);

  const batchStudents: BatchStudentAttendance[] =
    batchAttendanceDetails?.students.map((student) => ({
      studentId: student.studentId,
      admissionNumber: student.admissionNumber,
      studentName: `${student.firstName} ${student.lastName}`,
      status: student.status,
      remarks: student.remarks,
    })) ?? [];

  const selectedBatchDetails = attendanceData?.batches.find(
    (batch) => batch.batchId === selectedBatchId,
  );

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold tracking-tight">
          Attendance Management
        </h1>

        <p className="text-muted-foreground">
          Monitor and track student attendance across the school.
        </p>
      </div>
      <AttendanceOverviewCards
        totalStudents={attendanceData?.summary.totalStudents ?? 0}
        present={attendanceData?.summary.present ?? 0}
        absent={attendanceData?.summary.absent ?? 0}
        attendancePercentage={attendanceData?.summary.attendancePercentage ?? 0}
      />

      <AttendanceFilters
        academicYears={academicYearOptions}
        classes={classOptions}
        batches={batchOptions}
        selectedAcademicYear={selectedAcademicYear}
        selectedClass={selectedClass}
        selectedBatch={selectedBatch}
        selectedDate={selectedDate}
        onAcademicYearChange={handleAcademicYearChange}
        onClassChange={handleClassChange}
        onBatchChange={setSelectedBatch}
        onDateChange={setSelectedDate}
      />

      {isAttendanceError && (
        <p className="text-sm text-destructive">
          Failed to load attendance data. Please try again.
        </p>
      )}

      <BatchAttendanceTable
        batches={attendanceData?.batches ?? []}
        isLoading={isAttendanceLoading}
        onView={setSelectedBatchId}
      />

      {selectedBatchId && (
        <BatchAttendanceDetailsDialog
          open={Boolean(selectedBatchId)}
          onOpenChange={(open) => {
            if (!open) setSelectedBatchId(null);
          }}
          batchName={selectedBatchDetails?.batchName ?? "Batch Attendance"}
          date={selectedDate}
          students={batchStudents}
          attendanceSummary={{
            totalStudents: batchAttendanceDetails?.totalStudents ?? 0,
            present: batchAttendanceDetails?.present ?? 0,
            absent: batchAttendanceDetails?.absent ?? 0,
            late: batchAttendanceDetails?.late ?? 0,
            excused: batchAttendanceDetails?.excused ?? 0,
          }}
          isLoading={isBatchDetailsLoading}
        />
      )}
    </div>
  );
}
