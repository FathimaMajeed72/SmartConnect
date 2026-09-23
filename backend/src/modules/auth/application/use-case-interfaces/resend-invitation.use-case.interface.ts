export interface IResendInvitationUseCase {
  execute(userId: string): Promise<void>;
}