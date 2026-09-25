import { Schema, model, type Document } from "mongoose";

import { ClassStatus } from "../../../domain/enums/class-status.enum";

export interface IClassDocument extends Document {
  name: string;
  code: string;
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
      unique: true,
      uppercase: true,
      trim: true,
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

export const ClassModel = model<IClassDocument>("Class", classSchema);