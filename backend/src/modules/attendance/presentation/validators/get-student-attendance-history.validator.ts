import { z } from "zod";
import { dateSchema } from "../../../../shared/presentation/validators/date.validator";


export const getStudentAttendanceHistoryParamsSchema = z.object({
  studentId: z.string().regex(/^[0-9a-fA-F]{24}$/, "Invalid student ID."),
});

export const getStudentAttendanceHistoryQuerySchema = z
  .object({
    startDate: dateSchema.optional(),
    endDate: dateSchema.optional(),
    page: z.coerce.number().int().min(1).default(1),
    limit: z.coerce.number().int().min(1).max(100).default(10),
  })
  .refine((data) => !data.startDate || !data.endDate || data.startDate <= data.endDate, {
    message: "Start date cannot be later than end date.",
    path: ["startDate"],
  });
