import api from "@/core/api/axios";
import { API_ROUTES } from "@/core/constants/api-routes";

import type {
  CreateSubjectRequest,
  CreateSubjectResponse,
  GetSubjectsParams,
  PaginatedSubjects,
  GetSubjectResponse,
  UpdateSubjectRequest,
  UpdateSubjectStatusRequest,
} from "../types/subject.types";

export const getSubjects = async (
  params: GetSubjectsParams,
): Promise<PaginatedSubjects> => {
  const response = await api.get(
    API_ROUTES.ADMIN.SUBJECTS,
    {
      params,
    },
  );

  return response.data.data;
};

export const createSubject = async (
  data: CreateSubjectRequest,
): Promise<CreateSubjectResponse> => {
  const response = await api.post(
    API_ROUTES.ADMIN.SUBJECTS,
    data,
  );

  return response.data.data;
};

export const getSubjectById = async (
  id: string,
): Promise<GetSubjectResponse> => {
  const response = await api.get(
    `${API_ROUTES.ADMIN.SUBJECTS}/${id}`,
  );

  return response.data.data;
};

export const updateSubject = async (
  id: string,
  data: UpdateSubjectRequest,
): Promise<void> => {
  await api.patch(
    `${API_ROUTES.ADMIN.SUBJECTS}/${id}`,
    data,
  );
};

export const updateSubjectStatus = async (
  id: string,
  data: UpdateSubjectStatusRequest,
): Promise<void> => {
  await api.patch(
    `${API_ROUTES.ADMIN.SUBJECTS}/${id}/status`,
    data,
  );
};