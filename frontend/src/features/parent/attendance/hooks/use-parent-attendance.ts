import { useQuery, keepPreviousData  } from "@tanstack/react-query";

import { getParentAttendance } from "../services/parent-attendance.service";

import type { GetParentAttendanceParams } from "../types/parent-attendance.types";

export const useParentAttendance = (params: GetParentAttendanceParams) => {
  return useQuery({
    queryKey: ["parent-attendance", params],
    queryFn: () => getParentAttendance(params),
    enabled: !!params.studentId,
    placeholderData: keepPreviousData,
  });
};
