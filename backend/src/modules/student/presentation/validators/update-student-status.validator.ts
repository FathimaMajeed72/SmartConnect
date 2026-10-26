import { z } from "zod";
import { StudentStatus } from "../../domain/enums/student-status.enum";

export const updateStudentStatusSchema = z.object({
  status: z.enum(StudentStatus),
});