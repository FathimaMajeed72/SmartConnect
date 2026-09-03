import { ResendResetOtpRequest } from "../dtos/resend-reset-otp.request";
import { ResendResetOtpResponse } from "../dtos/resend-reset-otp.response";

export interface IResendResetOtpUseCase {
  execute(request: ResendResetOtpRequest): Promise<ResendResetOtpResponse>;
}