import { z } from "zod";

export const getBatchAttendanceParamsSchema = z.object({
  batchId: z.string().regex(
    /^[0-9a-fA-F]{24}$/,
    "Invalid batch ID.",
  ),
});

export const getBatchAttendanceQuerySchema = z.object({
  date: z.string().refine((value) => {
    if (!/^\d{4}-\d{2}-\d{2}$/.test(value)) {
      return false;
    }

    const parsedDate = new Date(`${value}T00:00:00.000Z`);

    return parsedDate.toISOString().slice(0, 10) === value;
  }, "Invalid attendance date."),
});