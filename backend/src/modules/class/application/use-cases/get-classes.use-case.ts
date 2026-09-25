import { IClassRepository } from "../../domain/repositories/class.repository";

import { IGetClassesUseCase } from "../use-case-interfaces/get-classes.use-case.interface";

import { GetClassesQuery } from "../types/get-classes-query.type";
import { GetClassesResponse } from "../types/get-classes-response.type";

export class GetClassesUseCase implements IGetClassesUseCase {
  constructor(
    private readonly _classRepository: IClassRepository,
  ) {}

  async execute(
    query: GetClassesQuery,
  ): Promise<GetClassesResponse> {
    const { page, limit, search, status } = query;

    const result = await this._classRepository.findAll(
      page,
      limit,
      search,
      status,
    );

    const totalPages = Math.ceil(result.total / limit);

    return {
      classes: result.classes,
      page,
      limit,
      total: result.total,
      totalPages,
    };
  }
}