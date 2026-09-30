import { ClassController } from "../presentation/controllers/class.controller";

import { ClassRepositoryImpl } from "../infrastructure/database/repositories/class.repository.impl";

import { CreateClassUseCase } from "../application/use-cases/create-class.use-case";
import { GetClassesUseCase } from "../application/use-cases/get-classes.use-case";
import { GetClassUseCase } from "../application/use-cases/get-class.use-case";
import { UpdateClassUseCase } from "../application/use-cases/update-class.use-case";
import { UpdateClassStatusUseCase } from "../application/use-cases/update-class-status.use-case";

const classRepository = new ClassRepositoryImpl();

const createClassUseCase = new CreateClassUseCase(
  classRepository,
);

const getClassesUseCase = new GetClassesUseCase(
  classRepository,
);

const getClassUseCase = new GetClassUseCase(
  classRepository,
);

const updateClassUseCase = new UpdateClassUseCase(
  classRepository,
);

const updateClassStatusUseCase = new UpdateClassStatusUseCase(
  classRepository,
);

export const classController = new ClassController(
  createClassUseCase,
  getClassesUseCase,
  getClassUseCase,
  updateClassUseCase,
  updateClassStatusUseCase,
);