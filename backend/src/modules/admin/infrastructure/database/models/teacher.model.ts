import { Schema, model, HydratedDocument, Types } from "mongoose";

export interface TeacherDocument {
  userId: Types.ObjectId;
  teacherId: string;
  qualification: string;
  joiningDate: Date;

  createdAt: Date;
  updatedAt: Date;
}

export type HydratedTeacherDocument =
  HydratedDocument<TeacherDocument>;

const teacherSchema = new Schema<TeacherDocument>(
  {
    userId: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },

    teacherId: {
      type: String,
      required: true,
      trim: true,
    },

    qualification: {
      type: String,
      required: true,
      trim: true,
    },

    joiningDate: {
      type: Date,
      required: true,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

teacherSchema.index({ userId: 1 }, { unique: true });
teacherSchema.index({ teacherId: 1 }, { unique: true });

export const TeacherModel = model<TeacherDocument>(
  "Teacher",
  teacherSchema
);