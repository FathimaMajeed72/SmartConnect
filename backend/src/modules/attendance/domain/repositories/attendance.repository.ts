import { IBaseRepository } from "../../../../shared/domain/repositories/base.repository";
import { AttendanceEntity } from "../entities/attendance.entity";

export interface IAttendanceRepository extends IBaseRepository<AttendanceEntity> {
  createMany(attendance: AttendanceEntity[]): Promise<AttendanceEntity[]>;

  findByStudentAndDate(studentId: string, date: Date): Promise<AttendanceEntity | null>;

  findByBatchAndDate(batchId: string, date: Date): Promise<AttendanceEntity[]>;

  findByStudent(
    studentId: string,
    page: number,
    limit: number,
  ): Promise<{
    attendance: AttendanceEntity[];
    total: number;
  }>;

  existsByBatchAndDate(batchId: string, date: Date): Promise<boolean>;
}
