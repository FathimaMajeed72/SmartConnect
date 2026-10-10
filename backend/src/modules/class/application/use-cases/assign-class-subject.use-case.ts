import { IAssignClassSubjectUseCase } from "../use-case-interfaces/assign-class-subject.use-case.interface";

import { AssignClassSubjectRequest } from "../dtos/assign-class-subject.request";
import { AssignClassSubjectResponse } from "../dtos/assign-class-subject.response";

import { IClassRepository } from "../../domain/repositories/class.repository";
import { ISubjectRepository } from "../../../subject/domain/repositories/subject.repository";
import { ITeacherRepository } from "../../../admin/domain/repositories/teacher.repository";
import { IClassSubjectRepository } from "../../domain/repositories/class-subject.repository";

import { TeacherNotFoundError } from "../../../admin/application/errors/teacher-not-found.error";
import { SubjectNotFoundError } from "../../../subject/application/errors/subject-not-found.error";
import { ClassNotFoundError } from "../errors/class-not-found.error";
import { ClassSubjectDtoMapper } from "../mappers/class-subject-dto.mapper";
import { ClassSubjectStatus } from "../../domain/enums/class-subject-status.enum";
import { ClassStatus } from "../../domain/enums/class-status.enum";
import { SubjectStatus } from "../../../subject/domain/enums/subject-status.enum";
import { IUserRepository } from "../../../auth/domain/repositories/user.repository";
import { UserStatus } from "../../../auth/domain/enums/user-status.enum";
import { InactiveClassError } from "../errors/inactive-class.error";
import { InactiveTeacherError } from "../errors/inactive-teacher.error";
import { InactiveSubjectError } from "../errors/inactive-subject.error";

export class AssignClassSubjectUseCase implements IAssignClassSubjectUseCase {
  constructor(
    private readonly _classRepository: IClassRepository,
    private readonly _subjectRepository: ISubjectRepository,
    private readonly _teacherRepository: ITeacherRepository,
    private readonly _classSubjectRepository: IClassSubjectRepository,
    private readonly _userRepository: IUserRepository,
  ) {}

  async execute(
    classId: string,
    request: AssignClassSubjectRequest,
  ): Promise<AssignClassSubjectResponse> {
    const existingClass = await this._classRepository.findById(classId);

    if (!existingClass) {
      throw new ClassNotFoundError();
    }

    if (existingClass.status !== ClassStatus.ACTIVE) {
      throw new InactiveClassError();
    }

    const existingSubject = await this._subjectRepository.findById(request.subjectId);

    if (!existingSubject) {
      throw new SubjectNotFoundError();
    }

    if (existingSubject.status !== SubjectStatus.ACTIVE) {
      throw new InactiveSubjectError();
    }

    const existingTeacher = await this._teacherRepository.findByUserId(request.teacherId);

    console.log("Requested teacher ID:", request.teacherId);
    console.log("Teacher found:", !!existingTeacher);

    if (!existingTeacher) {
      throw new TeacherNotFoundError();
    }

    const teacherUser = await this._userRepository.findById(existingTeacher.userId);

    console.log("Teacher's user ID:", existingTeacher.userId);
    console.log("Associated user found:", !!teacherUser);

    if (!teacherUser) {
      throw new TeacherNotFoundError();
    }

    if (teacherUser.status !== UserStatus.ACTIVE) {
      throw new InactiveTeacherError();
    }

    const existingAssignment = await this._classSubjectRepository.findByClassAndSubject(
      classId,
      request.subjectId,
    );

    if (existingAssignment) {
      const updatedAssignment = await this._classSubjectRepository.update({
        ...existingAssignment,
        teacherId: existingTeacher.id,
        status: ClassSubjectStatus.ACTIVE,
        updatedAt: new Date(),
      });

      return ClassSubjectDtoMapper.toAssignResponse(updatedAssignment);
    }

    const classSubject = ClassSubjectDtoMapper.toEntity(
      {
        ...request,
        teacherId: existingTeacher.id,
      },
      classId,
    );

    const createdClassSubject = await this._classSubjectRepository.create(classSubject);

    return ClassSubjectDtoMapper.toAssignResponse(createdClassSubject);
  }
}
