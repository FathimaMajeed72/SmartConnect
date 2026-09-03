import { ResetPasswordRequest } from "../dtos/reset-password.request";
import { ResetPasswordResponse } from "../dtos/reset-password.response";

export interface IResetPasswordUseCase {
  execute(request: ResetPasswordRequest): Promise<ResetPasswordResponse>;
}