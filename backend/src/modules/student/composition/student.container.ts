import { StudentController } from "../presentation/controllers/student.controller";

import { StudentRepositoryImpl } from "../infrastructure/database/repositories/student.repository.impl";

import { CreateStudentUseCase } from "../application/use-cases/create-student.use-case";
import { GetStudentsUseCase } from "../application/use-cases/get-students.use-case";
import { GetStudentUseCase } from "../application/use-cases/get-student.use-case";
import { UpdateStudentStatusUseCase } from "../application/use-cases/update-student-status.use-case";


const studentRepository = new StudentRepositoryImpl();


const createStudentUseCase = new CreateStudentUseCase(
  studentRepository,
);

const getStudentsUseCase = new GetStudentsUseCase(
  studentRepository,
);

const getStudentByIdUseCase = new GetStudentUseCase(
  studentRepository,
);

const updateStudentStatusUseCase = new UpdateStudentStatusUseCase(
  studentRepository,
);

export const studentController = new StudentController(
  createStudentUseCase,
  getStudentsUseCase,
  getStudentByIdUseCase,
  updateStudentStatusUseCase,
);