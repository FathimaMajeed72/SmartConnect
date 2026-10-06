import type { SubjectStatus } from "./subject-status";


export interface SubjectListItem {
  id: string;
  name: string;
  code: string;
  status: SubjectStatus;
  createdAt: string;
  updatedAt: string;
}

export interface GetSubjectsParams {
  page: number;
  limit: number;
  search?: string;
  status?: SubjectStatus;
}

export interface PaginatedSubjects {
  subjects: SubjectListItem[];
  page: number;
  limit: number;
  total: number;
  totalPages: number;
}

export interface CreateSubjectRequest {
  name: string;
  code: string;
}

export interface CreateSubjectResponse {
  subjectId: string;
}

export interface GetSubjectResponse {
  subject: SubjectListItem;
}

export interface UpdateSubjectRequest {
  name: string;
  code: string;
}

export interface UpdateSubjectStatusRequest {
  status: SubjectStatus;
}
