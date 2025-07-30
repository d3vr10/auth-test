import { Inject, Injectable } from "@nestjs/common";
import { DB_PROVIDER, DBConnection } from "../db/db.provider";
import { and, eq } from "drizzle-orm";
import { userSchema } from "../db/schema";

export type UserFilter = {
    id?: string,
    username?: string,
    email?: string,
    role?: string,
}

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
    async findByUUID(id: string) {
        const result = await this.db.query.userSchema.findFirst({
            where: eq(userSchema.id, id)
        })
        return result ?? null
    }

    async find(filter: UserFilter) {
        const filterFields = Object.entries(filter)
        let whereClause;
        if (filterFields.length === 0)
            return [];

        if (filterFields.length === 1) {
            const [field, value] = filterFields[0]
            whereClause = eq(userSchema[field], value)
        }
        else if (whereClause.length > 1) {
            whereClause = and(
                ...filterFields.map(([field, value]) => eq(userSchema[field], value))
            )
        }
        const result = await this.db.query.userSchema.findMany({
            where: whereClause,
        })

        return result ?? null
    }
}