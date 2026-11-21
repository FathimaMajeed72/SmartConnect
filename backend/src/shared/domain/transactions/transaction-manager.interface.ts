import type { ITransactionContext } from "../transactions/transaction-context.interface"; 

export interface ITransactionManager {
  execute<T>(
    callback: (context: ITransactionContext) => Promise<T>,
  ): Promise<T>;
}