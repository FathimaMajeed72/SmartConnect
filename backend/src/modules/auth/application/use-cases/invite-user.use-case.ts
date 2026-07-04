import { InviteUserRequest } from "../dtos/invite-user.request";
import { InviteUserResponse } from "../dtos/invite-user.response";

import { UserRepository } from "../../domain/repositories/user.repository";
import { UserTokenRepository } from "../../domain/repositories/user-token.repository";

import { RandomTokenGenerator } from "../interfaces/random-token-generator.interface";
import { TokenHasher } from "../interfaces/token-hasher.interface";
import { AuthEmailService } from "../interfaces/auth-email.service.interface";

import { EmailAlreadyExistsError } from "../errors/email-already-exists.error";

import { User } from "../../domain/entities/user.entity";
import { UserToken } from "../../domain/entities/user-token.entity";
import { UserStatus } from "../../domain/enums/user-status.enum";
import { TokenType } from "../../domain/enums/token-type.enum";

import { env } from "../../../../config/env";

export class InviteUserUseCase {
  constructor(
    private readonly userRepository: UserRepository,

    private readonly userTokenRepository: UserTokenRepository,

    private readonly randomTokenGenerator: RandomTokenGenerator,

    private readonly tokenHasher: TokenHasher,

    private readonly emailService: AuthEmailService,
  ) {}

  async execute(request: InviteUserRequest): Promise<InviteUserResponse> {
    const existingUser = await this.userRepository.findByEmail(request.email);

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

    const createdUser = await this.userRepository.create(user);

    await this.userTokenRepository.deleteByUserIdAndType(createdUser.id, TokenType.ACTIVATION);

    const activationToken = this.randomTokenGenerator.generate();

    const tokenHash = this.tokenHasher.hash(activationToken);

    const userToken: UserToken = {
      id: "",

      userId: createdUser.id,

      tokenHash,

      type: TokenType.ACTIVATION,

      expiresAt: new Date(Date.now() + env.activationTokenExpiresInHours * 60 * 60 * 1000),

      usedAt: null,

      createdAt: new Date(),
    };

    await this.userTokenRepository.create(userToken);

    await this.emailService.sendActivationEmail(
      createdUser.firstName,
      createdUser.email,
      activationToken,
    );

    return {
      message: "Invitation email sent successfully.",
    };

    
  }
}
