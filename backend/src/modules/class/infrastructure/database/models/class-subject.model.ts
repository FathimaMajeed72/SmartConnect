import { Schema, model, Types, Document } from "mongoose";

import { ClassSubjectStatus } from "../../../domain/enums/class-subject-status.enum"; 

export interface ClassSubjectDocument extends Document {
  classId: Types.ObjectId;
  subjectId: Types.ObjectId;
  teacherId: Types.ObjectId;
  status: ClassSubjectStatus;
  createdAt: Date;
  updatedAt: Date;
}

const classSubjectSchema = new Schema<ClassSubjectDocument>(
  {
    classId: {
      type: Schema.Types.ObjectId,
      ref: "Class",
      required: true,
    },

    subjectId: {
      type: Schema.Types.ObjectId,
      ref: "Subject",
      required: true,
    },

    teacherId: {
      type: Schema.Types.ObjectId,
      ref: "Teacher",
      required: true,
    },

    status: {
      type: String,
      enum: Object.values(ClassSubjectStatus),
      default: ClassSubjectStatus.ACTIVE,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  },
);

classSubjectSchema.index(
  { classId: 1, subjectId: 1 },
  { unique: true },
);

export const ClassSubjectModel = model<ClassSubjectDocument>(
  "ClassSubject",
  classSubjectSchema,
);