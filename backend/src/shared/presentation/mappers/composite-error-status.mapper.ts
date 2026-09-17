import { HttpStatusCode } from "../../enums/http-status-code.enum";
import { IErrorStatusMapper } from "../interfaces/error-status-mapper.interface";

export class CompositeErrorStatusMapper
  implements IErrorStatusMapper
{
  constructor(
    private readonly _mappers: IErrorStatusMapper[],
  ) {}

  getStatusCode(
    errorCode: string,
  ): HttpStatusCode | undefined {
    for (const mapper of this._mappers) {
      const statusCode =
        mapper.getStatusCode(errorCode);

      if (statusCode !== undefined) {
        return statusCode;
      }
    }

    return undefined;
  }
}