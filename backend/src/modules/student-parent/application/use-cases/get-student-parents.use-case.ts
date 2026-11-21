import { IStudentRepository } from "../../../student/domain/repositories/student.repository";
import { IUserRepository } from "../../../auth/domain/repositories/user.repository";

import { IStudentParentRepository } from "../../domain/repositories/student-parent.repository";

import { StudentNotFoundError } from "../errors/student-not-found.error";

import { IGetStudentParentsUseCase } from "../use-case-interfaces/get-student-parents.use-case.interface";
import { GetStudentParentsResponse } from "../dtos/get-student-parents.response";

export class GetStudentParentsUseCase implements IGetStudentParentsUseCase {
  constructor(
    private readonly _studentRepository: IStudentRepository,
    private readonly _userRepository: IUserRepository,
    private readonly _studentParentRepository: IStudentParentRepository,
  ) {}

  async execute(studentId: string): Promise<GetStudentParentsResponse[]> {
    const student = await this._studentRepository.findById(studentId);

    if (!student) {
      throw new StudentNotFoundError();
    }

    const relationships =
      await this._studentParentRepository.findByStudentId(studentId);

    const results = await Promise.all(
      relationships.map(async (relationship) => {
        const parent = await this._userRepository.findById(
          relationship.parentUserId,
        );

        if (!parent) {
          return null;
        }

        return {
          id: relationship.id,
          parentUserId: parent.id,
          parentName: `${parent.firstName} ${parent.lastName}`.trim(),
          email: parent.email,
          phone: parent.phone,
          relationship: relationship.relationship,
          isPrimaryContact: relationship.isPrimaryContact,
          status: relationship.status,
        };
      }),
    );

    return results.filter(
      (parent): parent is GetStudentParentsResponse => parent !== null,
    );
  }
}