import { StudentEntity } from "../../domain/entities/student.entity";
import { CreateStudentResponse } from "../dtos/create-student.response";
import { StudentDetails } from "../types/get-student-response.type";

export class StudentDtoMapper {
  static toCreateResponse(student: StudentEntity): CreateStudentResponse {
    return {
      id: student.id,
      admissionNumber: student.admissionNumber,
      firstName: student.firstName,
      lastName: student.lastName,
      dateOfBirth: student.dateOfBirth,
      gender: student.gender,
      profileImage: student.profileImage,
      status: student.status,
      createdAt: student.createdAt,
      updatedAt: student.updatedAt,
    };
  }

  static toDetails(student: StudentEntity): StudentDetails {
    return {
      id: student.id,
      admissionNumber: student.admissionNumber,
      firstName: student.firstName,
      lastName: student.lastName,
      dateOfBirth: student.dateOfBirth,
      gender: student.gender,
      profileImage: student.profileImage,
      status: student.status,
      createdAt: student.createdAt,
      updatedAt: student.updatedAt,
    };
  }
}
