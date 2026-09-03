import bcrypt from "bcryptjs";

import { IPasswordHasher } from "../../application/interfaces/password-hasher.interface";

import { env } from "../../../../config/env";

export class BcryptPasswordHasher implements IPasswordHasher {

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