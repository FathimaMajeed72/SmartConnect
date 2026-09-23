import api from "@/core/api/axios";
import { API_ROUTES } from "@/core/constants/api-routes";

import type {
  CreateParentRequest,
  CreateParentResponse,
  GetParentsParams,
  PaginatedParents,
  ParentDetails,
  UpdateParentRequest,
  UpdateParentResponse,
  UpdateParentStatusRequest,
  UpdateParentStatusResponse,
} from "../types/parent.types";

export const getParents = async (
  params: GetParentsParams,
): Promise<PaginatedParents> => {
  const response = await api.get(API_ROUTES.ADMIN.PARENTS, {
    params,
  });

  return response.data.data;
};

export const createParent = async (
  data: CreateParentRequest,
): Promise<CreateParentResponse> => {
  const response = await api.post(API_ROUTES.ADMIN.PARENTS, data);

  return response.data.data;
};

export const getParentById = async (
  id: string,
): Promise<ParentDetails> => {
  const response = await api.get(
    `${API_ROUTES.ADMIN.PARENTS}/${id}`,
  );

  return response.data.data;
};

export const updateParent = async (
  id: string,
  data: UpdateParentRequest,
): Promise<UpdateParentResponse> => {
  const response = await api.patch(
    `${API_ROUTES.ADMIN.PARENTS}/${id}`,
    data,
  );

  return response.data.data;
};

export const updateParentStatus = async (
  id: string,
  data: UpdateParentStatusRequest,
): Promise<UpdateParentStatusResponse> => {
  const response = await api.patch(
    `${API_ROUTES.ADMIN.PARENTS}/${id}/status`,
    data,
  );

  return response.data.data;
};

export const resendParentInvitation = async (
  id: string,
): Promise<void> => {
  await api.post(
    `${API_ROUTES.ADMIN.PARENTS}/${id}/resend-invitation`,
  );
};