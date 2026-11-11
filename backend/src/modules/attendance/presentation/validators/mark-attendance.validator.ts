import { z } from "zod";

import { AttendanceStatus } from "../../domain/enums/attendance-status.enum";

export const markAttendanceSchema = z.object({
  batchId: z.string().regex(/^[0-9a-fA-F]{24}$/, "Invalid batch ID"),

  date: z.string().regex(
    /^\d{4}-\d{2}-\d{2}$/,
    "Date must be in YYYY-MM-DD format",
  ),

  attendance: z
    .array(
      z.object({
        studentId: z.string().regex(
          /^[0-9a-fA-F]{24}$/,
          "Invalid student ID",
        ),

        status: z.nativeEnum(AttendanceStatus),

        remarks: z.string().trim().max(250).optional(),
      }),
    )
    .min(1, "Attendance cannot be empty"),
});