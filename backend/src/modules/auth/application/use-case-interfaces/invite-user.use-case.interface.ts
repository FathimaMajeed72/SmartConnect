import { InviteUserRequest } from "../dtos/invite-user.request";
import { InviteUserResponse } from "../dtos/invite-user.response";

export interface IInviteUserUseCase {
  execute(request: InviteUserRequest): Promise<InviteUserResponse>;
}