import { z } from "zod";

export const getSchoolAttendanceSchema = z
  .object({
    date: z.string().regex(
      /^\d{4}-\d{2}-\d{2}$/,
      "Invalid attendance date format.",
    ),

    academicYear: z.string().optional(),

    classId: z
      .string()
      .regex(/^[0-9a-fA-F]{24}$/, "Invalid class ID.")
      .optional(),

    batchId: z
      .string()
      .regex(/^[0-9a-fA-F]{24}$/, "Invalid batch ID.")
      .optional(),
  })
  .strict()
  .refine(
    (data) => {
      const date = new Date(`${data.date}T00:00:00.000Z`);

      return (
        !Number.isNaN(date.getTime()) &&
        date.toISOString().slice(0, 10) === data.date
      );
    },
    {
      message: "Invalid attendance date.",
      path: ["date"],
    },
  );

export type GetSchoolAttendanceQuery = z.infer<
  typeof getSchoolAttendanceSchema
>;