import type { StudentStatus } from "./student-status";

export type Gender = "MALE" | "FEMALE" | "OTHER";

export interface StudentListItem {
  id: string;
  admissionNumber: string;
  firstName: string;
  lastName: string;
  dateOfBirth: string;
  gender: Gender;
  profileImage?: string;
  status: StudentStatus;
  createdAt: string;
  updatedAt: string;
}

export interface PaginatedStudents {
  students: StudentListItem[];
  page: number;
  limit: number;
  total: number;
  totalPages: number;
}

export interface GetStudentsParams {
  page: number;
  limit: number;
  search?: string;
  status?: StudentStatus;
}

export interface CreateStudentRequest {
  admissionNumber: string;
  firstName: string;
  lastName: string;
  dateOfBirth: string;
  gender: Gender;
  profileImage?: string;
}

export type CreateStudentResponse = StudentListItem;

export type GetStudentResponse = StudentListItem;

export interface UpdateStudentStatusRequest {
  status: StudentStatus;
}

export type UpdateStudentStatusResponse = StudentListItem;