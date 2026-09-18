import { UserStatus } from "../../../auth/domain/enums/user-status.enum";

export interface UpdateTeacherStatusRequest {
  status: UserStatus;
}