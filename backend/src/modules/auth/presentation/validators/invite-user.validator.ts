import { z } from "zod";

import { Role } from "../../domain/enums/role.enum";

export const inviteUserSchema = z.object({
  firstName: z.string().trim().min(1).max(50),

  lastName: z.string().trim().min(1).max(50),

  email: z.email(),

  phone: z.string().trim().optional(),

  role: z.enum(Role),
});

export type InviteUserBody =
  z.infer<typeof inviteUserSchema>;