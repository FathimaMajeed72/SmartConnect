import { Types } from "mongoose";

import { StudentParentEntity } from "../../../domain/entities/student-parent.entity";
import { IStudentParentDocument } from "../models/student-parent.model";

export class StudentParentMapper {
  static toDomain(document: IStudentParentDocument): StudentParentEntity {
    return {
      id: document._id.toString(),
      studentId: document.studentId.toString(),
      parentUserId: document.parentUserId.toString(),
      relationship: document.relationship,
      isPrimaryContact: document.isPrimaryContact,
      status: document.status,
      createdAt: document.createdAt,
      updatedAt: document.updatedAt,
    };
  }

  static toDocument(entity: StudentParentEntity): Partial<IStudentParentDocument> {
    return {
      studentId: new Types.ObjectId(entity.studentId),
      parentUserId: new Types.ObjectId(entity.parentUserId),
      relationship: entity.relationship,
      isPrimaryContact: entity.isPrimaryContact,
      status: entity.status,
    };
  }
}
