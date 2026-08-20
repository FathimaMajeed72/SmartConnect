import { AdminController } from "../presentation/controllers/admin.controller";

import { GetParentsUseCase } from "../application/use-cases/get-parents.use-case";

import { AdminRepositoryImpl } from "../infrastructure/database/repositories/admin.repository.impl";
import { AddParentUseCase } from "../application/use-cases/add-parent.use-case";
import { inviteUserUseCase } from "../../auth/composition/auth.container";

const adminRepository = new AdminRepositoryImpl();

const getParentsUseCase = new GetParentsUseCase(
  adminRepository,
);

const addParentUseCase = new AddParentUseCase(
  inviteUserUseCase,
);

export const adminController = new AdminController(
  getParentsUseCase,
  addParentUseCase,
);