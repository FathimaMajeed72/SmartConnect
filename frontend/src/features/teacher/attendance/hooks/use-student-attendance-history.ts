import { useQuery } from "@tanstack/react-query";
import { getStudentAttendanceHistory } from "../services/attendance.service";
import type { GetStudentAttendanceHistoryRequest } from "../types/attendance.types";

export const useStudentAttendanceHistory = (
  params: GetStudentAttendanceHistoryRequest,
) => {
  return useQuery({
    queryKey: [
      "attendance",
      "student-history",
      params.studentId,
      params.startDate ?? null,
      params.endDate ?? null,
      params.page,
      params.limit,
    ],
    queryFn: () => getStudentAttendanceHistory(params),
    enabled: Boolean(params.studentId),
  });
};