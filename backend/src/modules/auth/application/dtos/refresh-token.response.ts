import { Role } from "../../domain/enums/role.enum";

export interface RefreshTokenResponse {
  accessToken: string;
  user: {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
    role: Role;
  };
}
