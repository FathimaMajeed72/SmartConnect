import { z } from "zod";

import { StudentParentStatus } from "../../domain/enums/student-parent-status.enum";

export const updateStudentParentStatusSchema = z.object({
  status: z.enum(StudentParentStatus),
});