import { FactoryProvider } from "@nestjs/common";
import { Pool } from "pg";
import { drizzle, NodePgDatabase } from "drizzle-orm/node-postgres"
import * as schema from "src/modules/db/schema"

export const DB_CONNECTION_URL = "postgres://auth-test:testing123@localhost:30001/auth-test" ;
export const DB_PROVIDER = Symbol('DB_PROVIDER');
export type DBConnection = NodePgDatabase<typeof schema>;
export const dbProvider = {
    provide: DB_PROVIDER,
    useFactory: () => {
        const pool = new Pool({connectionString: DB_CONNECTION_URL, max: 80})
        return drizzle(pool, { schema: schema })
    }
}