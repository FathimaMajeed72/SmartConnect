import { IMarkAttendanceUseCase } from "../use-case-interfaces/mark-attendance.use-case.interface";

import { MarkAttendanceRequest } from "../dtos/mark-attendance.request";
import { MarkAttendanceResponse } from "../dtos/mark-attendance.response";

import { AttendanceEntity } from "../../domain/entities/attendance.entity";
import { AttendanceStatus } from "../../domain/enums/attendance-status.enum";

import { IAttendanceRepository } from "../../domain/repositories/attendance.repository";
import { ITeacherRepository } from "../../../admin/domain/repositories/teacher.repository";
import { IBatchRepository } from "../../../batch/domain/repositories/batch.repository";
import { IStudentRepository } from "../../../student/domain/repositories/student.repository";

import { BatchStatus } from "../../../batch/domain/enums/batch-status.enum";

import { EntityNotFoundError } from "../../../../shared/errors/entity-not-found.error";
import { AttendanceInactiveBatchError } from "../errors/attendance-inactive-batch.error";
import { UnauthorizedBatchAccessError } from "../errors/unauthorized-batch-access.error";
import { FutureAttendanceDateError } from "../errors/future-attendance-date.error";
import { NoActiveStudentsError } from "../errors/no-active-students.error";
import { EmptyAttendanceError } from "../errors/empty-attendance.error";
import { DuplicateStudentEntriesError } from "../errors/duplicate-student-entries.error";
import { InvalidStudentEntriesError } from "../errors/invalid-student-entries.error";
import { IncompleteAttendanceError } from "../errors/incomplete-attendance.error";
import { AttendanceAlreadyMarkedError } from "../errors/attendance-already-marked.error";
import { DuplicateKeyError } from "../../../../shared/errors/duplicate-key.error";

export class MarkAttendanceUseCase implements IMarkAttendanceUseCase {
  constructor(
    private readonly _attendanceRepository: IAttendanceRepository,
    private readonly _teacherRepository: ITeacherRepository,
    private readonly _batchRepository: IBatchRepository,
    private readonly _studentRepository: IStudentRepository,
  ) {}

  async execute(request: MarkAttendanceRequest, userId: string): Promise<MarkAttendanceResponse> {
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

    const attendanceDate = new Date(request.date);

    const dateKey = attendanceDate.toISOString().slice(0, 10);

    const normalizedAttendanceDate = new Date(`${dateKey}T00:00:00.000Z`);

    const todayKey = new Intl.DateTimeFormat("en-CA", {
      timeZone: "Asia/Kolkata",
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
    }).format(new Date());

    if (dateKey > todayKey) {
      throw new FutureAttendanceDateError();
    }

    const activeStudents = await this._studentRepository.findActiveByBatchId(batch.id);

    if (activeStudents.length === 0) {
      throw new NoActiveStudentsError();
    }

    if (!request.attendance.length) {
      throw new EmptyAttendanceError();
    }

    const submittedStudentIds = request.attendance.map((item) => item.studentId);

    const uniqueStudentIds = new Set(submittedStudentIds);

    if (uniqueStudentIds.size !== submittedStudentIds.length) {
      throw new DuplicateStudentEntriesError();
    }

    const activeStudentIds = new Set(activeStudents.map((student) => student.id));

    const invalidStudents = submittedStudentIds.filter(
      (studentId) => !activeStudentIds.has(studentId),
    );

    if (invalidStudents.length > 0) {
      throw new InvalidStudentEntriesError();
    }

    if (submittedStudentIds.length !== activeStudents.length) {
      throw new IncompleteAttendanceError();
    }

    const attendanceExists = await this._attendanceRepository.existsByBatchAndDate(
      batch.id,
      normalizedAttendanceDate,
    );

    if (attendanceExists) {
      throw new AttendanceAlreadyMarkedError();
    }

    const now = new Date();

    const attendanceEntities: AttendanceEntity[] = request.attendance.map((item) => ({
      id: "",
      studentId: item.studentId,
      batchId: batch.id,
      classId: batch.classId,
      date: normalizedAttendanceDate,
      status: item.status,
      markedBy: userId,
      remarks: item.remarks?.trim(),
      createdAt: now,
      updatedAt: now,
    }));

    let savedAttendance: AttendanceEntity[];

    try {
      savedAttendance = await this._attendanceRepository.createMany(attendanceEntities);
    } catch (error) {
      if (error instanceof DuplicateKeyError) {
        throw new AttendanceAlreadyMarkedError();
      }

      throw error;
    }

    const summary = {
      present: 0,
      absent: 0,
      late: 0,
      excused: 0,
    };

    for (const record of savedAttendance) {
      switch (record.status) {
        case AttendanceStatus.PRESENT:
          summary.present++;
          break;

        case AttendanceStatus.ABSENT:
          summary.absent++;
          break;

        case AttendanceStatus.LATE:
          summary.late++;
          break;

        case AttendanceStatus.EXCUSED:
          summary.excused++;
          break;
      }
    }

    return {
      batchId: batch.id,
      date: normalizedAttendanceDate,
      totalStudents: savedAttendance.length,
      ...summary,
      submittedAt: now,
    };
  }
}
