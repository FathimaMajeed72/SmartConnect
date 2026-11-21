import { IBaseRepository } from "../../../../shared/domain/repositories/base.repository";
import { AttendanceEntity } from "../entities/attendance.entity";

import type { ITransactionContext } from "../../../../shared/domain/transactions/transaction-context.interface";

export interface IAttendanceRepository extends IBaseRepository<AttendanceEntity> {
  createMany(
    attendance: AttendanceEntity[],
    context: ITransactionContext,
  ): Promise<AttendanceEntity[]>;

  findByStudentAndDate(studentId: string, date: Date): Promise<AttendanceEntity | null>;

  findByBatchAndDate(batchId: string, date: Date): Promise<AttendanceEntity[]>;

  findByBatchesAndDate(batchIds: string[], date: Date): Promise<AttendanceEntity[]>;

  findByStudent(
    studentId: string,
    page: number,
    limit: number,
  ): Promise<{
    attendance: AttendanceEntity[];
    total: number;
  }>;

  existsByBatchAndDate(batchId: string, date: Date): Promise<boolean>;

  findByStudentInDateRange(
    studentId: string,
    startDate: Date | undefined,
    endDate: Date | undefined,
    page: number,
    limit: number,
  ): Promise<{
    attendance: AttendanceEntity[];
    total: number;
  }>;

  getStudentAttendanceSummary(
    studentId: string,
    startDate?: Date,
    endDate?: Date,
  ): Promise<{
    present: number;
    absent: number;
    late: number;
    excused: number;
  }>;
}
