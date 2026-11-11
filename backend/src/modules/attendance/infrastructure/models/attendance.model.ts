import { Schema, Types, model, type Document } from "mongoose";

import { AttendanceStatus } from "../../domain/enums/attendance-status.enum"; 

export interface IAttendanceDocument extends Document {
  studentId: Types.ObjectId;
  batchId: Types.ObjectId;
  classId: Types.ObjectId;
  date: Date;
  status: AttendanceStatus;
  markedBy: Types.ObjectId;
  updatedBy?: Types.ObjectId;
  remarks?: string;
  createdAt: Date;
  updatedAt: Date;
}

const attendanceSchema = new Schema<IAttendanceDocument>(
  {
    studentId: {
      type: Schema.Types.ObjectId,
      ref: "Student",
      required: true,
    },

    batchId: {
      type: Schema.Types.ObjectId,
      ref: "Batch",
      required: true,
    },

    classId: {
      type: Schema.Types.ObjectId,
      ref: "Class",
      required: true,
    },

    date: {
      type: Date,
      required: true,
    },

    status: {
      type: String,
      enum: Object.values(AttendanceStatus),
      required: true,
    },

    markedBy: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    updatedBy: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },

    remarks: {
      type: String,
      trim: true,
    },
  },
  {
    timestamps: true,
  },
);

attendanceSchema.index(
  { studentId: 1, date: 1 },
  { unique: true },
);

attendanceSchema.index({ batchId: 1, date: 1 });

attendanceSchema.index({ classId: 1, date: 1 });

export const AttendanceModel = model<IAttendanceDocument>(
  "Attendance",
  attendanceSchema,
);