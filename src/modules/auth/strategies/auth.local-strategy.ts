import { Injectable } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { Strategy } from "passport-local";
import { User } from "src/modules/db/schema/db.schema";

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
    constructor () {
        super({usernameField: "email", passwordField: "password"})
    }
    validate(...args: any[]): any {
    }
}