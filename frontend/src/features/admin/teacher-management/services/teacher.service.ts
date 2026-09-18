import api from "@/core/api/axios";
import { API_ROUTES } from "@/core/constants/api-routes";

import type {
  CreateTeacherRequest,
  CreateTeacherResponse,
  GetTeachersParams,
  PaginatedTeachers,
  TeacherDetails,
  UpdateTeacherRequest,
  UpdateTeacherResponse,
  UpdateTeacherStatusRequest,
  UpdateTeacherStatusResponse,
} from "../types/teacher.types";

export const getTeachers = async (
  params: GetTeachersParams,
): Promise<PaginatedTeachers> => {
  const response = await api.get(
    API_ROUTES.ADMIN.TEACHERS,
    {
      params,
    },
  );

  return response.data.data;
};

export const createTeacher = async (
  data: CreateTeacherRequest,
): Promise<CreateTeacherResponse> => {
  const response = await api.post(
    API_ROUTES.ADMIN.TEACHERS,
    data,
  );

  return response.data.data;
};

export const getTeacherById = async (
  id: string,
): Promise<TeacherDetails> => {
  const response = await api.get(
    `${API_ROUTES.ADMIN.TEACHERS}/${id}`,
  );

  return response.data.data;
};

export const updateTeacher = async (
  id: string,
  data: UpdateTeacherRequest,
): Promise<UpdateTeacherResponse> => {
  const response = await api.patch(
    `${API_ROUTES.ADMIN.TEACHERS}/${id}`,
    data,
  );

  return response.data.data;
};

export const updateTeacherStatus = async (
  id: string,
  data: UpdateTeacherStatusRequest,
): Promise<UpdateTeacherStatusResponse> => {
  const response = await api.patch(
    `${API_ROUTES.ADMIN.TEACHERS}/${id}/status`,
    data,
  );

  return response.data.data;
};

export const resendTeacherInvitation = async (
  id: string,
): Promise<void> => {
  await api.post(
    `${API_ROUTES.ADMIN.TEACHERS}/${id}/resend-invitation`,
  );
};