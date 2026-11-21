import { IAttendanceRepository } from "../../domain/repositories/attendance.repository";
import { IStudentRepository } from "../../../student/domain/repositories/student.repository";

import { AttendanceStatus } from "../../domain/enums/attendance-status.enum";

export class BatchAttendanceService {
  constructor(
    private readonly _attendanceRepository: IAttendanceRepository,
    private readonly _studentRepository: IStudentRepository,
  ) {}

  async getBatchAttendance(batchId: string, date: Date) {
    const [students, attendanceRecords] = await Promise.all([
      this._studentRepository.findActiveByBatchId(batchId),
      this._attendanceRepository.findByBatchAndDate(batchId, date),
    ]);

    const attendanceMap = new Map(
      attendanceRecords.map((record) => [record.studentId, record]),
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

    const countByStatus = (status: AttendanceStatus) =>
      attendanceRecords.filter((record) => record.status === status).length;

    return {
      totalStudents: students.length,
      attendanceMarked: attendanceRecords.length > 0,
      present: countByStatus(AttendanceStatus.PRESENT),
      absent: countByStatus(AttendanceStatus.ABSENT),
      late: countByStatus(AttendanceStatus.LATE),
      excused: countByStatus(AttendanceStatus.EXCUSED),
      students: studentAttendance,
    };
  }
}