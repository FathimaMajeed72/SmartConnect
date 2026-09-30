import { Schema, model, type Document } from "mongoose";

import { ClassStatus } from "../../../domain/enums/class-status.enum";

export interface IClassDocument extends Document {
  name: string;
  code: string;
  academicYear: string;
  description?: string;
  status: ClassStatus;
  createdAt: Date;
  updatedAt: Date;
}

const classSchema = new Schema<IClassDocument>(
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

    academicYear: {
      type: String,
      required: true,
      trim: true,
      immutable: true,
    },

    description: {
      type: String,
      trim: true,
    },

    status: {
      type: String,
      enum: Object.values(ClassStatus),
      default: ClassStatus.ACTIVE,
    },
  },
  {
    timestamps: true,
  }
);

classSchema.index(
  { code: 1, academicYear: 1 },
  { unique: true },
);

export const ClassModel = model<IClassDocument>("Class", classSchema);