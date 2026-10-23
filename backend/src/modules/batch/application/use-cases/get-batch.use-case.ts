import { IBatchRepository } from "../../domain/repositories/batch.repository";
import { IGetBatchUseCase } from "../use-case-interfaces/get-batch.use-case.interface";
import { GetBatchResponse } from "../dtos/get-batch-response"; 
import { BatchNotFoundError } from "../errors/batch-not-found.error"; 

export class GetBatchUseCase implements IGetBatchUseCase {
  constructor(
    private readonly _batchRepository: IBatchRepository,
  ) {}

  async execute( classId: string, batchId: string): Promise<GetBatchResponse> {
    const batch = await this._batchRepository.findById(batchId);

    if (!batch || batch.classId !== classId) {
      throw new BatchNotFoundError();
    }

    return {
      batch: {
        id: batch.id,
        name: batch.name,
        classId: batch.classId,
        classTeacherId: batch.classTeacherId,
        capacity: batch.capacity,
        status: batch.status,
        createdAt: batch.createdAt,
        updatedAt: batch.updatedAt,
      },
    };
  }
}