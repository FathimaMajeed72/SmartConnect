import { HydratedDocument, Types } from "mongoose";

import { BatchEntity } from "../../../domain/entities/batch.entity";
import { BatchStatus } from "../../../domain/enums/batch-status.enum";
import { IBatchRepository } from "../../../domain/repositories/batch.repository";

import { BatchModel, IBatchDocument } from "../models/batch.model";

import { BatchMapper } from "../mappers/batch.mapper";

import { BaseRepositoryImpl } from "../../../../../shared/infrastructure/database/base.repository.impl";

export class BatchRepositoryImpl
  extends BaseRepositoryImpl<BatchEntity, IBatchDocument>
  implements IBatchRepository
{
  protected readonly _model = BatchModel;

  protected toDomain(document: HydratedDocument<IBatchDocument>): BatchEntity {
    return BatchMapper.toDomain(document);
  }

  protected toDocument(entity: BatchEntity): Partial<IBatchDocument> {
    return BatchMapper.toDocument(entity);
  }

  async findByClassId(classId: string): Promise<BatchEntity[]> {
    if (!Types.ObjectId.isValid(classId)) {
      return [];
    }

    const documents = await this._model
      .find({
        classId: new Types.ObjectId(classId),
      })
      .sort({ name: 1 });

    return documents.map((document) => BatchMapper.toDomain(document));
  }

  async findByNameAndClassId(name: string, classId: string): Promise<BatchEntity | null> {
    if (!Types.ObjectId.isValid(classId)) {
      return null;
    }

    const document = await this._model.findOne({
      name: name.trim().toUpperCase(),
      classId: new Types.ObjectId(classId),
    });

    return document ? BatchMapper.toDomain(document) : null;
  }

  async findByClassTeacherId(classTeacherId: string): Promise<BatchEntity | null> {
    if (!Types.ObjectId.isValid(classTeacherId)) {
      return null;
    }

    const document = await this._model.findOne({
      classTeacherId: new Types.ObjectId(classTeacherId),
    });

    return document ? BatchMapper.toDomain(document) : null;
  }

  async findAssignedClassTeacherIds(): Promise<string[]> {
    const documents = await this._model
      .find({
        classTeacherId: { $ne: null },
      })
      .select("classTeacherId")
      .lean();

    return documents
      .map((document) => document.classTeacherId)
      .filter((classTeacherId) => classTeacherId != null)
      .map((classTeacherId) => classTeacherId.toString());
  }

  async updateBatch(
    id: string,
    data: Pick<BatchEntity, "name" | "classTeacherId" | "capacity">,
  ): Promise<BatchEntity | null> {
    if (!Types.ObjectId.isValid(id)) {
      return null;
    }

    if (data.classTeacherId !== null && !Types.ObjectId.isValid(data.classTeacherId)) {
      return null;
    }

    const document = await this._model.findByIdAndUpdate(
      id,
      {
        name: data.name.trim().toUpperCase(),
        classTeacherId: data.classTeacherId ? new Types.ObjectId(data.classTeacherId) : null,
        capacity: data.capacity,
      },
      {
        returnDocument: "after",
        runValidators: true,
      },
    );

    return document ? BatchMapper.toDomain(document) : null;
  }

  async updateStatus(
    id: string,
    status: BatchStatus,
    classTeacherId: string | null,
  ): Promise<BatchEntity | null> {
    if (!Types.ObjectId.isValid(id)) {
      return null;
    }

    if (classTeacherId !== null && !Types.ObjectId.isValid(classTeacherId)) {
      return null;
    }
    const document = await this._model.findByIdAndUpdate(
      id,
      {
        $set: {
          status,
          classTeacherId: classTeacherId ? new Types.ObjectId(classTeacherId) : null,
        },
      },
      {
        returnDocument: "after",
        runValidators: true,
      },
    );

    return document ? BatchMapper.toDomain(document) : null;
  }
}
