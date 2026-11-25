import { IGetParentAttendanceUseCase } from "../use-case-interfaces/get-parent-attendance.use-case";

import { GetParentAttendanceRequest } from "../dtos/get-parent-attendance.request";
import { GetParentAttendanceResponse } from "../dtos/get-parent-attendance.response";

import { IAttendanceRepository } from "../../domain/repositories/attendance.repository";
import { IStudentParentRepository } from "../../../student-parent/domain/repositories/student-parent.repository";

import { UnauthorizedParentStudentAccessError } from "../errors/unauthorized-parent-student-access.error"; 

export class GetParentAttendanceUseCase
  implements IGetParentAttendanceUseCase
{
  constructor(
    private readonly _attendanceRepository: IAttendanceRepository,
    private readonly _studentParentRepository: IStudentParentRepository,
  ) {}

  async execute(
    request: GetParentAttendanceRequest,
    parentUserId: string,
  ): Promise<GetParentAttendanceResponse> {

    const relationship =
      await this._studentParentRepository.findActiveByStudentAndParent(
        request.studentId,
        parentUserId,
      );

    if (!relationship) {
      throw new UnauthorizedParentStudentAccessError();
    }

    const startDate = request.startDate
      ? new Date(`${request.startDate}T00:00:00.000Z`)
      : undefined;

    const endDate = request.endDate
      ? new Date(`${request.endDate}T23:59:59.999Z`)
      : undefined;

    const [attendanceResult, summary] = await Promise.all([
      this._attendanceRepository.findByStudentInDateRange(
        request.studentId,
        startDate,
        endDate,
        request.page,
        request.limit,
      ),

      this._attendanceRepository.getStudentAttendanceSummary(
        request.studentId,
        startDate,
        endDate,
      ),
    ]);

    const totalAttendanceDays =
      summary.present + summary.absent + summary.late;

    const attendedDays = summary.present + summary.late;

    const attendancePercentage =
      totalAttendanceDays > 0
        ? Number(
            ((attendedDays / totalAttendanceDays) * 100).toFixed(2),
          )
        : 0;

    return {
      studentId: request.studentId,

      summary: {
        ...summary,
        totalAttendanceDays,
        attendedDays,
        attendancePercentage,
      },

      attendance: attendanceResult.attendance.map((record) => ({
        id: record.id!,
        date: record.date,
        status: record.status,
        remarks: record.remarks,
      })),

      pagination: {
        page: request.page,
        limit: request.limit,
        total: attendanceResult.total,
        totalPages: Math.ceil(
          attendanceResult.total / request.limit,
        ),
      },
    };
  }
}