import { Injectable, NotFoundException } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { Strategy } from "passport-local";
import { User } from "src/modules/db/schema/db.schema";
import { AuthService } from "../auth.service";

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
    constructor (private authService: AuthService) {
        super({usernameField: "username", passwordField: "password"})
    }
    async validate(username: string, password: string): Promise<Omit<User, 'hash'>> {
        const user = await this.authService.validateUser(username, password)
        if (!user) {
            throw new NotFoundException();
        }
        return user
    }
}