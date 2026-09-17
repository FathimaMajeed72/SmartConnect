import { AuthController } from "../presentation/controllers/auth.controller";

import { InviteUserUseCase } from "../application/use-cases/invite-user.use-case";
import { ActivateAccountUseCase } from "../application/use-cases/activate-account.use-case";
import { LoginUseCase } from "../application/use-cases/login.use-case";

import { UserRepositoryImpl } from "../infrastructure/database/repositories/user.repository.impl";
import { UserTokenRepositoryImpl } from "../infrastructure/database/repositories/user-token.repository.impl";

import { CryptoRandomTokenGenerator } from "../infrastructure/security/crypto-random-token-generator.impl";
import { Sha256TokenHasher } from "../infrastructure/security/sha256-token-hasher.impl";

import { NodemailerEmailService } from "../infrastructure/email/nodemailer-email.service.impl";
import { BcryptPasswordHasher } from "../infrastructure/security/bcrypt-password-hasher.impl";
import { JwtTokenService } from "../infrastructure/security/jwt-token.service.impl";
import { RefreshTokenUseCase } from "../application/use-cases/refresh-token.use-case";
import { LogoutUseCase } from "../application/use-cases/logout.use-case";
import { ForgotPasswordUseCase } from "../application/use-cases/forgot-password.use-case";
import { SixDigitOtpGenerator } from "../infrastructure/security/six-digit-otp-generator";
import { VerifyResetOtpUseCase } from "../application/use-cases/verify-reset-otp.use-case";
import { ResetPasswordUseCase } from "../application/use-cases/reset-password.use-case";
import { ResendResetOtpUseCase } from "../application/use-cases/resend-reset-otp.use-case";

export const userRepository = new UserRepositoryImpl();

const userTokenRepository = new UserTokenRepositoryImpl();

const randomTokenGenerator = new CryptoRandomTokenGenerator();

const tokenHasher = new Sha256TokenHasher();

const otpGenerator = new SixDigitOtpGenerator();

const emailService = new NodemailerEmailService();

const passwordHasher = new BcryptPasswordHasher();

const tokenService = new JwtTokenService();

export const inviteUserUseCase = new InviteUserUseCase(
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

const loginUseCase = new LoginUseCase(
  userRepository,
  userTokenRepository,
  passwordHasher,
  tokenHasher,
  tokenService,
);

const refreshTokenUseCase = new RefreshTokenUseCase(
  userRepository,
  userTokenRepository,
  tokenHasher,
  tokenService,
);

const logoutUseCase = new LogoutUseCase(userTokenRepository, tokenHasher, tokenService);

const forgotPasswordUseCase = new ForgotPasswordUseCase(
  userRepository,
  userTokenRepository,
  otpGenerator,
  tokenHasher,
  emailService,
);

const verifyResetOtpUseCase = new VerifyResetOtpUseCase(
  userRepository,
  userTokenRepository,
  tokenHasher,
);

const resetPasswordUseCase = new ResetPasswordUseCase(
  userRepository,
  userTokenRepository,
  passwordHasher,
);

const resendResetOtpUseCase = new ResendResetOtpUseCase(
  userRepository,
  userTokenRepository,
  otpGenerator,
  tokenHasher,
  emailService,
);

export const authController = new AuthController(
  inviteUserUseCase,
  activateAccountUseCase,
  loginUseCase,
  refreshTokenUseCase,
  logoutUseCase,
  forgotPasswordUseCase,
  verifyResetOtpUseCase,
  resetPasswordUseCase,
  resendResetOtpUseCase,
);
