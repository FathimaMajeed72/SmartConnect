import { SubjectEntity } from "../../domain/entities/subject.entity";
import { SubjectStatus } from "../../domain/enums/subject-status.enum";

import { CreateSubjectRequest } from "../dtos/create-subject.request";
import { CreateSubjectResponse } from "../dtos/create-subject.response";
import { GetSubjectResponse } from "../dtos/get-subject.response";
import { SubjectDetails } from "../types/get-subject-response.type";

export class SubjectDtoMapper {
  static toEntity(
    request: CreateSubjectRequest,
  ): SubjectEntity {
    return {
      id: "",
      name: request.name,
      code: request.code.toUpperCase(),
      status: SubjectStatus.ACTIVE,
      createdAt: new Date(),
      updatedAt: new Date(),
    };
  }

  static toCreateResponse(
    subject: SubjectEntity,
  ): CreateSubjectResponse {
    return {
      message: "Subject created successfully.",
      subjectId: subject.id,
    };
  }

  static toDetails(
    subject: SubjectEntity,
  ): SubjectDetails {
    return {
      id: subject.id,
      name: subject.name,
      code: subject.code,
      status: subject.status,
      createdAt: subject.createdAt,
      updatedAt: subject.updatedAt,
    };
  }

  static toGetResponse(
    subject: SubjectEntity,
  ): GetSubjectResponse {
    return {
      subject: this.toDetails(subject),
    };
  }

}