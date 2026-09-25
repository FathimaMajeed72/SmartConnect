import { UpdateClassStatusRequest } from "../dtos/update-class-status.request";
import { UpdateClassStatusResponse } from "../dtos/update-class-status.response";

export interface IUpdateClassStatusUseCase {
  execute(
    id: string,
    request: UpdateClassStatusRequest,
  ): Promise<UpdateClassStatusResponse>;
}