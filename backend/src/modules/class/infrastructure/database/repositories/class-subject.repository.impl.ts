import { Types } from "mongoose";

import { ClassSubjectEntity } from "../../../domain/entities/class-subject.entity"; 
import { ClassSubjectStatus } from "../../../domain/enums/class-subject-status.enum"; 
import { IClassSubjectRepository } from "../../../domain/repositories/class-subject.repository";
import { ClassSubjectDetails } from "../../../domain/types/class-subject-details.type"; 

import {
  ClassSubjectDocument,
  ClassSubjectModel,
} from "../models/class-subject.model";

import { ClassSubjectMapper } from "../../mappers/class-subject.mapper";

import { BaseRepositoryImpl } from "../../../../../shared/infrastructure/database/base.repository.impl";


interface ClassSubjectAggregationResult {
  _id: Types.ObjectId;
  classId: Types.ObjectId;
  subjectId: Types.ObjectId;

  subjectName: string;
  subjectCode: string;

  teacherId: Types.ObjectId;
  teacherName: string;

  status: ClassSubjectStatus;

  createdAt: Date;
  updatedAt: Date;
}



export class ClassSubjectRepositoryImpl
  extends BaseRepositoryImpl<ClassSubjectEntity, ClassSubjectDocument>
  implements IClassSubjectRepository
{
  protected readonly _model = ClassSubjectModel;

  protected toDomain(
    document: ClassSubjectDocument,
  ): ClassSubjectEntity {
    return ClassSubjectMapper.toDomain(document);
  }

  protected toDocument(
    entity: ClassSubjectEntity,
  ): Partial<ClassSubjectDocument> {
    return ClassSubjectMapper.toDocument(entity);
  }

  async findByClassAndSubject(
    classId: string,
    subjectId: string,
  ): Promise<ClassSubjectEntity | null> {
    if (
      !Types.ObjectId.isValid(classId) ||
      !Types.ObjectId.isValid(subjectId)
    ) {
      return null;
    }

    const document = await this._model.findOne({
      classId: new Types.ObjectId(classId),
      subjectId: new Types.ObjectId(subjectId),
    });

    return document ? this.toDomain(document) : null;
  }

  async findDetailsByClassId(
    classId: string,
  ): Promise<ClassSubjectDetails[]> {
    if (!Types.ObjectId.isValid(classId)) {
      return [];
    }

    const documents =
      await this._model.aggregate<ClassSubjectAggregationResult>([
        {
          $match: {
            classId: new Types.ObjectId(classId),
          },
        },

        {
          $lookup: {
            from: "subjects",
            localField: "subjectId",
            foreignField: "_id",
            as: "subject",
          },
        },

        {
          $unwind: "$subject",
        },

        {
          $lookup: {
            from: "teachers",
            localField: "teacherId",
            foreignField: "_id",
            as: "teacher",
          },
        },

        {
          $unwind: "$teacher",
        },

        {
          $lookup: {
            from: "users",
            localField: "teacher.userId",
            foreignField: "_id",
            as: "teacherUser",
          },
        },

        {
          $unwind: "$teacherUser",
        },

        {
          $sort: {
            createdAt: -1,
          },
        },

        {
          $project: {
            _id: 1,
            classId: 1,
            subjectId: 1,

            subjectName: "$subject.name",
            subjectCode: "$subject.code",

            teacherId: 1,

            teacherName: {
              $concat: [
                "$teacherUser.firstName",
                " ",
                "$teacherUser.lastName",
              ],
            },

            status: 1,
            createdAt: 1,
            updatedAt: 1,
          },
        },
      ]);

    return documents.map((document) => ({
      id: document._id.toString(),
      classId: document.classId.toString(),

      subjectId: document.subjectId.toString(),
      subjectName: document.subjectName,
      subjectCode: document.subjectCode,

      teacherId: document.teacherId.toString(),
      teacherName: document.teacherName,

      status: document.status,

      createdAt: document.createdAt,
      updatedAt: document.updatedAt,
    }));
  }

  async updateStatus(
    id: string,
    status: ClassSubjectStatus,
  ): Promise<ClassSubjectEntity> {
    if (!Types.ObjectId.isValid(id)) {
      throw new Error("Invalid class subject ID.");
    }

    const document = await this._model.findByIdAndUpdate(
      id,
      { status },
      {
        new: true,
        runValidators: true,
      },
    );

    if (!document) {
      throw new Error("Class subject not found.");
    }

    return this.toDomain(document);
  }
}