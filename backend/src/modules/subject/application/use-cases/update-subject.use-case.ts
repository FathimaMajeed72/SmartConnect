import { ISubjectRepository } from "../../domain/repositories/subject.repository";

import { UpdateSubjectRequest } from "../dtos/update-subject.request";
import { UpdateSubjectResponse } from "../dtos/update-subject.response";

import { SubjectNotFoundError } from "../errors/subject-not-found.error";
import { SubjectCodeAlreadyExistsError } from "../errors/subject-code-already-exists.error";

import { IUpdateSubjectUseCase } from "../use-case-interfaces/update-subject.use-case.interface";

export class UpdateSubjectUseCase
  implements IUpdateSubjectUseCase
{
  constructor(
    private readonly _subjectRepository: ISubjectRepository,
  ) {}

  async execute(
    id: string,
    request: UpdateSubjectRequest,
  ): Promise<UpdateSubjectResponse> {

    const existingSubject =
      await this._subjectRepository.findById(id);

    if (!existingSubject) {
      throw new SubjectNotFoundError();
    }

    const subjectWithSameCode =
      await this._subjectRepository.findByCode(
        request.code,
      );

    if (
      subjectWithSameCode &&
      subjectWithSameCode.id !== id
    ) {
      throw new SubjectCodeAlreadyExistsError();
    }

    existingSubject.name = request.name;
    existingSubject.code = request.code.toUpperCase();
    existingSubject.updatedAt = new Date();

    await this._subjectRepository.update(
      existingSubject,
    );

    return {
      message: "Subject updated successfully.",
    };
  }
}