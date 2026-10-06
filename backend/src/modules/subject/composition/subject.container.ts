import { SubjectRepositoryImpl } from "../infrastructure/database/repositories/subject.repository.impl";

import { CreateSubjectUseCase } from "../application/use-cases/create-subject.use-case";
import { GetSubjectsUseCase } from "../application/use-cases/get-subjects.use-case";
import { GetSubjectUseCase } from "../application/use-cases/get-subject.use-case";
import { UpdateSubjectUseCase } from "../application/use-cases/update-subject.use-case";
import { UpdateSubjectStatusUseCase } from "../application/use-cases/update-subject-status.use-case"; 

import { SubjectController } from "../presentation/controllers/subject.controller";


const subjectRepository =
  new SubjectRepositoryImpl();

const createSubjectUseCase =
  new CreateSubjectUseCase(
    subjectRepository,
  );

const getSubjectsUseCase =
  new GetSubjectsUseCase(
    subjectRepository,
  );

const getSubjectUseCase =
  new GetSubjectUseCase(
    subjectRepository,
  );

const updateSubjectUseCase =
  new UpdateSubjectUseCase(
    subjectRepository,
  );

const updateSubjectStatusUseCase =
  new UpdateSubjectStatusUseCase(
    subjectRepository,
  );

export const subjectController =
  new SubjectController(
    createSubjectUseCase,
    getSubjectsUseCase,
    getSubjectUseCase,
    updateSubjectUseCase,
    updateSubjectStatusUseCase,
  );