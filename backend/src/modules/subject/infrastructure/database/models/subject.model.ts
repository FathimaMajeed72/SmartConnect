import { Schema, model, type Document } from "mongoose";

import { SubjectStatus } from "../../../domain/enums/subject-status.enum"; 

export interface ISubjectDocument extends Document {
  name: string;
  code: string;
  status: SubjectStatus;
  createdAt: Date;
  updatedAt: Date;
}

const subjectSchema = new Schema<ISubjectDocument>(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },

    code: {
      type: String,
      required: true,
      uppercase: true,
      trim: true,
    },

    status: {
      type: String,
      enum: Object.values(SubjectStatus),
      default: SubjectStatus.ACTIVE,
    },
  },
  {
    timestamps: true,
  },
);

subjectSchema.index(
  { code: 1 },
  { unique: true },
);

export const SubjectModel = model<ISubjectDocument>(
  "Subject",
  subjectSchema,
);