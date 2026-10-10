import { ClassController } from "../presentation/controllers/class.controller";

import { ClassRepositoryImpl } from "../infrastructure/database/repositories/class.repository.impl";

import { CreateClassUseCase } from "../application/use-cases/create-class.use-case";
import { GetClassesUseCase } from "../application/use-cases/get-classes.use-case";
import { GetClassUseCase } from "../application/use-cases/get-class.use-case";
import { UpdateClassUseCase } from "../application/use-cases/update-class.use-case";
import { UpdateClassStatusUseCase } from "../application/use-cases/update-class-status.use-case";
import { ClassSubjectRepositoryImpl } from "../infrastructure/database/repositories/class-subject.repository.impl";
import { GetClassSubjectsUseCase } from "../application/use-cases/get-class-subjects.use-case";
import { AssignClassSubjectUseCase } from "../application/use-cases/assign-class-subject.use-case";
import { SubjectRepositoryImpl } from "../../subject/infrastructure/database/repositories/subject.repository.impl";
import { TeacherRepositoryImpl } from "../../admin/infrastructure/database/repositories/teacher.repository.impl";
import { UserRepositoryImpl } from "../../auth/infrastructure/database/repositories/user.repository.impl";

const classRepository = new ClassRepositoryImpl();

const classSubjectRepository = new ClassSubjectRepositoryImpl();

const subjectRepository = new SubjectRepositoryImpl();

const teacherRepository = new TeacherRepositoryImpl();

const userRepository = new UserRepositoryImpl();

const createClassUseCase = new CreateClassUseCase(classRepository);

const getClassesUseCase = new GetClassesUseCase(classRepository);

const getClassUseCase = new GetClassUseCase(classRepository);

const updateClassUseCase = new UpdateClassUseCase(classRepository);

const updateClassStatusUseCase = new UpdateClassStatusUseCase(classRepository);

const getClassSubjectsUseCase = new GetClassSubjectsUseCase(
  classRepository,
  classSubjectRepository,
);

const assignClassSubjectUseCase = new AssignClassSubjectUseCase(
  classRepository,
  subjectRepository,
  teacherRepository,
  classSubjectRepository,
  userRepository
);

export const classController = new ClassController(
  createClassUseCase,
  getClassesUseCase,
  getClassUseCase,
  updateClassUseCase,
  updateClassStatusUseCase,
  getClassSubjectsUseCase,
  assignClassSubjectUseCase,
);
