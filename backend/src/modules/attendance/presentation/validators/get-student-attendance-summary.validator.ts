import { z } from "zod";
import { dateSchema } from "../../../../shared/presentation/validators/date.validator";


export const getStudentAttendanceSummaryParamsSchema = z.object({
  studentId: z.string().regex(/^[0-9a-fA-F]{24}$/, "Invalid student ID."),
});

export const getStudentAttendanceSummaryQuerySchema = z
  .object({
    startDate: dateSchema.optional(),
    endDate: dateSchema.optional(),
  })
  .refine((data) => !data.startDate || !data.endDate || data.startDate <= data.endDate, {
    message: "Start date cannot be later than end date.",
    path: ["startDate"],
  });
