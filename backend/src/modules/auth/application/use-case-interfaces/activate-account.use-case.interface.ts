import { ActivateAccountRequest } from "../dtos/activate-account.request";
import { ActivateAccountResponse } from "../dtos/activate-account.response";

export interface IActivateAccountUseCase {
  execute(request: ActivateAccountRequest): Promise<ActivateAccountResponse>;
}