import { IAdminRepository } from "../../../domain/repositories/admin.repository";

import { GetParentsQuery } from "../../../application/types/get-parents-query.type";
import {
  PaginatedParents,
  ParentListItem,
} from "../../../application/types/get-parents-response.type";
import { Role } from "../../../../auth/domain/enums/role.enum";
import { UserModel } from "../../../../auth/infrastructure/database/models/user.model";

export class AdminRepositoryImpl implements IAdminRepository {
  async getParents(query: GetParentsQuery): Promise<PaginatedParents> {
    const page = Math.max(query.page, 1);
    const limit = Math.max(query.limit, 1);

    const skip = (page - 1) * limit;

    const filter: Record<string, unknown> = {
      role: Role.PARENT,
    };

    if (query.search) {
      filter.$or = [
        {
          firstName: {
            $regex: query.search,
            $options: "i",
          },
        },
        {
          lastName: {
            $regex: query.search,
            $options: "i",
          },
        },
        {
          email: {
            $regex: query.search,
            $options: "i",
          },
        },
      ];
    }

    if (query.status) {
      filter.status = query.status;
    }

    const [documents, total] = await Promise.all([
      UserModel.find(filter).sort({ createdAt: -1 }).skip(skip).limit(limit),

      UserModel.countDocuments(filter),
    ]);

    const parents: ParentListItem[] = documents.map((document) => ({
      id: document.id,
      firstName: document.firstName,
      lastName: document.lastName,
      email: document.email,
      phone: document.phone,
      status: document.status,
    }));

    return {
      parents,
      page,
      limit,
      total,
      totalPages: Math.ceil(total / limit),
    };
  }
}
