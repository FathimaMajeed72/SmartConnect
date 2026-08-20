import api from "@/core/api/axios";

import type {
  CreateParentRequest,
  GetParentsParams,
  PaginatedParents,
  ParentListItem,
} from "../types/parent.types";

export const getParents = async (
  params: GetParentsParams,
): Promise<PaginatedParents> => {
  const response = await api.get("/admin/parents", {
    params,
  });

  return response.data.data;
};

export const createParent = async (
  data: CreateParentRequest,
): Promise<ParentListItem> => {
  const response = await api.post("/admin/parents", data);

  return response.data.data;
};