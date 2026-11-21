import { IGetStudentAttendanceSummaryUseCase } from "../use-case-interfaces/get-student-attendance-summary.use-case.interface";

import { GetStudentAttendanceSummaryRequest } from "../dtos/get-student-attendance-summary.request";
import { GetStudentAttendanceSummaryResponse } from "../dtos/get-student-attendance-summary.response";

import { IAttendanceRepository } from "../../domain/repositories/attendance.repository";
import { ITeacherRepository } from "../../../admin/domain/repositories/teacher.repository";
import { IBatchRepository } from "../../../batch/domain/repositories/batch.repository";
import { IStudentRepository } from "../../../student/domain/repositories/student.repository";

import { EntityNotFoundError } from "../../../../shared/errors/entity-not-found.error";
import { UnauthorizedBatchAccessError } from "../errors/unauthorized-batch-access.error";

export class GetStudentAttendanceSummaryUseCase implements IGetStudentAttendanceSummaryUseCase {
  constructor(
    private readonly _attendanceRepository: IAttendanceRepository,
    private readonly _teacherRepository: ITeacherRepository,
    private readonly _batchRepository: IBatchRepository,
    private readonly _studentRepository: IStudentRepository,
  ) {}

  async execute(
    request: GetStudentAttendanceSummaryRequest,
    userId: string,
  ): Promise<GetStudentAttendanceSummaryResponse> {
  
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


    const summary = await this._attendanceRepository.getStudentAttendanceSummary(
      student.id!,
      startDate,
      endDate,
    );

    const totalAttendanceDays = summary.present + summary.absent + summary.late;

    const attendedDays = summary.present + summary.late;

    const attendancePercentage =
      totalAttendanceDays > 0 ? Number(((attendedDays / totalAttendanceDays) * 100).toFixed(2)) : 0;

    return {
      studentId: student.id!,
      present: summary.present,
      absent: summary.absent,
      late: summary.late,
      excused: summary.excused,
      totalAttendanceDays,
      attendedDays,
      attendancePercentage,
    };
  }
}
