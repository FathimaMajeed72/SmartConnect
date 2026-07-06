import { User } from "../entities/user.entity";
import { UserStatus } from "../enums/user-status.enum";

export interface UserRepository {
  create(user: User): Promise<User>;

  findById(id: string): Promise<User | null>;

  findByEmail(email: string): Promise<User | null>;

  update(user: User): Promise<User>;

  updateStatus(id: string, status: UserStatus): Promise<User>;
}
