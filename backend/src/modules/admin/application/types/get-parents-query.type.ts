import { UserStatus } from "../../../auth/domain/enums/user-status.enum";

export interface GetParentsQuery {
  page: number;
  limit: number;
  search?: string;
  status?: UserStatus;
}
