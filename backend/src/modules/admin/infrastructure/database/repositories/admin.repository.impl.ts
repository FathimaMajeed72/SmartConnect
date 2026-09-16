import { IAdminRepository } from "../../../domain/repositories/admin.repository";

import { GetParentsQuery } from "../../../application/types/get-parents-query.type";
import {
  PaginatedParents,
  ParentListItem,
} from "../../../application/types/get-parents-response.type";
import { Role } from "../../../../auth/domain/enums/role.enum";
import { UserModel } from "../../../../auth/infrastructure/database/models/user.model";
import { GetTeachersQuery } from "../../../application/types/get-teachers-query.type";
import {
  PaginatedTeachers,
  TeacherListItem,
} from "../../../application/types/get-teachers-response.type";
import { Types } from "mongoose";
import { UserStatus } from "../../../../auth/domain/enums/user-status.enum";


interface TeacherAggregationResult {
  _id: Types.ObjectId;
  firstName: string;
  lastName: string;
  email: string;
  phone: string | null;
  status: UserStatus;

  teacher: {
    teacherId: string;
    qualification: string;
    joiningDate: Date;
    userId: Types.ObjectId;
  };
}

interface TeacherFacetResult {
  documents: TeacherAggregationResult[];

  totalCount: {
    count: number;
  }[];
}


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

  async getTeachers(query: GetTeachersQuery): Promise<PaginatedTeachers> {
    const page = Math.max(query.page, 1);
    const limit = Math.max(query.limit, 1);

    const skip = (page - 1) * limit;

    const matchFilter: Record<string, unknown> = {
      role: Role.TEACHER,
    };

    if (query.search) {
      matchFilter.$or = [
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
      matchFilter.status = query.status;
    }

    const [result] = await UserModel.aggregate<TeacherFacetResult>([
      {
        $match: matchFilter,
      },

      {
        $lookup: {
          from: "teachers",
          localField: "_id",
          foreignField: "userId",
          as: "teacher",
        },
      },

      {
        $unwind: "$teacher",
      },

      {
        $sort: {
          createdAt: -1,
        },
      },

      {
        $facet: {
          documents: [
            {
              $skip: skip,
            },
            {
              $limit: limit,
            },
          ],

          totalCount: [
            {
              $count: "count",
            },
          ],
        },
      },
    ]);

    const documents = result?.documents ?? [];

    const total = result?.totalCount?.[0]?.count ?? 0;

    const teachers: TeacherListItem[] = documents.map((document) => ({
      id: document._id.toString(),
      teacherId: document.teacher.teacherId,
      firstName: document.firstName,
      lastName: document.lastName,
      email: document.email,
      phone: document.phone,
      qualification: document.teacher.qualification,
      joiningDate: document.teacher.joiningDate,
      status: document.status,
    }));

    return {
      teachers,
      page,
      limit,
      total,
      totalPages: Math.ceil(total / limit),
    };
  }
}
