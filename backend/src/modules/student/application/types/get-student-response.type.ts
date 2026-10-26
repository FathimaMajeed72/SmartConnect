import { Gender } from "../../domain/enums/gender.enum";
import { StudentStatus } from "../../domain/enums/student-status.enum";

export interface StudentDetails {
  id: string;
  admissionNumber: string;
  firstName: string;
  lastName: string;
  dateOfBirth: Date;
  gender: Gender;
  profileImage?: string;
  status: StudentStatus;
  createdAt: Date;
  updatedAt: Date;
}