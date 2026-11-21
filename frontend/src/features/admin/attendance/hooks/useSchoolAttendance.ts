import { useQuery } from "@tanstack/react-query";
import { getSchoolAttendance } from "../services/attendance.service";
import type { GetSchoolAttendanceParams } from "../types/attendance.types";

export const useSchoolAttendance = (
  params: GetSchoolAttendanceParams,
) => {
  return useQuery({
    queryKey: ["admin-attendance", params],
    queryFn: () => getSchoolAttendance(params),
    enabled: !!params.date,
  });
};