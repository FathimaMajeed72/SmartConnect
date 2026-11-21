import mongoose from "mongoose";

import { ITransactionManager } from "../../../domain/transactions/transaction-manager.interface";
import { ITransactionContext } from "../../../domain/transactions/transaction-context.interface";

import { MongoTransactionContext } from "./mongo-transaction.context";

export class MongoTransactionManager implements ITransactionManager {
  async execute<T>(
    callback: (context: ITransactionContext) => Promise<T>,
  ): Promise<T> {
    const session = await mongoose.startSession();

    try {
      let result!: T;

      await session.withTransaction(async () => {
        const context = new MongoTransactionContext(session);

        result = await callback(context);
      });

      return result;
    } finally {
      await session.endSession();
    }
  }
}