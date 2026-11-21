import api from "@/core/api/axios";
import { API_ROUTES } from "@/core/constants/api-routes";
import type {
    GetAdminBatchAttendanceResponse,
  GetSchoolAttendanceParams,
  GetSchoolAttendanceResponse,
} from "../types/attendance.types";

export const getSchoolAttendance = async (
  params: GetSchoolAttendanceParams,
): Promise<GetSchoolAttendanceResponse> => {
  const response = await api.get(API_ROUTES.ADMIN.ATTENDANCE, {
    params,
  });

  return response.data.data;
};

export const getAdminBatchAttendance = async (
  batchId: string,
  date: string,
): Promise<GetAdminBatchAttendanceResponse> => {
  const response = await api.get(
    `${API_ROUTES.ADMIN.ATTENDANCE}/batches/${batchId}`,
    {
      params: { date },
    },
  );

  return response.data.data;
};