import { Role } from "../../domain/enums/role.enum";

export interface LoginResponse {
  accessToken: string;
  refreshToken: string;

  user: {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
    role: Role;
  };
}