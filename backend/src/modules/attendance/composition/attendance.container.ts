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
import { MongoTransactionManager } from "../../../shared/infrastructure/database/transactions/mongo-transaction.manager";
import { GetStudentAttendanceHistoryUseCase } from "../application/use-cases/get-student-attendance-history.use-case";
import { GetStudentAttendanceSummaryUseCase } from "../application/use-cases/get-student-attendance-summary.use-case";

import { GetSchoolAttendanceUseCase } from "../application/use-cases/get-school-attendance.use-case";
import { BatchAttendanceService } from "../application/services/batch-attendance.service";
import { GetAdminBatchAttendanceUseCase } from "../application/use-cases/get-admin-batch-attendance.use-case";

const attendanceRepository = new AttendanceRepositoryImpl();
const teacherRepository = new TeacherRepositoryImpl();
const batchRepository = new BatchRepositoryImpl();
const studentRepository = new StudentRepositoryImpl();
const classRepository = new ClassRepositoryImpl();
const transactionManager = new MongoTransactionManager();

const batchAttendanceService = new BatchAttendanceService(
  attendanceRepository,
  studentRepository,
);

const markAttendanceUseCase = new MarkAttendanceUseCase(
  attendanceRepository,
  teacherRepository,
  batchRepository,
  studentRepository,
  transactionManager,
);

const getBatchAttendanceUseCase = new GetBatchAttendanceUseCase(
  teacherRepository,
  batchRepository,
  batchAttendanceService,
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

const getStudentAttendanceHistoryUseCase = new GetStudentAttendanceHistoryUseCase(
  attendanceRepository,
  teacherRepository,
  batchRepository,
  studentRepository,
);

const getStudentAttendanceSummaryUseCase = new GetStudentAttendanceSummaryUseCase(
  attendanceRepository,
  teacherRepository,
  batchRepository,
  studentRepository,
);

const getSchoolAttendanceUseCase = new GetSchoolAttendanceUseCase(
  classRepository,
  batchRepository,
  studentRepository,
  attendanceRepository,
);

const getAdminBatchAttendanceUseCase =
  new GetAdminBatchAttendanceUseCase(
    batchRepository,
    batchAttendanceService,
  );

export const attendanceController = new AttendanceController(
  markAttendanceUseCase,
  getBatchAttendanceUseCase,
  updateAttendanceUseCase,
  getMyBatchUseCase,
  getStudentAttendanceHistoryUseCase,
  getStudentAttendanceSummaryUseCase,
  getSchoolAttendanceUseCase,
  getAdminBatchAttendanceUseCase,
);
