import { z } from "zod";

import { UserStatus } from "../../../auth/domain/enums/user-status.enum";

export const getTeachersSchema = z.object({
  page: z.coerce.number().int().min(1).default(1),

  limit: z.coerce.number().int().min(1).max(100).default(10),

  search: z.string().trim().optional(),

  status: z.nativeEnum(UserStatus).optional(),
});