import { Injectable } from "@nestjs/common";
import { UserService } from "../user/user.service";
import { hashPassword, verifyPassword } from "./lib/auth.crypto";
import { User } from "../db/schema/db.schema";
import { JwtService } from "@nestjs/jwt";
import { jwtConstants } from "./auth.constants";

@Injectable()
export class AuthService {
    constructor (
        private userService: UserService,
        private jwtService: JwtService,
    ) {}
    private _renderUserPayload(user: User) {
        const { hash, ...rest } = user
        return rest
    }
    async validateUser(username: string, password: string) {
        const user = await this.userService.findByUsername(username)
        return await verifyPassword(user.hash, password)
            ? this._renderUserPayload(user)
            : null
    }
    async login (user: Omit<User, 'hash'>) {
        const payload = { 
            sub: user.id,
            username: user.username,
            email: user.email,
        }
        return {
            [jwtConstants.TOKEN_NAME] : this.jwtService.sign(payload)
        }
    }
}