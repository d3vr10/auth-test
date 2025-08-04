import { Module } from "@nestjs/common";
import { UserModule } from "../user/user.module";
import { AuthService } from "./auth.service";
import { LocalStrategy } from "./strategies/auth.local-strategy";
import { AuthController } from "./auth.controller";
import { LocalAuthGuard } from "./guards/local-auth.guard";
import { JWTStrategy } from "./strategies/auth.jwt-strategy";
import { PassportModule } from "@nestjs/passport";
import { JwtModule } from "@nestjs/jwt";
import { jwtConstants } from "./auth.constants";

@Module({
    imports: [
        UserModule,
        JwtModule.register({
            secret: jwtConstants.ACCESS_TOKEN,
            signOptions: {
                expiresIn: jwtConstants.EXPIRES_IN,
                algorithm: "HS256",
            },
        }),
        PassportModule,
    ],
    providers: [
        AuthService,
    ],
    controllers: [AuthController],
    exports: [AuthService],
})
export class AuthModule { }
