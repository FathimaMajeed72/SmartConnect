import { Types } from "mongoose";
import { ClassSubjectEntity } from "../../domain/entities/class-subject.entity";
import { ClassSubjectDocument } from "../database/models/class-subject.model"; 

export class ClassSubjectMapper {
  static toDomain(
    document: ClassSubjectDocument,
  ): ClassSubjectEntity {
    return {
      id: document._id.toString(),
      classId: document.classId.toString(),
      subjectId: document.subjectId.toString(),
      teacherId: document.teacherId.toString(),
      status: document.status,
      createdAt: document.createdAt,
      updatedAt: document.updatedAt,
    };
  }

  static toDocument(
    entity: ClassSubjectEntity,
  ): Partial<ClassSubjectDocument> {
    return {
      classId: new Types.ObjectId(entity.classId),
      subjectId: new Types.ObjectId(entity.subjectId),
      teacherId: new Types.ObjectId(entity.teacherId),
      status: entity.status,
    };
  }
}