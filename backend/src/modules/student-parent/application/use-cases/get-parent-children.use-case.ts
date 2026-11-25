import { IStudentParentRepository } from "../../../student-parent/domain/repositories/student-parent.repository";
import { IStudentRepository } from "../../../student/domain/repositories/student.repository";
import { IGetParentChildrenUseCase } from "../use-case-interfaces/get-parent-children.use-case";
import { StudentStatus } from "../../../student/domain/enums/student-status.enum";
import { IClassRepository } from "../../../class/domain/repositories/class.repository";
import { IBatchRepository } from "../../../batch/domain/repositories/batch.repository";
import { GetParentChildrenResponse } from "../dtos/get-parent-children.response";

export class GetParentChildrenUseCase implements IGetParentChildrenUseCase {
  constructor(
    private readonly _studentParentRepository: IStudentParentRepository,
    private readonly _studentRepository: IStudentRepository,
    private readonly _classRepository: IClassRepository,
    private readonly _batchRepository: IBatchRepository,
  ) {}

  async execute(parentUserId: string): Promise<GetParentChildrenResponse[]> {
    const relationships = await this._studentParentRepository.findByParentUserId(parentUserId);

    if (!relationships.length) {
      return [];
    }

    const studentIds = relationships.map((relationship) => relationship.studentId);

    const students = await this._studentRepository.findByIds(studentIds);

    const activeStudents = students.filter((student) => student.status === StudentStatus.ACTIVE);

    if (!activeStudents.length) {
      return [];
    }

    const classes = await this._classRepository.findAllClasses();

    const batches = await this._batchRepository.findAllBatches();

    return activeStudents.map((student) => {
      const studentClass = classes.find((classItem) => classItem.id === student.classId);

      const batch = student.batchId
        ? batches.find((batchItem) => batchItem.id === student.batchId)
        : undefined;

      return {
        id: student.id,
        admissionNumber: student.admissionNumber,
        firstName: student.firstName,
        lastName: student.lastName,
        dateOfBirth: student.dateOfBirth,
        gender: student.gender,
        profileImage: student.profileImage,
        classId: student.classId,
        className: studentClass?.name ?? "",
        classCode: studentClass?.code ?? "",
        academicYear: studentClass?.academicYear ?? "",
        batchId: student.batchId,
        batchName: batch?.name,
      };
    });
  }
}
