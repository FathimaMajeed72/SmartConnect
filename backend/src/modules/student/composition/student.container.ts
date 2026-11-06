import { StudentController } from "../presentation/controllers/student.controller";

import { StudentRepositoryImpl } from "../infrastructure/database/repositories/student.repository.impl";

import { CreateStudentUseCase } from "../application/use-cases/create-student.use-case";
import { GetStudentsUseCase } from "../application/use-cases/get-students.use-case";
import { GetStudentUseCase } from "../application/use-cases/get-student.use-case";
import { UpdateStudentStatusUseCase } from "../application/use-cases/update-student-status.use-case";
import { ClassRepositoryImpl } from "../../class/infrastructure/database/repositories/class.repository.impl";
import { BatchRepositoryImpl } from "../../batch/infrastructure/database/repositories/batch.repository.impl";
import { AssignStudentsToBatchUseCase } from "../application/use-cases/assign-students-to-batch.use-case";
import { UnassignStudentsFromBatchUseCase } from "../application/use-cases/unassign-students-from-batch.use-case";

const studentRepository = new StudentRepositoryImpl();
const classRepository = new ClassRepositoryImpl();
const batchRepository = new BatchRepositoryImpl();

const createStudentUseCase = new CreateStudentUseCase(studentRepository, classRepository);

const getStudentsUseCase = new GetStudentsUseCase(studentRepository);

const getStudentByIdUseCase = new GetStudentUseCase(studentRepository);

const updateStudentStatusUseCase = new UpdateStudentStatusUseCase(studentRepository);

const assignStudentsToBatchUseCase = new AssignStudentsToBatchUseCase(
  studentRepository,
  batchRepository,
);

const unassignStudentsFromBatchUseCase = new UnassignStudentsFromBatchUseCase(
  studentRepository,
  batchRepository,
);

export const studentController = new StudentController(
  createStudentUseCase,
  getStudentsUseCase,
  getStudentByIdUseCase,
  updateStudentStatusUseCase,
  assignStudentsToBatchUseCase,
  unassignStudentsFromBatchUseCase,
);
