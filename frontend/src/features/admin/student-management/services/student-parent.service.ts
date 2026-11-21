import api from "@/core/api/axios";
import { API_ROUTES } from "@/core/constants/api-routes";

import type {
  AssignParentToStudentRequest,
  AssignParentToStudentResponse,
  StudentParentListItem,
  UpdateStudentParentRequest,
  UpdateStudentParentStatusRequest,
} from "../types/student-parent.type";


export const assignParentToStudent = async (
  studentId: string,
  data: AssignParentToStudentRequest,
): Promise<AssignParentToStudentResponse> => {
  const response = await api.post(
    `${API_ROUTES.ADMIN.STUDENTS}/${studentId}/parents`,
    data,
  );

  return response.data.data;
};


export const getStudentParents = async (
  studentId: string,
): Promise<StudentParentListItem[]> => {
  const response = await api.get(
    `${API_ROUTES.ADMIN.STUDENTS}/${studentId}/parents`,
  );

  return response.data.data;
};


export const updateStudentParent = async (
  studentId: string,
  parentUserId: string,
  data: UpdateStudentParentRequest,
): Promise<AssignParentToStudentResponse> => {
  const response = await api.patch(
    `${API_ROUTES.ADMIN.STUDENTS}/${studentId}/parents/${parentUserId}`,
    data,
  );

  return response.data.data;
};


export const updateStudentParentStatus = async (
  studentId: string,
  parentUserId: string,
  data: UpdateStudentParentStatusRequest,
): Promise<AssignParentToStudentResponse> => {
  const response = await api.patch(
    `${API_ROUTES.ADMIN.STUDENTS}/${studentId}/parents/${parentUserId}/status`,
    data,
  );

  return response.data.data;
};
