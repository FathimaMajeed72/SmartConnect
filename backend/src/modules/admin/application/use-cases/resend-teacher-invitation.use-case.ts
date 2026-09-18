import { Role } from "../../../auth/domain/enums/role.enum";
import { UserStatus } from "../../../auth/domain/enums/user-status.enum";
import { TokenType } from "../../../auth/domain/enums/token-type.enum";

import { IUserRepository } from "../../../auth/domain/repositories/user.repository";
import { IUserTokenRepository } from "../../../auth/domain/repositories/user-token.repository";

import { IRandomTokenGenerator } from "../../../auth/application/interfaces/random-token-generator.interface";
import { ITokenHasher } from "../../../auth/application/interfaces/token-hasher.interface";
import { IAuthEmailService } from "../../../auth/application/interfaces/auth-email.service.interface";

import { env } from "../../../../config/env";

import { TeacherNotFoundError } from "../errors/teacher-not-found.error";
import { TeacherInvitationNotAllowedError } from "../errors/teacher-invitation-not-allowed.error";
import { IResendTeacherInvitationUseCase } from "../use-case-interfaces/resend-teacher-invitation.use-case.interface";

export class ResendTeacherInvitationUseCase implements IResendTeacherInvitationUseCase {
  constructor(
    private readonly _userRepository: IUserRepository,
    private readonly _userTokenRepository: IUserTokenRepository,
    private readonly _randomTokenGenerator: IRandomTokenGenerator,
    private readonly _tokenHasher: ITokenHasher,
    private readonly _emailService: IAuthEmailService,
  ) {}

  async execute(userId: string): Promise<void> {
    const user = await this._userRepository.findById(userId);

    if (!user || user.role !== Role.TEACHER) {
      throw new TeacherNotFoundError();
    }

    if (user.status !== UserStatus.INVITED) {
      throw new TeacherInvitationNotAllowedError();
    }

    await this._userTokenRepository.deleteByUserIdAndType(user.id, TokenType.ACTIVATION);

    const activationToken = this._randomTokenGenerator.generate();

    const tokenHash = this._tokenHasher.hash(activationToken);

    const now = new Date();

    await this._userTokenRepository.create({
      id: "",
      userId: user.id,
      tokenHash,
      type: TokenType.ACTIVATION,
      expiresAt: new Date(Date.now() + env.activationTokenExpiresInHours * 60 * 60 * 1000),
      usedAt: null,
      createdAt: now,
    });

    await this._emailService.sendActivationEmail(user.firstName, user.email, activationToken);
  }
}
