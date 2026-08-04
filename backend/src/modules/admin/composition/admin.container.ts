import { AdminController } from "../presentation/controllers/admin.controller";

import { GetParentsUseCase } from "../application/use-cases/get-parents.use-case";

import { AdminRepositoryImpl } from "../infrastructure/database/repositories/admin.repository.impl";

const adminRepository = new AdminRepositoryImpl();

const getParentsUseCase = new GetParentsUseCase(
  adminRepository,
);

export const adminController = new AdminController(
  getParentsUseCase,
);