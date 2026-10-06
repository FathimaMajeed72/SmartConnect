import { z } from "zod";

import { SubjectStatus } from "../../domain/enums/subject-status.enum";

export const updateSubjectStatusSchema = z.object({
  status: z.enum(SubjectStatus),
});