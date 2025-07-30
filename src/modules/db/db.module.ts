import { Module } from "@nestjs/common";
import { DB_PROVIDER, dbProvider } from "./db.provider";

@Module({
    providers: [dbProvider],
    exports: [DB_PROVIDER],
})
export class DBModule {}