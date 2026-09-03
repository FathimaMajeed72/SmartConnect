import { HttpStatusCode } from "../../enums/http-status-code.enum";

export interface IErrorStatusMapper {
  getStatusCode(errorCode: string): HttpStatusCode | undefined;
}