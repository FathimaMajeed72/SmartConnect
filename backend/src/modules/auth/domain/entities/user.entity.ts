import { Role } from "../enums/role.enum";
import { UserStatus } from "../enums/user-status.enum";

export interface User {
  id: string;

  firstName: string;

  lastName: string;

  email: string;

  phone: string | null;

  passwordHash: string | null;

  role: Role;

  status: UserStatus;

  isEmailVerified: boolean;

  lastLogin?: Date;

  passwordChangedAt?: Date;

  createdAt: Date;

  updatedAt: Date;
}