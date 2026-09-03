import {
  HydratedDocument,
  Model,
  Types,
} from "mongoose";

import { IBaseRepository } from "../../domain/repositories/base.repository";
import { IBaseEntity } from "../../domain/entities/base.entity";

export abstract class BaseRepositoryImpl<
    TDomain extends IBaseEntity,
    TDocument,
>
  implements IBaseRepository<TDomain> {

  protected abstract readonly _model: Model<TDocument>;

  protected abstract toDomain(
    document: HydratedDocument<TDocument>,
  ): TDomain;

  protected abstract toDocument(
    entity: TDomain,
  ): Partial<TDocument>;

  async create(entity: TDomain): Promise<TDomain> {
    const document = await this._model.create(
      this.toDocument(entity),
    );

    return this.toDomain(document);
  }

  async findById(id: string): Promise<TDomain | null> {
    if (!Types.ObjectId.isValid(id)) {
      return null;
    }

    const document = await this._model.findById(id);

    if (!document) {
      return null;
    }

    return this.toDomain(document);
  }

  async update(entity: TDomain): Promise<TDomain> {
    const document = await this._model.findByIdAndUpdate(
      entity.id,
      this.toDocument(entity),
      {
        new: true,
        runValidators: true,
      },
    );

    if (!document) {
      throw new Error("Entity not found.");
    }

    return this.toDomain(document);
  }
}