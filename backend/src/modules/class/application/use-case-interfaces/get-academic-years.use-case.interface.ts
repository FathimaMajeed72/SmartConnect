export interface IGetAcademicYearsUseCase {
  execute(): Promise<string[]>;
}