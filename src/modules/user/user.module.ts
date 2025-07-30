import { Module } from "@nestjs/common";
import { DBModule } from "../db/db.module";
import { UserRepository } from "./user.repository";
import { UserController } from "./user.controller";
import { UserService } from "./user.service";

@Module({
    imports: [DBModule],
    providers: [UserRepository, UserService],
    controllers: [UserController],
    exports: [],
})
export class UserModule {}