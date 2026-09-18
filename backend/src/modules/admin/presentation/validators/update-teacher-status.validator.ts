import { z } from "zod";
import { UserStatus } from "../../../auth/domain/enums/user-status.enum"; 

export const updateTeacherStatusSchema = z.object({
  status: z.enum([
    UserStatus.ACTIVE,
    UserStatus.INACTIVE,
    UserStatus.BLOCKED,
  ]),
});