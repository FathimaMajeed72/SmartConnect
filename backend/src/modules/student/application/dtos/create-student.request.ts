import { Gender } from "../../domain/enums/gender.enum";

export interface CreateStudentRequest {
  admissionNumber: string;
  firstName: string;
  lastName: string;
  dateOfBirth: Date;
  gender: Gender;
  profileImage?: string;
}