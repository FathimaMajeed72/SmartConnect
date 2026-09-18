import { AdminController } from "../presentation/controllers/admin.controller";

import { GetParentsUseCase } from "../application/use-cases/get-parents.use-case";

import { AdminRepositoryImpl } from "../infrastructure/database/repositories/admin.repository.impl";
import { AddParentUseCase } from "../application/use-cases/add-parent.use-case";
import { 
  inviteUserUseCase, 
  userRepository,
  userTokenRepository,
  randomTokenGenerator,
  tokenHasher,
  emailService, 
} from "../../auth/composition/auth.container";
import { GetTeachersUseCase } from "../application/use-cases/get-teachers.use-case";
import { AddTeacherUseCase } from "../application/use-cases/add-teacher.use-case";
import { TeacherRepositoryImpl } from "../infrastructure/database/repositories/teacher.repository.impl";
import { GetTeacherUseCase } from "../application/use-cases/get-teacher.use-case";
import { UpdateTeacherUseCase } from "../application/use-cases/update-teacher.use-case";
import { UpdateTeacherStatusUseCase } from "../application/use-cases/update-teacher-status.use-case";
import { ResendTeacherInvitationUseCase } from "../application/use-cases/resend-teacher-invitation.use-case";

const adminRepository = new AdminRepositoryImpl();

const teacherRepository = new TeacherRepositoryImpl();

const getParentsUseCase = new GetParentsUseCase(adminRepository);

const addParentUseCase = new AddParentUseCase(inviteUserUseCase);

const getTeachersUseCase = new GetTeachersUseCase(adminRepository);

const addTeacherUseCase = new AddTeacherUseCase(inviteUserUseCase, teacherRepository);

const getTeacherUseCase = new GetTeacherUseCase(adminRepository);

const updateTeacherUseCase = new UpdateTeacherUseCase(userRepository, teacherRepository);

const updateTeacherStatusUseCase = new UpdateTeacherStatusUseCase(userRepository);

const resendTeacherInvitationUseCase = new ResendTeacherInvitationUseCase(
  userRepository,
  userTokenRepository,
  randomTokenGenerator,
  tokenHasher,
  emailService,
);

export const adminController = new AdminController(
  getParentsUseCase,
  addParentUseCase,
  getTeachersUseCase,
  addTeacherUseCase,
  getTeacherUseCase,
  updateTeacherUseCase,
  updateTeacherStatusUseCase,
  resendTeacherInvitationUseCase
);
