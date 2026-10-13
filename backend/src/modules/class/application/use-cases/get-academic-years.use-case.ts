import { IClassRepository } from "../../domain/repositories/class.repository";
import { IGetAcademicYearsUseCase } from "../use-case-interfaces/get-academic-years.use-case.interface";

export class GetAcademicYearsUseCase implements IGetAcademicYearsUseCase {
  constructor(
    private readonly _classRepository: IClassRepository,
  ) {}

  async execute(): Promise<string[]> {
    return this._classRepository.getAcademicYears();
  }
}