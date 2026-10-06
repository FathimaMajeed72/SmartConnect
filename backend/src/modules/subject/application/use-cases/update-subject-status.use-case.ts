import { ISubjectRepository } from "../../domain/repositories/subject.repository";

import { UpdateSubjectStatusRequest } from "../dtos/update-subject-status.request";
import { UpdateSubjectStatusResponse } from "../dtos/update-subject-status.response";

import { SubjectNotFoundError } from "../errors/subject-not-found.error";

import { IUpdateSubjectStatusUseCase } from "../use-case-interfaces/update-subject-status.use-case.interface";

export class UpdateSubjectStatusUseCase
  implements IUpdateSubjectStatusUseCase
{
  constructor(
    private readonly _subjectRepository: ISubjectRepository,
  ) {}

  async execute(
    id: string,
    request: UpdateSubjectStatusRequest,
  ): Promise<UpdateSubjectStatusResponse> {
    const existingSubject =
      await this._subjectRepository.findById(id);

    if (!existingSubject) {
      throw new SubjectNotFoundError();
    }

    await this._subjectRepository.updateStatus(
      id,
      request.status,
    );

    return {
      message: "Subject status updated successfully.",
    };
  }
}