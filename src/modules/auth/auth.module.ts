import { Module } from "@nestjs/common";
import { UserService } from "../user/user.service";

@Module({
    imports: [UserService],
    exports: [],
})
export class AuthModule {}
