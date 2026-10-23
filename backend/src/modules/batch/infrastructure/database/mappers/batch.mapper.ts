import { HydratedDocument, Types } from "mongoose";

import { BatchEntity } from "../../../domain/entities/batch.entity";
import { IBatchDocument } from "../models/batch.model";

export class BatchMapper {
  static toDomain(document: HydratedDocument<IBatchDocument>): BatchEntity {
    return {
      id: document._id.toString(),
      name: document.name,
      classId: document.classId.toString(),
      classTeacherId: document.classTeacherId ? document.classTeacherId.toString() : null,
      capacity: document.capacity,
      status: document.status,
      createdAt: document.createdAt,
      updatedAt: document.updatedAt,
    };
  }

  static toDocument(entity: BatchEntity): Partial<IBatchDocument> {
    return {
      name: entity.name.trim().toUpperCase(),
      classId: new Types.ObjectId(entity.classId),
      classTeacherId: entity.classTeacherId ? new Types.ObjectId(entity.classTeacherId) : null,
      capacity: entity.capacity,
      status: entity.status,
    };
  }
}
