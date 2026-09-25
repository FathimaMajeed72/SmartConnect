import { UpdateClassRequest } from "../dtos/update-class.request";
import { UpdateClassResponse } from "../dtos/update-class.response";

export interface IUpdateClassUseCase {
  execute(
    id: string,
    request: UpdateClassRequest,
  ): Promise<UpdateClassResponse>;
}