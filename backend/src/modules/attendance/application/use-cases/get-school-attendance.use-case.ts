import { IGetSchoolAttendanceUseCase } from "../use-case-interfaces/get-school-attendance.use-case.interface";

import { GetSchoolAttendanceRequest } from "../dtos/get-school-attendance.request";
import { GetSchoolAttendanceResponse } from "../dtos/get-school-attendance.response";

import { IClassRepository } from "../../../class/domain/repositories/class.repository";
import { IBatchRepository } from "../../../batch/domain/repositories/batch.repository";
import { IStudentRepository } from "../../../student/domain/repositories/student.repository";
import { IAttendanceRepository } from "../../domain/repositories/attendance.repository";

import { EntityNotFoundError } from "../../../../shared/errors/entity-not-found.error";
import { InvalidAttendanceDateError } from "../errors/invalid-attendance-date.error";

export class GetSchoolAttendanceUseCase
  implements IGetSchoolAttendanceUseCase
{
  constructor(
    private readonly _classRepository: IClassRepository,
    private readonly _batchRepository: IBatchRepository,
    private readonly _studentRepository: IStudentRepository,
    private readonly _attendanceRepository: IAttendanceRepository,
  ) {}

  async execute(
    request: GetSchoolAttendanceRequest,
  ): Promise<GetSchoolAttendanceResponse> {
    
    const datePattern = /^\d{4}-\d{2}-\d{2}$/;

    if (!datePattern.test(request.date)) {
      throw new InvalidAttendanceDateError();
    }

    const attendanceDate = new Date(
      `${request.date}T00:00:00.000Z`,
    );

    if (
      Number.isNaN(attendanceDate.getTime()) ||
      attendanceDate.toISOString().slice(0, 10) !== request.date
    ) {
      throw new InvalidAttendanceDateError();
    }

    
    let classes;

    if (request.classId) {
      const selectedClass = await this._classRepository.findById(
        request.classId,
      );

      if (!selectedClass) {
        throw new EntityNotFoundError("Class");
      }

      if (
        request.academicYear &&
        selectedClass.academicYear !== request.academicYear
      ) {
        throw new EntityNotFoundError("Class");
      }

      classes = [selectedClass];
    } else if (request.academicYear) {
      classes = await this._classRepository.findByAcademicYear(
        request.academicYear,
      );
    } else {
      classes = await this._classRepository.findAllClasses();
    }

    let batches = await this._batchRepository.findAllBatches();

    const classIds = new Set(classes.map((classItem) => classItem.id));

    batches = batches.filter((batch) =>
      classIds.has(batch.classId),
    );

    if (request.batchId) {
      const selectedBatch = await this._batchRepository.findById(
        request.batchId,
      );

      if (!selectedBatch) {
        throw new EntityNotFoundError("Batch");
      }

      if (!classIds.has(selectedBatch.classId)) {
        throw new EntityNotFoundError("Batch");
      }

      batches = [selectedBatch];
    }

    if (batches.length === 0) {
      return this.createEmptyResponse();
    }

    const batchIds = batches.map((batch) => batch.id!);

    const [students, attendanceRecords] = await Promise.all([
      this._studentRepository.findActiveByBatchIds(batchIds),

      this._attendanceRepository.findByBatchesAndDate(
        batchIds,
        attendanceDate,
      ),
    ]);

    const classNameMap = new Map(
      classes.map((classItem) => [classItem.id!, classItem.name]),
    );

    const batchSummaries = batches.map((batch) => {
      const batchStudents = students.filter(
        (student) => student.batchId === batch.id,
      );

      const batchAttendance = attendanceRecords.filter(
        (record) => record.batchId === batch.id,
      );

      const counts = this.calculateCounts(batchAttendance);

      return {
        batchId: batch.id!,
        batchName: batch.name,
        className: classNameMap.get(batch.classId) ?? "",
        totalStudents: batchStudents.length,
        ...counts,
        attendancePercentage: this.calculatePercentage(counts),
      };
    });

    const schoolCounts = this.calculateCounts(attendanceRecords);

    const summary = {
      totalStudents: students.length,
      ...schoolCounts,
      attendancePercentage: this.calculatePercentage(schoolCounts),
    };

    return {
      summary,
      batches: batchSummaries,
    };
  }

  private calculateCounts(records: { status: string }[]) {
    return {
      present: records.filter(
        (record) => record.status === "PRESENT",
      ).length,

      absent: records.filter(
        (record) => record.status === "ABSENT",
      ).length,

      late: records.filter(
        (record) => record.status === "LATE",
      ).length,

      excused: records.filter(
        (record) => record.status === "EXCUSED",
      ).length,
    };
  }

  private calculatePercentage(counts: {
    present: number;
    absent: number;
    late: number;
    excused: number;
  }): number {
    const totalAttendanceDays =
      counts.present + counts.absent + counts.late;

    const attendedDays = counts.present + counts.late;

    return totalAttendanceDays > 0
      ? Number(
          ((attendedDays / totalAttendanceDays) * 100).toFixed(2),
        )
      : 0;
  }

  private createEmptyResponse(): GetSchoolAttendanceResponse {
    return {
      summary: {
        totalStudents: 0,
        present: 0,
        absent: 0,
        late: 0,
        excused: 0,
        attendancePercentage: 0,
      },
      batches: [],
    };
  }
}