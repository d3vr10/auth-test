import { Inject, Injectable } from "@nestjs/common";
import { DB_PROVIDER, DBConnection } from "../db/db.provider";
import { and, count, eq, SQL } from "drizzle-orm";
import { userSchema } from "../db/schema";
import { UserFilter } from "./user.types";
import { PAGINATION_TAKE_LIMIT } from "./user.constants";

@Injectable()
export class UserRepository {
    constructor(
        @Inject(DB_PROVIDER)
        private db: DBConnection
    ) { }
    async findByEmail(email: string) {
        const result = await this.db.query.userSchema.findFirst({
            where: eq(userSchema.email, email)
        }) ?? null
        return result
    }
    async findByUsername(username: string) {
        const result = await this.db.query.userSchema.findFirst({
            where: eq(userSchema.username, username)
        })
        return result ?? null
    }
    async findById(id: string) {
        const result = await this.db.query.userSchema.findFirst({
            where: eq(userSchema.id, id)
        })
        return result ?? null
    }

    async find({ skip, take, ...filter }: UserFilter) {
        const filterFields = Object.entries(filter)
        if (filterFields.length === 0) {
            const rowsResult = await this.db.transaction(async (tx) => {
                const [{ totalRows }] = await tx
                    .select({ totalRows: count() })
                    .from(userSchema)
                const rows = await this.db.query.userSchema.findMany({
                    offset: skip,
                    limit: take,
                })
                return {
                    data: rows,
                    count: totalRows,
                }
            })
            return rowsResult.data.length > 0
                ? rowsResult
                : null
        }
    
        const conditions = filterFields.map(([field, value]) => eq(userSchema[field], value))
        const whereClause = conditions.length > 1
            ? and(...conditions)
            : conditions.length === 1
                ? conditions[0]
                : null

        const rowsResult = await this.db.transaction(async (tx) => {
            let countQuery: any = tx
                .select({ totalRows: count() })
                .from(userSchema)
                .offset(skip)
                .limit(take)
            
            
            let fetchQuery: any = tx
                .select()
                .from(userSchema)
                .limit(PAGINATION_TAKE_LIMIT)
                .offset(skip)

            if (whereClause) {
                countQuery = countQuery.where(whereClause)
                fetchQuery = fetchQuery.where(whereClause)
            }

            const [{totalRows}] = await countQuery
            const rows = await fetchQuery

            return {
                count: totalRows,
                data: rows,
            }

        })

        return rowsResult.data.length > 0
            ? rowsResult
            : null
    }
}