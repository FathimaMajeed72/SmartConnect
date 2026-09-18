import { UserStatus } from "../../../auth/domain/enums/user-status.enum";

export interface UpdateTeacherStatusResponse {
  userId: string;
  status: UserStatus;
}