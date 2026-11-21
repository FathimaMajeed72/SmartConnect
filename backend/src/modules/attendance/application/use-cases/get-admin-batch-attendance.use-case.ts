import { IGetAdminBatchAttendanceUseCase } from "../use-case-interfaces/get-admin-batch-attendance.use-case.interface";

import { GetAdminBatchAttendanceRequest } from "../dtos/get-admin-batch-attendance.request";
import { GetAdminBatchAttendanceResponse } from "../dtos/get-admin-batch-attendance.response";

import { IBatchRepository } from "../../../batch/domain/repositories/batch.repository";

import { BatchAttendanceService } from "../services/batch-attendance.service";

import { EntityNotFoundError } from "../../../../shared/errors/entity-not-found.error";
import { InvalidAttendanceDateError } from "../errors/invalid-attendance-date.error";

export class GetAdminBatchAttendanceUseCase
  implements IGetAdminBatchAttendanceUseCase
{
  constructor(
    private readonly _batchRepository: IBatchRepository,
    private readonly _batchAttendanceService: BatchAttendanceService,
  ) {}

  async execute(
    request: GetAdminBatchAttendanceRequest,
  ): Promise<GetAdminBatchAttendanceResponse> {
    const batch = await this._batchRepository.findById(request.batchId);

    if (!batch) {
      throw new EntityNotFoundError("Batch");
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
      ...attendanceDetails,
    };
  }
}