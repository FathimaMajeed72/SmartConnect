import api from "@/core/api/axios";
import { API_ROUTES } from "@/core/constants/api-routes";

import type {
  CreateStudentRequest,
  CreateStudentResponse,
  GetStudentsParams,
  PaginatedStudents,
  GetStudentResponse,
  UpdateStudentStatusRequest,
  UpdateStudentStatusResponse,
} from "../types/student.type";

export const getStudents = async (
  params: GetStudentsParams,
): Promise<PaginatedStudents> => {
  const response = await api.get(
    API_ROUTES.ADMIN.STUDENTS,
    {
      params,
    },
  );

  return response.data.data;
};

export const createStudent = async (
  data: CreateStudentRequest,
): Promise<CreateStudentResponse> => {
  const response = await api.post(
    API_ROUTES.ADMIN.STUDENTS,
    data,
  );

  return response.data.data;
};

export const getStudentById = async (
  id: string,
): Promise<GetStudentResponse> => {
  const response = await api.get(
    `${API_ROUTES.ADMIN.STUDENTS}/${id}`,
  );

  return response.data.data;
};

export const updateStudentStatus = async (
  id: string,
  data: UpdateStudentStatusRequest,
): Promise<UpdateStudentStatusResponse> => {
  const response = await api.patch(
    `${API_ROUTES.ADMIN.STUDENTS}/${id}/status`,
    data,
  );

  return response.data.data;
};