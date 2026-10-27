import { AssignParentToStudentController } from "../presentation/controllers/assign-parent-to-student.controller";

import { StudentParentRepositoryImpl } from "../infrastructure/database/repositories/student-parent.repository.impl";
import { StudentRepositoryImpl } from "../../student/infrastructure/database/repositories/student.repository.impl";
import { UserRepositoryImpl } from "../../auth/infrastructure/database/repositories/user.repository.impl";

import { AssignParentToStudentUseCase } from "../application/use-cases/assign-parent-to-student.use-case";
import { GetStudentParentsUseCase } from "../application/use-cases/get-student-parents.use-case";
import { UpdateStudentParentStatusUseCase } from "../application/use-cases/update-student-parent-status.use-case";
import { UpdateStudentParentUseCase } from "../application/use-cases/update-student-parent.use-case";

const studentParentRepository = new StudentParentRepositoryImpl();

const studentRepository = new StudentRepositoryImpl();

const userRepository = new UserRepositoryImpl();

const assignParentToStudentUseCase = new AssignParentToStudentUseCase(
  studentRepository,
  userRepository,
  studentParentRepository,
);

const getStudentParentsUseCase = new GetStudentParentsUseCase(
  studentRepository,
  userRepository,
  studentParentRepository,
);

const updateStudentParentStatusUseCase = new UpdateStudentParentStatusUseCase(
  studentRepository,
  studentParentRepository,
);

const updateStudentParentUseCase = new UpdateStudentParentUseCase(
  studentRepository,
  studentParentRepository,
);

export const studentParentController = new AssignParentToStudentController(
  assignParentToStudentUseCase,
  getStudentParentsUseCase,
  updateStudentParentStatusUseCase,
  updateStudentParentUseCase,
);
