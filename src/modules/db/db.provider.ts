import { FactoryProvider } from "@nestjs/common";
import { Pool } from "pg";
import { drizzle, NodePgDatabase } from "drizzle-orm/node-postgres"
import * as schema from "src/modules/db/schema"

export const POSTGRES_POOL_PROVIDER = Symbol('POSTGRES_POOL_PROVIDER')
export const poolProvider: FactoryProvider = {
    provide: POSTGRES_POOL_PROVIDER,
    useFactory: () => new Pool({
        connectionString: DB_CONNECTION_URL,
        ssl: false,
        max: 80,
    })
}

export const DB_CONNECTION_URL = "postgres://auth-test:testing123@localhost:30001/auth-test" ;
export const DB_PROVIDER = Symbol('DB_PROVIDER');
export type DBConnection = NodePgDatabase<typeof schema>;
export const dbProvider = {
    provide: DB_PROVIDER,
    inject: [POSTGRES_POOL_PROVIDER],
    useFactory: (pool: Pool) => {
        const db: DBConnection = drizzle(pool, { schema: schema })
        return db
    },
}