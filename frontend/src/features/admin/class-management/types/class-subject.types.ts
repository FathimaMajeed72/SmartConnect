import type { ClassSubjectStatus } from "./class-subject-status"; 

export interface ClassSubjectDetails {
  id: string;
  classId: string;

  subjectId: string;
  subjectName: string;
  subjectCode: string;

  teacherId: string;
  teacherName: string;

  status: ClassSubjectStatus;

  createdAt: string;
  updatedAt: string;
}

export interface GetClassSubjectsResponse {
  classSubjects: ClassSubjectDetails[];
}

export interface AssignClassSubjectRequest {
  subjectId: string;
  teacherId: string;
}