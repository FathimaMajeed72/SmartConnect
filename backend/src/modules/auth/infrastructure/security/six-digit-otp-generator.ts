import { IOtpGenerator } from "../../application/interfaces/otp-generator.interface";

export class SixDigitOtpGenerator implements IOtpGenerator {
  generate(): string {
    return Math.floor(100000 + Math.random() * 900000).toString();
  }
}