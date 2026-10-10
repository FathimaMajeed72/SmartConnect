import api from "@/core/api/axios";
import { API_ROUTES } from "@/core/constants/api-routes";

import type { GetClassSubjectsResponse } from "../types/class-subject.types";

import type { AssignClassSubjectRequest } from "../types/class-subject.types";

export const getClassSubjects = async (
  classId: string,
): Promise<GetClassSubjectsResponse> => {
  const response = await api.get(
    `${API_ROUTES.ADMIN.CLASSES}/${classId}/subjects`,
  );

  return response.data.data;
};

export const assignClassSubject = async (
  classId: string,
  data: AssignClassSubjectRequest,
) => {
  const response = await api.post(
    `${API_ROUTES.ADMIN.CLASSES}/${classId}/subjects`,
    data,
  );

  return response.data.data;
};
