import { TokenType } from "../../domain/enums/token-type.enum";
import { IUserTokenRepository } from "../../domain/repositories/user-token.repository";
import { IUserRepository } from "../../domain/repositories/user.repository";
import { VerifyResetOtpRequest } from "../dtos/verify-reset-otp.request";
import { VerifyResetOtpResponse } from "../dtos/verify-reset-otp.response";
import { InvalidOtpError } from "../errors/invalid-otp.error";
import { OtpExpiredError } from "../errors/otp-expired.error";
import { ITokenHasher } from "../interfaces/token-hasher.interface";
import { IVerifyResetOtpUseCase } from "../use-case-interfaces/verify-reset-otp.use-case.interface";

export class VerifyResetOtpUseCase implements IVerifyResetOtpUseCase {
  constructor(
    private readonly _userRepository: IUserRepository,

    private readonly _userTokenRepository: IUserTokenRepository,

    private readonly _tokenHasher: ITokenHasher,
  ) {}
  async execute(request: VerifyResetOtpRequest): Promise<VerifyResetOtpResponse> {
    const user = await this._userRepository.findByEmail(request.email);

    if (!user) {
      throw new InvalidOtpError();
    }

    const storedToken = await this._userTokenRepository.findByUserIdAndType(
      user.id,
      TokenType.RESET_PASSWORD,
    );

    if (!storedToken) {
      throw new InvalidOtpError();
    }

    if (storedToken.expiresAt < new Date()) {
      throw new OtpExpiredError();
    }

    if (storedToken.usedAt) {
      throw new InvalidOtpError();
    }

    const tokenHash = this._tokenHasher.hash(request.otp);

    if (storedToken.tokenHash !== tokenHash) {
      throw new InvalidOtpError();
    }

    storedToken.usedAt = new Date();

    await this._userTokenRepository.update(storedToken);

    return {
      message: "OTP verified successfully.",
    };
  }
}
