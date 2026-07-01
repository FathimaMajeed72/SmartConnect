import { Role } from "../../domain/enums/role.enum";
import { UserStatus } from "../../domain/enums/user-status.enum";

export interface CreateUser {
  firstName: string;
  lastName: string;

  email: string;
  phone?: string;

  passwordHash: string | null;

  role: Role;

  status: UserStatus;

  isEmailVerified: boolean;

  lastLogin?: Date;

  passwordChangedAt?: Date;
}