import { HydratedDocument } from "mongoose";

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
