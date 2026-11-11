import api from "@/core/api/axios";
import { API_ROUTES } from "@/core/constants/api-routes";

import type {
  GetBatchAttendanceResponse,
  GetMyBatchResponse,
  MarkAttendanceRequest,
  MarkAttendanceResponse,
  UpdateAttendanceRequest,
  UpdateAttendanceResponse,
} from "../types/attendance.types"


export const getMyBatch = async (): Promise<GetMyBatchResponse> => {
  const response = await api.get(
    `${API_ROUTES.TEACHER.ATTENDANCE}/my-batch`,
  );

  return response.data.data;
};

export const getBatchAttendance = async (
  batchId: string,
  date: string,
): Promise<GetBatchAttendanceResponse> => {
  const response = await api.get(
    `${API_ROUTES.TEACHER.ATTENDANCE}/${batchId}`,
    {
      params: { date },
    },
  );

  return response.data.data;
};

export const markAttendance = async (
  data: MarkAttendanceRequest,
): Promise<MarkAttendanceResponse> => {
  const response = await api.post(
    API_ROUTES.TEACHER.ATTENDANCE,
    data,
  );

  return response.data.data;
};

export const updateAttendance = async (
  batchId: string,
  data: Omit<UpdateAttendanceRequest, "batchId">,
): Promise<UpdateAttendanceResponse> => {
  const response = await api.patch(
    `${API_ROUTES.TEACHER.ATTENDANCE}/${batchId}`,
    data,
  );

  return response.data.data;
};