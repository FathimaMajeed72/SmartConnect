import { Role } from "../../domain/enums/role.enum";

export interface InviteUserRequest {
  firstName: string;

  lastName: string;

  email: string;

  phone?: string;

  role: Role;
}