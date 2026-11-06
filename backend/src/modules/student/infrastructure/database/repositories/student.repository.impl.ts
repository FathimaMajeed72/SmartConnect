import { HydratedDocument, Types } from "mongoose";

import { StudentEntity } from "../../../domain/entities/student.entity";
import { StudentStatus } from "../../../domain/enums/student-status.enum";
import { IStudentRepository } from "../../../domain/repositories/student.repository";

import { StudentModel, IStudentDocument } from "../models/student.model";

import { StudentMapper } from "../mappers/student.mapper";

import { BaseRepositoryImpl } from "../../../../../shared/infrastructure/database/base.repository.impl";

import { DuplicateKeyError } from "../../../../../shared/errors/duplicate-key.error";

export class StudentRepositoryImpl
  extends BaseRepositoryImpl<StudentEntity, IStudentDocument>
  implements IStudentRepository
{
  protected readonly _model = StudentModel;

  protected toDomain(document: HydratedDocument<IStudentDocument>): StudentEntity {
    return StudentMapper.toDomain(document);
  }

  protected toDocument(entity: StudentEntity): Partial<IStudentDocument> {
    return StudentMapper.toDocument(entity);
  }

  async findAll(
    page: number,
    limit: number,
    search?: string,
    status?: StudentStatus,
    classId?: string,
  ): Promise<{
    students: StudentEntity[];
    total: number;
  }> {
    const filter: Record<string, unknown> = {};

    if (search?.trim()) {
      const searchTerm = search.trim();

      filter.$or = [
        {
          admissionNumber: {
            $regex: searchTerm,
            $options: "i",
          },
        },
        {
          firstName: {
            $regex: searchTerm,
            $options: "i",
          },
        },
        {
          lastName: {
            $regex: searchTerm,
            $options: "i",
          },
        },
      ];
    }

    if (status) {
      filter.status = status;
    }

    if (classId) {
      filter.classId = new Types.ObjectId(classId);
    }

    const safePage = Math.max(page, 1);
    const safeLimit = Math.max(limit, 1);
    const skip = (safePage - 1) * safeLimit;

    const [documents, total] = await Promise.all([
      this._model.find(filter).sort({ createdAt: -1 }).skip(skip).limit(safeLimit),

      this._model.countDocuments(filter),
    ]);

    return {
      students: documents.map((document) => this.toDomain(document)),
      total,
    };
  }

  async findByAdmissionNumber(admissionNumber: string): Promise<StudentEntity | null> {
    const document = await this._model.findOne({
      admissionNumber: admissionNumber.trim().toUpperCase(),
    });

    return document ? this.toDomain(document) : null;
  }

  async updateStatus(id: string, status: StudentStatus): Promise<StudentEntity | null> {
    const document = await this._model.findByIdAndUpdate(
      id,
      { status },
      {
        returnDocument: "after",
        runValidators: true,
      },
    );

    return document ? this.toDomain(document) : null;
  }

  async findByIds(ids: string[]): Promise<StudentEntity[]> {
    const documents = await this._model.find({
      _id: { $in: ids },
    });

    return documents.map((document) => this.toDomain(document));
  }

  async findByBatchId(batchId: string): Promise<StudentEntity[]> {
    const documents = await this._model.find({ batchId });

    return documents.map((document) => this.toDomain(document));
  }

  async findAvailableByClassId(classId: string): Promise<StudentEntity[]> {
    const documents = await this._model.find({
      classId,
      batchId: { $exists: false },
    });

    return documents.map((document) => this.toDomain(document));
  }

  async countByBatchId(batchId: string): Promise<number> {
    return this._model.countDocuments({ batchId });
  }

  async assignToBatch(studentIds: string[], batchId: string): Promise<number> {
    const result = await this._model.updateMany(
      {
        _id: { $in: studentIds },
      },
      {
        $set: {
          batchId: new Types.ObjectId(batchId),
        },
      },
      {
        runValidators: true,
      },
    );

    return result.modifiedCount;
  }

  async unassignFromBatch(studentIds: string[], batchId: string): Promise<number> {
    const result = await this._model.updateMany(
      {
        _id: { $in: studentIds },
        batchId: new Types.ObjectId(batchId),
      },
      {
        $unset: {
          batchId: "",
        },
      },
    );

    return result.modifiedCount;
  }

  override async create(entity: StudentEntity): Promise<StudentEntity> {
    try {
      return await super.create(entity);
    } catch (error) {
      if (isDuplicateAdmissionNumberError(error)) {
        throw new DuplicateKeyError("admissionNumber");
      }

      throw error;
    }
  }
}

function isDuplicateAdmissionNumberError(error: unknown): boolean {
  if (
    typeof error === "object" &&
    error !== null &&
    "code" in error &&
    error.code === 11000 &&
    "keyPattern" in error
  ) {
    const keyPattern = error.keyPattern;

    return typeof keyPattern === "object" && keyPattern !== null && "admissionNumber" in keyPattern;
  }

  return false;
}
