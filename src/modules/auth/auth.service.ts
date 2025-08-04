import { Injectable } from "@nestjs/common";
import { UserService } from "../user/user.service";
import { hashPassword, verifyPassword } from "./lib/auth.crypto";
import { User } from "../db/schema/db.schema";
import { JwtService } from "@nestjs/jwt";

@Injectable()
export class AuthService {
    constructor (
        private userService: UserService,
        private jwtService: JwtService,
    ) {}
    async validateUser(username: string, password: string) {
        const user = await this.userService.findByUsername(username)
        return await verifyPassword(user.hash, password)
            ? user
            : null
    }
    async login (user: User)  {
        const payload = { 
            sub: user.id,
            username: user.username,
        }
        return {
            "access_token": this.jwtService.sign(payload)
        }
    }
}