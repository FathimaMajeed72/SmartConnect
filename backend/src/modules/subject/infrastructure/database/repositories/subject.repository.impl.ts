import { HydratedDocument } from "mongoose";

import { SubjectEntity } from "../../../domain/entities/subject.entity";
import { SubjectStatus } from "../../../domain/enums/subject-status.enum";
import { ISubjectRepository } from "../../../domain/repositories/subject.repository";
import {
  ISubjectDocument,
  SubjectModel,
} from "../models/subject.model";

import { BaseRepositoryImpl } from "../../../../../shared/infrastructure/database/base.repository.impl";
import { SubjectNotFoundError } from "../../../application/errors/subject-not-found.error";

export class SubjectRepositoryImpl
  extends BaseRepositoryImpl<SubjectEntity, ISubjectDocument>
  implements ISubjectRepository
{
  protected readonly _model = SubjectModel;

  protected toDomain(
    document: HydratedDocument<ISubjectDocument>,
  ): SubjectEntity {
    return {
      id: document._id.toString(),
      name: document.name,
      code: document.code,
      status: document.status,
      createdAt: document.createdAt,
      updatedAt: document.updatedAt,
    };
  }

  protected toDocument(
    entity: SubjectEntity,
  ): Partial<ISubjectDocument> {
    return {
      name: entity.name,
      code: entity.code,
      status: entity.status,
    };
  }

  async findAll(
    page: number,
    limit: number,
    search?: string,
    status?: SubjectStatus,
  ): Promise<{
    subjects: SubjectEntity[];
    total: number;
  }> {
    const filter: Record<string, unknown> = {};

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
      this._model
        .find(filter)
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(limit),

      this._model.countDocuments(filter),
    ]);

    return {
      subjects: documents.map((document) => this.toDomain(document)),
      total,
    };
  }

  async updateStatus(
    id: string,
    status: SubjectStatus,
  ): Promise<SubjectEntity> {
    const document = await this._model.findByIdAndUpdate(
      id,
      { status },
      {
        new: true,
        runValidators: true,
      },
    );

    if (!document) {
      throw new SubjectNotFoundError();
    }

    return this.toDomain(document);
  }

  async findByCode(code: string): Promise<SubjectEntity | null> {
    const document = await this._model.findOne({
      code: code.toUpperCase(),
    });

    return document ? this.toDomain(document) : null;
  }
}