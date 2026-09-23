import { IUserRepository } from "../../domain/repositories/user.repository";
import { IUserTokenRepository } from "../../domain/repositories/user-token.repository";

import { IRandomTokenGenerator } from "../interfaces/random-token-generator.interface";
import { ITokenHasher } from "../interfaces/token-hasher.interface";
import { IAuthEmailService } from "../interfaces/auth-email.service.interface";

import { UserStatus } from "../../domain/enums/user-status.enum";
import { TokenType } from "../../domain/enums/token-type.enum";

import { env } from "../../../../config/env";

import { IResendInvitationUseCase } from "../use-case-interfaces/resend-invitation.use-case.interface";
import { UserNotFoundError } from "../errors/user-not-found.error";
import { InvitationNotAllowedError } from "../errors/invitation-not-allowed.error";

export class ResendInvitationUseCase
  implements IResendInvitationUseCase
{
  constructor(
    private readonly _userRepository: IUserRepository,
    private readonly _userTokenRepository: IUserTokenRepository,
    private readonly _randomTokenGenerator: IRandomTokenGenerator,
    private readonly _tokenHasher: ITokenHasher,
    private readonly _emailService: IAuthEmailService,
  ) {}

  async execute(userId: string): Promise<void> {
    const user = await this._userRepository.findById(userId);

    if (!user) {
      throw new UserNotFoundError();
    }

    if (user.status !== UserStatus.INVITED) {
      throw new InvitationNotAllowedError();
    }

    await this._userTokenRepository.deleteByUserIdAndType(
      user.id,
      TokenType.ACTIVATION,
    );

    const activationToken =
      this._randomTokenGenerator.generate();

    const tokenHash =
      this._tokenHasher.hash(activationToken);

    await this._userTokenRepository.create({
      id: "",
      userId: user.id,
      tokenHash,
      type: TokenType.ACTIVATION,
      expiresAt: new Date(
        Date.now() +
          env.activationTokenExpiresInHours * 60 * 60 * 1000,
      ),
      usedAt: null,
      createdAt: new Date(),
    });

    await this._emailService.sendActivationEmail(
      user.firstName,
      user.email,
      activationToken,
    );
  }
}