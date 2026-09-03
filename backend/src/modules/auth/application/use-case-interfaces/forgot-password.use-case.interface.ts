import { ForgotPasswordRequest } from "../dtos/forgot-password.request";
import { ForgotPasswordResponse } from "../dtos/forgot-password.response";

export interface IForgotPasswordUseCase {
  execute(
    request: ForgotPasswordRequest
  ): Promise<ForgotPasswordResponse>;
}