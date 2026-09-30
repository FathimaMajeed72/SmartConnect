import type { ClassStatus } from "@/features/admin/class-management/types/class-status";

export interface ClassListItem {
  id: string;
  name: string;
  code: string;
  academicYear: string;
  description: string | null;
  status: ClassStatus;
  createdAt: string;
  updatedAt: string;
}

export interface PaginatedClasses {
  classes: ClassListItem[];
  page: number;
  limit: number;
  total: number;
  totalPages: number;
}

export interface GetClassesParams {
  page?: number;
  limit?: number;
  search?: string;
  status?: ClassStatus;
}

export interface CreateClassRequest {
  name: string;
  code: string;
  academicYear: string;
  description?: string;
}

export interface CreateClassResponse {
  message: string;
  classId: string;
}

export interface GetClassResponse {
  class: ClassListItem;
}

export interface UpdateClassRequest {
  name?: string;
  code?: string;
  description?: string;
}

export interface UpdateClassResponse {
  message: string;
}

export interface UpdateClassStatusRequest {
  status: ClassStatus;
}

export interface UpdateClassStatusResponse {
  message: string;
}