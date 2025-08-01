import { Injectable, NotFoundException } from "@nestjs/common";
import { FindUserOptions } from "./user.types";
import { UserRepository } from "./user.repository";
import { PaginationResult } from "src/common/types";

@Injectable()
export class UserService {
    constructor(private userRepository: UserRepository,) { }
    async findById(id: string) {
        const user = this.userRepository.findById(id)
        if (!user) {
            throw new NotFoundException()
        }
        return user
    }
    async findByEmail(email: string) {
        const user = await this.userRepository.findByEmail(email)
        if (!user)
            throw new NotFoundException()
        return user
    }
    async findByUsername(username: string) {
        const user = await this.userRepository.findByUsername(username)
        if (!user)
            throw new NotFoundException()
        return user
    }
    async find({ filter, pagination }: FindUserOptions): Promise<PaginationResult> {
        const { page, perPage } = pagination
        const effectiveOffset = (page - 1) * pagination.perPage
        const effectiveLimit = pagination.perPage
        const rowsResult = await this.userRepository.find({
            ...filter,
            skip: effectiveOffset,
            take: effectiveLimit,
        })
        if (rowsResult === null) {
            return {
                page: 1,
                totalItems: 0,
                totalPages: 1,
                itemsCount: 0,
                items: [],
                perPage,
            }
        }
        return {
            page: page,
            totalItems: rowsResult.count,
            totalPages: Math.ceil(rowsResult.count / perPage),
            itemsCount: rowsResult.data.length,
            items: rowsResult.data,
            perPage,
        }
    }
}