import { z } from "zod";
import { AttendanceStatus } from "../../domain/enums/attendance-status.enum";
import { dateSchema } from "../../../../shared/presentation/validators/date.validator";

export const updateAttendanceParamsSchema = z.object({
  batchId: z.string().regex(/^[0-9a-fA-F]{24}$/, "Invalid batch ID."),
});

export const updateAttendanceSchema = z.object({
  studentId: z.string().regex(/^[0-9a-fA-F]{24}$/, "Invalid student ID."),

  date:dateSchema,

  status: z.nativeEnum(AttendanceStatus),

  remarks: z.string().trim().max(250).optional(),
});
