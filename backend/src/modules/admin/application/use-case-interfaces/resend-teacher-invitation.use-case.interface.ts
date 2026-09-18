export interface IResendTeacherInvitationUseCase {
  execute(userId: string): Promise<void>;
}