import { Module } from "@nestjs/common";
import { DB_PROVIDER, dbProvider, poolProvider, POSTGRES_POOL_PROVIDER } from "./db.provider";

@Module({
    providers: [dbProvider, poolProvider],
    exports: [DB_PROVIDER],
})
export class DBModule {}