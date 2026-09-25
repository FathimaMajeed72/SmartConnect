import { z } from "zod";

import { ClassStatus } from "../../domain/enums/class-status.enum";

export const getClassesSchema = z.object({
  page: z.coerce
    .number()
    .int()
    .min(1)
    .default(1),

  limit: z.coerce
    .number()
    .int()
    .min(1)
    .max(100)
    .default(10),

  search: z
    .string()
    .trim()
    .optional(),

  status: z
    .enum(ClassStatus)
    .optional(),
});