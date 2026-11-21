import { HydratedDocument, Types } from "mongoose";

import { AttendanceEntity } from "../../domain/entities/attendance.entity";
import { IAttendanceRepository } from "../../domain/repositories/attendance.repository";

import { AttendanceModel, IAttendanceDocument } from "../models/attendance.model";

import { AttendanceMapper } from "../mappers/attendance.mapper";

import { BaseRepositoryImpl } from "../../../../shared/infrastructure/database/base.repository.impl";
import { DuplicateKeyError } from "../../../../shared/errors/duplicate-key.error";
import { ITransactionContext } from "../../../../shared/domain/transactions/transaction-context.interface";
import { MongoTransactionContext } from "../../../../shared/infrastructure/database/transactions/mongo-transaction.context";

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

  private getSession(context: ITransactionContext) {
    if (!(context instanceof MongoTransactionContext)) {
      throw new Error("Invalid transaction context.");
    }

    return context.session;
  }

  async createMany(
    attendance: AttendanceEntity[],
    context: ITransactionContext,
  ): Promise<AttendanceEntity[]> {
    try {
      const session = this.getSession(context);

      const savedDocuments = await this._model.insertMany(
        attendance.map((entity) => this.toDocument(entity)),
        {
          ordered: true,
          session,
        },
      );

      return savedDocuments.map((document) => AttendanceMapper.toDomain(document));
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

  async findByBatchesAndDate(batchIds: string[], date: Date): Promise<AttendanceEntity[]> {
    const validBatchIds = batchIds
      .filter((id) => Types.ObjectId.isValid(id))
      .map((id) => new Types.ObjectId(id));

    if (validBatchIds.length === 0) {
      return [];
    }

    const documents = await this._model.find({
      batchId: { $in: validBatchIds },
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
  async findByStudentInDateRange(
    studentId: string,
    startDate: Date | undefined,
    endDate: Date | undefined,
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

    const filter: Record<string, unknown> = {
      studentId: new Types.ObjectId(studentId),
    };

    if (startDate || endDate) {
      filter.date = {
        ...(startDate && { $gte: startDate }),
        ...(endDate && { $lte: endDate }),
      };
    }

    const [documents, total] = await Promise.all([
      this._model.find(filter).sort({ date: -1 }).skip(skip).limit(safeLimit),

      this._model.countDocuments(filter),
    ]);

    return {
      attendance: documents.map((document) => this.toDomain(document)),
      total,
    };
  }

  async getStudentAttendanceSummary(
    studentId: string,
    startDate?: Date,
    endDate?: Date,
  ): Promise<{
    present: number;
    absent: number;
    late: number;
    excused: number;
  }> {
    const emptySummary = {
      present: 0,
      absent: 0,
      late: 0,
      excused: 0,
    };

    if (!Types.ObjectId.isValid(studentId)) {
      return emptySummary;
    }

    const matchStage: Record<string, unknown> = {
      studentId: new Types.ObjectId(studentId),
    };

    if (startDate || endDate) {
      matchStage.date = {
        ...(startDate && { $gte: startDate }),
        ...(endDate && { $lte: endDate }),
      };
    }

    const [result] = await this._model.aggregate([
      {
        $match: matchStage,
      },
      {
        $group: {
          _id: null,
          present: {
            $sum: { $cond: [{ $eq: ["$status", "PRESENT"] }, 1, 0] },
          },
          absent: {
            $sum: { $cond: [{ $eq: ["$status", "ABSENT"] }, 1, 0] },
          },
          late: {
            $sum: { $cond: [{ $eq: ["$status", "LATE"] }, 1, 0] },
          },
          excused: {
            $sum: { $cond: [{ $eq: ["$status", "EXCUSED"] }, 1, 0] },
          },
        },
      },
    ]);

    return result
      ? {
          present: result.present,
          absent: result.absent,
          late: result.late,
          excused: result.excused,
        }
      : emptySummary;
  }
}

function isDuplicateAttendanceError(error: unknown): boolean {
  if (typeof error !== "object" || error === null) {
    return false;
  }

  if (!("code" in error) || error.code !== 11000) {
    return false;
  }

  if (!("message" in error) || typeof error.message !== "string") {
    return false;
  }

  return error.message.includes("studentId_1_date_1");
}
