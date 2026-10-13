import { HydratedDocument } from "mongoose";

import { ClassEntity } from "../../../domain/entities/class.entity";
import { ClassStatus } from "../../../domain/enums/class-status.enum";
import { IClassRepository } from "../../../domain/repositories/class.repository";
import { ClassModel, IClassDocument } from "../models/class.model";
import { BaseRepositoryImpl } from "../../../../../shared/infrastructure/database/base.repository.impl";

export class ClassRepositoryImpl
  extends BaseRepositoryImpl<ClassEntity, IClassDocument>
  implements IClassRepository
{
  protected readonly _model = ClassModel;

  protected toDomain(document: HydratedDocument<IClassDocument>): ClassEntity {
    return {
      id: document._id.toString(),
      name: document.name,
      code: document.code,
      academicYear: document.academicYear,
      description: document.description,
      status: document.status,
      createdAt: document.createdAt,
      updatedAt: document.updatedAt,
    };
  }

  protected toDocument(entity: ClassEntity): Partial<IClassDocument> {
    return {
      name: entity.name,
      code: entity.code,
      academicYear: entity.academicYear,
      description: entity.description,
      status: entity.status,
    };
  }

  async findAll(
    page: number,
    limit: number,
    search?: string,
    status?: ClassStatus,
    academicYear?: string,
  ): Promise<{
    classes: ClassEntity[];
    total: number;
  }> {
    const filter: Record<string, unknown> = {};

    if (academicYear) {
      filter.academicYear = academicYear;
    }

    if (search) {
      filter.$or = [
        {
          name: {
            $regex: search,
            $options: "i",
          },
        },
        {
          code: {
            $regex: search,
            $options: "i",
          },
        },
      ];
    }

    if (status) {
      filter.status = status;
    }

    const skip = (page - 1) * limit;

    const [documents, total] = await Promise.all([
      this._model.find(filter).sort({ createdAt: -1 }).skip(skip).limit(limit),

      this._model.countDocuments(filter),
    ]);

    return {
      classes: documents.map((document) => this.toDomain(document)),
      total,
    };
  }

  async findByCodeOrNameAndAcademicYear(
    code: string,
    name: string,
    academicYear: string,
  ): Promise<ClassEntity | null> {
    const document = await this._model.findOne({
      academicYear,
      $or: [{ code }, { name }],
    });

    return document ? this.toDomain(document) : null;
  }

  async updateStatus(id: string, status: ClassStatus): Promise<ClassEntity> {
    const document = await this._model.findByIdAndUpdate(
      id,
      { status },
      {
        returnDocument: "after",
        runValidators: true,
      },
    );

    if (!document) {
      throw new Error("Class not found.");
    }

    return this.toDomain(document);
  }

  async getAcademicYears(): Promise<string[]> {
    const academicYears: string[] = await this._model.distinct("academicYear");

    return academicYears.sort((a, b) => b.localeCompare(a));
  }
}
