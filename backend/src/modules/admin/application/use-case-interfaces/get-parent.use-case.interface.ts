import { ParentDetails } from "../types/get-parent-response.type";

export interface IGetParentUseCase {
  execute(parentId: string): Promise<ParentDetails | null>;
}