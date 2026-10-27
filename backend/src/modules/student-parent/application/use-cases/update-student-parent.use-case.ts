import { IStudentRepository } from "../../../student/domain/repositories/student.repository";

import { IStudentParentRepository } from "../../domain/repositories/student-parent.repository";
import { StudentParentStatus } from "../../domain/enums/student-parent-status.enum";

import { UpdateStudentParentRequest } from "../dtos/update-student-parent.request";
import { UpdateStudentParentResponse } from "../dtos/update-student-parent.response";

import { IUpdateStudentParentUseCase } from "../use-case-interfaces/update-student-parent.use-case.interface";

import { StudentNotFoundError } from "../errors/student-not-found.error";
import { StudentParentRelationshipNotFoundError } from "../errors/student-parent-relationship-not-found.error";
import { PrimaryContactAlreadyExistsError } from "../errors/primary-contact-already-exists.error";
import { InactiveStudentParentRelationshipError } from "../errors/inactive-student-parent-relationship.error";

export class UpdateStudentParentUseCase
  implements IUpdateStudentParentUseCase
{
  constructor(
    private readonly _studentRepository: IStudentRepository,
    private readonly _studentParentRepository: IStudentParentRepository,
  ) {}

  async execute(
    request: UpdateStudentParentRequest,
  ): Promise<UpdateStudentParentResponse> {
    const student = await this._studentRepository.findById(
      request.studentId,
    );

    if (!student) {
      throw new StudentNotFoundError();
    }

    const existingRelationship =
      await this._studentParentRepository.findByStudentAndParent(
        request.studentId,
        request.parentUserId,
      );

    if (!existingRelationship) {
      throw new StudentParentRelationshipNotFoundError();
    }

    if (existingRelationship.status !== StudentParentStatus.ACTIVE) {
      throw new InactiveStudentParentRelationshipError();
    }

    if (
      request.isPrimaryContact &&
      !existingRelationship.isPrimaryContact
    ) {
      const hasPrimaryContact =
        await this._studentParentRepository.existsActivePrimaryContact(
          request.studentId,
          existingRelationship.id,
        );

      if (hasPrimaryContact) {
        throw new PrimaryContactAlreadyExistsError();
      }
    }

    const updatedRelationship =
      await this._studentParentRepository.update({
        ...existingRelationship,
        relationship: request.relationship,
        isPrimaryContact: request.isPrimaryContact,
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