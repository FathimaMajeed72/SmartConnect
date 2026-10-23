import { BatchController } from "../presentation/controllers/batch.controller";

import { BatchRepositoryImpl } from "../infrastructure/database/repositories/batch.repository.impl";
import { ClassRepositoryImpl } from "../../class/infrastructure/database/repositories/class.repository.impl";
import { TeacherRepositoryImpl } from "../../admin/infrastructure/database/repositories/teacher.repository.impl";

import { CreateBatchUseCase } from "../application/use-cases/create-batch.use-case";
import { GetBatchesUseCase } from "../application/use-cases/get-batches.use-case";
import { GetBatchUseCase } from "../application/use-cases/get-batch.use-case";
import { UpdateBatchUseCase } from "../application/use-cases/update-batch.use-case";
import { UpdateBatchStatusUseCase } from "../application/use-cases/update-batch-status.use-case";
import { UserRepositoryImpl } from "../../auth/infrastructure/database/repositories/user.repository.impl";

import { GetAvailableClassTeachersUseCase } from "../application/use-cases/get-available-class-teachers.use-case";

const batchRepository = new BatchRepositoryImpl();

const classRepository = new ClassRepositoryImpl();

const teacherRepository = new TeacherRepositoryImpl();

const userRepository = new UserRepositoryImpl();

const createBatchUseCase = new CreateBatchUseCase(
  batchRepository,
  classRepository,
  teacherRepository,
  userRepository,
);

const getBatchesUseCase = new GetBatchesUseCase(
  batchRepository,
  classRepository,
  teacherRepository,
  userRepository,
);

const getBatchUseCase = new GetBatchUseCase(batchRepository);

const updateBatchUseCase = new UpdateBatchUseCase(
  batchRepository,
  classRepository,
  teacherRepository,
  userRepository,
);

const updateBatchStatusUseCase = new UpdateBatchStatusUseCase(
  batchRepository,
  classRepository,
  teacherRepository,
  userRepository,
);

const getAvailableClassTeachersUseCase = new GetAvailableClassTeachersUseCase(
  teacherRepository,
  userRepository,
  batchRepository,
);

export const batchController = new BatchController(
  createBatchUseCase,
  getBatchesUseCase,
  getBatchUseCase,
  updateBatchUseCase,
  updateBatchStatusUseCase,
  getAvailableClassTeachersUseCase,
);
