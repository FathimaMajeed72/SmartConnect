import crypto from "crypto";

import { TokenHasher } from "../../application/interfaces/token-hasher.interface";

export class Sha256TokenHasher
  implements TokenHasher {

  hash(token: string): string {
    return crypto
      .createHash("sha256")
      .update(token)
      .digest("hex");
  }
}