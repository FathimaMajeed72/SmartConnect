import { InviteUserRequest } from "../dtos/invite-user.request";
import { InviteUserResponse } from "../dtos/invite-user.response";

import { IUserRepository } from "../../domain/repositories/user.repository";
import { IUserTokenRepository } from "../../domain/repositories/user-token.repository";

import { IRandomTokenGenerator } from "../interfaces/random-token-generator.interface";
import { ITokenHasher } from "../interfaces/token-hasher.interface";
import { IAuthEmailService } from "../interfaces/auth-email.service.interface";

import { EmailAlreadyExistsError } from "../errors/email-already-exists.error";

import { User } from "../../domain/entities/user.entity";
import { UserToken } from "../../domain/entities/user-token.entity";
import { UserStatus } from "../../domain/enums/user-status.enum";
import { TokenType } from "../../domain/enums/token-type.enum";

import { env } from "../../../../config/env";
import { IInviteUserUseCase } from "../use-case-interfaces/invite-user.use-case.interface";

export class InviteUserUseCase implements IInviteUserUseCase {
  constructor(
    private readonly _userRepository: IUserRepository,

    private readonly _userTokenRepository: IUserTokenRepository,

    private readonly _randomTokenGenerator: IRandomTokenGenerator,

    private readonly _tokenHasher: ITokenHasher,

    private readonly _emailService: IAuthEmailService,
  ) {}

  async execute(request: InviteUserRequest): Promise<InviteUserResponse> {
    const existingUser = await this._userRepository.findByEmail(request.email);

    if (existingUser) {
      throw new EmailAlreadyExistsError();
    }

    const user: User = {
      id: "",

      firstName: request.firstName,
      lastName: request.lastName,

      email: request.email,
      phone: request.phone ?? null,

      passwordHash: null,

      role: request.role,

      status: UserStatus.INVITED,

      isEmailVerified: false,

      lastLogin: undefined,
      passwordChangedAt: undefined,

      createdAt: new Date(),
      updatedAt: new Date(),
    };

    const createdUser = await this._userRepository.create(user);

    await this._userTokenRepository.deleteByUserIdAndType(createdUser.id, TokenType.ACTIVATION);

    const activationToken = this._randomTokenGenerator.generate();

    const tokenHash = this._tokenHasher.hash(activationToken);

    const userToken: UserToken = {
      id: "",

      userId: createdUser.id,

      tokenHash,

      type: TokenType.ACTIVATION,

      expiresAt: new Date(Date.now() + env.activationTokenExpiresInHours * 60 * 60 * 1000),

      usedAt: null,

      createdAt: new Date(),
    };

    await this._userTokenRepository.create(userToken);

    await this._emailService.sendActivationEmail(
      createdUser.firstName,
      createdUser.email,
      activationToken,
    );

    return {
      message: "Invitation email sent successfully.",
    };

    
  }
}
