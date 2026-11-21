import { useQuery } from "@tanstack/react-query";
import { getStudentAttendanceSummary } from "../services/attendance.service";
import type { GetStudentAttendanceSummaryRequest } from "../types/attendance.types";

export const useStudentAttendanceSummary = (
  params: GetStudentAttendanceSummaryRequest,
) => {
  return useQuery({
    queryKey: [
      "attendance",
      "student-summary",
      params.studentId,
      params.startDate ?? null,
      params.endDate ?? null,
    ],
    queryFn: () => getStudentAttendanceSummary(params),
    enabled: Boolean(params.studentId),
  });
};