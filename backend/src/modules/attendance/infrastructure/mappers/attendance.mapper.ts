import { Types } from "mongoose";

import { AttendanceEntity } from "../../domain/entities/attendance.entity";
import { IAttendanceDocument } from "../models/attendance.model";

export class AttendanceMapper {
  static toDomain(document: IAttendanceDocument): AttendanceEntity {
    return {
      id: document._id.toString(),
      studentId: document.studentId.toString(),
      batchId: document.batchId.toString(),
      classId: document.classId.toString(),
      date: document.date,
      status: document.status,
      markedBy: document.markedBy.toString(),
      updatedBy: document.updatedBy?.toString(),
      remarks: document.remarks,
      createdAt: document.createdAt,
      updatedAt: document.updatedAt,
    };
  }

  static toDocument(entity: AttendanceEntity): Partial<IAttendanceDocument> {
    return {
      studentId: new Types.ObjectId(entity.studentId),
      batchId: new Types.ObjectId(entity.batchId),
      classId: new Types.ObjectId(entity.classId),
      date: entity.date,
      status: entity.status,
      markedBy: new Types.ObjectId(entity.markedBy),
      updatedBy: entity.updatedBy
        ? new Types.ObjectId(entity.updatedBy)
        : undefined,
      remarks: entity.remarks,
    };
  }
}