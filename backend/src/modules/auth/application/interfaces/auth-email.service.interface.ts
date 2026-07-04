export interface AuthEmailService {
  sendActivationEmail(
    firstName: string,
    email: string,
    token: string
  ): Promise<void>;

  sendPasswordResetEmail(
    firstName: string,
    email: string,
    token: string
  ): Promise<void>;
}