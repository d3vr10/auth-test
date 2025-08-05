import { Injectable } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt";
import { User } from "src/modules/db/schema/db.schema";
import { AuthService } from "../auth.service";
import { jwtConstants } from "../auth.constants";

@Injectable()
export class JWTStrategy extends PassportStrategy(Strategy) {
    constructor (private authService: AuthService){
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false,
            secretOrKey: jwtConstants.ACCESS_TOKEN,
        })
    }

    async validate(payload: any) {
        return { 
            id: payload.sub, 
            username: payload.username,
            email: payload.email, 
        }
    }
}