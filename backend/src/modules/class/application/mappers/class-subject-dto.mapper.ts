import { ClassSubjectEntity } from "../../domain/entities/class-subject.entity";
import { ClassSubjectStatus } from "../../domain/enums/class-subject-status.enum";

import { AssignClassSubjectRequest } from "../dtos/assign-class-subject.request";
import { AssignClassSubjectResponse } from "../dtos/assign-class-subject.response";

import { GetClassSubjectsResponse } from "../dtos/get-class-subjects.response"; 
import { ClassSubjectDetails } from "../../domain/types/class-subject-details.type";

export class ClassSubjectDtoMapper {
  static toEntity(
    request: AssignClassSubjectRequest,
    classId: string,
  ): ClassSubjectEntity {
    return {
      id: "",
      classId,
      subjectId: request.subjectId,
      teacherId: request.teacherId,
      status: ClassSubjectStatus.ACTIVE,
      createdAt: new Date(),
      updatedAt: new Date(),
    };
  }

  static toAssignResponse(
    classSubject: ClassSubjectEntity,
  ): AssignClassSubjectResponse {
    return {
      message: "Subject assigned to class successfully.",
      classSubjectId: classSubject.id,
    };
  }

  static toGetResponse(
    classSubjects: ClassSubjectDetails[],
  ): GetClassSubjectsResponse {
    return {
      classSubjects,
    };
  }
}

