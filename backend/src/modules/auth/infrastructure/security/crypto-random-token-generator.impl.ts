import crypto from "crypto";

import { IRandomTokenGenerator } from "../../application/interfaces/random-token-generator.interface";

export class CryptoRandomTokenGenerator
  implements IRandomTokenGenerator {

  generate(length = 32): string {
    return crypto.randomBytes(length).toString("hex");
  }
}