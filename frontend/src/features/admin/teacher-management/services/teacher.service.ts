import api from "@/core/api/axios";
import { API_ROUTES } from "@/core/constants/api-routes";

import type {
  CreateTeacherRequest,
  CreateTeacherResponse,
  GetTeachersParams,
  PaginatedTeachers,
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