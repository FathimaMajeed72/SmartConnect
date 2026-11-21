import { z } from "zod";
import { dateSchema } from "../../../../shared/presentation/validators/date.validator";

export const getBatchAttendanceParamsSchema = z.object({
  batchId: z.string().regex(
    /^[0-9a-fA-F]{24}$/,
    "Invalid batch ID.",
  ),
});

export const getBatchAttendanceQuerySchema = z.object({
  date: dateSchema,
});