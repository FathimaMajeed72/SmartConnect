import api from "@/core/api/axios";
import { API_ROUTES } from "@/core/constants/api-routes";

import type {
  CreateClassRequest,
  CreateClassResponse,
  GetClassesParams,
  PaginatedClasses,
  GetClassResponse,
  UpdateClassRequest,
  UpdateClassResponse,
  UpdateClassStatusRequest,
  UpdateClassStatusResponse,
} from "../types/class.types";

export const getClasses = async (
  params: GetClassesParams,
): Promise<PaginatedClasses> => {
  const response = await api.get(
    API_ROUTES.ADMIN.CLASSES,
    {
      params,
    },
  );

  return response.data.data;
};

export const createClass = async (
  data: CreateClassRequest,
): Promise<CreateClassResponse> => {
  const response = await api.post(
    API_ROUTES.ADMIN.CLASSES,
    data,
  );

  return response.data.data;
};

export const getClassById = async (
  id: string,
): Promise<GetClassResponse> => {
  const response = await api.get(
    `${API_ROUTES.ADMIN.CLASSES}/${id}`,
  );

  return response.data.data;
};

export const updateClass = async (
  id: string,
  data: UpdateClassRequest,
): Promise<UpdateClassResponse> => {
  const response = await api.patch(
    `${API_ROUTES.ADMIN.CLASSES}/${id}`,
    data,
  );

  return response.data.data;
};

export const updateClassStatus = async (
  id: string,
  data: UpdateClassStatusRequest,
): Promise<UpdateClassStatusResponse> => {
  const response = await api.patch(
    `${API_ROUTES.ADMIN.CLASSES}/${id}/status`,
    data,
  );

  return response.data.data;
};