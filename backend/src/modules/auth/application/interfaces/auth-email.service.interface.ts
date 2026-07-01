export interface AuthEmailService {
  sendActivationEmail(
    email: string,
    activationLink: string
  ): Promise<void>;

  sendPasswordResetEmail(
    email: string,
    resetLink: string
  ): Promise<void>;
}