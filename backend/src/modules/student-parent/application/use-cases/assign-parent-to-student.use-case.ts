import { IStudentRepository } from "../../../student/domain/repositories/student.repository";
import { IUserRepository } from "../../../auth/domain/repositories/user.repository";

import { StudentParentEntity } from "../../domain/entities/student-parent.entity";
import { StudentParentStatus } from "../../domain/enums/student-parent-status.enum";
import { IStudentParentRepository } from "../../domain/repositories/student-parent.repository";

import { Role } from "../../../auth/domain/enums/role.enum";

import { AssignParentToStudentRequest } from "../dtos/assign-parent-to-student.request";
import { AssignParentToStudentResponse } from "../dtos/assign-parent-to-student.response";
import { IAssignParentToStudentUseCase } from "../use-case-interfaces/assign-parent-to-student.use-case.interface";

import { StudentNotFoundError } from "../errors/student-not-found.error";
import { ParentNotFoundError } from "../errors/parent-not-found.error";
import { UserIsNotParentError } from "../errors/user-is-not-parent.error";
import { StudentParentAlreadyExistsError } from "../errors/student-parent-already-exists.error";
import { PrimaryContactAlreadyExistsError } from "../errors/primary-contact-already-exists.error";
import { InactiveParentError } from "../errors/inactive-parent.error";
import { InactiveStudentError } from "../errors/inactive-student.error";

import { StudentParentDtoMapper } from "../mappers/student-parent-dto.mapper";

import { DuplicateKeyError } from "../../../../shared/errors/duplicate-key.error";
import { StudentStatus } from "../../../student/domain/enums/student-status.enum";
import { UserStatus } from "../../../auth/domain/enums/user-status.enum";

export class AssignParentToStudentUseCase
  implements IAssignParentToStudentUseCase
{
  constructor(
    private readonly _studentRepository: IStudentRepository,
    private readonly _userRepository: IUserRepository,
    private readonly _studentParentRepository: IStudentParentRepository,
  ) {}

  async execute(
    request: AssignParentToStudentRequest,
  ): Promise<AssignParentToStudentResponse> {
    
    const student = await this._studentRepository.findById(
      request.studentId,
    );

    if (!student) {
      throw new StudentNotFoundError();
    }

    if (student.status !== StudentStatus.ACTIVE) {
      throw new InactiveStudentError();
    }

   
    const parent = await this._userRepository.findById(
      request.parentUserId,
    );

    if (!parent) {
      throw new ParentNotFoundError();
    }

    if (parent.role !== Role.PARENT) {
      throw new UserIsNotParentError();
    }

    if (parent.status !== UserStatus.ACTIVE) {
      throw new InactiveParentError();
    }

 
    const existingRelationship =
      await this._studentParentRepository.findByStudentAndParent(
        request.studentId,
        request.parentUserId,
      );

    
    if (
      existingRelationship?.status === StudentParentStatus.ACTIVE
    ) {
      throw new StudentParentAlreadyExistsError();
    }

  
    if (request.isPrimaryContact) {
      const hasPrimaryContact =
        await this._studentParentRepository.existsActivePrimaryContact(
          request.studentId,
          existingRelationship?.id,
        );

      if (hasPrimaryContact) {
        throw new PrimaryContactAlreadyExistsError();
      }
    }


    if (existingRelationship) {
      let reactivatedRelationship: StudentParentEntity;

      try {
        reactivatedRelationship =
          await this._studentParentRepository.update({
            ...existingRelationship,
            relationship: request.relationship,
            isPrimaryContact: request.isPrimaryContact,
            status: StudentParentStatus.ACTIVE,
            updatedAt: new Date(),
          });
      } catch (error) {
        if (
          error instanceof PrimaryContactAlreadyExistsError
        ) {
          throw error;
        }

        if (
          error instanceof DuplicateKeyError &&
          error.field === "studentId_parentUserId"
        ) {
          throw new StudentParentAlreadyExistsError();
        }

        throw error;
      }

      return StudentParentDtoMapper.toAssignResponse(
        reactivatedRelationship,
      );
    }

    const studentParent: StudentParentEntity = {
      id: "",
      studentId: request.studentId,
      parentUserId: request.parentUserId,
      relationship: request.relationship,
      isPrimaryContact: request.isPrimaryContact,
      status: StudentParentStatus.ACTIVE,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    let createdRelationship: StudentParentEntity;

    try {
      createdRelationship =
        await this._studentParentRepository.create(
          studentParent,
        );
    } catch (error) {
      if (
        error instanceof PrimaryContactAlreadyExistsError
      ) {
        throw error;
      }

      if (
        error instanceof DuplicateKeyError &&
        error.field === "studentId_parentUserId"
      ) {
        throw new StudentParentAlreadyExistsError();
      }

      throw error;
    }

    return StudentParentDtoMapper.toAssignResponse(
      createdRelationship,
    );
  }
}