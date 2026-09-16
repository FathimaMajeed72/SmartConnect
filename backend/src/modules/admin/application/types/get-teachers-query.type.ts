import { UserStatus } from "../../../auth/domain/enums/user-status.enum"; 

export interface GetTeachersQuery {
  page: number;
  limit: number;
  search?: string;
  status?: UserStatus;
}