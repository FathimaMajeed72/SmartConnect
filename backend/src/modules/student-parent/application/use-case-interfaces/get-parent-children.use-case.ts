import { GetParentChildrenResponse } from "../dtos/get-parent-children.response";

export interface IGetParentChildrenUseCase {
  execute(parentUserId: string): Promise<GetParentChildrenResponse[]>;
}