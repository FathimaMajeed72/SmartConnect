export interface AuthEmailService {
  sendActivationEmail(
    firstName: string,
    email: string,
    token: string
  ): Promise<void>;

  sendPasswordResetOtpEmail(
    firstName: string,
    email: string,
    otp: string
  ): Promise<void>;

}