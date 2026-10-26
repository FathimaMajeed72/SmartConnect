import { HydratedDocument, Types } from "mongoose";

import { StudentParentEntity } from "../../../domain/entities/student-parent.entity";
import { StudentParentStatus } from "../../../domain/enums/student-parent-status.enum";
import { IStudentParentRepository } from "../../../domain/repositories/student-parent.repository";

import { StudentParentModel, IStudentParentDocument } from "../models/student-parent.model";

import { StudentParentMapper } from "../mappers/student-parent.mapper";

import { BaseRepositoryImpl } from "../../../../../shared/infrastructure/database/base.repository.impl";
import { DuplicateKeyError } from "../../../../../shared/errors/duplicate-key.error";

export class StudentParentRepositoryImpl
  extends BaseRepositoryImpl<StudentParentEntity, IStudentParentDocument>
  implements IStudentParentRepository
{
  protected readonly _model = StudentParentModel;

  protected toDomain(document: HydratedDocument<IStudentParentDocument>): StudentParentEntity {
    return StudentParentMapper.toDomain(document);
  }

  protected toDocument(entity: StudentParentEntity): Partial<IStudentParentDocument> {
    return StudentParentMapper.toDocument(entity);
  }

  override async create(entity: StudentParentEntity): Promise<StudentParentEntity> {
    try {
      return await super.create(entity);
    } catch (error) {
      if (isDuplicateStudentParentError(error)) {
        throw new DuplicateKeyError("studentId_parentUserId");
      }

      throw error;
    }
  }

  async findByStudentAndParent(
    studentId: string,
    parentUserId: string,
  ): Promise<StudentParentEntity | null> {
    const document = await this._model.findOne({
      studentId,
      parentUserId,
    });

    return document ? this.toDomain(document) : null;
  }

  async findByStudentId(studentId: string): Promise<StudentParentEntity[]> {
    const documents = await this._model.find({ studentId }).sort({ createdAt: -1 });

    return documents.map((document) => this.toDomain(document));
  }

  async existsActivePrimaryContact(
    studentId: string,
    excludeRelationshipId?: string,
  ): Promise<boolean> {
    const filter: Record<string, unknown> = {
      studentId,
      isPrimaryContact: true,
      status: StudentParentStatus.ACTIVE,
    };

    if (excludeRelationshipId) {
      filter._id = { $ne: new Types.ObjectId(excludeRelationshipId) };
    }

    return this._model.exists(filter).then(Boolean);
  }
}


function isDuplicateStudentParentError(error: unknown): boolean {
  if (
    typeof error !== "object" ||
    error === null ||
    !("code" in error) ||
    error.code !== 11000 ||
    !("keyPattern" in error)
  ) {
    return false;
  }

  const keyPattern = error.keyPattern;

  return (
    typeof keyPattern === "object" &&
    keyPattern !== null &&
    "studentId" in keyPattern &&
    "parentUserId" in keyPattern
  );
}