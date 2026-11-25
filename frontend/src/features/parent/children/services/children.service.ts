import api from "@/core/api/axios";
import { API_ROUTES } from "@/core/constants/api-routes";

import type { ParentChild } from "../types/children.type";

export const getParentChildren = async (): Promise<ParentChild[]> => {
  const response = await api.get(API_ROUTES.PARENT.CHILDREN);

  return response.data.data;
};