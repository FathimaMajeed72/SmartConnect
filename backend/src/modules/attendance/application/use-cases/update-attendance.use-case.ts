import { IUpdateAttendanceUseCase } from "../use-case-interfaces/update-attendance.use-case.interface";

import { UpdateAttendanceRequest } from "../dtos/update-attendance.request";
import { UpdateAttendanceResponse } from "../dtos/update-attendance.response";

import { IAttendanceRepository } from "../../domain/repositories/attendance.repository";
import { ITeacherRepository } from "../../../admin/domain/repositories/teacher.repository";
import { IBatchRepository } from "../../../batch/domain/repositories/batch.repository";
import { IStudentRepository } from "../../../student/domain/repositories/student.repository";

import { BatchStatus } from "../../../batch/domain/enums/batch-status.enum";
import { StudentStatus } from "../../../student/domain/enums/student-status.enum";

import { EntityNotFoundError } from "../../../../shared/errors/entity-not-found.error";

import { AttendanceInactiveBatchError } from "../errors/attendance-inactive-batch.error";
import { UnauthorizedBatchAccessError } from "../errors/unauthorized-batch-access.error";
import { FutureAttendanceDateError } from "../errors/future-attendance-date.error";

export class UpdateAttendanceUseCase implements IUpdateAttendanceUseCase {
  constructor(
    private readonly _attendanceRepository: IAttendanceRepository,
    private readonly _teacherRepository: ITeacherRepository,
    private readonly _batchRepository: IBatchRepository,
    private readonly _studentRepository: IStudentRepository,
  ) {}

  async execute(
    request: UpdateAttendanceRequest,
    userId: string,
  ): Promise<UpdateAttendanceResponse> {

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

    const todayKey = new Intl.DateTimeFormat("en-CA", {
      timeZone: "Asia/Kolkata",
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
    }).format(new Date());

    if (request.date > todayKey) {
      throw new FutureAttendanceDateError();
    }

    const student = await this._studentRepository.findById(
      request.studentId,
    );

    if (!student) {
      throw new EntityNotFoundError("Student");
    }

    if (
      student.status !== StudentStatus.ACTIVE ||
      student.batchId !== batch.id
    ) {
      throw new EntityNotFoundError("Student in batch");
    }

    const attendance =
      await this._attendanceRepository.findByStudentAndDate(
        student.id,
        attendanceDate,
      );

    if (!attendance || attendance.batchId !== batch.id) {
      throw new EntityNotFoundError("Attendance");
    }

    const now = new Date();

    const updatedAttendance = await this._attendanceRepository.update({
      ...attendance,
      status: request.status,
      remarks:
        request.remarks !== undefined
          ? request.remarks.trim()
          : attendance.remarks,
      updatedBy: userId,
      updatedAt: now,
    });

    return {
      attendanceId: updatedAttendance.id,
      studentId: updatedAttendance.studentId,
      batchId: updatedAttendance.batchId,
      date: updatedAttendance.date.toISOString().slice(0, 10),
      status: updatedAttendance.status,
      remarks: updatedAttendance.remarks,
      updatedBy: updatedAttendance.updatedBy!,
      updatedAt: updatedAttendance.updatedAt ?? now,
    };
  }
}