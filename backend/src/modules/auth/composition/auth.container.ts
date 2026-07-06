import { AuthController } from "../presentation/controllers/auth.controller";

import { InviteUserUseCase } from "../application/use-cases/invite-user.use-case";
import { ActivateAccountUseCase } from "../application/use-cases/activate-account.use-case";

import { UserRepositoryImpl } from "../infrastructure/database/repositories/user.repository.impl";
import { UserTokenRepositoryImpl } from "../infrastructure/database/repositories/user-token.repository.impl";

import { CryptoRandomTokenGenerator } from "../infrastructure/security/crypto-random-token-generator.impl";
import { Sha256TokenHasher } from "../infrastructure/security/sha256-token-hasher.impl";

import { NodemailerEmailService } from "../infrastructure/email/nodemailer-email.service.impl";
import { BcryptPasswordHasher } from "../infrastructure/security/bcrypt-password-hasher.impl";

const userRepository = new UserRepositoryImpl();

const userTokenRepository = new UserTokenRepositoryImpl();

const randomTokenGenerator = new CryptoRandomTokenGenerator();

const tokenHasher = new Sha256TokenHasher();

const emailService = new NodemailerEmailService();

const passwordHasher = new BcryptPasswordHasher();

const inviteUserUseCase = new InviteUserUseCase(
  userRepository,
  userTokenRepository,
  randomTokenGenerator,
  tokenHasher,
  emailService,
);

const activateAccountUseCase = new ActivateAccountUseCase(
  userRepository,
  userTokenRepository,
  passwordHasher,
  tokenHasher,
);

export const authController = new AuthController(
  inviteUserUseCase, 
  activateAccountUseCase
);
