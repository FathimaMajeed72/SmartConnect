import { ClientSession } from "mongoose";

import { ITransactionContext } from "../../../domain/transactions/transaction-context.interface";
import { randomUUID } from "crypto";

export class MongoTransactionContext implements ITransactionContext {
  readonly transactionId = randomUUID();
  constructor(private readonly _session: ClientSession) {}

  get session(): ClientSession {
    return this._session;
  }
}