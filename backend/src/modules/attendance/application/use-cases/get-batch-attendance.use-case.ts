import { IGetBatchAttendanceUseCase } from "../use-case-interfaces/get-batch-attendance.use-case.interface";

import { GetBatchAttendanceRequest } from "../dtos/get-batch-attendance.request";
import { GetBatchAttendanceResponse } from "../dtos/get-batch-attendance.response";

import { IAttendanceRepository } from "../../domain/repositories/attendance.repository";
import { ITeacherRepository } from "../../../admin/domain/repositories/teacher.repository";
import { IBatchRepository } from "../../../batch/domain/repositories/batch.repository";
import { IStudentRepository } from "../../../student/domain/repositories/student.repository";

import { BatchStatus } from "../../../batch/domain/enums/batch-status.enum";

import { EntityNotFoundError } from "../../../../shared/errors/entity-not-found.error";
import { AttendanceInactiveBatchError } from "../errors/attendance-inactive-batch.error";
import { UnauthorizedBatchAccessError } from "../errors/unauthorized-batch-access.error";

export class GetBatchAttendanceUseCase
  implements IGetBatchAttendanceUseCase
{
  constructor(
    private readonly _attendanceRepository: IAttendanceRepository,
    private readonly _teacherRepository: ITeacherRepository,
    private readonly _batchRepository: IBatchRepository,
    private readonly _studentRepository: IStudentRepository,
  ) {}

  async execute(
    request: GetBatchAttendanceRequest,
    userId: string,
  ): Promise<GetBatchAttendanceResponse> {

    const teacher = await this._teacherRepository.findByUserId(userId);

    if (!teacher) {
      throw new EntityNotFoundError("Teacher");
    }

    const batch = await this._batchRepository.findById(request.batchId);

    if (!batch) {
      throw new EntityNotFoundError("Batch");
    }

    if (batch.status !== BatchStatus.ACTIVE) {
      throw new AttendanceInactiveBatchError();
    }

    if (
      !batch.classTeacherId ||
      batch.classTeacherId !== teacher.id
    ) {
      throw new UnauthorizedBatchAccessError();
    }

    const attendanceDate = new Date(
      `${request.date}T00:00:00.000Z`,
    );

    const [students, attendanceRecords] = await Promise.all([
      this._studentRepository.findActiveByBatchId(batch.id),

      this._attendanceRepository.findByBatchAndDate(
        batch.id,
        attendanceDate,
      ),
    ]);

    const attendanceMap = new Map(
      attendanceRecords.map((record) => [
        record.studentId,
        record,
      ]),
    );

    const studentAttendance = students.map((student) => {
      const attendance = attendanceMap.get(student.id);

      return {
        studentId: student.id,
        admissionNumber: student.admissionNumber,
        firstName: student.firstName,
        lastName: student.lastName,
        profileImage: student.profileImage,
        status: attendance?.status ?? null,
        remarks: attendance?.remarks,
      };
    });

    return {
      batchId: batch.id,
      date: request.date,
      totalStudents: students.length,
      attendanceMarked: attendanceRecords.length > 0,
      students: studentAttendance,
    };
  }
}