import crypto from "crypto";

import { RandomTokenGenerator } from "../../application/interfaces/random-token-generator.interface";

export class CryptoRandomTokenGenerator
  implements RandomTokenGenerator {

  generate(length = 32): string {
    return crypto.randomBytes(length).toString("hex");
  }
}