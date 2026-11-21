import { IAttendanceRepository } from "../../domain/repositories/attendance.repository";
import { ITeacherRepository } from "../../../admin/domain/repositories/teacher.repository";
import { IBatchRepository } from "../../../batch/domain/repositories/batch.repository";
import { IStudentRepository } from "../../../student/domain/repositories/student.repository";

import { GetStudentAttendanceHistoryRequest } from "../dtos/get-student-attendance-history.request";
import { GetStudentAttendanceHistoryResponse } from "../dtos/get-student-attendance-history.response";

import { EntityNotFoundError } from "../../../../shared/errors/entity-not-found.error";
import { UnauthorizedBatchAccessError } from "../errors/unauthorized-batch-access.error";
import { IGetStudentAttendanceHistoryUseCase } from "../use-case-interfaces/get-student-attendance-history.usecase.interface";

export class GetStudentAttendanceHistoryUseCase implements IGetStudentAttendanceHistoryUseCase {
  constructor(
    private readonly _attendanceRepository: IAttendanceRepository,
    private readonly _teacherRepository: ITeacherRepository,
    private readonly _batchRepository: IBatchRepository,
    private readonly _studentRepository: IStudentRepository,
  ) {}

  async execute(
    request: GetStudentAttendanceHistoryRequest,
    userId: string,
  ): Promise<GetStudentAttendanceHistoryResponse> {
    const teacher = await this._teacherRepository.findByUserId(userId);

    if (!teacher) {
      throw new EntityNotFoundError("Teacher");
    }

    const batch = await this._batchRepository.findByClassTeacherId(teacher.id!);

    if (!batch) {
      throw new EntityNotFoundError("Batch");
    }

    const student = await this._studentRepository.findById(request.studentId);

    if (!student) {
      throw new EntityNotFoundError("Student");
    }

    if (student.batchId !== batch.id) {
      throw new UnauthorizedBatchAccessError();
    }

    const startDate = request.startDate
      ? new Date(`${request.startDate}T00:00:00.000Z`)
      : undefined;

    const endDate = request.endDate ? new Date(`${request.endDate}T23:59:59.999Z`) : undefined;

    const result = await this._attendanceRepository.findByStudentInDateRange(
      student.id!,
      startDate,
      endDate,
      request.page,
      request.limit,
    );

    return {
      studentId: student.id!,
      attendance: result.attendance.map((record) => ({
        attendanceId: record.id!,
        date: record.date,
        status: record.status,
        remarks: record.remarks,
      })),
      total: result.total,
      page: request.page,
      limit: request.limit,
      totalPages: Math.ceil(result.total / request.limit),
    };
  }
}
