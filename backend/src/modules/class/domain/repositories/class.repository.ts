import { IBaseRepository } from "../../../../shared/domain/repositories/base.repository";
import { ClassEntity } from "../entities/class.entity";
import { ClassStatus } from "../enums/class-status.enum";

export interface IClassRepository extends IBaseRepository<ClassEntity> {
  findAll(
    page: number,
    limit: number,
    search?: string,
    status?: ClassStatus
  ): Promise<{
    classes: ClassEntity[];
    total: number;
  }>;

  updateStatus(id: string, status: ClassStatus): Promise<ClassEntity>;
}