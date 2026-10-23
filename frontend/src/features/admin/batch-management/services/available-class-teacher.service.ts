import api from "@/core/api/axios";
import { API_ROUTES } from "@/core/constants/api-routes";

import type { AvailableClassTeacher } from "@/features/admin/batch-management/types/batch.type"; 

export const getAvailableClassTeachers = async (): Promise<
  AvailableClassTeacher[]
> => {
  const response = await api.get(
    API_ROUTES.ADMIN.AVAILABLE_CLASS_TEACHERS,
  );

  return response.data.data;
};