import { Inject, Injectable } from "@nestjs/common";
import { DB_PROVIDER, DBConnection } from "../db/db.provider";
import { eq } from "drizzle-orm";
import { userSchema } from "../db/schema";

@Injectable()
export class UserRepository {
    constructor (
        @Inject(DB_PROVIDER)
        private db: DBConnection
    ) {}
    async getUserByEmail(email: string) {
        const result = await this.db.query.userSchema.findFirst({
            where: eq(userSchema.email, email)
        }) ?? null
        return result
    }
}