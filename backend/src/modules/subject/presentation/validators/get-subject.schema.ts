import { z } from "zod";

import { SubjectStatus } from "../../domain/enums/subject-status.enum";

export const getSubjectsSchema = z.object({
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
    .enum(SubjectStatus)
    .optional(),
});