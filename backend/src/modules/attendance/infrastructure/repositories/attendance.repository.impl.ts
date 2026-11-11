import { HydratedDocument, Types } from "mongoose";

import { AttendanceEntity } from "../../domain/entities/attendance.entity";
import { IAttendanceRepository } from "../../domain/repositories/attendance.repository";

import { AttendanceModel, IAttendanceDocument } from "../models/attendance.model";

import { AttendanceMapper } from "../mappers/attendance.mapper";

import { BaseRepositoryImpl } from "../../../../shared/infrastructure/database/base.repository.impl";
import { DuplicateKeyError } from "../../../../shared/errors/duplicate-key.error";

export class AttendanceRepositoryImpl
  extends BaseRepositoryImpl<AttendanceEntity, IAttendanceDocument>
  implements IAttendanceRepository
{
  protected readonly _model = AttendanceModel;

  protected toDomain(document: HydratedDocument<IAttendanceDocument>): AttendanceEntity {
    return AttendanceMapper.toDomain(document);
  }

  protected toDocument(entity: AttendanceEntity): Partial<IAttendanceDocument> {
    return AttendanceMapper.toDocument(entity);
  }

 async createMany(
  attendance: AttendanceEntity[],
): Promise<AttendanceEntity[]> {
  try {
    const savedDocuments = await this._model.insertMany(
      attendance.map((entity) => this.toDocument(entity)),
      { ordered: true },
    );

    return savedDocuments.map((document) =>
      AttendanceMapper.toDomain(document),
    );
  } catch (error) {
    if (isDuplicateAttendanceError(error)) {
      throw new DuplicateKeyError("studentId_date");
    }

    throw error;
  }
}

  async findByStudentAndDate(studentId: string, date: Date): Promise<AttendanceEntity | null> {
    if (!Types.ObjectId.isValid(studentId)) {
      return null;
    }

    const document = await this._model.findOne({
      studentId: new Types.ObjectId(studentId),
      date,
    });

    return document ? this.toDomain(document) : null;
  }

  async findByBatchAndDate(batchId: string, date: Date): Promise<AttendanceEntity[]> {
    if (!Types.ObjectId.isValid(batchId)) {
      return [];
    }

    const documents = await this._model.find({
      batchId: new Types.ObjectId(batchId),
      date,
    });

    return documents.map((document) => this.toDomain(document));
  }

  async findByStudent(
    studentId: string,
    page: number,
    limit: number,
  ): Promise<{
    attendance: AttendanceEntity[];
    total: number;
  }> {
    if (!Types.ObjectId.isValid(studentId)) {
      return { attendance: [], total: 0 };
    }

    const safePage = Math.max(page, 1);
    const safeLimit = Math.max(limit, 1);
    const skip = (safePage - 1) * safeLimit;

    const filter = {
      studentId: new Types.ObjectId(studentId),
    };

    const [documents, total] = await Promise.all([
      this._model.find(filter).sort({ date: -1 }).skip(skip).limit(safeLimit),

      this._model.countDocuments(filter),
    ]);

    return {
      attendance: documents.map((document) => this.toDomain(document)),
      total,
    };
  }

  async existsByBatchAndDate(batchId: string, date: Date): Promise<boolean> {
    if (!Types.ObjectId.isValid(batchId)) {
      return false;
    }

    const exists = await this._model.exists({
      batchId: new Types.ObjectId(batchId),
      date,
    });

    return exists !== null;
  }
}

function isDuplicateAttendanceError(error: unknown): boolean {
  if (
    typeof error === "object" &&
    error !== null &&
    "code" in error &&
    error.code === 11000 &&
    "keyPattern" in error
  ) {
    const keyPattern = error.keyPattern;

    return (
      typeof keyPattern === "object" &&
      keyPattern !== null &&
      "studentId" in keyPattern &&
      "date" in keyPattern
    );
  }

  return false;
}
