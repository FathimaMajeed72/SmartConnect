import { AttendanceController } from "../presentation/controllers/attendance.controller";

import { AttendanceRepositoryImpl } from "../infrastructure/repositories/attendance.repository.impl"; 

import { TeacherRepositoryImpl } from "../../admin/infrastructure/database/repositories/teacher.repository.impl";
import { BatchRepositoryImpl } from "../../batch/infrastructure/database/repositories/batch.repository.impl";
import { StudentRepositoryImpl } from "../../student/infrastructure/database/repositories/student.repository.impl";

import { MarkAttendanceUseCase } from "../application/use-cases/mark-attendance.use-case";
import { GetBatchAttendanceUseCase } from "../application/use-cases/get-batch-attendance.use-case";
import { UpdateAttendanceUseCase } from "../application/use-cases/update-attendance.use-case";
import { GetMyBatchUseCase } from "../application/use-cases/get-my-batch.use-case";
import { ClassRepositoryImpl } from "../../class/infrastructure/database/repositories/class.repository.impl";

const attendanceRepository = new AttendanceRepositoryImpl();
const teacherRepository = new TeacherRepositoryImpl();
const batchRepository = new BatchRepositoryImpl();
const studentRepository = new StudentRepositoryImpl();
const classRepository = new ClassRepositoryImpl();

const markAttendanceUseCase = new MarkAttendanceUseCase(
  attendanceRepository,
  teacherRepository,
  batchRepository,
  studentRepository,
);

const getBatchAttendanceUseCase = new GetBatchAttendanceUseCase(
  attendanceRepository,
  teacherRepository,
  batchRepository,
  studentRepository,
);

const updateAttendanceUseCase = new UpdateAttendanceUseCase(
  attendanceRepository,
  teacherRepository,
  batchRepository,
  studentRepository,
);

const getMyBatchUseCase = new GetMyBatchUseCase(
  teacherRepository,
  batchRepository,
  classRepository,
);

export const attendanceController = new AttendanceController(
  markAttendanceUseCase,
  getBatchAttendanceUseCase,
  updateAttendanceUseCase,
  getMyBatchUseCase
);