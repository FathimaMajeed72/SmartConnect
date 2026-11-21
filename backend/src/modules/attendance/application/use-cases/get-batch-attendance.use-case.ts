import { IGetBatchAttendanceUseCase } from "../use-case-interfaces/get-batch-attendance.use-case.interface";

import { GetBatchAttendanceRequest } from "../dtos/get-batch-attendance.request";
import { GetBatchAttendanceResponse } from "../dtos/get-batch-attendance.response";

import { ITeacherRepository } from "../../../admin/domain/repositories/teacher.repository";
import { IBatchRepository } from "../../../batch/domain/repositories/batch.repository";

import { BatchStatus } from "../../../batch/domain/enums/batch-status.enum";

import { BatchAttendanceService } from "../services/batch-attendance.service";

import { EntityNotFoundError } from "../../../../shared/errors/entity-not-found.error";
import { AttendanceInactiveBatchError } from "../errors/attendance-inactive-batch.error";
import { UnauthorizedBatchAccessError } from "../errors/unauthorized-batch-access.error";
import { InvalidAttendanceDateError } from "../errors/invalid-attendance-date.error";

export class GetBatchAttendanceUseCase implements IGetBatchAttendanceUseCase {
  constructor(
    private readonly _teacherRepository: ITeacherRepository,
    private readonly _batchRepository: IBatchRepository,
    private readonly _batchAttendanceService: BatchAttendanceService,
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

    if (!batch.classTeacherId || batch.classTeacherId !== teacher.id) {
      throw new UnauthorizedBatchAccessError();
    }

    const datePattern = /^\d{4}-\d{2}-\d{2}$/;

    if (!datePattern.test(request.date)) {
      throw new InvalidAttendanceDateError();
    }

    const attendanceDate = new Date(`${request.date}T00:00:00.000Z`);

    if (
      Number.isNaN(attendanceDate.getTime()) ||
      attendanceDate.toISOString().slice(0, 10) !== request.date
    ) {
      throw new InvalidAttendanceDateError();
    }

    const attendanceDetails =
      await this._batchAttendanceService.getBatchAttendance(
        batch.id,
        attendanceDate,
      );

    return {
      batchId: batch.id,
      date: request.date,
      totalStudents: attendanceDetails.totalStudents,
      attendanceMarked: attendanceDetails.attendanceMarked,
      students: attendanceDetails.students,
    };
  }
}