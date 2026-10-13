import api from "@/core/api/axios";
import { API_ROUTES } from "@/core/constants/api-routes";

export const getAcademicYears = async (): Promise<string[]> => {
  const response = await api.get(
    API_ROUTES.ADMIN.ACADEMIC_YEARS,
  );

  return response.data.data;
};