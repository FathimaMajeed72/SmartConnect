import { Types } from "mongoose";


import { User } from "../../../domain/entities/user.entity";
import { UserRepository } from "../../../domain/repositories/user.repository";

import { UserModel } from "../models/user.model";
import { UserMapper } from "../mappers/user.mapper";
import { UserStatus } from "../../../domain/enums/user-status.enum";



export class UserRepositoryImpl implements UserRepository {

    async create(user: User): Promise<User> {
        const document = await UserModel.create(
            UserMapper.toDocument(user)
        );

        return UserMapper.toDomain(document);
    }

    async findById(id: string): Promise<User | null> {
        if (!Types.ObjectId.isValid(id)) {
            return null;
        }

        const document = await UserModel.findById(id);

        if (!document) {
            return null;
        }

        return UserMapper.toDomain(document);
    }

    async findByEmail(email: string): Promise<User | null> {
        const normalizedEmail = email.trim().toLowerCase();

        const document = await UserModel.findOne({
            email: normalizedEmail,
        });

        if (!document) {
            return null;
        }

        return UserMapper.toDomain(document);
    }

    async update(user: User): Promise<User> {
        const document = await UserModel.findByIdAndUpdate(
            user.id,
            UserMapper.toDocument(user),
            {
            new: true,
            runValidators: true,
            }
        );

        if (!document) {
            throw new Error("User not found.");
        }

        return UserMapper.toDomain(document);
    }

    async updateStatus(
        id: string,
        status: UserStatus
    ): Promise<User> {
        if (!Types.ObjectId.isValid(id)) {
            throw new Error("Invalid user id.");
        }

        const document = await UserModel.findByIdAndUpdate(
            id,
            { status },
            {
                new: true,
                runValidators: true,
            }
        );

        if (!document) {
            throw new Error("User not found.");
        }

        return UserMapper.toDomain(document);
    }


    
}