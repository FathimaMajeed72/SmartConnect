import { VerifyResetOtpRequest } from "../dtos/verify-reset-otp.request";
import { VerifyResetOtpResponse } from "../dtos/verify-reset-otp.response";

export interface IVerifyResetOtpUseCase {
  execute(request: VerifyResetOtpRequest): Promise<VerifyResetOtpResponse>;
}