import { Injectable } from "@nestjs/common";
import { FindUserOptions } from "./user.types";
import { PaginationResult } from "src/common/types";
import { UserRepository } from "./user.repository";

@Injectable()
export class UserService {
    constructor(private userRepository: UserRepository,) { }
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