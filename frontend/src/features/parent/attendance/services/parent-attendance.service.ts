import api from "@/core/api/axios";
import { API_ROUTES } from "@/core/constants/api-routes";

import type {
  GetParentAttendanceParams,
  ParentAttendanceResponse,
} from "../types/parent-attendance.types";

export const getParentAttendance = async ({
  studentId,
  ...params
}: GetParentAttendanceParams): Promise<ParentAttendanceResponse> => {
  const response = await api.get(
    `${API_ROUTES.PARENT.ATTENDANCE}/${studentId}`,
    {
      params,
    },
  );

  return response.data.data;
};