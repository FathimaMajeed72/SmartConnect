import { AdminController } from "../presentation/controllers/admin.controller";

import { GetParentsUseCase } from "../application/use-cases/get-parents.use-case";

import { AdminRepositoryImpl } from "../infrastructure/database/repositories/admin.repository.impl";
import { AddParentUseCase } from "../application/use-cases/add-parent.use-case";
import { inviteUserUseCase } from "../../auth/composition/auth.container";
import { GetTeachersUseCase } from "../application/use-cases/get-teachers.use-case";
import { AddTeacherUseCase } from "../application/use-cases/add-teacher.use-case";
import { TeacherRepositoryImpl } from "../infrastructure/database/repositories/teacher.repository.impl";

const adminRepository = new AdminRepositoryImpl();

const teacherRepository = new TeacherRepositoryImpl();

const getParentsUseCase = new GetParentsUseCase(
  adminRepository,
);

const addParentUseCase = new AddParentUseCase(
  inviteUserUseCase,
);

const getTeachersUseCase = new GetTeachersUseCase(
  adminRepository,
);

const addTeacherUseCase = new AddTeacherUseCase(
  inviteUserUseCase,
  teacherRepository,
);

export const adminController = new AdminController(
  getParentsUseCase,
  addParentUseCase,
  getTeachersUseCase,
  addTeacherUseCase
);