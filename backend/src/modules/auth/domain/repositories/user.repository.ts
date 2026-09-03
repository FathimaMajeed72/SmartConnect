import { IBaseRepository } from "../../../../shared/domain/repositories/base.repository";
import { User } from "../entities/user.entity";
import { UserStatus } from "../enums/user-status.enum";

export interface IUserRepository extends IBaseRepository<User>{

  findByEmail(email: string): Promise<User | null>;

  updateStatus(id: string, status: UserStatus): Promise<User>;
}
