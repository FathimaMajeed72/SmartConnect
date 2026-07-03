import bcrypt from "bcryptjs";

import { PasswordHasher } from "../../application/interfaces/password-hasher.interface";

import { env } from "../../../../config/env";

export class BcryptPasswordHasher implements PasswordHasher {

  async hash(password: string): Promise<string> {
    return bcrypt.hash(password, env.bcryptSaltRounds);
  }

  async compare(
    password: string,
    hashedPassword: string
  ): Promise<boolean> {
    return bcrypt.compare(password, hashedPassword);
  }
}