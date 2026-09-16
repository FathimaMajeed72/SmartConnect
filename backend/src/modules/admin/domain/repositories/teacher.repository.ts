import { IBaseRepository } from "../../../../shared/domain/repositories/base.repository";
import { Teacher } from "../entities/teacher.entity";


export interface ITeacherRepository
  extends IBaseRepository<Teacher> {

  findByUserId(userId: string): Promise<Teacher | null>;

  findByTeacherId(teacherId: string): Promise<Teacher | null>;

  findLatestTeacherId(): Promise<string | null>;
}