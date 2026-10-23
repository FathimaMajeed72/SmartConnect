import { IBatchRepository } from "../../domain/repositories/batch.repository";
import { IClassRepository } from "../../../class/domain/repositories/class.repository";
import { IGetBatchesUseCase } from "../use-case-interfaces/get-batches.use-case.interface";
import { GetBatchesResponse } from "../dtos/get-batches.response";
import { BatchClassNotFoundError } from "../errors/batch-class-not-found.error";
import { ITeacherRepository } from "../../../admin/domain/repositories/teacher.repository";
import { IUserRepository } from "../../../auth/domain/repositories/user.repository";

export class GetBatchesUseCase implements IGetBatchesUseCase {
  constructor(
    private readonly _batchRepository: IBatchRepository,
    private readonly _classRepository: IClassRepository,
    private readonly _teacherRepository: ITeacherRepository,
    private readonly _userRepository: IUserRepository,
  ) {}

  async execute(classId: string): Promise<GetBatchesResponse> {
    const classEntity = await this._classRepository.findById(classId);

    if (!classEntity) {
      throw new BatchClassNotFoundError();
    }

    const batches = await this._batchRepository.findByClassId(classEntity.id);

    const batchItems = await Promise.all(
      batches.map(async (batch) => {
        let classTeacherName: string;

        if (!batch.classTeacherId) {
          classTeacherName = "Not Assigned";
        } else {
          const teacher = await this._teacherRepository.findById(batch.classTeacherId);

          if (!teacher) {
            classTeacherName = "Unknown Teacher";
          } else {
            const teacherUser = await this._userRepository.findById(teacher.userId);

            classTeacherName = teacherUser
              ? `${teacherUser.firstName} ${teacherUser.lastName}`.trim()
              : "Unknown Teacher";
          }
        }

        return {
          id: batch.id,
          name: batch.name,
          classTeacherId: batch.classTeacherId,
          classTeacherName,
          capacity: batch.capacity,
          status: batch.status,
        };
      }),
    );

    return {
      batches: batchItems,
    };
  }
}
