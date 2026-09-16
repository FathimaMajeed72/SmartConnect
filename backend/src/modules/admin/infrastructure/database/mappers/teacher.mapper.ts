import { Types } from "mongoose";

import { Teacher } from "../../../domain/entities/teacher.entity";
import {
  TeacherDocument,
  HydratedTeacherDocument,
} from "../models/teacher.model";

export class TeacherMapper {
  static toDomain(
    document: HydratedTeacherDocument,
  ): Teacher {
    return {
      id: document._id.toString(),
      userId: document.userId.toString(),
      teacherId: document.teacherId,
      qualification: document.qualification,
      joiningDate: document.joiningDate,
      createdAt: document.createdAt,
      updatedAt: document.updatedAt,
    };
  }

  static toDocument(
    teacher: Teacher,
  ): Partial<TeacherDocument> {
    return {
      userId: new Types.ObjectId(teacher.userId),
      teacherId: teacher.teacherId,
      qualification: teacher.qualification,
      joiningDate: teacher.joiningDate,
      createdAt: teacher.createdAt,
      updatedAt: teacher.updatedAt,
    };
  }
}