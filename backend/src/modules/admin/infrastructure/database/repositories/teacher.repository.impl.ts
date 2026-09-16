import { Types } from "mongoose";

import { Teacher } from "../../../domain/entities/teacher.entity";
import { ITeacherRepository } from "../../../domain/repositories/teacher.repository";

import { TeacherDocument, HydratedTeacherDocument, TeacherModel } from "../models/teacher.model";

import { TeacherMapper } from "../mappers/teacher.mapper";

import { BaseRepositoryImpl } from "../../../../../shared/infrastructure/database/base.repository.impl";

export class TeacherRepositoryImpl
  extends BaseRepositoryImpl<Teacher, TeacherDocument>
  implements ITeacherRepository
{
  protected readonly _model = TeacherModel;

  protected toDomain(document: HydratedTeacherDocument): Teacher {
    return TeacherMapper.toDomain(document);
  }

  protected toDocument(teacher: Teacher): Partial<TeacherDocument> {
    return TeacherMapper.toDocument(teacher);
  }

  async findByUserId(userId: string): Promise<Teacher | null> {
    if (!Types.ObjectId.isValid(userId)) {
      return null;
    }

    const document = await this._model.findOne({
      userId: new Types.ObjectId(userId),
    });

    if (!document) {
      return null;
    }

    return this.toDomain(document);
  }

  async findByTeacherId(teacherId: string): Promise<Teacher | null> {
    const document = await this._model.findOne({
      teacherId: teacherId.trim(),
    });

    if (!document) {
      return null;
    }

    return this.toDomain(document);
  }

  async findLatestTeacherId(): Promise<string | null> {
    const document = await this._model
      .findOne({
        teacherId: /^TCH\d+$/,
      })
      .sort({ teacherId: -1 })
      .select({ teacherId: 1 })
      .lean();

    return document?.teacherId ?? null;
  }
}
