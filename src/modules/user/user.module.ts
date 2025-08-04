import { forwardRef, Module } from "@nestjs/common";
import { DBModule } from "../db/db.module";
import { UserRepository } from "./user.repository";
import { UserController } from "./user.controller";
import { UserService } from "./user.service";
import { AuthModule } from "../auth/auth.module";

@Module({
    imports: [
        DBModule, 
        forwardRef(() => AuthModule),
    ],
    providers: [UserRepository, UserService],
    controllers: [UserController],
    exports: [UserService],
})
export class UserModule {}