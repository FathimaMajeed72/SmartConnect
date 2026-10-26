import { StudentEntity } from "../../../domain/entities/student.entity";
import { IStudentDocument } from "../models/student.model";

export class StudentMapper {
  static toDomain(document: IStudentDocument): StudentEntity {
    return {
      id: document._id.toString(),
      admissionNumber: document.admissionNumber,
      firstName: document.firstName,
      lastName: document.lastName,
      dateOfBirth: document.dateOfBirth,
      gender: document.gender,
      profileImage: document.profileImage,
      status: document.status,
      createdAt: document.createdAt,
      updatedAt: document.updatedAt,
    };
  }

  static toDocument(
    entity: StudentEntity,
  ): Partial<IStudentDocument> {
    return {
      admissionNumber: entity.admissionNumber,
      firstName: entity.firstName,
      lastName: entity.lastName,
      dateOfBirth: entity.dateOfBirth,
      gender: entity.gender,
      profileImage: entity.profileImage,
      status: entity.status,
    };
  }
}