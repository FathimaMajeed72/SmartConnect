import { IStudentRepository } from "../../../student/domain/repositories/student.repository";

import { IStudentParentRepository } from "../../domain/repositories/student-parent.repository";
import { StudentParentStatus } from "../../domain/enums/student-parent-status.enum";

import { UpdateStudentParentStatusRequest } from "../dtos/update-student-parent-status.request";
import { UpdateStudentParentStatusResponse } from "../dtos/update-student-parent-status.response";

import { IUpdateStudentParentStatusUseCase } from "../use-case-interfaces/update-student-parent-status.use-case.interface";

import { StudentNotFoundError } from "../errors/student-not-found.error";
import { StudentParentRelationshipNotFoundError } from "../errors/student-parent-relationship-not-found.error";
import { PrimaryContactAlreadyExistsError } from "../errors/primary-contact-already-exists.error";

export class UpdateStudentParentStatusUseCase implements IUpdateStudentParentStatusUseCase {
  constructor(
    private readonly _studentRepository: IStudentRepository,
    private readonly _studentParentRepository: IStudentParentRepository,
  ) {}

  async execute(
    request: UpdateStudentParentStatusRequest,
  ): Promise<UpdateStudentParentStatusResponse> {
    const student = await this._studentRepository.findById(request.studentId);

    if (!student) {
      throw new StudentNotFoundError();
    }

    const relationship = await this._studentParentRepository.findByStudentAndParent(
      request.studentId,
      request.parentUserId,
    );

    if (!relationship) {
      throw new StudentParentRelationshipNotFoundError();
    }

    if (
      request.status === StudentParentStatus.ACTIVE &&
      relationship.status === StudentParentStatus.INACTIVE &&
      relationship.isPrimaryContact
    ) {
      const hasPrimaryContact = await this._studentParentRepository.existsActivePrimaryContact(
        request.studentId,
        relationship.id,
      );

      if (hasPrimaryContact) {
        throw new PrimaryContactAlreadyExistsError();
      }
    }

    const updatedRelationship = await this._studentParentRepository.update({
      ...relationship,
      status: request.status,
      isPrimaryContact:
        request.status === StudentParentStatus.INACTIVE ? false : relationship.isPrimaryContact,
      updatedAt: new Date(),
    });

    return {
      id: updatedRelationship.id,
      studentId: updatedRelationship.studentId,
      parentUserId: updatedRelationship.parentUserId,
      relationship: updatedRelationship.relationship,
      isPrimaryContact: updatedRelationship.isPrimaryContact,
      status: updatedRelationship.status,
      createdAt: updatedRelationship.createdAt,
      updatedAt: updatedRelationship.updatedAt,
    };
  }
}
