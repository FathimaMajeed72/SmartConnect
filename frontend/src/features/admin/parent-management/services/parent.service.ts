import api from "@/core/api/axios";
import { API_ROUTES } from "@/core/constants/api-routes";

import type {
  CreateParentRequest,
  CreateParentResponse,
  GetParentsParams,
  PaginatedParents,
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