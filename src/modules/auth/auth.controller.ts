import { Controller, InternalServerErrorException, Post, Redirect, Req, Res, UseGuards } from "@nestjs/common";
import { User } from "../db/schema/db.schema";
import { AuthGuard } from "@nestjs/passport";
import { LocalAuthGuard } from "./guards/local-auth.guard";
import { Request, Response} from "express";
import { AuthService } from "./auth.service";
import { jwtConstants } from "./auth.constants";

@Controller('auth')
export class AuthController {
    constructor (private authService: AuthService) {}

    @UseGuards(LocalAuthGuard)
    @Post('login')
    async login(@Req() req: Request, @Res({ passthrough: true }) res: Response) {
        const tokenResult = await this.authService.login(req.user as unknown as Omit<User, 'hash'>)
        res.cookie(jwtConstants.TOKEN_NAME, tokenResult[jwtConstants.TOKEN_NAME], jwtConstants.ACCESS_TOKEN_OPTIONS)
        return tokenResult
    }

    @Post('logout')
    async logout(@Req() req: Request, @Res({passthrough: true}) res: Response) {
        req.logout((err) => {
            if (err) {
                throw new InternalServerErrorException()
            }
            res.clearCookie(jwtConstants.ACCESS_TOKEN, jwtConstants.ACCESS_TOKEN_OPTIONS)
            res.status(200)
            return {
                "message": "Logged out successfully"
            }
        })
    }
}