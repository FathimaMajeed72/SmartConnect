import { UserStatus } from "../../../auth/domain/enums/user-status.enum";

export interface UpdateParentStatusResponse {
  userId: string;
  status: UserStatus;
}