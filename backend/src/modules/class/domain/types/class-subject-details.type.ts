import { ClassSubjectStatus } from "../enums/class-subject-status.enum";

export interface ClassSubjectDetails {
  id: string;
  classId: string;

  subjectId: string;
  subjectName: string;
  subjectCode: string;

  teacherId: string;
  teacherName: string;

  status: ClassSubjectStatus;

  createdAt: Date;
  updatedAt: Date;
}