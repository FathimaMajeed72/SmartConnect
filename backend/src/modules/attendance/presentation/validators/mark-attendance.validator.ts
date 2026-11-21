import { z } from "zod";

import { AttendanceStatus } from "../../domain/enums/attendance-status.enum";
import { dateSchema } from "../../../../shared/presentation/validators/date.validator";

export const markAttendanceSchema = z.object({
  batchId: z.string().regex(/^[0-9a-fA-F]{24}$/, "Invalid batch ID"),

  date: dateSchema,

  attendance: z
    .array(
      z.object({
        studentId: z.string().regex(/^[0-9a-fA-F]{24}$/, "Invalid student ID"),

        status: z.nativeEnum(AttendanceStatus),

        remarks: z.string().trim().max(250).optional(),
      }),
    )
    .min(1, "Attendance cannot be empty"),
});
